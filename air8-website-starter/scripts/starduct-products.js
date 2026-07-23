/* ============================================================
   Air 8 Industries — scripts/starduct-products.js
   ------------------------------------------------------------
   The Starduct catalogue, as individual products.

   Starduct was originally represented by seven placeholder rows —
   one per product line ("Diffusers & Air Outlets", "VAV Boxes"...)
   — which told a customer nothing about what we can actually
   quote. This file replaces that with the real range.

   Every field here comes from Starduct's own product records on
   starduct.vn: names, model codes, materials, free areas and fire
   ratings are theirs, not ours. Nothing is estimated. Where their
   record carried no description, the blurb states only what the
   product is and what it is made of.

   Brochures point at the line catalogue for that range. Starduct
   does publish a per-product datasheet, but for most of these it
   IS the line catalogue (byte-identical), and shipping all of them
   would add ~155MB to the repo for almost no gain.

   Images are Starduct's own product photos, resized to 900px and
   converted to webp (94MB of print-resolution PNGs -> 1.6MB).
   ============================================================ */

// Brochure per line — see BROCHURES_STARDUCT in fix-brochure-paths.js
// for the same mapping applied to the original seven rows.
const CATALOGUE = {
  Ductwork: "ductwork_system.pdf",
  "Diffusers & Air Outlets": "starduct_series_products.pdf",
  "Fire & Smoke Dampers": "fire_dampers.pdf",
  "Volume Control Dampers": "starduct_series_products.pdf",
  "VAV Boxes": "vav_box.pdf",
  "Duct Silencers": "duct_silencers.pdf",
  "Cable Trays & Supports": "cable_tray.pdf",
};

// image = basename in public/images/starduct/, code = Starduct's model code.
const PRODUCTS = [
  // ---------------- Ductwork ----------------
  {
    name: "EI120 Fire-Rated Ductwork",
    code: "S-EID",
    category: "Ductwork",
    image: "s_eid_ei_120.webp",
    blurb:
      "Fire-rated ductwork certified to EI120 — two hours of both integrity and insulation — built from galvanised steel sheet faced with magnesium oxide board. Used where ductwork crosses a fire compartment and has to keep working during a fire.",
    specs: [
      { label: "fire rating", value: "EI 120 (2 hours)" },
      { label: "duct body", value: "Z18 galvanised steel, 0.95mm" },
      { label: "insulation", value: "MgSO4 board, 950 kg/m³" },
    ],
  },
  {
    name: "Flexible Duct — Uninsulated",
    code: "STF",
    category: "Ductwork",
    image: "stf_d100_d600.webp",
    blurb:
      "Aluminium foil flexible duct for short connections between rigid ductwork and air outlets, where a run has to bend around structure or services.",
    specs: [
      { label: "material", value: "Aluminium foil" },
      { label: "diameter", value: "D100 – D600" },
    ],
  },
  {
    name: "Flexible Duct — PVC Covered",
    code: "STC",
    category: "Ductwork",
    image: "stc_d100_d450.webp",
    blurb:
      "Aluminium foil flexible duct with a PVC outer cover, giving a tougher, wipe-clean surface for exposed or higher-traffic locations.",
    specs: [
      { label: "material", value: "Aluminium foil + PVC" },
      { label: "diameter", value: "D100 – D450" },
    ],
  },
  {
    name: "Insulated Flexible Duct",
    code: "STI",
    category: "Ductwork",
    image: "sti_d100_d600.webp",
    blurb:
      "Flexible duct wrapped in fibreglass insulation to limit heat gain and surface condensation on conditioned air runs.",
    specs: [
      { label: "material", value: "Aluminium foil + fibreglass" },
      { label: "insulation density", value: "24 kg/m³" },
      { label: "diameter", value: "D100 – D600" },
    ],
  },
  {
    name: "Flexible Connector",
    code: "RO",
    category: "Ductwork",
    image: "ro.webp",
    blurb:
      "PVC and rubber flexible connector fitted between fan and ductwork so vibration and noise are not carried into the duct run.",
    specs: [{ label: "material", value: "PVC + rubber layer" }],
  },
  {
    name: "Flexible Connector — Fire Resistant",
    code: "SI",
    category: "Ductwork",
    image: "si.webp",
    blurb:
      "Silicone-coated fibreglass flexible connector for the same duty as the standard connector, where the connection has to resist high temperature.",
    specs: [{ label: "material", value: "Fibreglass + silicone" }],
  },

  // ---------------- Diffusers & Air Outlets ----------------
  {
    name: "Square Ceiling Diffuser",
    code: "SKD",
    category: "Diffusers & Air Outlets",
    image: "skd600.webp",
    blurb:
      "The industry-standard supply diffuser, delivering large air volumes in a stable horizontal pattern close to the ceiling without draught. Drops into a T-bar grid without altering the ceiling, or mounts to a flat surface.",
    specs: [
      { label: "frame", value: "Extruded aluminium A6063-T5" },
      { label: "blades", value: "2 – 6 cores, 1.0mm aluminium" },
      { label: "finish", value: "Powder coated RAL 9010" },
    ],
  },
  {
    name: "Round Cone Diffuser — 1 Cone",
    code: "SRD1",
    category: "Diffusers & Air Outlets",
    image: "srd1.webp",
    blurb:
      "Single-cone round ceiling diffuser in powder-coated aluminium, for horizontal supply air distribution from circular ductwork.",
    specs: [
      { label: "material", value: "Aluminium, powder coated RAL 9010" },
      { label: "neck sizes", value: "D300 – D600" },
      { label: "free area", value: "> 50%" },
    ],
  },
  {
    name: "Round Cone Diffuser — 2 Cone",
    code: "SRD2",
    category: "Diffusers & Air Outlets",
    image: "srd2.webp",
    blurb:
      "Two-cone round ceiling diffuser, giving a tighter discharge pattern than the single-cone version for the same neck size.",
    specs: [
      { label: "material", value: "Aluminium, powder coated RAL 9010" },
      { label: "neck sizes", value: "D300 – D600" },
      { label: "free area", value: "> 50%" },
    ],
  },
  {
    name: "Round Cone Diffuser — 4 Cone",
    code: "SRD4",
    category: "Diffusers & Air Outlets",
    image: "srd4.webp",
    blurb:
      "Four-cone round ceiling diffuser for higher throw, typically where ceilings are high or the diffuser has to reach further into the space.",
    specs: [
      { label: "material", value: "Aluminium, powder coated RAL 9010" },
      { label: "neck sizes", value: "D300 – D600" },
      { label: "free area", value: "> 50%" },
    ],
  },
  {
    name: "Round Diffuser — Louver Face",
    code: "FK004",
    category: "Diffusers & Air Outlets",
    image: "fk004_d600_d450_d300.webp",
    blurb:
      "Round louver-face diffuser with 2–6 cones joined by an aluminium skeleton that lifts out, so the damper and the ductwork behind it stay reachable after installation.",
    specs: [
      { label: "frame", value: "Aluminium A6063-T5, 1.2mm" },
      { label: "blades", value: "1.0mm aluminium sheet" },
      { label: "sizes", value: "D300 / D450 / D600" },
    ],
  },
  {
    name: "Ring Diffuser",
    code: "STR",
    category: "Diffusers & Air Outlets",
    image: "str.webp",
    blurb:
      "Compact ring-pattern ceiling diffuser in powder-coated aluminium, for smaller supply air volumes.",
    specs: [
      { label: "material", value: "Aluminium, powder coated RAL 9010" },
      { label: "sizes", value: "D200 – D400" },
    ],
  },
  {
    name: "Disc Valve Diffuser",
    code: "STD",
    category: "Diffusers & Air Outlets",
    image: "std.webp",
    blurb:
      "Adjustable disc valve for supply or extract on small ducts. The extended neck forms an integral plenum sized to take flexible duct directly.",
    specs: [{ label: "material", value: "Aluminium, powder coated RAL 9010" }],
  },
  {
    name: "ABS Valve Diffuser",
    code: "SSD",
    category: "Diffusers & Air Outlets",
    image: "ssd.webp",
    blurb:
      "Moulded ABS plastic disc valve — the same duty as the aluminium valve, in a lighter corrosion-free body suited to wet areas.",
    specs: [{ label: "material", value: "ABS plastic, white RAL 9010" }],
  },
  {
    name: "Swirl Diffuser",
    code: "FK025",
    category: "Diffusers & Air Outlets",
    image: "fk025_d200_d630.webp",
    blurb:
      "Swirl diffuser whose adjustable blades let the discharge pattern be changed on site, so one outlet can be tuned between horizontal and more vertical throw.",
    specs: [
      { label: "frame", value: "Aluminium A6063-T5, 1.2mm" },
      { label: "blades", value: "1.0mm aluminium, adjustable" },
      { label: "sizes", value: "D200 – D630" },
    ],
  },
  {
    name: "Slot Diffuser",
    code: "SLD",
    category: "Diffusers & Air Outlets",
    image: "sld.webp",
    blurb:
      "Linear slot diffuser in powder-coated aluminium, for continuous runs along a ceiling line where a discreet outlet is wanted.",
    specs: [{ label: "material", value: "Aluminium, powder coated" }],
  },
  {
    name: "Curved Slot Diffuser",
    code: "SLD-R",
    category: "Diffusers & Air Outlets",
    image: "sld_r.webp",
    blurb:
      "Slot diffuser formed to a radius, for curved ceiling lines and bulkheads where a straight run would not follow the architecture.",
    specs: [{ label: "material", value: "Extruded aluminium A6063-T5" }],
  },
  {
    name: "Linear Bar Grille",
    code: "SCLB",
    category: "Diffusers & Air Outlets",
    image: "sclb_sclb_o.webp",
    blurb:
      "Extruded aluminium linear bar grille with adjustable parallel blades, available fixed or with a removable core for access. Roughly 80% free area.",
    specs: [
      { label: "material", value: "Extruded aluminium A6063-T5" },
      { label: "free area", value: "~80%" },
      { label: "core", value: "Fixed (SCLB) or openable (SCLB-O)" },
    ],
  },
  {
    name: "Single-Layer Deflection Grille",
    code: "SAG",
    category: "Diffusers & Air Outlets",
    image: "sag_sag_o.webp",
    blurb:
      "Single-layer grille with adjustable aerofoil blades for setting discharge direction in one plane. Supplied fixed or with a removable core.",
    specs: [
      { label: "material", value: "Extruded aluminium A6063-T5" },
      { label: "free area", value: "~80%" },
      { label: "core", value: "Fixed (SAG) or openable (SAG-O)" },
    ],
  },
  {
    name: "Double-Layer Deflection Grille",
    code: "DAG",
    category: "Diffusers & Air Outlets",
    image: "dag_dag_o.webp",
    blurb:
      "Two layers of adjustable blades, so the air pattern can be set both horizontally and vertically — the usual choice for sidewall supply.",
    specs: [
      { label: "material", value: "Extruded aluminium A6063-T5" },
      { label: "free area", value: "~80%" },
      { label: "core", value: "Fixed (DAG) or openable (DAG-O)" },
    ],
  },
  {
    name: "Egg Crate Grille",
    code: "SECG",
    category: "Diffusers & Air Outlets",
    image: "secg_secg_0_45deg.webp",
    blurb:
      "Open egg crate grille for return and transfer air, where free area matters more than directional control. Around 88% free area.",
    specs: [
      { label: "frame", value: "Extruded aluminium A6063-T5" },
      { label: "core", value: "0.35mm aluminium grid" },
      { label: "free area", value: "~88%" },
    ],
  },
  {
    name: "Perforated Face Diffuser",
    code: "SPG",
    category: "Diffusers & Air Outlets",
    image: "spg_spg_o.webp",
    blurb:
      "Perforated plate diffuser that sits flush in the ceiling, for spaces where the outlet should read as a plain panel rather than a grille.",
    specs: [
      { label: "frame", value: "Extruded aluminium A6063-T5, 1.2mm" },
      { label: "face", value: "1.0mm aluminium, D6mm perforations" },
    ],
  },
  {
    name: "Ball Spot Jet Diffuser",
    code: "FK043",
    category: "Diffusers & Air Outlets",
    image: "fk043.webp",
    blurb:
      "Directional spot diffuser for throwing air into a specific part of a large space — atriums, halls and industrial areas.",
    specs: [
      { label: "material", value: "Aluminium A6063-T5, 1.2mm" },
      { label: "sizes", value: "D120 – D630" },
      { label: "airflow", value: "500 – 2,500 m³/h" },
    ],
  },
  {
    name: "Eye Ball Jet Diffuser",
    code: "FK026",
    category: "Diffusers & Air Outlets",
    image: "fk026.webp",
    blurb:
      "Spherical core diffuser that swivels in its frame, letting the air direction be aimed after installation.",
    specs: [
      { label: "frame", value: "Aluminium A6063-T5, 1.2mm" },
      { label: "core", value: "1.0mm aluminium sphere, adjustable" },
    ],
  },
  {
    name: "Ball Nozzle Diffuser",
    code: "FK048",
    category: "Diffusers & Air Outlets",
    image: "fk048.webp",
    blurb:
      "Nozzle diffuser with an adjustable spherical core that concentrates the airflow into a long throw, for high or wide spaces.",
    specs: [
      { label: "frame", value: "Aluminium A6063-T5, 1.2mm" },
      { label: "core", value: "1.0mm aluminium sphere, adjustable" },
    ],
  },
  {
    name: "Plenum Box",
    code: "SHGV",
    category: "Diffusers & Air Outlets",
    image: "shgv.webp",
    blurb:
      "Galvanised steel plenum box that sits behind a diffuser or grille to even out the air before it reaches the outlet. Available with top or side spigots.",
    specs: [{ label: "material", value: "Galvanised steel" }],
  },
  {
    name: "Weather Louver",
    code: "WWL-K",
    category: "Diffusers & Air Outlets",
    image: "wwl_k.webp",
    blurb:
      "External louver with E/Z-profile blades that keep sun and driven rain out of an opening while letting air through. Roughly 60% free area.",
    specs: [
      { label: "material", value: "Extruded aluminium A6063-T5, up to 2.0mm" },
      { label: "free area", value: "~60%" },
      { label: "blade pitch", value: "90 – 150mm" },
    ],
  },
  {
    name: "Sand Trap Louver",
    code: "SSL",
    category: "Diffusers & Air Outlets",
    image: "ssl.webp",
    blurb:
      "Two rows of vertical channels form a labyrinth that drops sand and heavy dust out of incoming air — used on intakes in dusty environments.",
    specs: [
      { label: "material", value: "Galvanised steel, ZAM K27 or stainless" },
      { label: "frame", value: "1.0mm galvanised steel" },
      { label: "free area", value: "> 25%" },
    ],
  },
  {
    name: "Fresh Air Louver — Z Blade",
    code: "SWL",
    category: "Diffusers & Air Outlets",
    image: "swl.webp",
    blurb:
      "Powder-coated aluminium Z-blade louver for fresh air intake and exhaust openings.",
    specs: [{ label: "material", value: "Aluminium, powder coated" }],
  },

  // ---------------- Fire & Smoke Dampers ----------------
  {
    name: "Fire Damper — Fusible Link",
    code: "S-FD-FS",
    category: "Fire & Smoke Dampers",
    image: "s_fd_fs_1200_w_x1200_h_x210_l.webp",
    blurb:
      "Uninsulated fire damper held open by a fusible link; when the link melts, a torsion spring closes the blades and seals the duct. Frames are made on an automated line for consistency.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 1.15mm" },
      { label: "closure", value: "Fusible link, return spring" },
      { label: "max module", value: "1200 (W) x 1200 (H) x 210 (L) mm" },
    ],
  },
  {
    name: "Fire Damper — Motorised",
    code: "S-FD-M",
    category: "Fire & Smoke Dampers",
    image: "s_fd_m_1200_w_x1200_h_x210_l.webp",
    blurb:
      "Uninsulated fire damper driven by an actuator, so it can be closed from the fire alarm system and its position monitored rather than relying on a fusible link alone.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 1.15mm" },
      { label: "closure", value: "Motorised actuator" },
      { label: "max module", value: "1200 (W) x 1200 (H) x 210 (L) mm" },
    ],
  },
  {
    name: "Insulated Fire Damper EI120",
    code: "S-FSD L210",
    category: "Fire & Smoke Dampers",
    image: "s_fsd_l210.webp",
    blurb:
      "Fusible-link fire damper rated EI120 — two hours of integrity and insulation — with a magnesium oxide insulated frame and blade for use in insulated fire-rated walls.",
    specs: [
      { label: "fire rating", value: "EI 120 (2 hours)" },
      { label: "frame", value: "1.15mm galvanised steel + 2 x 10mm MgSO4" },
      { label: "max module", value: "1200 (W) x 800 (H) x 210 (L) mm" },
    ],
  },
  {
    name: "Fusible Link Fire Damper FSS EI120",
    code: "S-FSS-L210",
    category: "Fire & Smoke Dampers",
    image: "s_fss_l210.webp",
    blurb:
      "Single-blade EI120 fire damper for smaller openings, closed by a fuse tube and torsion spring.",
    specs: [
      { label: "fire rating", value: "EI 120 (2 hours)" },
      { label: "frame", value: "1.15mm galvanised steel + 2 x 10mm MgSO4" },
      { label: "max module", value: "500 (W) x 500 (H) x 210 (L) mm" },
    ],
  },
  {
    name: "Wall-Mounted Motorised Fire Damper EI120",
    code: "S-MFSD-L210",
    category: "Fire & Smoke Dampers",
    image: "s_mfsd_l210.webp",
    blurb:
      "EI120 fire damper built for direct installation in a wall, with a bolted frame, two-sided TDC flange and an actuator that lets the fire system drive it closed.",
    specs: [
      { label: "fire rating", value: "EI 120 (2 hours)" },
      { label: "frame", value: "Z18 galvanised steel, 1.15mm, insulated" },
      { label: "max module", value: "1200 (W) x 800 (H) x 210 (L) mm" },
    ],
  },
  {
    name: "Fresh Air Fire Damper",
    code: "SAFD",
    category: "Fire & Smoke Dampers",
    image: "safd.webp",
    blurb:
      "Insulated fire damper for fresh air intake openings, sealing the opening at a fire-rated barrier.",
    specs: [{ label: "type", value: "Insulated fire damper" }],
  },

  // ---------------- Volume Control Dampers ----------------
  {
    name: "Volume Control Damper — Quadrant Handle",
    code: "S-VCD (HQ)",
    category: "Volume Control Dampers",
    image: "svcd_hq.webp",
    blurb:
      "Opposed-blade damper set by hand on a quadrant handle, for balancing airflow in rectangular ductwork. Flange options to suit the duct connection.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 0.95 – 1.15mm" },
      { label: "control", value: "Quadrant handle" },
      { label: "flanges", value: "C / TDC / V3 / V4" },
    ],
  },
  {
    name: "Volume Control Damper — Knob Handle",
    code: "S-VCD (SQ)",
    category: "Volume Control Dampers",
    image: "svcd_sq.webp",
    blurb:
      "The same balancing damper with a screw knob instead of a quadrant, which holds its setting more firmly once commissioned.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 0.95 – 1.15mm" },
      { label: "control", value: "Knob / screw handle" },
      { label: "flanges", value: "C / TDC / V3 / V4" },
    ],
  },
  {
    name: "Volume Control Damper — Motorised",
    code: "S-VCD (M)",
    category: "Volume Control Dampers",
    image: "svcd_m.webp",
    blurb:
      "Actuator-driven volume control damper, so airflow can be modulated from the building controls rather than set by hand.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 0.95 – 1.15mm" },
      { label: "control", value: "Motorised actuator" },
      { label: "flanges", value: "C / TDC / V3 / V4" },
    ],
  },
  {
    name: "Round Volume Control Damper — Handle",
    code: "S-VCD-T-H",
    category: "Volume Control Dampers",
    image: "svcd_t_h.webp",
    blurb:
      "Circular volume control damper with a hand lever, for balancing spiral and round ductwork.",
    specs: [{ label: "material", value: "Galvanised steel" }],
  },
  {
    name: "Round Volume Control Damper — Screw",
    code: "S-VCD-T-S",
    category: "Volume Control Dampers",
    image: "svcd_t_s.webp",
    blurb:
      "Circular volume control damper with a screw adjuster, which locks the blade position after balancing.",
    specs: [{ label: "material", value: "Galvanised steel" }],
  },
  {
    name: "Round Volume Control Damper — Motorised",
    code: "S-VCD-T-M",
    category: "Volume Control Dampers",
    image: "svcd_t_m.webp",
    blurb:
      "Actuator-driven circular damper for modulating airflow in round ductwork from the building controls.",
    specs: [{ label: "material", value: "Galvanised steel" }],
  },
  {
    name: "Non-Return Damper",
    code: "S-NRD",
    category: "Volume Control Dampers",
    image: "snrd.webp",
    blurb:
      "Blades that open with forward airflow and fall shut against reverse flow, stopping air backtracking through an idle fan or duct branch.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 0.95 – 1.15mm" },
      { label: "flanges", value: "C / TDC / V3 / V4" },
    ],
  },
  {
    name: "Pressure Relief Damper",
    code: "SPRD",
    category: "Volume Control Dampers",
    image: "sprd.webp",
    blurb:
      "Counterweighted damper that opens once duct or room pressure passes its set point, relieving excess pressure.",
    specs: [
      { label: "material", value: "Z180 galvanised steel, 0.95 – 1.15mm" },
      { label: "flanges", value: "C / TDC / V3 / V4" },
    ],
  },
  {
    name: "Round Opposed Blade Damper",
    code: "SRQ",
    category: "Volume Control Dampers",
    image: "srq.webp",
    blurb:
      "Opposed blade damper sized to fit a round diffuser neck, for trimming the airflow at the outlet itself.",
    specs: [{ label: "material", value: "Powder-coated steel" }],
  },
  {
    name: "Square Opposed Blade Damper",
    code: "OBD",
    category: "Volume Control Dampers",
    image: "obd.webp",
    blurb:
      "Opposed blade damper that mounts behind a square diffuser or grille to regulate flow at the outlet.",
    specs: [{ label: "material", value: "Powder-coated aluminium" }],
  },

  // ---------------- VAV Boxes ----------------
  {
    name: "VAV Box — Single Duct",
    code: "S-VAV-S",
    category: "VAV Boxes",
    image: "svav_s.webp",
    blurb:
      "Single duct variable air volume terminal with a Belimo controller, varying the air delivered to a zone to hold its set point. Also available in a long-body version.",
    specs: [
      { label: "casing", value: "ZAM K27 steel" },
      { label: "controller", value: "Belimo" },
      { label: "inlet sizes", value: "D100 – D400" },
    ],
  },
  {
    name: "VAV Box — Dual Duct",
    code: "S-VAV-D",
    category: "VAV Boxes",
    image: "s_vav_d.webp",
    blurb:
      "Dual duct terminal that blends separate hot and cold supplies to suit the zone it serves.",
    specs: [{ label: "casing", value: "ZAM steel" }],
  },
  {
    name: "Re-Heat and Fan Powered VAV Box",
    code: "S-VAV-PF/SF",
    category: "VAV Boxes",
    image: "s_vav_pf_sf.webp",
    blurb:
      "VAV terminal with an integral fan and re-heat coil, for perimeter zones that need heating as well as modulated cooling.",
    specs: [
      { label: "casing", value: "ZAM steel" },
      { label: "controller", value: "Belimo" },
    ],
  },
  {
    name: "VAV Compact (Type C)",
    code: "S-CMV",
    category: "VAV Boxes",
    image: "s_cmv.webp",
    blurb:
      "Compact variable air volume damper for tight ceiling voids where a full terminal box will not fit.",
    specs: [{ label: "casing", value: "ZAM K27 steel" }],
  },
  {
    name: "CAV Box — Rectangular",
    code: "S-CAV-(R)",
    category: "VAV Boxes",
    image: "s_cav_r.webp",
    blurb:
      "Rectangular constant air volume terminal, holding a fixed airflow to its zone regardless of pressure changes upstream.",
    specs: [{ label: "material", value: "Galvanised steel" }],
  },
  {
    name: "CAV Box — Round",
    code: "S-CAV",
    category: "VAV Boxes",
    image: "s_cav.webp",
    blurb:
      "Circular constant air volume terminal for smaller zones downstream of a VAV box, keeping their supply steady.",
    specs: [{ label: "material", value: "Galvanised steel" }],
  },
  {
    name: "VAV Diffuser",
    code: "S-VAD",
    category: "VAV Boxes",
    image: "s_vad.webp",
    blurb:
      "Diffuser with a built-in linear actuator that varies airflow at the outlet, for small spaces downstream of a VAV box. Available on slot, round and square diffuser faces.",
    specs: [
      { label: "diffuser", value: "Powder-coated aluminium" },
      { label: "plenum", value: "ZAM K27 steel" },
    ],
  },

  // ---------------- Duct Silencers ----------------
  {
    name: "Straight Duct Silencer",
    code: "S-RDo",
    category: "Duct Silencers",
    image: "s_rdo.webp",
    blurb:
      "Rectangular in-line silencer that attenuates fan and airflow noise before it reaches occupied space, with an acoustic infill behind a perforated liner.",
    specs: [
      { label: "casing", value: "1.2mm galvanised steel" },
      { label: "liner", value: "Perforated steel, D5 holes, 0.58mm" },
    ],
  },
  {
    name: "Multi-Splitter Silencer",
    code: "S-RDs",
    category: "Duct Silencers",
    image: "s_rds.webp",
    blurb:
      "Silencer with internal splitters, which raises attenuation for a given length by shortening the path between the airflow and the absorbent.",
    specs: [
      { label: "casing", value: "1.2mm galvanised steel" },
      { label: "liner", value: "Perforated steel, D5 holes, 0.58mm" },
    ],
  },
  {
    name: "Round Silencer",
    code: "S-RC1",
    category: "Duct Silencers",
    image: "s_rc1.webp",
    blurb:
      "Circular in-line silencer for spiral ductwork, with a fibreglass acoustic infill behind a perforated liner.",
    specs: [
      { label: "casing", value: "Galvanised steel" },
      { label: "infill", value: "Fibreglass, 50 kg/m³" },
    ],
  },
  {
    name: "Pod Round Silencer",
    code: "S-RCP",
    category: "Duct Silencers",
    image: "s_rcp.webp",
    blurb:
      "Round silencer with a central pod, adding attenuation in the same duct diameter as the plain circular unit.",
    specs: [
      { label: "casing", value: "Galvanised steel" },
      { label: "infill", value: "Fibreglass, 50 kg/m³" },
    ],
  },
  {
    name: "Acoustic Louver — Flat Blade",
    code: "S-LVt",
    category: "Duct Silencers",
    image: "s_lvt.webp",
    blurb:
      "External louver with acoustically lined flat blades, so a plant opening can pass air without passing noise to neighbours.",
    specs: [
      { label: "casing", value: "1.2mm galvanised steel" },
      { label: "liner", value: "Perforated steel, D5 holes, 0.58mm" },
    ],
  },
  {
    name: "Acoustic Louver — Oval Blade",
    code: "S-LVo",
    category: "Duct Silencers",
    image: "s_lvo.webp",
    blurb:
      "Acoustic louver with oval blades, which lowers pressure drop across the opening compared with the flat blade version.",
    specs: [
      { label: "casing", value: "1.2mm galvanised steel" },
      { label: "liner", value: "Perforated steel, D5 holes, 0.58mm" },
    ],
  },

  // ---------------- Cable Trays & Supports ----------------
  {
    name: "Cable Tray",
    code: "SLC",
    category: "Cable Trays & Supports",
    image: "slc.webp",
    blurb:
      "Perforated steel cable tray, formed and punched on automated machines. Finished in ZAM K27, Z18 galvanised steel or powder coating to suit the environment.",
    specs: [
      { label: "material", value: "Steel sheet, 1.5 – 2.0mm" },
      { label: "finishes", value: "ZAM K27 / Z18 galvanised / powder coated" },
    ],
  },
  {
    name: "Cable Ladder",
    code: "SLD-L",
    category: "Cable Trays & Supports",
    image: "sld_cable_ladder.webp",
    blurb:
      "Ladder-type cable support for heavier cable runs and longer spans between supports.",
    specs: [
      { label: "material", value: "Steel sheet, 1.5 – 2.0mm" },
      { label: "finishes", value: "ZAM K27 / Z18 galvanised / powder coated" },
    ],
  },
  {
    name: "Unistar Channel",
    code: "U4121 / U4141 / U4162 / U4182",
    category: "Cable Trays & Supports",
    image: "u4121_u4141_u4162_u4182.webp",
    blurb:
      "Slotted strut channel for building hangers and supports for ductwork, pipework and cable tray.",
    specs: [
      { label: "material", value: "Steel sheet, 1.2 – 2.5mm" },
      { label: "finishes", value: "ZAM K27 / Z18 galvanised / powder coated" },
    ],
  },
];

module.exports = { PRODUCTS, CATALOGUE };
