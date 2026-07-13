/* ============================================================
   Air 8 Industries — scripts/seed-content.js
   ------------------------------------------------------------
   Seeds the `site_content` table with every editable text block
   on the marketing pages. Each entry's key matches a
   data-content-key attribute in the HTML.

   Safe to re-run: labels/groups/defaults are refreshed, but a
   row's `value` (the admin's edit) is never overwritten, so
   re-seeding after adding new blocks won't wipe existing edits.

   Usage:
     node scripts/seed-content.js
   ============================================================ */

require("dotenv").config();
const pool = require("./../db");

// key, group, label, default (the current copy shown on the site).
// `default` doubles as both the seeded starting value and the
// "reset to default" target. Groups/order drive the admin UI layout.
const CONTENT = [
  // ---- Hero ----
  ["home.hero.eyebrow", "Hero", "Eyebrow (small label above headline)", "Ventilation & Acoustic Solutions"],
  ["home.hero.title", "Hero", "Headline (put each line on its own line)", "We move air.\nWe control sound."],
  ["home.hero.lead", "Hero", "Intro paragraph", "Air 8 Industries Inc. supplies reliable, energy-efficient fans, blowers and acoustic systems for industrial, commercial and residential spaces across the Philippines."],
  ["home.hero.cta_primary", "Hero", "Primary button", "Explore products"],
  ["home.hero.cta_secondary", "Hero", "Secondary button", "Talk to us"],

  // ---- Partners strip ----
  ["home.partners.label", "Partners strip", "Label", "Authorized distributor of"],

  // ---- About ----
  ["home.about.eyebrow", "About", "Eyebrow", "About us"],
  ["home.about.title", "About", "Heading", "A dependable partner for air, sound and ductwork."],
  ["home.about.body1", "About", "Paragraph 1", "We specialize in three connected worlds: air movement through our partnership with Elta Fans, noise & vibration control through Abie Tiger, and ductwork & MEP accessories through Starduct. Our mission is simple — deliver high-quality products that meet the exact needs of each client, backed by real technical support."],
  ["home.about.body2", "About", "Paragraph 2", "From a single exhaust fan to a full building enclosure, we help you get the right solution the first time."],

  // ---- Capabilities ----
  ["home.capabilities.eyebrow", "What we do", "Eyebrow", "What we do"],
  ["home.capabilities.title", "What we do", "Heading", "Three problems. One supplier."],
  ["home.capabilities.card1_title", "What we do", "Card 1 — title", "Air movement & ventilation"],
  ["home.capabilities.card1_body", "What we do", "Card 1 — text", "Axial, centrifugal, roof, in-line and hazardous-area fans — plus blowers, controls and accessories for optimal airflow in any environment."],
  ["home.capabilities.card2_title", "What we do", "Card 2 — title", "Noise & vibration control"],
  ["home.capabilities.card2_body", "What we do", "Card 2 — text", "Silencers, acoustic louvers, sound-lock doors, barriers, enclosures and a full range of vibration isolators for noise-sensitive locations."],
  ["home.capabilities.card3_title", "What we do", "Card 3 — title", "Ductwork & MEP accessories"],
  ["home.capabilities.card3_body", "What we do", "Card 3 — text", "Spiral and rectangular ductwork, diffusers, dampers, VAV boxes and cable trays manufactured to AMCA, ASHRAE, UL and ISO standards."],

  // ---- Products section ----
  ["home.products.eyebrow", "Products section", "Eyebrow", "Products"],
  ["home.products.title", "Products section", "Heading", "What we supply"],
  ["home.products.cta", "Products section", "Button", "View full catalog & brochures"],

  // ---- Values ----
  ["home.values.eyebrow", "Why Air 8", "Eyebrow", "Why Air 8"],
  ["home.values.title", "Why Air 8", "Heading", "Built on how we work."],
  ["home.values.item1_label", "Why Air 8", "Value 1 — label", "Quality"],
  ["home.values.item1_body", "Why Air 8", "Value 1 — text", "Durability, performance and efficiency in every product."],
  ["home.values.item2_label", "Why Air 8", "Value 2 — label", "Commitment"],
  ["home.values.item2_body", "Why Air 8", "Value 2 — text", "Dependable solutions delivered on time."],
  ["home.values.item3_label", "Why Air 8", "Value 3 — label", "Honesty"],
  ["home.values.item3_body", "Why Air 8", "Value 3 — text", "Transparency and integrity in every dealing."],
  ["home.values.item4_label", "Why Air 8", "Value 4 — label", "Dedication"],
  ["home.values.item4_body", "Why Air 8", "Value 4 — text", "Going beyond to meet each client's needs."],

  // ---- Contact ----
  ["home.contact.eyebrow", "Contact", "Eyebrow", "Contact"],
  ["home.contact.title", "Contact", "Heading", "Tell us what you need."],
  ["home.contact.intro", "Contact", "Intro paragraph", "For details about services, pricing or availability, send us a message and our team will get back to you."],
  ["home.contact.address", "Contact", "Address", "8A Block-4 Lot-4C Filipinas Ave., UPS5 Sucat, Paranaque, Metro Manila"],
  ["home.contact.phone", "Contact", "Phone", "(028) 828-2496 · (028) 782-6117"],

  // ---- Footer ----
  ["home.footer.tag", "Footer", "Tagline", "Ventilation & acoustic solutions."],

  // ---- Products page (the catalog page's hero) ----
  ["products.hero.eyebrow", "Products page", "Eyebrow", "Products"],
  ["products.hero.title", "Products page", "Heading", "Fans, blowers, acoustic & ductwork systems"],
  ["products.hero.lead", "Products page", "Intro paragraph", "Everything we supply from Elta Fans, Abie Tiger and Starduct. Filter by type or search, then download the brochure for full specifications."],
];

async function main() {
  let n = 0;
  for (const [key, group, label, def] of CONTENT) {
    await pool.query(
      `INSERT INTO site_content (content_key, group_name, label, value, default_value, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         group_name = VALUES(group_name),
         label = VALUES(label),
         default_value = VALUES(default_value),
         sort_order = VALUES(sort_order)`,
      [key, group, label, def, def, n]
    );
    n++;
  }
  console.log(`Seeded ${n} content blocks into site_content.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Content seed failed:", err);
  process.exit(1);
});
