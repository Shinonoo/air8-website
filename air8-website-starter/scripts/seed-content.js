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
  ["home.hero.eyebrow", "Hero", "Eyebrow (small label above headline)", "Ventilation · Acoustics · Ductwork"],
  ["home.hero.title", "Hero", "Headline (put each line on its own line)", "We move air.\nWe control sound."],
  ["home.hero.lead", "Hero", "Intro paragraph", "Air 8 Industries supplies and services fans, blowers, acoustic systems and ductwork for homes, buildings and industry across the Philippines — with engineering support from enquiry to installation."],
  ["home.hero.cta_primary", "Hero", "Primary button", "Get a free quote"],
  ["home.hero.cta_secondary", "Hero", "Secondary button", "Browse products"],

  // ---- Partners strip ----
  ["home.partners.label", "Partners strip", "Label", "Authorized distributor of"],

  // ---- Stats strip ----
  ["home.stats.item1_value", "Stats strip", "Stat 1 — number", "3"],
  ["home.stats.item1_label", "Stats strip", "Stat 1 — label", "International brand partners"],
  ["home.stats.item2_value", "Stats strip", "Stat 2 — number", "160+"],
  ["home.stats.item2_label", "Stats strip", "Stat 2 — label", "Products ready to quote"],
  ["home.stats.item3_value", "Stats strip", "Stat 3 — number", "PH-wide"],
  ["home.stats.item3_label", "Stats strip", "Stat 3 — label", "Delivery & project support"],

  // ---- Services ----
  ["home.services.eyebrow", "Services", "Eyebrow", "Services"],
  ["home.services.title", "Services", "Heading", "Supply, install, maintain — one team."],
  ["home.services.lead", "Services", "Intro paragraph", "From a single exhaust fan to a full building package, we handle the equipment and the work around it."],
  ["home.services.card1_title", "Services", "Card 1 — title", "Equipment supply & installation"],
  ["home.services.card1_body", "Services", "Card 1 — text", "The right fan, silencer or duct system for your space — supplied from three international brands and installed to specification."],
  ["home.services.card1_cta", "Services", "Card 1 — link text", "Request installation"],
  ["home.services.card2_title", "Services", "Card 2 — title", "Repair & maintenance"],
  ["home.services.card2_body", "Services", "Card 2 — text", "Keep ventilation and noise control performing: inspection, parts replacement and preventive maintenance programs for buildings and plants."],
  ["home.services.card2_cta", "Services", "Card 2 — link text", "Book maintenance"],
  ["home.services.card3_title", "Services", "Card 3 — title", "Quotation & equipment selection"],
  ["home.services.card3_body", "Services", "Card 3 — text", "Not sure what you need? Send your requirements or plans and our engineers will size and quote the right equipment — free of charge."],
  ["home.services.card3_cta", "Services", "Card 3 — link text", "Get a free quote"],

  // ---- Who we serve ----
  ["home.audience.eyebrow", "Who we serve", "Eyebrow", "Who we serve"],
  ["home.audience.title", "Who we serve", "Heading", "Tell us who you are — we'll point you the right way."],
  ["home.audience.card1_title", "Who we serve", "Card 1 — title", "Homeowners"],
  ["home.audience.card1_body", "Who we serve", "Card 1 — text", "Quiet, efficient ventilation for kitchens, bathrooms and living spaces — with help choosing the right size."],
  ["home.audience.card1_cta", "Who we serve", "Card 1 — link text", "Browse residential fans"],
  ["home.audience.card2_title", "Who we serve", "Card 2 — title", "Property managers"],
  ["home.audience.card2_body", "Who we serve", "Card 2 — text", "Replacements and maintenance programs for buildings, car parks and common areas — keep tenants comfortable and compliant."],
  ["home.audience.card2_cta", "Who we serve", "Card 2 — link text", "Book maintenance"],
  ["home.audience.card3_title", "Who we serve", "Card 3 — title", "Commercial & industrial"],
  ["home.audience.card3_body", "Who we serve", "Card 3 — text", "Engineered airflow, smoke management and acoustic packages for projects of any scale, specified with our brand partners."],
  ["home.audience.card3_cta", "Who we serve", "Card 3 — link text", "Discuss your project"],

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

  // ---- How it works ----
  ["home.process.eyebrow", "How it works", "Eyebrow", "How it works"],
  ["home.process.title", "How it works", "Heading", "From enquiry to installed equipment in three steps."],
  ["home.process.step1_title", "How it works", "Step 1 — title", "Tell us what you need"],
  ["home.process.step1_body", "How it works", "Step 1 — text", "Send the quote form, call, or email — a product name, a problem to solve, or full project plans all work."],
  ["home.process.step2_title", "How it works", "Step 2 — title", "We size & quote"],
  ["home.process.step2_body", "How it works", "Step 2 — text", "Our team reviews your requirement, selects the right equipment from our brands, and sends you a formal quotation."],
  ["home.process.step3_title", "How it works", "Step 3 — title", "Delivery & aftercare"],
  ["home.process.step3_body", "How it works", "Step 3 — text", "We deliver, support installation, and stay available for maintenance and parts long after handover."],
  ["home.process.cta", "How it works", "Button", "Start your quote"],

  // ---- FAQ ----
  ["home.faq.eyebrow", "FAQ", "Eyebrow", "FAQ"],
  ["home.faq.title", "FAQ", "Heading", "Common questions, answered."],
  ["home.faq.q1", "FAQ", "Question 1", "Do you work with homeowners, or only companies?"],
  ["home.faq.a1", "FAQ", "Answer 1", "Both. We supply single residential fans just as happily as full commercial packages — and we'll help you pick the right size either way."],
  ["home.faq.q2", "FAQ", "Question 2", "How do I get a quotation?"],
  ["home.faq.a2", "FAQ", "Answer 2", "Send the form below with what you need (a product name, a problem, or project plans). Our team reviews it and replies with a formal quotation."],
  ["home.faq.q3", "FAQ", "Question 3", "Do you install the equipment you supply?"],
  ["home.faq.a3", "FAQ", "Answer 3", "Yes — choose supply-and-install or supply-only. We also service and maintain equipment we've delivered."],
  ["home.faq.q4", "FAQ", "Question 4", "Which areas do you serve?"],
  ["home.faq.a4", "FAQ", "Answer 4", "We're based in Parañaque, Metro Manila, and deliver and support projects nationwide."],
  ["home.faq.q5", "FAQ", "Question 5", "Which brands do you carry?"],
  ["home.faq.a5", "FAQ", "Answer 5", "We're the authorized distributor of Elta Fans (Malaysia) for fans & blowers, Abie Tiger (Thailand) for acoustic solutions, and Starduct (Vietnam) for ductwork & MEP accessories."],

  // ---- Contact ----
  ["home.contact.eyebrow", "Contact", "Eyebrow", "Get a quote"],
  ["home.contact.title", "Contact", "Heading", "Request a free quotation."],
  ["home.contact.intro", "Contact", "Intro paragraph", "Tell us what you need — our team reviews every enquiry and gets back to you with pricing, availability and honest advice."],
  ["home.contact.address", "Contact", "Address", "8A Block-4 Lot-4C Filipinas Ave., UPS5 Sucat, Paranaque, Metro Manila"],
  ["home.contact.phone", "Contact", "Phone", "(028) 828-2496 · (028) 782-6117"],

  // ---- Footer ----
  ["home.footer.tag", "Footer", "Tagline", "Ventilation, acoustic & ductwork solutions."],

  // ---- Products page (the catalog page's hero) ----
  ["products.hero.eyebrow", "Products page", "Eyebrow", "Products"],
  ["products.hero.title", "Products page", "Heading", "Fans, blowers, acoustic & ductwork systems"],
  ["products.hero.lead", "Products page", "Intro paragraph", "Everything we supply from Elta Fans, Abie Tiger and Starduct. Filter by type or search, then download the brochure for full specifications."],
];

async function main() {
  let n = 0;
  for (const [key, group, label, def] of CONTENT) {
    // The `value = IF(...)` line must run BEFORE default_value is reassigned
    // (MySQL evaluates update assignments left to right): if the admin never
    // edited the block (value still equals the OLD default), the value follows
    // the new default; if they did edit it, their text is preserved.
    await pool.query(
      `INSERT INTO site_content (content_key, group_name, label, value, default_value, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         value = IF(value <=> default_value, VALUES(default_value), value),
         default_value = VALUES(default_value),
         group_name = VALUES(group_name),
         label = VALUES(label),
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
