// Shared by the migration script and the admin API so brand/category/product
// slugs are generated the same way everywhere.
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

module.exports = slugify;
