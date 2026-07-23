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
  // Roof fans, grilles and unit heaters — these had no brochure at all.
  59: "Rapid-Response.pdf",
  60: "Rapid-Response.pdf",
  63: "Silent-Response.pdf",
  64: "Silent-Response.pdf",
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

async function fixBrochurePaths() {
  let changed = 0;
  for (const [id, file] of Object.entries(BROCHURES)) {
    const path = `brochures/elta_fans/${file}`;
    // The "AND brochure_url <=> ?" guard makes this a no-op once applied,
    // so steady-state deploys do 49 cheap no-op updates and nothing more.
    const [res] = await pool.query(
      "UPDATE products SET brochure_url = ? WHERE id = ? AND NOT (brochure_url <=> ?)",
      [path, Number(id), path]
    );
    changed += res.affectedRows;
  }
  return changed;
}

module.exports = { fixBrochurePaths };

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
