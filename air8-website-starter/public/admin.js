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
document.querySelectorAll(".admin-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const isProducts = tab.dataset.tab === "products";
    document.getElementById("productsTab").classList.toggle("admin-hidden", !isProducts);
    document.getElementById("messagesTab").classList.toggle("admin-hidden", isProducts);
  });
});

/* ---- Load everything the dashboard needs ---- */
async function loadEverything() {
  await Promise.all([loadBrands(), loadCategories()]);
  await Promise.all([loadProducts(), loadInquiries()]);
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

/* ---- Products table ---- */
async function loadProducts() {
  const products = await api("/api/admin/products");
  document.getElementById("productCount").textContent = products.length;
  const body = document.getElementById("productsTableBody");
  body.innerHTML = products
    .map((p) => {
      const cats = (p.categories || []).map((c) => `<span class="pill">${c.name}</span>`).join("");
      const status = p.is_published
        ? '<span class="pill pill--ok">Published</span>'
        : '<span class="pill pill--warn">Draft</span>';
      return `
        <tr>
          <td>${p.brand_name}</td>
          <td>${p.name}${p.code ? `<br><span style="color:var(--steel);font-size:0.8rem;">${p.code}</span>` : ""}</td>
          <td>${cats}</td>
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

  body.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => editProduct(products.find((p) => p.id === Number(btn.dataset.edit))));
  });
  body.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => deleteProduct(Number(btn.dataset.delete)));
  });
}

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
    await loadProducts();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "form__status is-error";
  }
});

/* ---- Inquiries ---- */
const STATUS_LABELS = { new: "New", contacted: "Contacted", quoted: "Quoted", closed: "Closed" };

async function loadInquiries() {
  const inquiries = await api("/api/admin/inquiries");
  const unread = inquiries.filter((i) => !i.is_read).length;
  document.getElementById("unreadBadge").textContent = unread ? `(${unread})` : "";

  const body = document.getElementById("inquiriesTableBody");
  body.innerHTML = inquiries
    .map((i) => {
      const date = new Date(i.created_at).toLocaleString();
      const statusOptions = Object.keys(STATUS_LABELS)
        .map((s) => `<option value="${s}" ${i.status === s ? "selected" : ""}>${STATUS_LABELS[s]}</option>`)
        .join("");
      return `
        <tr>
          <td>${date}</td>
          <td>
            ${i.name}<br>
            <span style="color:var(--steel);font-size:0.8rem;">
              ${i.email}${i.phone ? " · " + i.phone : ""}${i.company ? " · " + i.company : ""}
            </span>
          </td>
          <td>${i.product_name || "—"}</td>
          <td style="max-width:280px;">${i.message || "<em>(catalogue request)</em>"}</td>
          <td>${i.email_sent ? '<span class="pill pill--ok">Sent</span>' : '<span class="pill">Not sent</span>'}</td>
          <td><select class="inquiry-status" data-id="${i.id}">${statusOptions}</select></td>
        </tr>
      `;
    })
    .join("");

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

checkSession();
