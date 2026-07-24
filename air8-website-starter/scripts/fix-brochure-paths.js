/* ============================================================
   Air 8 Industries — scripts/fix-brochure-paths.js
   ------------------------------------------------------------
   One-time data repair, run automatically at server startup.

   WHY THIS EXISTS:
   The catalog was originally seeded with invented brochure
   filenames ("elta-cased-axial.pdf", "elta-heat-recovery.pdf"...)
   that never existed in the repo — thirteen different fans all
   pointed at the same made-up file. Every brochure download was
   therefore dead. The real datasheets have since been added under
   public/brochures/elta_fans/, so this maps each product id to the
   file that actually belongs to it.

   It runs on boot rather than as a manual script because the only
   place with credentials for the production database is the app
   itself — there is no other reliable way to apply it.

   SAFETY:
   - Idempotent: writing the same value twice changes nothing, so
     re-running on every deploy is harmless.
   - Only touches brochure_url, and only for these listed ids.
   - Never widens: a row is skipped once it already holds the
     correct path, so the query does nothing on later boots.
   ============================================================ */

const pool = require("./../db");

// product id -> the brochure that genuinely belongs to that product.
// Two products may legitimately share one file where the manufacturer
// publishes a single datasheet for the pair (e.g. the LED and non-LED
// grille variants, or Powerline Ultra and its AMCA-certified twin).
const BROCHURES = {
  1: "adjustable_pitch_axial_flow.pdf",       // AP Series (Elta's AP = adjustable pitch)
  2: "flexline_direct_drive.pdf",
  3: "ftdb.pdf",
  4: "ftdf.pdf",
  5: "ftp.pdf",
  6: "ftsb.pdf",
  7: "ftsf.pdf",
  8: "adjustable_pitch_axial_flow.pdf",
  9: "Revolution_SLC_EC.pdf",
  10: "hca.pdf",
  11: "short_case_axial.pdf",
  12: "short_case_axial_ec.pdf",
  13: "compact_flameproof_miniduct.pdf",
  14: "imf_e.pdf",
  15: "powerline_ultra_pud.pdf",
  16: "powerline_ultra.pdf",
  17: "powerline_ultra_amca.pdf",
  18: "minitube.pdf",
  19: "powerline.pdf",
  20: "powerline_ec.pdf",
  21: "powerline_pcd.pdf",
  22: "hit.pdf",
  23: "jisu.pdf",
  24: "jfu.pdf",
  25: "heritage_smoke_spill.pdf",
  26: "smoke_spill_ss.pdf",
  27: "high_capacity_hc.pdf",
  28: "compact_flameproof_square_plate.pdf",
  29: "sq.pdf",
  30: "compact_cooler.pdf",
  31: "hvls_x_range.pdf",
  32: "washdown_fan_heavy_duty.pdf",
  33: "washdown_fan_single_phase.pdf",
  34: "washdown_fan_three_phase.pdf",
  35: "zoo.pdf",
  36: "ec_controller_0_10v.pdf",
  // Accessories. Elta publishes these as three combined catalogues rather
  // than per-part datasheets, so many products legitimately share a file —
  // each code was verified to actually appear in the PDF it points at.
  37: "Ancillary-Equipment.pdf",   // ABD - Butterfly Shutters
  38: "Ancillary-Equipment.pdf",   // CBD - Backdraft Shutters
  39: "Ancillary-Equipment.pdf",   // DG - Finger Guards
  40: "louvres_and_grilles.pdf",   // EAGM - External Aluminium Grille
  41: "louvres_and_grilles.pdf",   // EMGB-HPA - External Backdraft Shutter
  42: "louvres_and_grilles.pdf",   // EPGB - External Backdraft Shutter
  43: "louvres_and_grilles.pdf",   // EPGM - External Plastic Grille
  44: "louvres_and_grilles.pdf",   // ESSHV - External Stainless Steel Grille
  45: "Ancillary-Equipment.pdf",   // F/CFT - Axial Fan Mounting Feet
  46: "Ancillary-Equipment.pdf",   // FC - Fast Clamps
  47: "Ancillary-Equipment.pdf",   // FG - Finger Guards
  48: "Ancillary-Equipment.pdf",   // FGR - Filter Unit
  49: "ducting.pdf",               // Flatpack Low Profile Duct System
  50: "ducting.pdf",               // Flexible Duct
  51: "Ancillary-Equipment.pdf",   // FLX - Flexline Matching Flanges
  52: "Ancillary-Equipment.pdf",   // FT - In-Line Mounting Feet
  53: "Ancillary-Equipment.pdf",   // IC/CIC - Inlet Cones For Axial Fans
  54: "louvres_and_grilles.pdf",   // IPDV - Internal Plastic Duct Valve
  55: "louvres_and_grilles.pdf",   // ISDV - Internal Steel Duct Valve
  56: "Ancillary-Equipment.pdf",   // MF/CMF - Axial Fan Matching Flanges
  57: "Ancillary-Equipment.pdf",   // MRJ - Inlet Guard
  58: "Ancillary-Equipment.pdf",   // POW - Powerline/Multiflow Matching Flanges
  61: "louvres_and_grilles.pdf",   // RCG - Internal Ceiling Grilles
  62: "Ancillary-Equipment.pdf",   // RG - Rubber Gasket
  65: "Ancillary-Equipment.pdf",   // SJK / RSK - Backdraft Dampers
  66: "louvres_and_grilles.pdf",   // WKG - Window Kit
  67: "louvres_and_grilles.pdf",   // WKS - Window Kit Shutter
  68: "ducting.pdf",               // WT - Wall Tubes
  // Roof fans, grilles and unit heaters — these had no brochure at all.
  59: "Rapid-Response.pdf",
  60: "Rapid-Response.pdf",
  63: "Silent-Response.pdf",
  64: "Silent-Response.pdf",
  // Roof-mounted units (Elta's EFAP range), one datasheet each.
  69: "alpha_beta.pdf",
  70: "alpha_relief_air_vent_bfc.pdf",
  71: "beta_vertical_discharge_cowl.pdf",
  72: "gamma_ec_supply.pdf",
  73: "gl_gamma.pdf",
  74: "heritage.pdf",
  75: "new_generation.pdf",
  76: "alpha_beta_industrial.pdf",
  77: "alpha_supply.pdf",
  78: "flanged_vertical_discharge_cowls.pdf",
  79: "gamma_supply.pdf",
  80: "gl_gamma_bfc.pdf",
  // Elta serves the same file from both Alpha Relief Air Vent pages (the
  // plain and BFC variants), so both ids point at the one datasheet.
  81: "alpha_relief_air_vent_bfc.pdf",
  82: "gamma.pdf",
  83: "gamma_ec.pdf",
  84: "ge.pdf",
  85: "gl_gamma_ec.pdf",
  86: "minivent.pdf",
  87: "new_generation_bfc.pdf",
  88: "compact_2000.pdf",
  89: "compact_2000_ec.pdf",
  90: "hpa.pdf",
  91: "ring_plate.pdf",
  100: "Rapid-Response.pdf",
  101: "Silent-Response.pdf",
  92: "QA.pdf",
  93: "QAX.pdf",
  94: "QB.pdf",
  95: "QD.pdf",
  96: "QIN.pdf",
  97: "QS.pdf",
  98: "Quasar.pdf",
  99: "QX.pdf",
  102: "URF100.pdf",
};

// product id -> the photo that belongs to it. These were pointing at
// filenames that never existed: "elta-ap-series.jpg" came straight from
// the starter template's README example, and two others were near-misses
// for real files (plural vs singular, .png vs .webp). Elta serves one
// photo for both the DG and FG finger guards, so those legitimately share.
const IMAGES = {
  1: "adjustable_pitch_axial_flow.webp", // was elta-ap-series.jpg (template placeholder)
  39: "finger_guard.png",                // was finger_guards.png
  51: "flexline_matching_flange.webp",   // was flexline_matching_flanges.png
  68: "wall_tubes.png",                  // had no image at all
};

// Same idea for Abie Tiger. Only the DS duct silencer can be fixed from
// what we already hold: it is the same product family as the LF/LMF/MF
// silencers that share this photo. The other five Abie products are still
// waiting on real photos from the supplier — deliberately NOT filled with
// a lookalike from a different product, which would misrepresent what we
// supply. Until those arrive the card falls back to a clean labelled
// tile, so nothing renders as broken.
const IMAGES_ABIE = {
  123: "duct_silencer.webp", // was ds_duct_silencer.png, which never existed
};

// The seven Starduct line-level entries (ids 146-152) never had a photo
// at all. Unlike Abie's gaps, this isn't a lookalike standing in for a
// missing part — each one is a genuine Starduct photo of a product that
// actually sits inside that exact line, already shipped for the 61-item
// range these cards summarize (see scripts/starduct-products.js).
const IMAGES_STARDUCT = {
  146: "s_eid_ei_120.webp",  // Spiral & Rectangular Ductwork — EI120 rigid duct
  147: "skd600.webp",        // Diffusers & Air Outlets — square ceiling diffuser
  148: "s_mfsd_l210.webp",   // Fire & Smoke Dampers — motorised fire damper
  149: "svcd_hq.webp",       // Volume Control Dampers (VCD)
  150: "svav_s.webp",        // VAV Boxes — single duct VAV
  151: "s_rc1.webp",         // Duct Silencers — round silencer
  152: "slc.webp",           // Cable Trays & Duct Supports — cable tray
};

// Starduct's seven entries are whole product lines rather than single
// parts, so each points at the catalogue for that line. Diffusers and
// volume control dampers have no standalone catalogue, so they use the
// general one — its product diagram covers both explicitly.
const BROCHURES_STARDUCT = {
  146: "ductwork_system.pdf",           // Spiral & Rectangular Ductwork
  147: "starduct_series_products.pdf",  // Diffusers & Air Outlets
  148: "fire_dampers.pdf",              // Fire & Smoke Dampers
  149: "starduct_series_products.pdf",  // Volume Control Dampers (VCD)
  150: "vav_box.pdf",                   // VAV Boxes
  151: "duct_silencers.pdf",            // Duct Silencers
  152: "cable_tray.pdf",                // Cable Trays & Duct Supports
};

// One idempotent UPDATE per row. The "AND NOT (col <=> ?)" guard is a
// null-safe comparison, so a row stops matching once it already holds the
// right value — steady-state deploys do cheap no-op updates and nothing more.
async function applyMap(column, map, prefix) {
  let changed = 0;
  for (const [id, file] of Object.entries(map)) {
    const value = `${prefix}${file}`;
    const [res] = await pool.query(
      `UPDATE products SET ${column} = ? WHERE id = ? AND NOT (${column} <=> ?)`,
      [value, Number(id), value]
    );
    changed += res.affectedRows;
  }
  return changed;
}

async function fixBrochurePaths() {
  const brochures = await applyMap("brochure_url", BROCHURES, "brochures/elta_fans/");
  const images = await applyMap("primary_image_url", IMAGES, "images/elta_fans/");
  const abie = await applyMap("primary_image_url", IMAGES_ABIE, "images/abie_tiger/");
  const starductBrochures = await applyMap("brochure_url", BROCHURES_STARDUCT, "brochures/starduct/");
  const starductImages = await applyMap("primary_image_url", IMAGES_STARDUCT, "images/starduct/");
  return brochures + images + abie + starductBrochures + starductImages;
}

// The maps are exported so a test can assert every mapped file actually
// exists on disk — a typo here is otherwise invisible until a customer
// clicks Download and gets a 404.
module.exports = {
  fixBrochurePaths,
  BROCHURES,
  IMAGES,
  IMAGES_ABIE,
  BROCHURES_STARDUCT,
  IMAGES_STARDUCT,
};

// Allow running it directly too: `node scripts/fix-brochure-paths.js`
if (require.main === module) {
  fixBrochurePaths()
    .then((n) => {
      console.log(`Brochure paths repaired: ${n} product(s) updated.`);
      return pool.end();
    })
    .catch((err) => {
      console.error("Brochure path repair failed:", err.message);
      process.exit(1);
    });
}
