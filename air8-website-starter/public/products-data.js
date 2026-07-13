/* ============================================================
   Air 8 Industries — products-data.js
   ------------------------------------------------------------
   YOUR PRODUCT "SPREADSHEET". Copy a block, change the values.

   Fields:
     brand    : "Elta Fans" or "Abie Tiger"
     category : ONE category as text  ->  "Roof Mounted Fans"
                OR several in a list   ->  ["Inline Mounted Fans", "Cabinet Fans"]
     name     : product name
     code     : model / publication code (optional)
     image    : photo path in /public/images/  ("" = fallback tile)
     blurb    : short description (shown in the popup)
     brochure : PDF path in /public/brochures/  ("" = "coming soon")
     specs    : OPTIONAL highlight boxes {value, label}

   The Brand and Category dropdowns build themselves from this data,
   so any NEW category you type here appears in the filter automatically.
   ============================================================ */

const PRODUCTS = [
  /* ---------- ELTA FANS · Commercial & Industrial ---------- */
  {
    brand: "Elta Fans",
    category: "Commercial & Industrial",
    name: "AP Series",
    code: "Direct Driven Axial Flow Fan",
    image: "images/elta_fans/elta-ap-series.jpg",
    blurb:
      "Made to accommodate a wide range of performances and applications. Special coatings and alternative materials such as stainless steel are available, plus increased-safety motors and anti-static impellers — handling anything from ambient air to hot, corrosive or explosive gases.",
    brochure: "brochures/elta_fans/elta-ap-series.pdf",
    specs: [
      { value: "315 - 2000mm", label: "diameter" },
      { value: "360,000 m³/h", label: "capacity" },
      { value: "1800 Pa", label: "static pressure" },
    ],
  },

  /* ---------- ELTA FANS · Centrifugal Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Centrifugal Fans",
    name: "Flexine - Direct Drive",
    code: "",
    image: "images/elta_fans/flexline_series_direct_drive.webp",
    blurb: "The FlexLine Series of backward-curved centrifugal fans has been developed for ducted applications requiring high pressures. They are available in various speed options and 8 sizes, extending from 315 to 710mm diameter.",
    brochure: "brochures/elta_fans/elta-plate-mounted.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Centrifugal Fans",
    name: "FTDB",
    code: "",
    image: "images/elta_fans/FTDB.webp",
    blurb: "The FTDB Series DWDI backward-curved centrifugal fan is available in 15 models ranging in size from 200 mm to 1000m. These belt-driven fans are capable of airflow rates of 1000m³/h to 120,000m³/h.",
    brochure: "brochures/elta_fans/elta-centrifugal.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Centrifugal Fans",
    name: "FTDF",
    code: "",
    image: "images/elta_fans/FTDF.webp",
    blurb: "The FTDF Series DWDI forward-curved centrifugal fan is available in 15 models ranging in size from 200 mm to 1000 mm. These belt-driven fans are capable of airflow rates of 1000m³/h to 100,000m³/h.",
    brochure: "brochures/elta_fans/elta-car-park.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Centrifugal Fans",
    name: "FTP",
    code: "",
    image: "images/elta_fans/FTP.webp",
    blurb: "The FTP Series centrifugal plug fan is available in 12 models ranging in size from 280 mm to 1000 mm and are capable of reaching air volume flow rates from 1000m³/h to 50,000m³/h.",
    brochure: "brochures/elta_fans/elta-high-temperature.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Centrifugal Fans",
    name: "FTSB",
    code: "",
    image: "images/elta_fans/FTSB.webp",
    blurb: "The FTSB Series SWSI backward-curved centrifugal fan is available in 12 sizes ranging from 280 mm to 1000 mm and are capable of airflow rates of 700m³/h to 70,000m³/h.",
    brochure: "brochures/elta_fans/elta-hazardous-area.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Centrifugal Fans",
    name: "FTSF",
    code: "",
    image: "images/elta_fans/FTSF.webp",
    blurb: "The FTSF Series of SWSI multi-vane forward-curved centrifugal fans is available in 12 sizes ranging from 280 mm to 1000 mm and are capable of airflow rates of 700m³/h to 70,000m³/h.",
    brochure: "brochures/elta_fans/elta-hazardous-area.pdf",
  },

  /* ---------- ELTA FANS · Axial Flow Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Axial Flow Fans",
    name: "Adjustable Pitch Axial Flow Fans",
    code: "",
    image: "images/elta_fans/adjustable_pitch_axial_flow.webp",
    blurb: "The AP Series of axial flow fans is available in an extensive range of variants and airflow performance. They can be manufactured to handle most conditions from ambient air to hot, corrosive or explosive gases and can be ordered in sizes extending from 315 to 2000mm diameter.",
    brochure: "brochures/elta_fans/elta-wall-window.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Axial Flow Fans",
    name: "Revolution SLC EC",
    code: "",
    image: "images/elta_fans/Revolution_SLC_EC.webp",
    blurb: "A true industry workhorse, this extensive range offers superb performance characteristics, combined with strength, durability and corrosion resistance for a longer life.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },

  /* ---------- ELTA FANS · Inline Mounted Fans ---------- */
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Plate Mounted Fans"],
    name: "HCA",
    code: "",
    image: "images/elta_fans/hca.webp",
    blurb: "The short cased HCA Series are compact, lightweight units designed around an advanced, high performing impeller. Suitable for a wide range of air supply and discharge applications. Can be used for a duct mounted ventilation system. HCA axial fans offer a wide operating angle making them suitable for mounting in any position enabling greater flexibility for site installations. Available in 5 standard sizes from 315 to 500mm, either single or three phase.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Inline Mounted Fans",
    name: "Short Case Axial Fans",
    code: "",
    image: "images/elta_fans/short_case_axial.webp",
    blurb: "The Short Case Axial Series has a light-weight but robust construction and is designed for ducted systems. They feature a galvanised steel casing with a polyester epoxy finish and are capable of operating in ambient temperatures ranging from -20°C to +70°C. There are 8 sizes in the range extending from 250 to 630mm diameter.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Inline Mounted Fans",
    name: "Short Case Axial EC Fans",
    code: "",
    image: "images/elta_fans/short_case_axial_ec.webp",
    blurb: "The Short Case Axial EC Series fans incorporate the latest state-of-the-art EC motor technology. The range features fully integrated, infinitely variable speed control which eliminates the need for external VSDs, current overloads and motor phase protection. They are an energy saving solution and are most efficient where conditions vary during the course of the day.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Hazardous & ATEX Fans"],
    name: "Compact Flameproof Miniduct",
    code: "",
    image: "images/elta_fans/compact_flameproof_miniduct.webp",
    blurb: "The Compact Series of Flameproof Miniduct fans has been specifically designed for duct mounting and to ventilate hazardous or explosive environments. There are 4 sizes in the range extending from 250 to 400mm diameter.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Residential Fans"],
    name: "IMF-E",
    code: "",
    image: "images/elta_fans/IMF-E.webp",
    blurb: "The IMF E-Series is our new range of in-line mixed flow fans with a compact profile. They have been designed specifically for use with rigid or flexible ductwork and can be used for a wide variety of residential and commercial applications. They produce excellent pressure development characteristics and are available in 3 sizes to suit 100, 150 and 200mm duct.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Cabinet Fans"],
    name: "Powerline ULTRA (PUD double skin)",
    code: "",
    image: "images/elta_fans/Powerline-ULTRA-PUD-double-skin.webp",
    blurb: "The PowerLine Ultra Double Skin Series of In-Line Mixed-Flow Fans is designed for a wide range of duct mounted applications. They are most suitable in commercial and industrial applications where medium pressure is required. They are available in various speed options and 7 sizes, extending from 315 to 630mm diameter.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Cabinet Fans"],
    name: "Powerline® Ultra",
    code: "",
    image: "images/elta_fans/powerline-ultra.webp",
    blurb: "The Powerline® Ultra Series of In-Line Mixed-Flow Fans is designed for a wide range of duct mounted applications. It is available in 9 sizes ranging from 250 to 630mm diameter. They are most suitable in commercial and industrial applications where medium pressure is required.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Cabinet Fans", "Hazardous & ATEX Fans"],
    name: "Powerline® Ultra AMCA",
    code: "",
    image: "images/elta_fans/powerline_ultra_AMCA.webp",
    blurb: "The Powerline® Ultra Series of In-Line Mixed-Flow Fans is designed for a wide range of duct mounted applications. They are most suitable in commercial and industrial applications where medium pressure is required.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Inline Mounted Fans",
    name: "Minitube",
    code: "",
    image: "images/elta_fans/minitube.webp",
    blurb: "The Minitube Series of duct mounted axial fans is suitable for domestic, commercial and industrial ventilation applications. Available in 5 sizes ranging from 150 to 350mm diameter. They can be supplied with plastic housings from 200 to 300mm diameter and metal from 150 to 350mm diameter.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Cabinet Fans", "Hazardous & ATEX Fans"],
    name: "Powerline®",
    code: "",
    image: "images/elta_fans/powerline.webp",
    blurb: "The PowerLine Series® of In-Line Centrifugal Fans is designed for a wide range of duct mounted applications. They are most suitable in commercial and industrial applications where medium to high air pressure is required. They are available in various speed options and 8 sizes, extending from 315 to 710mm diameter.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Cabinet Fans"],
    name: "Powerline® EC",
    code: "",
    image: "images/elta_fans/powerline_ec.webp",
    blurb: "The PowerLine® EC Series of In-Line centrifugal fans incorporate the latest state-of-the-art, energy saving EC motor technology and are most efficient where conditions vary during the course of the day. They feature fully integrated, infinitely variable speed control which eliminates the need for external VSDs, current overloads and motor phase protection.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Cabinet Fans"],
    name: "Powerline (PCD double skin)",
    code: "",
    image: "images/elta_fans/powerline-pcd-series.webp",
    blurb: "The PowerLine Series® of In-Line Centrifugal Fans is designed for a wide range of duct mounted applications. They are most suitable in commercial and industrial applications where medium to high air pressure is required. They are available in various speed options and 8 sizes, extending from 315 to 710mm diameter",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Inline Mounted Fans", "Residential Fans"],
    name: "HIT",
    code: "",
    image: "images/elta_fans/hit.webp",
    blurb: "The HIT Series of duct-mounted centrifugal in-line fans is designed to exhaust or supply air to a wide range of applications. This powerful in-line fan is perfect for direct duct connection. All metal galvanised body means the fan will last under hard wearing applications. Backward curved impellers create a strong reliable airflow and a stall free performance. Available in 7 models to suit100 to 315mm spigot sizes.",
    brochure: "brochures/elta_fans/elta-cased-axial.pdf",
  },

  /* ---------- ELTA FANS · Car Park Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Car Park Fans",
    name: "JISU",
    code: "",
    image: "images/elta_fans/jisu.webp",
    blurb: "The JISU Series of JetVent Fans are available in 50 and 100 Nthrust capacities. This range is suitable for ambient and also high temperature applications as required in fire/smoke control applications. All models feature a low profile housing that is suitable for car parks with low ceiling heights. These units may be used in conjunction with Variable Speed Drives (VSD) for efficient speed control.",
    brochure: "brochures/elta_fans/elta-wall-window.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Car Park Fans",
    name: "JFU",
    code: "",
    image: "images/elta_fans/JFU.webp",
    blurb: "The JFU Series of JetVent axial fans have been designed to provide effective ventilation in most spaces that contain harmful vehicle exhaust pollutants. They can be supplied for unidirectional or truly reversible airflow and are available in 2 sizes, 315 and 400mm diameter. Units approved to AS4429:1999 for high temperature smoke exhaust are also available.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },

  /* ---------- ELTA FANS · Smoke Fans ---------- */
  {
    brand: "Elta Fans",
    category: ["Smoke Fans", "Roof Mounted Fans"],
    name: "Heritage Smoke-Spill",
    code: "",
    image: "images/elta_fans/heritage-smoke-spill.webp",
    blurb: "The Heritage Smoke-Spill Series of vertical discharge centrifugal roof units has been developed and tested for hot smoke exhaust applications. They are constructed from durable galvanised steel and feature a removable windband which provides easy access for cleaning and maintenance. There are 6 sizes in the series extending from 315 to 560mm diameter.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Smoke Fans", "Roof Mounted Fans"],
    name: "Smoke-Spill SS",
    code: "EFAP-25",
    image: "images/elta_fans/high_capacity_smoke_spill.webp",
    blurb: "The Smoke-Spill (SS) Series of vertical exhaust axial roof ventilators have been designed for use in commercial and industrial applications. They are built to handle clean air, toxic, noxious and explosive gases as well as handling air at elevated temperatures. There are 10 sizes in the series extending from 500 to 1800mm diameter.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: ["Smoke Fans", "Roof Mounted Fans"],
    name: "High Capacity HC",
    code: "EFAP-25-1",
    image: "images/elta_fans/high_capacity_smoke_spill_01.webp",
    blurb: "The High Capacity (HC) vertical exhaust axial roof ventilators have been designed for use in commercial and industrial applications. They are built to handle clean air, toxic, noxious and explosive gases as well as handling air at elevated temperatures. There are 10 sizes in the series extending from 500 to 1800mm diameter.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },

  /* ---------- ELTA FANS · Hazardous & ATEX Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Hazardous & ATEX Fans",
    name: "Compact Flameproof Square Plate",
    code: "",
    image: "images/elta_fans/compact_flameproof_square_plate.webp",
    blurb: "The Compact Series of flameproof axial flow fans has been specifically designed to meet the needs of small ventilation applications in hazardous or explosive environments. They are ideal for wall mounting but can be mounted at any angle and on the ceiling if required. There are 4 sizes in the range extending from 250 to 400mm diameter.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Hazardous & ATEX Fans",
    name: "SQ",
    code: "",
    image: "images/elta_fans/sq.webp",
    blurb: "The SQ Series of square plate axial flow fans is a high quality, robust fan unit. It is available in 9 sizes ranging from 315 to 1250mm diameter. The fan is suitable for a wide range of commercial and industrial applications.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },

  /* ---------- ELTA FANS · Destratification Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "Compact Cooler",
    code: "",
    image: "images/elta_fans/compact_cooler.webp",
    blurb: "The Compact Cooler series of portable fans is designed to increase comfort and lift productivity by providing relief for people working in warm to hot locations. They deliver large volumes of air and include wheels and handles to ensure easy manoeuvrability. There are 2 models, the 'Versatile', which incorporates a tilting facility and the more economical 'Standard' model which fits into more confined spaces.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "HVLS - X Range",
    code: "",
    image: "images/elta_fans/hvls_xrange.webp",
    blurb: "Designed in Italy and built to the highest standards our X range of High Volume, Low Speed (HVLS) fan can save energy costs and increase productivity. The fan is designed to eliminate the build up of hot stagnant air by maintaining constant air movement. It creates a more comfortable indoor space for building occupants while lowering a building's running costs and reducing its carbon footprint. The X range can be controlled with our easy to use touchscreen controller. The range includes multiple sized fans so that it can be used in a wide range of applications.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "Washdown Fan - Heavy Duty",
    code: "",
    image: "images/elta_fans/washdown_heavyduty.webp",
    blurb: "The Heavy Duty Washdown Fan is the perfect solution for effectively and efficiently moving air in work areas where strict hygiene requirements exist. Designed for frequent washing, cleaning is made simple with users able to simply pressure wash the fan without any damage to the unit. The motor is rated IP67 and the unit is made of electropolished 304 stainless steel. Made in Australia to ensure durability, longevity and maintained performance during the life of the fan. It is backed with a 2 year warranty as standard.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "Washdown Fan - Single Phase",
    code: "",
    image: "images/elta_fans/washdown_single_phase.webp",
    blurb: "The Single Phase Washdown Fan is the perfect solution for effectively and efficiently moving air in work areas where strict hygiene requirements exist. Designed for frequent washing, cleaning is made simple with users able to simply pressure wash the fan without any damage to the unit. The motor is rated IP69K and the unit is made of electropolished 304 stainless steel. Made in Australia to ensure durability, longevity and maintained performance during the life of the fan. It is backed with a 2 year warranty as standard.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "Washdown Fan - Three Phase",
    code: "",
    image: "images/elta_fans/washdown_three_phase.png",
    blurb: "The Three Phase Washdown Fan is the perfect solution for effectively and efficiently moving air in work areas where strict hygiene requirements exist. Designed for frequent washing, cleaning is made simple with users able to simply pressure wash the fan without any damage to the unit. The motor is rated IP55 and the unit is made of electropolished 304 stainless steel. Made in America to ensure durability, longevity and maintained performance during the life of the fan. It is backed with a 2 year warranty as standard.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },
  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "ZOO",
    code: "",
    image: "images/elta_fans/zoo.webp",
    blurb: "The stylish ZOO (Zone Of Occupancy) Fan de-stratifies by producing a gentle, concise column of air that draws warm air from the ceiling and forces it down to floor level. By doing this it helps create a more pleasant and comfortable indoor environment for workers and customers. It can also help to lower a building's operating costs by reducing the energy consumption of a heating system in cooler weather. Available in 2 sizes, 250 and 300mm.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },

  {
    brand: "Elta Fans",
    category: "Destratification Fans",
    name: "EC Controller - 0-10V EC Speed Controller",
    code: "",
    image: "images/elta_fans/ec_speed_controller.webp",
    blurb: "The Compact Cooler series of portable fans is designed to increase comfort and lift productivity by providing relief for people working in warm to hot locations. They deliver large volumes of air and include wheels and handles to ensure easy manoeuvrability. There are 2 models, the 'Versatile', which incorporates a tilting facility and the more economical 'Standard' model which fits into more confined spaces.",
    brochure: "brochures/elta_fans/elta-heat-recovery.pdf",
  },

  /* ---------- ELTA FANS · Accessories ---------- */
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "ABD - Butterfly Shutters",
    code: "",
    image: "images/elta_fans/butterfly_shutters.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "CBD - Backdraft Shutters",
    code: "",
    image: "images/elta_fans/backdraft_shutters.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "DG - Finger Guards",
    code: "",
    image: "images/elta_fans/finger_guards.png",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "EAGM - External Aluminium Grille",
    code: "",
    image: "images/elta_fans/external_aluminium_grille.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "EMGB-HPA - External Backdraft Shutter",
    code: "",
    image: "images/elta_fans/hpa_external_backdraft_shutter.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "EPGB - External Backdraft Shutter",
    code: "",
    image: "images/elta_fans/epgb_external_backdraft_shutter.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "EPGM - External Plastic Grille",
    code: "",
    image: "images/elta_fans/external_plastic_grille.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "ESSHV - External Stainless Steel Grille",
    code: "",
    image: "images/elta_fans/external_stainless_steel_grille.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "F/CFT - Axial Fan Mounting Feet",
    code: "",
    image: "images/elta_fans/mounting_feet.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "FC - Fast Clamps",
    code: "",
    image: "images/elta_fans/fast_clamps.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "FG - Finger Guards",
    code: "",
    image: "images/elta_fans/finger_guard_01.png",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "FGR - Filter Unit",
    code: "",
    image: "images/elta_fans/filter_unit.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "Flatpack Low Profile Duct System",
    code: "",
    image: "images/elta_fans/flatpack_low_profile_ducting.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "Flexible Duct",
    code: "",
    image: "images/elta_fans/flexible_duct.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "FLX - Flexline® Matching Flanges",
    code: "",
    image: "images/elta_fans/flexline_matching_flanges.png",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "FT - In-Line Mounting Feet",
    code: "",
    image: "images/elta_fans/inline_mounting_feet.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "IC/CIC - Inlet Cones For Axial Fans",
    code: "",
    image: "images/elta_fans/axial_fan_inlet_cone.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "IPDV - Internal Plastic Duct Valve",
    code: "",
    image: "images/elta_fans/internal_plastic_duct_valve.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "ISDV - Internal Steel Duct Valve",
    code: "",
    image: "images/elta_fans/internal_steel_duct_valve.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "MF/CMF - Axial Fan Matching Flanges",
    code: "",
    image: "images/elta_fans/axial_fan_matching_flanges.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "MRJ - Inlet Guard",
    code: "",
    image: "images/elta_fans/inlet_guard.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "POW - Powerline/Multiflow Matching Flanges",
    code: "",
    image: "images/elta_fans/powerline_multiflow_matching_flanges.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "Rapid Response Grilles",
    code: "",
    image: "images/elta_fans/ultimate_grilles.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "Rapid Response LED Grilles",
    code: "",
    image: "images/elta_fans/ultimate_led_grilles.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "RCG - Internal Ceiling Grilles",
    code: "",
    image: "images/elta_fans/internal_ceiling_grilles.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "RG - Rubber Gasket",
    code: "",
    image: "images/elta_fans/rg_rubber_gasket_elta_asia.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "Silent Response Grilles",
    code: "",
    image: "images/elta_fans/silent_response_grilles.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "Silent Response LED Grilles",
    code: "",
    image: "images/elta_fans/silent_response_led_grilles.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "SJK / RSK - Backdraft Dampers",
    code: "",
    image: "images/elta_fans/backdraft_dampers.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "WKG - Window Kit",
    code: "",
    image: "images/elta_fans/window_kit.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "WKS - Window Kit Shutter",
    code: "",
    image: "images/elta_fans/window_kit_shutter.webp",
    blurb: "",
    brochure: ""
  },
  {
    brand: "Elta Fans",
    category: "Ventilation Accessories",
    name: "WT - Wall Tubes",
    code: "",
    image: "",
    blurb: "",
    brochure: ""
  },

  /* ---------- ELTA FANS · Roof Mounted Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Alpha and Beta",
    code: "EFAP-2",
    image: "images/elta_fans/alpha_beta.webp",
    blurb:
      "The Alpha & Beta Series of axial roof units are designed for a wide range of free intake and ducted exhaust air installations. These robust but lightweight exhaust units are available in 7 sizes in each range extending from 315 to 630mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Alpha Relief Air Vent BFC",
    code: "EFAP-4",
    image: "images/elta_fans/alpha_relief_air_vent_bfc.webp",
    blurb:
      "The robust Alpha Relief Vents with bushfire code compliance have been designed to control relief air and the pressure within buildings. They may also be used in a ducted system where the fan is mounted remotely to the cowl. They comply with BAL-LOW to BAL-40 of the Australian Standard AS3959:2009 Construction of buildings in bushfire prone areas.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Beta Vertical Discharge Cowl",
    code: "EFAP-6",
    image: "images/elta_fans/beta_vertical_discharge_cowl.webp",
    blurb:
      "The Beta Vertical Discharge Vents are ideal in ducted systems where the fan is mounted remotely to the unit. They enable the vertical discharge of air from a mechanical exhaust system, while providing protection from rain when not in use. There are 6 sizes in the range handling airflows from 0.4 to 5.70 m3/s.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Gamma EC Supply",
    code: "EFAP-15",
    image: "images/elta_fans/gamma_ec_supply.webp",
    blurb:
      "The Gamma EC Series of centrifugal supply air roof units can be used for supplying fresh air to an air handling unit or to an air conditioning system. They incorporate the latest state of the art, energy saving EC motor technology and are most efficient where conditions vary during the course of the day.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "GL Gamma",
    code: "EFAP-20",
    image: "images/elta_fans/gl_gamma.webp",
    blurb:
      "The GL Gamma Series of centrifugal roof units feature a removable windband that provides easy access for cleaning and maintenance. These compact, low profile fans are suited for ducted exhaust applications and are available in 8 sizes extending from 315 to 710mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Heritage",
    code: "EFAP-23",
    image: "images/elta_fans/heritage.webp",
    blurb:
      "The Heritage Series of vertical exhaust roof units has been designed for use in ducted exhaust applications. It features a high performance centrifugal fan and removable windband which makes cleaning and maintenance easy. There are 8 sizes in the series extending from 315 to 710mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "New Generation",
    code: "EFAP-38",
    image: "images/elta_fans/new_generation.webp",
    blurb:
      "The heavy duty New Generation Series of axial roof units has been designed for a wide range of free intake and ducted applications. These exhaust fans are suitable for a wide range of commercial and industrial applications for handling clean air through to smoke-spill. There are 9 sizes in the series extending from 315 to 1250mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Alpha and Beta Industrial",
    code: "EFAP-50",
    image: "images/elta_fans/alpha_beta_industrial.webp",
    blurb:
      "The Alpha & Beta Industrial Series of axial roof units are designed for a wide range of free intake and ducted exhaust systems. These durable and robust units feature adjustable pitch impellers which allows for optimum airflow and power efficiency. There are 6 sizes in each range extending from 500 to 1000mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Alpha Supply",
    code: "EFAP-5",
    image: "images/elta_fans/alpha_supply_series.webp",
    blurb:
      "The Alpha Series of supply air roof units have been designed for use in free intake or ducted installations. These robust but lightweight units are fitted with bird mesh as standard to prevent debris and birds entering the building and interrupting motor operation. There are 10 models in the series extending from 200 to 630mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Flanged Vertical Discharge Cowls",
    code: "EFAP-12",
    image: "images/elta_fans/flanged_vertical_discharge_cowls.webp",
    blurb:
      "The Flanged Vertical Discharge Cowls are ideal in ducted systems where the fan is mounted remotely below roof level. They work together with a mechanical exhaust system while preventing the entry of rain when not in use. These durable and robust units are designed for mounting on circular duct and flue discharges using a flange. There are 11 sizes in the range handling airflows from 0.2 to 55 m3/s.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Gamma Supply",
    code: "EFAP-17",
    image: "images/elta_fans/gamma_supply.webp",
    blurb:
      "The Gamma Series of centrifugal supply air roof units have been designed for use in free intake and ducted installations. These compact and low profile units are ideal for supplying fresh air to an air handling unit or to an air conditioning system in commercial buildings. They are available in 8 sizes extending from 315 to 710mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "GL Gamma BFC",
    code: "EFAP-21",
    image: "images/elta_fans/gl_gamma_bcf.webp",
    blurb:
      "The GL Gamma Series, with bushfire code compliance, has been developed for bushfire prone regions. They feature a high performance backward-curved centrifugal fan and a robust galvanised steel construction. There are 8 sizes in the range extending from 315 to 710mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Alpha Relief Air Vent",
    code: "EFAP-3",
    image: "images/elta_fans/alpha_relief_air_vent.webp",
    blurb:
      "The Alpha Relief Air Vents have been designed for air intake and exhaust applications or control of pressure within buildings. They may be used in a ducted system where the fan is mounted remotely to the cowl. Units are fitted with bird mesh as standard to eliminate the risk of debris and birds entering the building. There are 9 models in the range capable of handling airflows from 0.04 to 6.0 m3/s.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Gamma",
    code: "EFAP-16",
    image: "images/elta_fans/gamma.webp",
    blurb:
      "The Gamma Series of centrifugal roof units has been designed for use in commercial ducted exhaust applications. These compact and low profile units are fitted with bird mesh to prevent the entry of birds and vermin into the ducting or building. They are available in 12 sizes, extending from 192 to 710mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Gamma EC",
    code: "EFAP-14",
    image: "images/elta_fans/gamma_ec.webp",
    blurb:
      "The Gamma EC Series of centrifugal roof mounted exhaust fans incorporates the latest state of the art, energy saving EC motor technology. They feature integrated infinitely variable speed control and eliminate the need for external VSDs, current overloads and motor phase protection. Models come in downflow or vertical discharge configurations and are available in 250, 315, 355, 450, 560 and 630mm fan sizes.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "GE",
    code: "EFAP-18",
    image: "images/elta_fans/ge.webp",
    blurb:
      "The GE Series of vertical exhaust centrifugal roof units has been specifically designed to exhaust grease and oil laden air from applications such as fast food and restaurant kitchens. The design incorporates a grease/water separator which plumbs excess water away from the unit while retaining the oil in a reservoir for later removal. There are 7 sizes in the range extending from 350 to 710mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "GL Gamma EC",
    code: "EFAP-19",
    image: "images/elta_fans/gl_gamma_ec.webp",
    blurb:
      "The GL Gamma EC Series of centrifugal roof mounted exhaust fans incorporate the latest state of the art, energy saving EC motor technology. They feature integrated infinitely variable speed control and eliminate the need for external VSDs, current overloads and motor phase protection. The units are available in 315, 355, 450, 560 and 630mm fan sizes.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "Minivent",
    code: "EFAP-36",
    image: "images/elta_fans/minivent.webp",
    blurb:
      "The Minivent Series of axial roof units has been designed for use in a wide range of free intake or ducted exhaust air applications. They can be speed controlled and are available in 6 sizes ranging from 112 to 350mm diameter.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Roof Mounted Fans",
    name: "New Generation BFC",
    code: "EFAP-39",
    image: "images/elta_fans/new_generation_bushfire_compliant.webp",
    blurb:
      "The heavy duty New Generation Series with bushfire code compliance, has been developed for use in free intake or ducted installations. These supply air axial roof units feature a low profile and comply with BAL-LOW to BAL-40 of the Australian Standard AS3959:2009 Construction buildings in bushfire prone areas. There are 6 sizes in the range extending from 315 to 710mm diameter.",
    brochure: "",
  },

  /* ---------- ELTA FANS · Plate Mounted Fans ---------- */
  {
    brand: "Elta Fans",
    category: "Plate Mounted Fans",
    name: "Compact 2000",
    code: "EFAP-9",
    image: "images/elta_fans/compact_2000.webp",
    blurb:
      "The Compact 2000 Series of square plate axial fans is a high quality, robust unit with 10 sizes ranging from 250 to 800mm diameter. They are suitable for a wide range of commercial and industrial applications and can be speed controlled to better manage energy consumption.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Plate Mounted Fans",
    name: "Compact 2000 EC",
    code: "EFAP-8",
    image: "images/elta_fans/compact_2000_ec.webp",
    blurb:
      "The Compact 2000 EC Series square plate axial fans incorporate the latest state of the art EC motor technology. The unit is available in 4 sizes ranging from 250 to 630mm diameter. They feature integrated infinitely variable speed control and eliminate the need for external VSDs, current overloads and motor phase protection. They are an energy saving solution and are most efficient when airflow requirements vary during the course of the day.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Plate Mounted Fans",
    name: "HPA",
    code: "EFAP-28",
    image: "images/elta_fans/hpa.webp",
    blurb:
      "The plate mounted HPA Series are designed around an advanced, high performing impeller. Suitable for a wide range of air supply and discharge applications. The HPA axial fan offers a wide operating angle making them suitable for mounting in any position enabling greater flexibility for site installations. Available in 9 standard sizes from 250 to 710mm, either single or three phase.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Plate Mounted Fans",
    name: "Ring Plate",
    code: "EFAP-44",
    image: "images/elta_fans/ringplate.webp",
    blurb:
      "The Ring Plate Series is a high quality wall or ceiling mounted axial fan suitable for a broad range of commercial and industrial applications. There are 4 sizes in the range extending from 200 to 350mm diameter.",
    brochure: "",
  },

  /* ---------- ELTA FANS · Window, Wall & Ceiling Fans ---------- */
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QA",
    code: "EFAP-69",
    image: "images/elta_fans/qa.webp",
    blurb:
      "The QA is your solution for a clean, simple and efficient fan. This fan is ideal for air extraction in the bathroom, toilet and other small to medium spaces. Available in 100, 125 and 150mm models.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QAX",
    code: "EFAP-70",
    image: "images/elta_fans/qax.webp",
    blurb:
      "The QAX single flow decentralised mechanical ventilation unit is ideal for continuous running. It is the best DMEV ever tested at BRE laboratory (UK).",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QB",
    code: "EFAP-71",
    image: "images/elta_fans/qb.webp",
    blurb:
      "The QB axial fan has a clean design and is quick to install in either the wall or ceiling. It is available in 100 and 150mm models.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QD",
    code: "EFAP-72",
    image: "images/elta_fans/qd.webp",
    blurb:
      "The QD is your solution for a clean, simple and efficient fan. This fan is ideal for air extraction in the bathroom, toilet and other small to medium spaces. Available in 100, 125 and 150mm models.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QIN",
    code: "EFAP-73",
    image: "images/elta_fans/qin.webp",
    blurb:
      "The QIN Series are designed to be used with ducted ventilation solutions. This in-line domestic intermittent axial fan is suitable to extract stale air directly outside or through short length ducting. Available in 3 sizes to suit 100, 125 and 150mm duct.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QS",
    code: "EFAP-74",
    image: "images/elta_fans/qs.webp",
    blurb:
      "The QS is your solution for a clean, simple and efficient fan. This fan is ideal for air extraction in the bathroom, toilet and other small to medium spaces. Available in 100, 125 and 150mm models.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QUASAR",
    code: "EFAP-75",
    image: "images/elta_fans/quasar.webp",
    blurb:
      "The Quasar fan is modern ventilation on a whole new level, featuring Apex Air Science. Ultra quiet extractor fan designed and developed in Italy by Elta Group fan engineers in one of Europe's most sophisticated Air Science Labs. Over two years of product development and countless prototypes has spawned a new breed in domestic fan performance.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "QX",
    code: "EFAP-76",
    image: "images/elta_fans/qx.webp",
    blurb:
      "The QX centrifugal fan is ideal for powerful air-extraction in small and medium size areas. These extract fans are designed to overcome the resistances of long ducting systems. Available in 80 and 100mm models.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "Rapid Response",
    code: "EFAP-79",
    image: "images/elta_fans/rapid_response.webp",
    blurb:
      "The stylish and modern Rapid Response ceiling mounted extract fan is the quietest and most powerful in its class. Its fully optimised inlet cone and centrifugal impeller design maximises air pressure that ensures rooms are quickly cleared of steam and unpleasant odours. It includes features such as a unique swing clip and removable spigot that makes it very easy to install into a standard 10 inch round fan cut out.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: ["Window, Wall & Ceiling Fans", "Residential Fans"],
    name: "Silent Response",
    code: "EFAP-78",
    image: "images/elta_fans/silent_response.webp",
    blurb:
      "The Silent Response ducted ceiling exhaust fan features quiet operation and powerful airflow performance. It includes a fully optimised inlet cone and centrifugal impeller that maximises air pressure and ensures rooms are quickly cleared of steam and unpleasant odours. It includes a unique swing clip and removable spigot that makes it very easy to install into a standard 10 inch round fan cut out.",
    brochure: "",
  },
  {
    brand: "Elta Fans",
    category: "Window, Wall & Ceiling Fans",
    name: "URF100",
    code: "URF100",
    image: "images/elta_fans/URF100_SQ_WEB.webp",
    blurb:
      "URF is a low profile, extraction fan that can be installed into tight ceiling spaces such as between floors. It features a non-return damper to eliminate backdraft and a high-performance centrifugal impeller that produces powerful airflow and low noise. Smartflow Technology ensures optimum airflow. Models to suit 100mm diameter duct sizes are available.",
    brochure: "",
  },

  /* ---------- ABIE TIGER · Duct Silencers ---------- */
{
  brand: "Abie Tiger",
  category: "Duct Silencers",
  name: "TYPE LF - Duct Silencer",
  code: "",
  image: "images/abie_tiger/duct_silencer.webp",
  blurb:
    "A duct-mounted splitter silencer for low-frequency noise attenuation, with a perforated galvanized-steel casing and interlocking splitter track. The absorption fill is compressed for solid packing and lab-tested for consistent acoustic performance.",
  specs: [
    { value: "24 ga.", label: "galvanized steel" },
    { value: "17.23%", label: "open area" },
    { value: "ASTM C423", label: "acoustic test std." },
  ],
  brochure: "brochures/abie_tiger/duct_silencer.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers",
  name: "TYPE LMF - Duct Silencer",
  code: "",
  image: "images/abie_tiger/duct_silencer.webp",
  blurb:
    "A duct-mounted splitter silencer tuned for low-to-mid frequency attenuation, built the same way as the Type LF with a perforated galvanized-steel casing and interlocking splitter track.",
  specs: [
    { value: "24 ga.", label: "galvanized steel" },
    { value: "17.23%", label: "open area" },
    { value: "ASTM C423", label: "acoustic test std." },
  ],
  brochure: "brochures/abie_tiger/duct_silencer.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers",
  name: "TYPE MF - Mid-Frequency Noise Attenuation Duct Silencer",
  code: "MF",
  image: "images/abie_tiger/duct_silencer.webp",
  blurb:
    "A mid-frequency duct silencer with perforated galvanized-steel splitters inside a heavier-gauge outer casing, giving solid, lab-tested noise attenuation for mechanical ductwork.",
  specs: [
    { value: "24 ga.", label: "splitter steel" },
    { value: "20 ga.", label: "outer casing" },
    { value: "17.23%", label: "open area" },
  ],
  brochure: "brochures/abie_tiger/duct_silencer.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers",
  name: "TYPE ELF - Excellence Low-Frequency Noise Attenuation Duct Silencer",
  code: "ELF",
  image: "images/abie_tiger/duct_silencer.webp",
  blurb:
    "An enhanced low-frequency duct silencer with perforated galvanized-steel splitters in a heavier-gauge outer casing, giving stronger low-end attenuation than the standard LF for demanding mechanical applications.",
  specs: [
    { value: "24 ga.", label: "splitter steel" },
    { value: "20 ga.", label: "outer casing" },
    { value: "17.23%", label: "open area" },
  ],
  brochure: "brochures/abie_tiger/duct_silencer.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers",
  name: "TYPE EMF - Excellence Mid-Frequency Noise Attenuation Duct Silencer",
  code: "EMF",
  image: "images/abie_tiger/duct_silencer.webp",
  blurb:
    "An enhanced mid-frequency duct silencer with perforated galvanized-steel splitters in a heavier-gauge outer casing, giving stronger mid-band attenuation than the standard MF for demanding mechanical applications.",
  specs: [
    { value: "24 ga.", label: "splitter steel" },
    { value: "20 ga.", label: "outer casing" },
    { value: "17.23%", label: "open area" },
  ],
  brochure: "brochures/abie_tiger/duct_silencer.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers",
  name: "TYPE SF - Suppreme Frequency Noise Attenuation Duct Silencer",
  code: "SF",
  image: "images/abie_tiger/duct_silencer.webp",
  blurb:
    "The top-tier duct silencer in the range, with perforated galvanized-steel splitters in a heavier-gauge outer casing, giving the broadest, strongest attenuation across the full frequency range.",
  specs: [
    { value: "24 ga.", label: "splitter steel" },
    { value: "20 ga.", label: "outer casing" },
    { value: "17.23%", label: "open area" },
  ],
  brochure: "brochures/abie_tiger/duct_silencer.pdf",
},


/* ============================================================
   ABIE TIGER — Product catalog
   Reconciled against "AIRBORNE NOISE SPECIFICATION" (Pub. A101–A113)
   • Removed 1 duplicate (Architectural Cloth Panel "AC")
   • Added 11 products present in the PDF but missing before
   ============================================================ */

/* ---------- ABIE TIGER · Acoustic Wall Panels ---------- */
{
  brand: "Abie Tiger",
  category: "Acoustic Wall Panels",
  name: "Weld Free Acoustic Access Wall",
  code: "AW",
  image: "images/abie_tiger/aw_access_wall.webp",
  blurb:
    "A weld-free modular access wall system combining acoustic panels, locking columns and a personnel door, finished with electrostatic powder coating and sealed with EPDM gaskets throughout. Independently tested for sound transmission (STC), noise reduction (NRC) and wind resistance.",
  specs: [
    { value: "1000×2000 mm", label: "max. panel size" },
    { value: "102 mm", label: "panel thickness" },
    { value: "STC / NRC", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Performance Doors",
  name: "Weld-Free Acoustic Door Leaf and Frame",
  code: "AD",
  image: "images/abie_tiger/ad_door.png",
  blurb:
    "A 45mm weld-free acoustic door leaf and single-rabbet frame, fully bolted or riveted (no welded joints) with an EPDM-sealed, air-tight threshold. Independently tested for sound transmission class and wind resistance.",
  specs: [
    { value: "45 mm", label: "door thickness" },
    { value: "102 × 38 mm", label: "jamb size" },
    { value: "STC", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Barrier Wall",
  name: "Noise Barrier with Rubber Seal",
  code: "NBR",
  image: "images/abie_tiger/nbr_noise_barrier.webp",
  blurb:
    "A modular outdoor noise barrier panel with a perforated steel face tuned for Helmholtz resonance and EPDM seals to prevent sound break-out, mounted on galvanized H-beam columns. Independently tested for STC and NRC.",
  specs: [
    { value: "1000×2000 mm", label: "panel size" },
    { value: "70 mm", label: "thickness" },
    { value: "100×100 mm", label: "H-beam column" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Glazing",
  name: "Sound Lock Glazing Window",
  code: "AW",
  image: "images/abie_tiger/aw_glazing_window.webp",
  blurb:
    "A multi-pane acoustic glazing window with a desiccant-sealed air gap and a perforated, absorption-filled middle channel that suppresses reflected sound between panes. Independently tested for sound transmission class.",
  specs: [
    { value: "5°", label: "vision incline" },
    { value: "23.63%", label: "mid-channel open area" },
    { value: "STC", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Louvers",
  name: "Acoustic Aero Foil Louver 300AL",
  code: "300AL",
  image: "images/abie_tiger/300al_louver.webp",
  blurb:
    "An acoustically lined aero-foil louver in a welded, hot-dip galvanized steel frame, designed to balance airflow with sound attenuation for ventilated wall openings.",
  specs: [
    { value: "300 mm", label: "depth" },
    { value: "1200×1200 mm", label: "size" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Louvers",
  name: "Acoustic Aero Foil Louver 600AL",
  code: "600AL",
  image: "images/abie_tiger/600al_louver.webp",
  blurb:
    "An acoustically lined aero-foil louver in a welded, hot-dip galvanized steel frame, designed to balance airflow with sound attenuation for ventilated wall openings.",
  specs: [
    { value: "600 mm", label: "depth" },
    { value: "1200×1200 mm", label: "size" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Louvers",
  name: "Acoustic Inverted V-Shaped Louver 600ELL",
  code: "600ELL",
  image: "images/abie_tiger/600ell_louver.png",
  blurb:
    "An inverted-V blade acoustic louver in a 600 mm deep hot-dip galvanized C-frame, with a perforated absorptive lining balancing high sound attenuation against low pressure drop for intake and exhaust openings. Independently tested for sound transmission class.",
  specs: [
    { value: "600 mm", label: "depth" },
    { value: "STC 33", label: "lab tested" },
    { value: "22.72%", label: "open area" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Barrier Wall",
  name: "Noise Blok",
  code: "NB",
  image: "images/abie_tiger/nb_noise_blok.png",
  blurb:
    "A modular acoustic noise-blocking panel from Abie Tiger's barrier range. Full specifications are available on request.",
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Absorption Panels ---------- */
{
  brand: "Abie Tiger",
  category: "Acoustic Wall Panels",
  name: "Absorptive Helmholtz Resonator Panel",
  code: "HP",
  image: "images/abie_tiger/hp_helmholtz_panel.webp",
  blurb:
    "An absorptive Helmholtz resonator panel in a PVDF colour-coated aluminium C-frame, perforated with 5 mm holes tuned to resonate at 125 Hz and backed with an absorption blanket for wide-band sound absorption. Interlocking hanging rails allow quick installation. Independently tested for noise reduction coefficient.",
  specs: [
    { value: "500 mm", label: "panel width" },
    { value: "42 mm", label: "depth" },
    { value: "NRC 0.89", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Wall Panels",
  name: "Absorptive High-Density Cloth Panel",
  code: "MC",
  image: "images/abie_tiger/mc_cloth_panel.png",
  blurb:
    "An absorptive high-density cloth-faced panel from Abie Tiger's wall panel range. Full specifications are available on request.",
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Wall Panels",
  name: "Machinery High Density Absorption Panel",
  code: "HAD",
  image: "images/abie_tiger/had_absorption_panel.png",
  blurb:
    "A high-density absorption panel for machinery noise control from Abie Tiger's wall panel range. Full specifications are available on request.",
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Wall Panels",
  name: "Absorptive High-Density Architectural Cloth Panel",
  code: "AC",
  image: "images/abie_tiger/ac_architectural_cloth_panel.png",
  blurb:
    "A fire-retardant, cloth-faced fiberglass absorption panel glued directly to walls or ceilings to reduce reverberant sound. Independently tested for noise reduction coefficient.",
  specs: [
    { value: "25 mm", label: "thickness" },
    { value: "80 kg/m³", label: "fiberglass density" },
    { value: "NRC", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Duct Silencers & Splitters ---------- */
{
  brand: "Abie Tiger",
  category: "Duct Silencers & Splitters",
  name: "Absorptive Helmholtz Resonator Splitter",
  code: "HS",
  image: "images/abie_tiger/hs_helmholtz_splitter.png",
  blurb:
    "An absorptive Helmholtz resonator splitter formed into a box section from perforated galvanized steel, tuned to the target noise spectrum and filled with absorption material for wide-band duct attenuation. Independently tested for dynamic insertion loss.",
  specs: [
    { value: "22.72%", label: "open area" },
    { value: "DIL", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers & Splitters",
  name: "Fan Coil Unit Splitters",
  code: "FCS",
  image: "images/abie_tiger/fcs_fan_coil_splitter.webp",
  blurb:
    "A modular fan coil unit splitter silencer in perforated galvanized steel with high-density absorption fill, delivering at least 10 dBA insertion loss between high and low fan speeds. Fire tested to BS 476 Part 24 at 650 °C for 60 minutes without damage.",
  specs: [
    { value: "22.65%", label: "open area" },
    { value: "≥10 dBA", label: "fan-speed IL" },
    { value: "650°C / 60 min", label: "fire tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers & Splitters",
  name: "Duct Silencer",
  code: "DS",
  image: "images/abie_tiger/ds_duct_silencer.png",
  blurb:
    "A rectangular duct silencer with a one-sheet splitter-and-nose system locked into the casing on interlocking tracks (no silicone joints) and packed with absorption material for high dynamic insertion loss. Independently tested for DIL.",
  specs: [
    { value: "22.72%", label: "open area" },
    { value: "DIL", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Duct Silencers & Splitters",
  name: "Absorptive Muffler",
  code: "AM",
  image: "images/abie_tiger/am_absorptive_muffler.png",
  blurb:
    "A cylindrical welded-steel absorptive muffler with perforated inner and centre tubes wrapped in stainless-steel mesh and high-density fill, rated for hot-air service up to 650 °C and flanged both ends to international standards. Independently tested for dynamic insertion loss.",
  specs: [
    { value: "4 mm", label: "casing steel" },
    { value: "650°C", label: "hot-air rated" },
    { value: "DIL", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Floating Floors ---------- */
{
  brand: "Abie Tiger",
  category: "Floating Floors",
  name: "Jack Up Rubber Concrete Floating Floor with Stopper",
  code: "CFF",
  image: "images/abie_tiger/cff_floating_floor.webp",
  blurb:
    "A ductile-iron jack-up floating floor mount with an integral overload stopper and QR-coded install instructions, cast into a 100 mm reinforced concrete slab on chloroprene rubber isolators for high impact and airborne isolation. Independently tested for field sound transmission.",
  specs: [
    { value: "69 mm", label: "mount height" },
    { value: "4 Hz", label: "natural frequency" },
    { value: "FSTC 72 / FIIC 68", label: "rated" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Floating Floors",
  name: "Spring Concrete Jack Up Floating Floor Mount",
  code: "RCF",
  image: "images/abie_tiger/rcf_floating_floor.webp",
  blurb:
    "A ductile-iron spring mount that jacks a concrete floor slab up to create an isolated air gap, giving high acoustic isolation across a wide frequency range. Mount height is field-adjustable, with QR codes on each unit linking to install instructions.",
  specs: [
    { value: "75–100 mm", label: "air gap" },
    { value: "2–10 Hz", label: "natural frequency" },
    { value: "LnTw 40 / FIIC 68", label: "impact rating" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Floating Floors",
  name: "Double Deflection Conical Rubber Mount Wooden Floating Floor with Stopper",
  code: "WFF",
  image: "images/abie_tiger/wff_floating_floor.png",
  blurb:
    "A two-layer plywood floating floor on double-deflection conical rubber mounts, giving low natural frequencies and strong impact/airborne noise isolation. Mount height is adjustable to level the floor precisely.",
  specs: [
    { value: "100–165 mm", label: "operating height" },
    { value: "4 Hz", label: "natural frequency" },
    { value: "LnTw 40 / FIIC 68", label: "impact rating" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Floating Floors",
  name: "Rubber Isolated Floor",
  code: "20RIF",
  image: "images/abie_tiger/20rif_floor.png",
  blurb:
    "An isolated rubber-mount flooring system installed over a reinforced concrete slab with acoustic fill, reducing both impact and airborne noise transmission.",
  specs: [
    { value: "Rubber", label: "isolation mounts" },
    { value: "RC slab", label: "substrate" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Vibration Isolators ---------- */
{
  brand: "Abie Tiger",
  category: "Vibration Isolators",
  name: "Conical Rubber Sway Brace",
  code: "SB",
  image: "images/abie_tiger/sb_sway_brace.webp",
  blurb:
    "A twin cone rubber isolator that laterally braces tall, acoustically isolated walls without transmitting vibration back to the main structure, keeping the wall's sound attenuation equal to or better than the floor and roof.",
  specs: [
    { value: "5 Hz", label: "natural frequency" },
    { value: "30%", label: "max. lateral load" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Acoustic Ceilings ---------- */
{
  brand: "Abie Tiger",
  category: "Acoustic Ceilings",
  name: "Acoustic Suspended Ceiling",
  code: "SC",
  image: "images/abie_tiger/sc_suspended_ceiling.webp",
  blurb:
    "A suspended acoustic ceiling hung on conical rubber hangers that isolate it from the structure above, with a built-in deflection indicator confirming correct loading. Tested to FSTC 65 in a reference floor/ceiling assembly.",
  specs: [
    { value: "40 mm", label: "rubber mount height" },
    { value: "<5 Hz", label: "natural frequency" },
    { value: "FSTC 65", label: "tested rating" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Acoustic Metal Composite Roofs ---------- */
{
  brand: "Abie Tiger",
  category: "Acoustic Metal Composite Roofs",
  name: "Acoustic Sandwich Roof",
  code: "AR",
  image: "images/abie_tiger/ar_sandwich_roof.webp",
  blurb:
    "A layered acoustic roof system - perforated aluminum ceiling, damping boards and standing-seam aluminum roofing - isolated on cone-shaped rubber mounts to control both airborne and structure-borne noise. Independently tested for STC and NRC.",
  specs: [
    { value: "400×64 mm", label: "seam profile" },
    { value: "4–7 Hz", label: "mount frequency" },
    { value: "STC / NRC", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Acoustic Wall Panels (diffuser) ---------- */
{
  brand: "Abie Tiger",
  category: "Acoustic Wall Panels",
  name: "Difflec Panel",
  code: "DF",
  image: "images/abie_tiger/df_difflec_panel.png",
  blurb:
    "A convex, half-circle diffuser panel that scatters sound energy in all directions to reinforce coverage, built from layered damping materials for high rigidity. Independently tested for STC and NRC.",
  specs: [
    { value: "325 mm", label: "diameter" },
    { value: "<63 Hz", label: "vibration-free below" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Music Practise Enclosures ---------- */
{
  brand: "Abie Tiger",
  category: "Music Practise Enclosures",
  name: "Mirror & Dance Practise Hand Rail",
  code: "MPHR",
  image: "images/abie_tiger/mphr_hand_rail.png",
  blurb:
    "A handrail accessory for mirror and dance practice rooms within Abie Tiger's Music Practise Enclosure range. Full specifications are available on request.",
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Acoustic Diffuser Panels ---------- */
{
  brand: "Abie Tiger",
  category: "Acoustic Diffuser Panels",
  name: "Diffuser Panel Prime 7",
  code: "DP7",
  image: "images/abie_tiger/dp7_diffuser_panel.png",
  blurb:
    "A modular Quadratic Residue Diffuser panel with solid wood fins that scatters sound across its tuned frequency range for clearer speech and even coverage, reflecting sound outside that range.",
  specs: [
    { value: "470–1,835 Hz", label: "diffusion range" },
    { value: "1200×2400 mm", label: "panel size" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Diffuser Panels",
  name: "Diffuser Panel Prime 19 (DP19/349-3321)",
  code: "DP19/349-3321",
  image: "images/abie_tiger/dp19_349_3321.png",
  blurb:
    "A modular Quadratic Residue Diffuser panel with real-wood fins, tuned to diffuse sound across a wide range for clear, evenly distributed speech reinforcement.",
  specs: [
    { value: "349–3,321 Hz", label: "diffusion range" },
    { value: "1200×2400 mm", label: "panel size" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Diffuser Panels",
  name: "Diffuser Panel Prime 19 (DP19/488-2972)",
  code: "DP19/488-2972",
  image: "images/abie_tiger/dp19_488_2972.png",
  blurb:
    "A modular Quadratic Residue Diffuser panel with real-wood fins, tuned to diffuse sound across a wide range for clear, evenly distributed speech reinforcement.",
  specs: [
    { value: "488–2,972 Hz", label: "diffusion range" },
    { value: "1200×2400 mm", label: "panel size" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Diffuser Panels",
  name: "Sound Diffsorp Panel Prime 7",
  code: "DS7",
  image: "images/abie_tiger/ds7_diffsorp_panel.png",
  blurb:
    "A hybrid diffuser/absorber panel with real-wood fins over a perforated aluminum backing, diffusing sound within its tuned range while absorbing it outside that range for balanced room acoustics.",
  specs: [
    { value: "554–3,671 Hz", label: "diffusion range" },
    { value: "22.72%", label: "backing open area" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Acoustic Diffuser Panels",
  name: "Diffsorb Panel",
  code: "DS",
  image: "images/abie_tiger/ds_diffsorb_panel.webp",
  blurb:
    "A hybrid Helmholtz-resonator diffuser/absorber panel in perforated galvanized steel with a fire-retardant tissue lining and dense absorption fill, faced with vertical wood diffuser strips. Independently tested for noise reduction coefficient.",
  specs: [
    { value: "15 mm", label: "wood strip thickness" },
    { value: "340 mm", label: "strip spacing" },
    { value: "NRC", label: "lab tested" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Sound Projection Systems ---------- */
{
  brand: "Abie Tiger",
  category: "Sound Projection Systems",
  name: "Sound Projection Wall",
  code: "PW",
  image: "images/abie_tiger/pw_projection_wall.png",
  blurb:
    "A convex, angle-adjustable acoustic projection wall built from layered high-rigidity damping panels on a tri-truss frame with integrated cabling, modeled in EASE 4.2 to keep loudness variation across the audience within 3 dB.",
  specs: [
    { value: "1200×2400 mm", label: "panel size" },
    { value: "±3 dB", label: "loudness variance" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Sound Projection Systems",
  name: "Sound Projection Orchestra Wall",
  code: "OW",
  image: "images/abie_tiger/ow_orchestra_wall.png",
  blurb:
    "A trolley-mounted, weight-balanced version of the Sound Projection Wall for orchestra shells, using the same convex high-rigidity panel construction and angle-adjustable tri-truss frame.",
  specs: [
    { value: "1200×2400 mm", label: "panel size" },
    { value: "±3 dB", label: "loudness variance" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Sound Projection Systems",
  name: "Sound Projection Ceiling",
  code: "PC",
  image: "images/abie_tiger/pc_projection_ceiling.png",
  blurb:
    "A hung, angle-adjustable acoustic projection ceiling with integrated cabling and lighting power, modeled in EASE 4.2 to keep loudness variation at the audience within 3 dB.",
  specs: [
    { value: "1200×2400 mm", label: "panel size" },
    { value: "±3 dB", label: "loudness variance" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Sound Projection Systems",
  name: "Sound Projection Orchestra Shell Ceiling",
  code: "OC",
  image: "images/abie_tiger/oc_orchestra_shell_ceiling.png",
  blurb:
    "A motorized, rigged orchestra shell ceiling that raises and lowers into position on a multi-drum winch system, with each row individually angled and cabled for power and lighting, engineered to hold loudness variation within 3 dB.",
  specs: [
    { value: "8×", label: "cable safety factor" },
    { value: "0.015–0.08 m/s", label: "rigging speed" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Sound Projection Systems",
  name: "Sound Projection Rotatable Ceiling",
  code: "PRC",
  image: "images/abie_tiger/prc_rotatable_ceiling.png",
  blurb:
    "A motorized rigging ceiling that rotates to redirect sound from different stage positions toward the audience, keeping loudness variation within 3 dB across target positions.",
  specs: [
    { value: "8×", label: "cable safety factor" },
    { value: "±3 dB", label: "loudness variance" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},
{
  brand: "Abie Tiger",
  category: "Sound Projection Systems",
  name: "Acoustic Tri-Purpose Wall",
  code: "TW",
  image: "images/abie_tiger/tw_tri_purpose_wall.png",
  blurb:
    "A motorized, computer-controlled wall combining diffuser, sound-projection and diffsorp panel faces on a single triangular module, so the room's acoustics can be reconfigured to suit at least 10 different show types.",
  specs: [
    { value: "400 mm", label: "panel width" },
    { value: "554–3,671 Hz", label: "diffuser range" },
    { value: "10+", label: "show configurations" },
  ],
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- ABIE TIGER · Flooring ---------- */
{
  brand: "Abie Tiger",
  category: "Flooring",
  name: "Leveling Epoxy Floor",
  code: "LEF",
  image: "images/abie_tiger/lef_epoxy_floor.png",
  blurb:
    "A leveling epoxy floor finish from Abie Tiger's flooring range. Full specifications are available on request.",
  brochure: "brochures/abie_tiger/airborne_noise_specification.pdf",
},

/* ---------- STARDUCT · Ductwork ---------- */
{
  brand: "Starduct",
  category: "Ductwork",
  name: "Spiral & Rectangular Ductwork",
  code: "",
  image: "",
  blurb:
    "Factory-fabricated spiral and rectangular ductwork for commercial and industrial air distribution, manufactured to AMCA, ASHRAE, UL and ISO standards.",
  specs: [
    { value: "AMCA / ASHRAE", label: "design standards" },
    { value: "UL / ISO", label: "certified" },
  ],
  brochure: "",
},

/* ---------- STARDUCT · Diffusers & Air Outlets ---------- */
{
  brand: "Starduct",
  category: "Diffusers & Air Outlets",
  name: "Diffusers & Air Outlets",
  code: "",
  image: "",
  blurb:
    "Supply and return air diffusers, grilles and outlets engineered for even air distribution and quiet operation.",
  brochure: "",
},

/* ---------- STARDUCT · Fire & Smoke Dampers ---------- */
{
  brand: "Starduct",
  category: "Fire & Smoke Dampers",
  name: "Fire & Smoke Dampers",
  code: "",
  image: "",
  blurb:
    "Fire and smoke dampers that seal ductwork at fire-rated barriers, isolating smoke and flame spread to protect life-safety systems.",
  brochure: "",
},

/* ---------- STARDUCT · Volume Control Dampers ---------- */
{
  brand: "Starduct",
  category: "Volume Control Dampers",
  name: "Volume Control Dampers (VCD)",
  code: "VCD",
  image: "",
  blurb:
    "Manual and motorized volume control dampers for balancing airflow across a duct network, plus butterfly valves for simple on/off control.",
  brochure: "",
},

/* ---------- STARDUCT · VAV Boxes ---------- */
{
  brand: "Starduct",
  category: "VAV Boxes",
  name: "VAV Boxes",
  code: "",
  image: "",
  blurb:
    "Variable air volume boxes that modulate airflow to each zone, matching supply to real-time heating and cooling demand.",
  brochure: "",
},

/* ---------- STARDUCT · Duct Silencers ---------- */
{
  brand: "Starduct",
  category: "Duct Silencers",
  name: "Duct Silencers",
  code: "",
  image: "",
  blurb:
    "Rectangular and circular duct silencers that attenuate fan and airflow noise travelling through the ductwork.",
  brochure: "",
},

/* ---------- STARDUCT · Cable Trays & Supports ---------- */
{
  brand: "Starduct",
  category: "Cable Trays & Supports",
  name: "Cable Trays & Duct Supports",
  code: "",
  image: "",
  blurb:
    "Cable trays, ductwork hangers and structural supports for coordinated MEP installations.",
  brochure: "",
},

];

// Lets scripts/migrate-products.js `require()` this file from Node to seed
// the database. Browsers never define `module`, so this is a no-op there —
// PRODUCTS stays a plain global for products.js to use as before.
if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCTS;
}
