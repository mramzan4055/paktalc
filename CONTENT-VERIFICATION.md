# Content Verification Register

Facts that need confirmation from PakTalc / SKZ management before launch.
Status: **VERIFY_REQUIRED** unless noted. The site uses conservative wording or omits the fact until confirmed.
Where a fact *is* published, the page location is listed so it can be edited in one place (`content/*.ts`).

## A. Company & contact

| # | Item | Sources found | What the site does now | Location |
|---|---|---|---|---|
| A1 | Head office address | paktalc.com/contacts: "411 Gulshan Block, Iqbal Town, Lahore". SKZ site + Affiliation page: "Head Office Islamabad", "P.O Box # 2273, Islamabad 44000" | Shows **Islamabad** (two sources agree), no street address | `content/company.ts` |
| A2 | Phone numbers | +92 312 5112324 (header of both sites); +92 306 1515313 and +92 319 1515313 (paktalc contact block) | Shows +92 312 5112324 only | `content/company.ts` |
| A3 | Email | info@paktalc.com (paktalc), info@skzminingcompany.com (SKZ) | info@paktalc.com | `content/company.ts` |
| A4 | WhatsApp number | Joinchat widget present, number not visible | Not shown | — |
| A5 | Social profiles | Placeholders only | Not shown | `content/company.ts` (`social: []`) |
| A6 | SKZ licence "No. 44587", "SKZ Mining, 2000 – 2017" | SKZ contacts page | Not published | — |
| A7 | Founding date / years of experience ("last decade", "decades of expertise", "2000–2017") | Inconsistent | Not published | — |
| A8 | Relationship Shokozan Mining Co., Ltd. (Japan) ↔ SKZ ↔ Afghan Talc Ltd. — ownership? affiliate? | Structure chart (A292), Affiliation page ("world wide branch offices") | Chart shown with caption "as described in company records"; JSON-LD models only PakTalc → parentOrganization SKZ | `/affiliation/` |
| A9 | "Shokozan since 1917" | Affiliation page heading | Not published | — |
| A10 | Directors: Amin Ullah Baig, Shujiro Yano | Affiliation page | Published on `/about/` + `/affiliation/` (already public) — confirm consent/spelling | `content/company.ts` |
| A11 | Managers named on old Affiliation page (Aamir Gulzar, Muhammad Hussain, Badshah Gul) | Affiliation page | **Not** published by name (roles only) pending consent | — |
| A12 | Director photo captions (A076 "company director", A257 "Japanese technical expert") — which person is which | Image manifest | Captions use roles, not names | `/about/` |

## B. Operations & facilities

| # | Item | Sources | Site | Location |
|---|---|---|---|---|
| B1 | Talc origins: Afghan (Khogyani, Agam, Shinwari); Pakistani (Haripur, Parachinar, Chitral) | Company origins diagram (A317), lab report "Agam 02" | Published as "sources described in company records" | `content/talc.ts` |
| B2 | Old site claims "operations in Hazara, Abbottabad and Peshawar" | Home/About | Published as "Hazara region (incl. Haripur/Abbottabad)" only in context of Pakistani talc — confirm whether PakTalc/SKZ **operates** mines there or **sources** from them | `content/operations.ts` |
| B3 | Two meshing plants, Hayatabad Industrial Zone, Peshawar; hammer mill & Raymond mill; "250 to 2500 mesh" | Affiliation page, photos | Published; mesh range worded "rated by the company for…" | `content/facilities.ts` |
| B4 | Processing & storage, Ring Road, Peshawar | Affiliation page | Published | `content/facilities.ts` |
| B5 | Sorting & packing, Moach Goth, Karachi | Affiliation page, supply-chain diagram | Published | `content/facilities.ts` |
| B6 | Processing plant Jalalabad; stock area Morga; Torkham border crossing | Structure + supply-chain diagrams | Published only within diagram explanation | `/affiliation/` |
| B7 | Plants in Hiroshima / Tokyo / Gilgit-Baltistan | Old home/gallery (inconsistent: Hiroshima vs Tokyo) | **Not published** | — |
| B8 | Micronizing capability | Photo A201 (micronizing classifier) + old text | Published (photo evidence) — confirm which plant | `content/operations.ts` |
| B9 | Surface treatment / coated talc service | Old services page | **Not published** | — |
| B10 | Import of niche talc grades | Old services page | **Not published** | — |
| B11 | Blasting, satellite imaging, core drilling, "AI-based exploration", "automated drilling", water recycling, misting dust suppression | Old mining page | Not published; site describes only what photos evidence (geological survey, compass, adits, underground chambers, hand sorting, conveyors, mills, cyclones, dust collectors) | — |
| B12 | Lump/powder yield ratios: Afghan 50 % big lumps (>20 mm) / 20 % small lumps (>5 mm) / 30 % powder; Haripur 50/50; Parachinar 95/5 | Affiliation page | Published on `/talc/lumps/` as "typical yield per company records" | `content/talc.ts` |
| B13 | Production capacity / tonnage | None | Not published | — |

## C. Quality & specifications

| # | Item | Sources | Site |
|---|---|---|---|
| C1 | Lab report "Agam 02": talc mesh powder, SKZ Yard Peshawar, 25 kg bag / ton bag, above 325 mesh (Bettersizer ST); LOI < 8 %, SiO₂ 60–64 %, MgO 30–33 %, whiteness > 93 (Konica), sieve residue 0.03, bulk density 0.31 g/cm³ | Scan A091 | Published as a **single sample** result. **Report is undated** – add date/sample ID |
| C2 | Lab report "DD": above 400 mesh; LOI < 6 %, SiO₂ > 60 %, MgO > 30 %, whiteness > 94, sieve residue 0.03, bulk density 0.40 | Scan A092 | Same as C1 |
| C3 | Reference spec table: whiteness ≥ 92 %, LOI < 7 %, D50 ≤ 25 (unit not stated — µm?), MgO 31.88 %, SiO₂ 63.37 %, water 4.75 % | Affiliation page | **Not published as a company spec.** The chemical values are (almost exactly) the *theoretical* composition of pure talc (SiO₂ 63.4 %, MgO 31.9 %, H₂O 4.8 %), so they look copied from a textbook, not measured. The site states the theoretical composition as general science and uses the two lab reports for real data. Confirm whether whiteness ≥ 92 % / LOI < 7 % / D50 ≤ 25 µm is a standard offer spec |
| C4 | "Whiteness typically above 90 %" for lumps | Old talc page | Not published as a claim; lab values used instead |
| C5 | ISO 9001:2015, ISO 14001:2015, SGS/Bureau Veritas, "ISO-certified labs", REACH, USP/EP/BP, asbestos-free, "safe for skin" | Old site | **None published.** Provide certificates / test reports to add them |
| C6 | Which lab equipment is at SKZ Laboratory Peshawar (Bettersizer ST, Konica colour reader named in reports) | Lab reports | Named only as the methods written on the reports |

## D. Markets & commercial

| # | Item | Site |
|---|---|---|
| D1 | Export markets "Japan, Europe, Middle East, North America" | Not published as a claim. Japanese technical partnership is shown (photo evidence) |
| D2 | Testimonials ("Global Client, USA", "Distributor, UAE", "Geologist, Pakistan") | Removed |
| D3 | Minimum order quantities, lead times, Incoterms, payment terms | Not published; RFQ asks the buyer instead |
| D4 | Packing: 25 kg bags, jumbo (ton) bags, container loading | Published (lab report + photos) |
| D5 | Colour grades coffee / white / grey / green | Published (colour-grade image + Affiliation page) |

## E. Media & legal
| # | Item |
|---|---|
| E1 | Consent for identifiable people in photos (`review_flag` column in `paktalc-image-map.csv`) |
| E2 | Privacy policy text — a conservative draft is published at `/privacy/`; have it reviewed |
| E3 | Author/reviewer for Insights — currently "PakTalc Technical Team"; add a named reviewer (e.g., company geologist) |
