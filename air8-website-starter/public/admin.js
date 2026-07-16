/* ============================================================
   Air 8 Industries — admin.js
   Drives admin.html: login, product CRUD, inquiries list.
   Vanilla JS, no build step — same style as the rest of the site.
   ============================================================ */

const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const logoutBtn = document.getElementById("logoutBtn");

let brands = [];
let categories = [];
let editingProductId = null;

let allProducts = [];
let productsPage = 1;
const PRODUCTS_PAGE_SIZE = 20;

/* ---- API helper: JSON in, JSON out, throws on non-2xx ---- */
async function api(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed.");
  return data;
}

/* ---- Auth ---- */
async function checkSession() {
  const { loggedIn } = await api("/api/admin/session");
  showDashboard(loggedIn);
  if (loggedIn) await loadEverything();
}

function showDashboard(loggedIn) {
  loginView.classList.toggle("admin-hidden", loggedIn);
  dashboardView.classList.toggle("admin-hidden", !loggedIn);
  logoutBtn.classList.toggle("admin-hidden", !loggedIn);
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const statusEl = document.getElementById("loginStatus");
  const password = document.getElementById("loginPassword").value;
  statusEl.textContent = "Signing in…";
  statusEl.className = "form__status";
  try {
    await api("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) });
    document.getElementById("loginPassword").value = "";
    statusEl.textContent = "";
    showDashboard(true);
    await loadEverything();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "form__status is-error";
  }
});

logoutBtn.addEventListener("click", async function () {
  await api("/api/admin/logout", { method: "POST" });
  showDashboard(false);
});

/* ---- Tabs ---- */
const TAB_SECTIONS = { products: "productsTab", messages: "messagesTab", content: "contentTab" };
document.querySelectorAll(".admin-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    Object.entries(TAB_SECTIONS).forEach(([name, sectionId]) => {
      document.getElementById(sectionId).classList.toggle("admin-hidden", name !== tab.dataset.tab);
    });
  });
});

/* ---- Collapsible panels (Bulk import / Add-edit form default closed
   so "All products" is visible without scrolling past them) ---- */
function setupCollapse(toggleId, bodyId, onOpen) {
  const toggle = document.getElementById(toggleId);
  const body = document.getElementById(bodyId);
  toggle.addEventListener("click", function () {
    const willOpen = body.classList.contains("admin-hidden");
    body.classList.toggle("admin-hidden", !willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    if (willOpen && typeof onOpen === "function") onOpen();
  });
}
setupCollapse("bulkImportToggle", "bulkImportBody");
setupCollapse("productFormToggle", "productFormBody", function () {
  // Opened directly (not via "Edit") — make sure it's a blank "add" form.
  if (!editingProductId) resetProductForm();
});

/* ---- Load everything the dashboard needs ---- */
async function loadEverything() {
  await Promise.all([loadBrands(), loadCategories()]);
  await Promise.all([loadProducts(), loadInquiries(), loadContent()]);
}

async function loadBrands() {
  brands = await api("/api/admin/brands");
  const select = document.getElementById("pfBrand");
  select.innerHTML = brands.map((b) => `<option value="${b.id}">${b.name}</option>`).join("");
}

async function loadCategories() {
  categories = await api("/api/admin/categories");
  const wrap = document.getElementById("pfCategories");
  wrap.innerHTML = categories
    .map((c) => `<label class="admin-check"><input type="checkbox" value="${c.id}" /> ${c.name}</label>`)
    .join("");
}

document.getElementById("pfAddBrand").addEventListener("click", async function () {
  const input = document.getElementById("pfNewBrand");
  if (!input.value.trim()) return;
  await api("/api/admin/brands", { method: "POST", body: JSON.stringify({ name: input.value.trim() }) });
  input.value = "";
  await loadBrands();
});

document.getElementById("pfAddCategory").addEventListener("click", async function () {
  const input = document.getElementById("pfNewCategory");
  if (!input.value.trim()) return;
  await api("/api/admin/categories", { method: "POST", body: JSON.stringify({ name: input.value.trim() }) });
  input.value = "";
  await loadCategories();
});

/* ---- Specs (dynamic label/value rows) ---- */
function addSpecRow(label, value) {
  const wrap = document.getElementById("pfSpecs");
  const row = document.createElement("div");
  row.className = "admin-specs-row";
  row.innerHTML = `
    <input type="text" placeholder="Value (e.g. 1800 Pa)" class="spec-value" value="${value || ""}" />
    <input type="text" placeholder="Label (e.g. static pressure)" class="spec-label" value="${label || ""}" />
    <button type="button" class="btn btn--ghost btn--small spec-remove">×</button>
  `;
  row.querySelector(".spec-remove").addEventListener("click", () => row.remove());
  wrap.appendChild(row);
}
document.getElementById("pfAddSpec").addEventListener("click", () => addSpecRow());

/* ---- Products table: search, filter, sort, paginate (all client-side —
   the admin API already returns every product in one shot) ---- */
async function loadProducts() {
  allProducts = await api("/api/admin/products");
  populateProductFilterOptions();
  productsPage = 1;
  renderProductsTable();
}

// Filter dropdowns are built from the products that actually exist (not
// every brand/category ever created), same pattern as the public catalog —
// and preserve the current selection across a reload when it's still valid.
function populateProductFilterOptions() {
  const brandSelect = document.getElementById("pFilterBrand");
  const prevBrand = brandSelect.value;
  const brandNames = [...new Set(allProducts.map((p) => p.brand_name))].sort();
  brandSelect.innerHTML =
    '<option value="all">All brands</option>' + brandNames.map((b) => `<option>${b}</option>`).join("");
  brandSelect.value = brandNames.includes(prevBrand) ? prevBrand : "all";

  const categorySelect = document.getElementById("pFilterCategory");
  const prevCategory = categorySelect.value;
  const categoryNames = [...new Set(allProducts.flatMap((p) => (p.categories || []).map((c) => c.name)))].sort();
  categorySelect.innerHTML =
    '<option value="all">All categories</option>' + categoryNames.map((c) => `<option>${c}</option>`).join("");
  categorySelect.value = categoryNames.includes(prevCategory) ? prevCategory : "all";
}

function renderProductsTable() {
  const search = document.getElementById("pSearch").value.trim().toLowerCase();
  const brandFilter = document.getElementById("pFilterBrand").value;
  const categoryFilter = document.getElementById("pFilterCategory").value;
  const statusFilter = document.getElementById("pFilterStatus").value;
  const sort = document.getElementById("pSort").value;

  const filtered = allProducts.filter((p) => {
    const okBrand = brandFilter === "all" || p.brand_name === brandFilter;
    const okCategory = categoryFilter === "all" || (p.categories || []).some((c) => c.name === categoryFilter);
    const okStatus = statusFilter === "all" || (statusFilter === "published" ? !!p.is_published : !p.is_published);
    const haystack = `${p.name} ${p.code || ""} ${p.brand_name}`.toLowerCase();
    const okSearch = !search || haystack.includes(search);
    return okBrand && okCategory && okStatus && okSearch;
  });

  filtered.sort((a, b) => {
    if (sort === "date_asc") return new Date(a.created_at) - new Date(b.created_at);
    if (sort === "name_asc") return a.name.localeCompare(b.name);
    if (sort === "name_desc") return b.name.localeCompare(a.name);
    if (sort === "brand") return a.brand_name.localeCompare(b.brand_name) || a.name.localeCompare(b.name);
    return new Date(b.created_at) - new Date(a.created_at); // date_desc (default: newest first)
  });

  document.getElementById("productResultsCount").textContent =
    filtered.length === allProducts.length
      ? `${allProducts.length} product${allProducts.length === 1 ? "" : "s"}`
      : `Showing ${filtered.length} of ${allProducts.length} products`;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PAGE_SIZE));
  if (productsPage > totalPages) productsPage = totalPages;
  const start = (productsPage - 1) * PRODUCTS_PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PRODUCTS_PAGE_SIZE);

  const body = document.getElementById("productsTableBody");
  if (pageItems.length === 0) {
    body.innerHTML =
      '<tr><td colspan="6" style="text-align:center; color:var(--steel); padding:1.5rem;">No products match.</td></tr>';
  } else {
    body.innerHTML = pageItems
      .map((p) => {
        const cats = (p.categories || []).map((c) => `<span class="pill">${c.name}</span>`).join("");
        const status = p.is_published
          ? '<span class="pill pill--ok">Published</span>'
          : '<span class="pill pill--warn">Draft</span>';
        const dateAdded = p.created_at
          ? new Date(p.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
          : "—";
        return `
          <tr>
            <td>${p.brand_name}</td>
            <td>${p.name}${p.code ? `<br><span style="color:var(--steel);font-size:0.8rem;">${p.code}</span>` : ""}</td>
            <td>${cats}</td>
            <td style="white-space:nowrap;">${dateAdded}</td>
            <td>${status}</td>
            <td>
              <div class="row-actions">
                <button class="btn btn--ghost btn--small" data-edit="${p.id}">Edit</button>
                <button class="btn btn--danger btn--small" data-delete="${p.id}">Delete</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  body.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => editProduct(allProducts.find((p) => p.id === Number(btn.dataset.edit))));
  });
  body.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => deleteProduct(Number(btn.dataset.delete)));
  });

  renderProductsPagination(totalPages);
}

function renderProductsPagination(totalPages) {
  const nav = document.getElementById("productsPagination");
  if (totalPages <= 1) {
    nav.innerHTML = "";
    return;
  }
  let html = `<button class="pagination__btn" data-page="${productsPage - 1}" ${productsPage === 1 ? "disabled" : ""} aria-label="Previous page">&larr;</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pagination__btn${i === productsPage ? " is-active" : ""}" data-page="${i}" ${i === productsPage ? 'aria-current="page"' : ""}>${i}</button>`;
  }
  html += `<button class="pagination__btn" data-page="${productsPage + 1}" ${productsPage === totalPages ? "disabled" : ""} aria-label="Next page">&rarr;</button>`;
  nav.innerHTML = html;

  nav.querySelectorAll("button[data-page]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const page = Number(btn.dataset.page);
      if (!page || page === productsPage || btn.disabled) return;
      productsPage = page;
      renderProductsTable();
      document.getElementById("productsListPanel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function resetProductsToPageOne() {
  productsPage = 1;
  renderProductsTable();
}

document.getElementById("pFilterBrand").addEventListener("change", resetProductsToPageOne);
document.getElementById("pFilterCategory").addEventListener("change", resetProductsToPageOne);
document.getElementById("pFilterStatus").addEventListener("change", resetProductsToPageOne);
document.getElementById("pSort").addEventListener("change", resetProductsToPageOne);

let searchDebounceTimer;
document.getElementById("pSearch").addEventListener("input", function () {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(resetProductsToPageOne, 200);
});

function editProduct(p) {
  editingProductId = p.id;
  document.getElementById("productFormTitle").textContent = `Editing: ${p.name}`;
  document.getElementById("pfId").value = p.id;
  document.getElementById("pfBrand").value = p.brand_id;
  document.getElementById("pfCode").value = p.code || "";
  document.getElementById("pfName").value = p.name;
  document.getElementById("pfDesc").value = p.short_description || "";
  document.getElementById("pfImage").value = p.primary_image_url || "";
  document.getElementById("pfBrochure").value = p.brochure_url || "";
  document.getElementById("pfFeatured").checked = !!p.is_featured;
  document.getElementById("pfPublished").checked = !!p.is_published;

  const selectedCatIds = new Set((p.categories || []).map((c) => c.id));
  document.querySelectorAll("#pfCategories input[type=checkbox]").forEach((cb) => {
    cb.checked = selectedCatIds.has(Number(cb.value));
  });

  document.getElementById("pfSpecs").innerHTML = "";
  (p.specs || []).forEach((s) => addSpecRow(s.label, s.value));

  document.getElementById("pfCancelEdit").classList.remove("admin-hidden");

  document.getElementById("productFormBody").classList.remove("admin-hidden");
  document.getElementById("productFormToggle").setAttribute("aria-expanded", "true");
  document.getElementById("productForm").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("pfCancelEdit").addEventListener("click", resetProductForm);

function resetProductForm() {
  editingProductId = null;
  document.getElementById("productFormTitle").textContent = "Add a product";
  document.getElementById("productForm").reset();
  document.getElementById("pfId").value = "";
  document.getElementById("pfSpecs").innerHTML = "";
  document.getElementById("pfPublished").checked = true;
  document.querySelectorAll("#pfCategories input[type=checkbox]").forEach((cb) => (cb.checked = false));
  document.getElementById("pfCancelEdit").classList.add("admin-hidden");
}

async function deleteProduct(id) {
  if (!confirm("Delete this product? This cannot be undone.")) return;
  await api(`/api/admin/products/${id}`, { method: "DELETE" });
  await loadProducts();
}

document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const statusEl = document.getElementById("productFormStatus");

  const category_ids = Array.from(document.querySelectorAll("#pfCategories input[type=checkbox]:checked")).map((cb) =>
    Number(cb.value)
  );
  const specs = Array.from(document.querySelectorAll(".admin-specs-row")).map((row) => ({
    value: row.querySelector(".spec-value").value.trim(),
    label: row.querySelector(".spec-label").value.trim(),
  }));

  const payload = {
    brand_id: Number(document.getElementById("pfBrand").value),
    category_ids,
    name: document.getElementById("pfName").value.trim(),
    code: document.getElementById("pfCode").value.trim(),
    short_description: document.getElementById("pfDesc").value.trim(),
    primary_image_url: document.getElementById("pfImage").value.trim(),
    brochure_url: document.getElementById("pfBrochure").value.trim(),
    is_featured: document.getElementById("pfFeatured").checked,
    is_published: document.getElementById("pfPublished").checked,
    specs,
  };

  if (!payload.name || !payload.brand_id || category_ids.length === 0) {
    statusEl.textContent = "Name, brand and at least one category are required.";
    statusEl.className = "form__status is-error";
    return;
  }

  statusEl.textContent = "Saving…";
  statusEl.className = "form__status";
  try {
    if (editingProductId) {
      await api(`/api/admin/products/${editingProductId}`, { method: "PUT", body: JSON.stringify(payload) });
    } else {
      await api("/api/admin/products", { method: "POST", body: JSON.stringify(payload) });
    }
    statusEl.textContent = "Saved.";
    statusEl.className = "form__status is-ok";
    resetProductForm();
    document.getElementById("productFormBody").classList.add("admin-hidden");
    document.getElementById("productFormToggle").setAttribute("aria-expanded", "false");
    await loadProducts();
    document.getElementById("productsListPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "form__status is-error";
  }
});

/* ---- Bulk import (CSV) ---- */
document.getElementById("bulkFile").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { document.getElementById("bulkCsv").value = reader.result; };
  reader.readAsText(file);
});

document.getElementById("bulkImportBtn").addEventListener("click", async function () {
  const statusEl = document.getElementById("bulkImportStatus");
  const errorsEl = document.getElementById("bulkImportErrors");
  const csv = document.getElementById("bulkCsv").value;

  if (!csv.trim()) {
    statusEl.textContent = "Paste some CSV or choose a file first.";
    statusEl.className = "form__status is-error";
    return;
  }

  const btn = this;
  btn.disabled = true;
  statusEl.textContent = "Importing… this can take a moment for a large file.";
  statusEl.className = "form__status";
  errorsEl.classList.add("admin-hidden");
  errorsEl.innerHTML = "";

  try {
    const result = await api("/api/admin/products/bulk-import", { method: "POST", body: JSON.stringify({ csv }) });
    statusEl.textContent = `Done — ${result.created} created, ${result.updated} updated${result.errors.length ? `, ${result.errors.length} skipped (see below)` : ""}.`;
    statusEl.className = result.errors.length ? "form__status" : "form__status is-ok";
    if (result.errors.length) {
      errorsEl.innerHTML = result.errors.map((e) => `<div>${e}</div>`).join("");
      errorsEl.classList.remove("admin-hidden");
    }
    document.getElementById("bulkCsv").value = "";
    document.getElementById("bulkFile").value = "";
    await Promise.all([loadBrands(), loadCategories()]);
    await loadProducts();
    document.getElementById("pSort").value = "date_desc"; // surface the just-imported rows
    resetProductsToPageOne();
    document.getElementById("productsListPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "form__status is-error";
  } finally {
    btn.disabled = false;
  }
});

/* ---- Inquiries ---- */
const STATUS_LABELS = { new: "New", contacted: "Contacted", quoted: "Quoted", closed: "Closed" };

async function loadInquiries() {
  const inquiries = await api("/api/admin/inquiries");
  const unread = inquiries.filter((i) => !i.is_read).length;
  document.getElementById("unreadBadge").textContent = unread ? `(${unread})` : "";

  const body = document.getElementById("inquiriesTableBody");
  // Every field below came from a public form, so it is untrusted and must be
  // escaped before it touches innerHTML — otherwise a visitor could put markup
  // (or a <script>) in the message box and have it run here in the admin panel.
  body.innerHTML = inquiries
    .map((i) => {
      const date = new Date(i.created_at).toLocaleString();
      const statusOptions = Object.keys(STATUS_LABELS)
        .map((s) => `<option value="${s}" ${i.status === s ? "selected" : ""}>${STATUS_LABELS[s]}</option>`)
        .join("");
      const contact = [i.email, i.phone, i.company].filter(Boolean).map(escapeHtml).join(" · ");
      return `
        <tr>
          <td><input type="checkbox" class="inquiry-check" data-id="${Number(i.id)}" aria-label="Select inquiry from ${escapeHtml(i.name)}" /></td>
          <td>${escapeHtml(date)}</td>
          <td>
            ${escapeHtml(i.name)}<br>
            <span style="color:var(--steel);font-size:0.8rem;">${contact}</span>
          </td>
          <td>${escapeHtml(i.product_name || i.service_type || "—")}</td>
          <td style="max-width:280px;">${i.message ? escapeHtml(i.message) : "<em>(catalogue request)</em>"}</td>
          <td>${i.email_sent ? '<span class="pill pill--ok">Sent</span>' : '<span class="pill">Not sent</span>'}</td>
          <td><select class="inquiry-status" data-id="${Number(i.id)}">${statusOptions}</select></td>
        </tr>
      `;
    })
    .join("");

  // Re-rendering replaced every row, so the select-all box and the delete
  // button's count both need to fall back to "nothing selected".
  document.getElementById("inquiriesSelectAll").checked = false;
  body.querySelectorAll(".inquiry-check").forEach((box) => {
    box.addEventListener("change", refreshInquirySelection);
  });
  refreshInquirySelection();

  body.querySelectorAll(".inquiry-status").forEach((select) => {
    select.addEventListener("change", async function () {
      await api(`/api/admin/inquiries/${select.dataset.id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: select.value }),
      });
      const unreadNow = await api("/api/admin/inquiries");
      const stillUnread = unreadNow.filter((i) => !i.is_read).length;
      document.getElementById("unreadBadge").textContent = stillUnread ? `(${stillUnread})` : "";
    });
  });
}

function selectedInquiryIds() {
  return Array.from(document.querySelectorAll(".inquiry-check:checked"))
    .map((box) => Number(box.dataset.id));
}

// Keeps the delete button's label/enabled state in step with the checkboxes.
function refreshInquirySelection() {
  const n = selectedInquiryIds().length;
  const btn = document.getElementById("deleteInquiriesBtn");
  btn.disabled = n === 0;
  btn.textContent = n ? `Delete selected (${n})` : "Delete selected";
}

document.getElementById("inquiriesSelectAll").addEventListener("change", function () {
  document.querySelectorAll(".inquiry-check").forEach((box) => { box.checked = this.checked; });
  refreshInquirySelection();
});

document.getElementById("deleteInquiriesBtn").addEventListener("click", async function () {
  const ids = selectedInquiryIds();
  if (!ids.length) return;
  // Deleting an enquiry is permanent and these are real sales leads, so make
  // the count explicit rather than a vague "are you sure?".
  const msg = ids.length === 1
    ? "Delete this enquiry? This cannot be undone."
    : `Delete ${ids.length} enquiries? This cannot be undone.`;
  if (!confirm(msg)) return;

  this.disabled = true;
  try {
    await api("/api/admin/inquiries/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
    await loadInquiries();
  } catch (err) {
    alert(err.message || "Could not delete the selected enquiries.");
    this.disabled = false;
  }
});

/* ---- Page text (site content) ---- */
function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function loadContent() {
  const rows = await api("/api/admin/content");

  // Group rows by their section, preserving the seeded order.
  const groups = [];
  const byName = new Map();
  for (const row of rows) {
    if (!byName.has(row.group_name)) {
      const g = { name: row.group_name, items: [] };
      byName.set(row.group_name, g);
      groups.push(g);
    }
    byName.get(row.group_name).items.push(row);
  }

  const wrap = document.getElementById("contentGroups");
  wrap.innerHTML = groups
    .map((g) => {
      const items = g.items
        .map((row) => {
          const val = row.value == null ? "" : row.value;
          const isEdited = val !== (row.default_value == null ? "" : row.default_value);
          // One row = ~1 line; grow textareas for longer copy.
          const lineCount = Math.max(2, Math.ceil((val.length || row.label.length) / 60) + (val.split("\n").length - 1));
          const rows = Math.min(8, lineCount);
          return `
            <div class="content-item" data-key="${escapeHtml(row.content_key)}">
              <div class="content-item__head">
                <span class="content-item__label">${escapeHtml(row.label)}${isEdited ? ' <span class="content-item__edited">· edited</span>' : ""}</span>
                <button type="button" class="content-item__reset" data-reset="${escapeHtml(row.content_key)}">Reset</button>
              </div>
              <textarea rows="${rows}" data-input="${escapeHtml(row.content_key)}">${escapeHtml(val)}</textarea>
            </div>
          `;
        })
        .join("");
      return `<div class="content-group"><p class="content-group__title">${escapeHtml(g.name)}</p>${items}</div>`;
    })
    .join("");

  wrap.querySelectorAll("[data-reset]").forEach((btn) => {
    btn.addEventListener("click", async function () {
      if (!confirm("Reset this block back to its original text?")) return;
      await api(`/api/admin/content/${encodeURIComponent(btn.dataset.reset)}/reset`, { method: "PUT" });
      await loadContent();
      flashContentStatus("Block reset to default.", "is-ok");
    });
  });
}

function flashContentStatus(text, cls) {
  const el = document.getElementById("contentStatus");
  el.textContent = text;
  el.className = "form__status " + (cls || "");
}

document.getElementById("contentSaveBtn").addEventListener("click", async function () {
  const updates = Array.from(document.querySelectorAll("#contentGroups textarea")).map((ta) => ({
    content_key: ta.dataset.input,
    value: ta.value,
  }));
  const btn = this;
  btn.disabled = true;
  flashContentStatus("Saving…", "");
  try {
    await api("/api/admin/content", { method: "PUT", body: JSON.stringify({ updates }) });
    await loadContent();
    flashContentStatus("Saved. Changes are live on the site.", "is-ok");
  } catch (err) {
    flashContentStatus(err.message, "is-error");
  } finally {
    btn.disabled = false;
  }
});

checkSession();
