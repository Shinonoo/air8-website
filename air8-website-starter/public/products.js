/* ============================================================
   Air 8 Industries — products.js  (catalog engine + popup)
   ------------------------------------------------------------
   1. Loads the catalog from GET /api/products (backed by the
      air8_db database — see routes/products.js)
   2. Builds Brand / Category / Sort dropdowns FROM that data
   3. Filters + sorts the grid
   4. Opens the popup (image left, details right, actions)
   Add/edit products via the /admin.html panel — not here.
   ============================================================ */

/* ---- Elements ---- */
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("productSearch");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const countEl = document.getElementById("resultCount");
const pagination = document.getElementById("pagination");
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");

let lastFocused = null;
let scrollLockY = 0;

const PAGE_SIZE = 25;
let catalogPage = 1;

// Populated by init() from the API — same shape products-data.js used to
// provide (brand, category, name, code, image, blurb, brochure, specs).
let PRODUCTS = [];

/* ---- Helper: a product's categories, always as a list ---- */
// category can be "Roof Mounted Fans" OR ["A", "B"]. This makes both work.
function catList(p) {
  return Array.isArray(p.category) ? p.category : [p.category];
}

/* ---- Helper: image OR a clean fallback tile ---- */
function mediaHTML(p) {
  const label =
    p.brand === "Elta Fans" ? "ELTA" :
    p.brand === "Abie Tiger" ? "TIGER" :
    p.brand === "Starduct" ? "STAR" : "AIR8";
  const img = p.image
    ? `<img class="media__img" src="${p.image}" alt="${p.name}" onerror="this.remove()" />`
    : "";
  return `<span class="media__fallback">${label}</span>${img}`;
}

/* ---- Build the dropdowns from the data (so they never go stale) ---- */
function fillSelect(selectEl, values, allLabel) {
  selectEl.innerHTML =
    `<option value="all">${allLabel}</option>` +
    values.map((v) => `<option value="${v}">${v}</option>`).join("");
}

/* ---- Category options depend on the selected brand ----
   Picking a brand shouldn't leave 25+ unrelated categories in the list —
   only the categories that brand's products actually use. */
function categoriesForBrand(brand) {
  const subset = brand === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.brand === brand);
  return [...new Set(subset.flatMap(catList))].sort();
}

function refreshCategoryOptions() {
  const cats = categoriesForBrand(brandFilter.value);
  const prevValue = categoryFilter.value;
  fillSelect(categoryFilter, cats, "All categories");
  // Keep the previous choice if it still applies to this brand, else reset.
  categoryFilter.value = cats.includes(prevValue) ? prevValue : "all";
}

brandFilter.addEventListener("change", function () {
  refreshCategoryOptions();
  catalogPage = 1;
  render();
});

/* ---- Redraw whenever any other control changes (and jump back to page 1) ---- */
[searchInput, categoryFilter, sortBy].forEach((el) => {
  const evt = el === searchInput ? "input" : "change";
  el.addEventListener(evt, function () {
    catalogPage = 1;
    render();
  });
});

/* ---- Draw the grid ---- */
function render() {
  const brand = brandFilter.value;
  const category = categoryFilter.value;
  const search = searchInput.value.toLowerCase().trim();
  const sort = sortBy.value;

  // Keep each product with its ORIGINAL index so the popup can find it
  // again even after we filter and re-sort.
  let list = [];
  PRODUCTS.forEach((p, index) => {
    const cats = catList(p);
    const okBrand = brand === "all" || p.brand === brand;
    const okCategory = category === "all" || cats.includes(category);
    const haystack = (p.name + " " + p.brand + " " + p.blurb + " " + p.code + " " + cats.join(" ")).toLowerCase();
    const okSearch = search === "" || haystack.includes(search);
    if (okBrand && okCategory && okSearch) list.push({ p, index });
  });

  // Sorting.
  if (sort === "az") list.sort((a, b) => a.p.name.localeCompare(b.p.name));
  else if (sort === "za") list.sort((a, b) => b.p.name.localeCompare(a.p.name));
  else if (sort === "brand") list.sort((a, b) => a.p.brand.localeCompare(b.p.brand) || a.p.name.localeCompare(b.p.name));
  // "featured" = leave in data order.

  countEl.textContent = list.length + (list.length === 1 ? " product" : " products");

  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = '<p class="empty">No products match. Try clearing a filter or search term.</p>';
    pagination.innerHTML = "";
    return;
  }

  // Page the filtered list — 25 products per page.
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  if (catalogPage > totalPages) catalogPage = totalPages;
  const start = (catalogPage - 1) * PAGE_SIZE;
  const pageItems = list.slice(start, start + PAGE_SIZE);

  pageItems.forEach(({ p, index }) => {
    const codeTag = p.code ? `<span class="catalog-card__code">${p.code}</span>` : "";
    grid.insertAdjacentHTML(
      "beforeend",
      `<button class="catalog-card" data-index="${index}">
         <span class="media media--card">${mediaHTML(p)}</span>
         <span class="catalog-card__meta">
           <span class="catalog-card__top">
             <span class="catalog-card__brand">${p.brand}</span>
             ${codeTag}
           </span>
           <span class="catalog-card__name">${p.name}</span>
           <span class="catalog-card__view">View details &rarr;</span>
         </span>
       </button>`
    );
  });

  renderPagination(totalPages);
}

/* ---- Draw Prev / page numbers / Next ---- */
function renderPagination(totalPages) {
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let html = `<button class="pagination__btn" data-page="${catalogPage - 1}" ${catalogPage === 1 ? "disabled" : ""} aria-label="Previous page">&larr;</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pagination__btn${i === catalogPage ? " is-active" : ""}" data-page="${i}" ${i === catalogPage ? 'aria-current="page"' : ""}>${i}</button>`;
  }
  html += `<button class="pagination__btn" data-page="${catalogPage + 1}" ${catalogPage === totalPages ? "disabled" : ""} aria-label="Next page">&rarr;</button>`;

  pagination.innerHTML = html;
}

pagination.addEventListener("click", function (e) {
  const btn = e.target.closest("button[data-page]");
  if (!btn || btn.disabled) return;
  const page = Number(btn.dataset.page);
  if (!page || page === catalogPage) return;
  catalogPage = page;
  render();
  grid.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ---- Open a card -> popup ---- */
grid.addEventListener("click", function (e) {
  const card = e.target.closest(".catalog-card");
  if (!card) return;
  lastFocused = card;
  openModal(PRODUCTS[card.dataset.index]);
});

function openModal(p) {
  document.getElementById("modalMedia").innerHTML = mediaHTML(p);
  document.getElementById("modalBrand").textContent = p.brand;
  document.getElementById("modalCode").textContent = p.code || "";
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.blurb;

  const specsEl = document.getElementById("modalSpecs");
  if (p.specs && p.specs.length) {
    specsEl.innerHTML = p.specs
      .map((s) => `<span class="spec"><strong>${s.value}</strong><em>${s.label}</em></span>`)
      .join("");
    specsEl.hidden = false;
  } else {
    specsEl.hidden = true;
  }

  const dl = document.getElementById("modalDownload");
  if (p.brochure) {
    dl.href = p.brochure;
    // Stay hidden until we've confirmed the PDF actually exists — a
    // missing file used to fall through to a bare, unstyled copy of the
    // homepage instead of downloading anything (see server.js catch-all).
    dl.hidden = true;
    fetch(p.brochure, { method: "HEAD" })
      .then(function (res) { if (res.ok) dl.hidden = false; })
      .catch(function () {});
    dl.onclick = function () {
      fetch("/api/track-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: p.name }),
      }).catch(function () {});
    };
  } else {
    dl.hidden = true;
  }

  document.getElementById("modalActions").hidden = false;
  const form = document.getElementById("modalForm");
  form.hidden = true;
  form.reset();
  document.getElementById("modalProduct").value = p.name;
  document.getElementById("modalFormStatus").textContent = "";

  scrollLockY = window.scrollY || window.pageYOffset;
  document.body.style.top = `-${scrollLockY}px`;
  document.body.classList.add("modal-open");
  modal.hidden = false;
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  // "instant" (not the page's default smooth scroll) so the background
  // snaps straight back instead of visibly sliding into place.
  window.scrollTo({ top: scrollLockY, left: 0, behavior: "instant" });
  if (lastFocused) lastFocused.focus();
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-close")) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

document.getElementById("modalInquire").addEventListener("click", function () {
  document.getElementById("modalActions").hidden = true;
  const form = document.getElementById("modalForm");
  form.hidden = false;
  document.getElementById("mfName").focus();
});

document.getElementById("modalForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const statusEl = document.getElementById("modalFormStatus");
  const data = {
    name: document.getElementById("mfName").value.trim(),
    email: document.getElementById("mfEmail").value.trim(),
    phone: document.getElementById("mfPhone").value.trim(),
    company: document.getElementById("mfCompany").value.trim(),
    message: document.getElementById("mfMessage").value.trim(),
    product: document.getElementById("modalProduct").value,
  };
  if (!data.name || !data.email || !data.phone) {
    statusEl.textContent = "Please add your name, email and phone.";
    statusEl.className = "form__status is-error";
    return;
  }
  statusEl.textContent = "Sending…";
  statusEl.className = "form__status";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      this.reset();
      statusEl.textContent = "Thanks! We've received your inquiry and will email you the catalogue shortly.";
      statusEl.className = "form__status is-ok";
    } else {
      statusEl.textContent = "Something went wrong. Please email sales@air8industries.com.";
      statusEl.className = "form__status is-error";
    }
  } catch (err) {
    statusEl.textContent = "Could not reach the server. Please try again shortly.";
    statusEl.className = "form__status is-error";
  }
});

/* ---- Load the catalog from the database, then draw everything ---- */
async function init() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Request failed");
    PRODUCTS = await res.json();
  } catch (err) {
    grid.innerHTML = '<p class="empty">Could not load products right now. Please try again shortly.</p>';
    countEl.textContent = "";
    return;
  }

  const brands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
  fillSelect(brandFilter, brands, "All brands");

  // Coming from the "Products" nav dropdown (e.g. products.html?brand=Elta+Fans)
  // pre-selects that brand so visitors land straight on it.
  const requestedBrand = new URLSearchParams(location.search).get("brand");
  if (requestedBrand && brands.includes(requestedBrand)) {
    brandFilter.value = requestedBrand;
  }

  refreshCategoryOptions();
  render();
}

init();
