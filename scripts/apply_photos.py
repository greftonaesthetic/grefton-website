# One-off: wire the supplied Grefton photos/video into every page (replaces the original template photos).
import re, json, os
I = lambda n: "/images/%s.webp" % n
POOL, PERGOLA, P1, P2, INTRO, FOOT, ENJOY, CTA = map(I, ["pool-retreat", "pergola-oasis", "process-1", "process-2", "home-intro", "footer-family", "step-enjoy", "cta-lets-talk"])
STEP = {k: I("step-" + k) for k in ["consult", "design", "approve", "build", "enjoy"]}

# old file fragment -> new image (applies to every page, every occurrence)
GLOBAL = {
    "casa_flora_panoramica_5": PERGOLA,       # inner-page header strip
    "granaio_maggio_26_3": POOL,              # video poster
    "meike-mejuma": CTA,                      # "let's talk" block
    "Meike_Pim_koffitafel": FOOT,             # footer image
    "Meike_Pim_cypressen": PERGOLA,
    "Pim_olijbomen": PERGOLA,
    "Meike_koffitafel": P2,
    # project cards (also used in data/projects.ts)
    "Semifonte_7": POOL, "esterno_casale": P1, "LOGGE": PERGOLA, "Esterni_vista_frontale_PISCINA": FOOT,
    "SCOTTE_0059": INTRO, "VILLA_ISABELLA_COPERTINA": P2, "Frame_69": ENJOY,
    # galleries / misc
    "Tuscany_foto_3411930_2": POOL, "Witte_en_bruine_zeilboot": PERGOLA, "pergola%202": P1,
    "Bomen_bij_weg_tijdens_zonsondergang_2-1e2v9tc": P2, "esterno_apt._13": INTRO,
    "Dorp%20onder": ENJOY, "Pots_op_Stappen": FOOT, "Zomerstoel": POOL, "Bomen_bij_weg_tijdens_zonsondergang_2-1q4fmrt": PERGOLA,
    "Tafel_met_borden": P1, "Stone%20Building%20with%20Plants": P2, "Stone_Building_Wine_Rack": INTRO,
    "Tuscany%20foto%20136935423": FOOT, "Bruine_bakstenen_boog": ENJOY,
    "Meike_Pim_trap": P1, "Meike-trap": P2,
    "Witte_en_bruine_huis_foto_14": P1, "Witte_en_bruine_huis_foto_5": P2, "Witte_en_bruine_huis_foto_21": POOL,
    "Witte_en_bruine_huis_foto_3": STEP["design"], "soggiorno_moderno": P1,
    "Huis_met_zwembad": POOL, "image_7-8ysf37": INTRO,
}
# (file, old fragment, nth occurrence) -> new image, takes priority over GLOBAL
SPECIFIC = {
    ("app/page.tsx", "Meike_Pim_koffitafel", 0): STEP["consult"],
    ("app/process/page.tsx", "Meike_Pim_koffitafel", 0): STEP["consult"],
    ("app/process/page.tsx", "Meike_Pim_cypressen", 0): STEP["approve"],
    ("app/process/page.tsx", "Pim_olijbomen", 0): STEP["build"],
    ("app/process/page.tsx", "soggiorno_moderno", 0): STEP["enjoy"],
}

files = ["app/page.tsx", "app/about/page.tsx", "app/process/page.tsx", "app/services/page.tsx",
         "app/uae-landscaping/page.tsx", "app/contact/page.tsx", "app/projects/page.tsx"]
img_re = re.compile(r'(<img\b[^>]*?\bsrc=")([^"]+)(")')
leftover = []
for rel in files:
    path = os.path.join("src", rel)
    s = open(path, encoding="utf8").read()
    counts = {}
    def sub(m):
        old = m.group(2)
        if old.startswith("/images/"):
            return m.group(0)
        for frag in GLOBAL:
            if frag in old:
                n = counts.get(frag, 0); counts[frag] = n + 1
                new = SPECIFIC.get((rel, frag, n), GLOBAL[frag])
                return m.group(1) + new + m.group(3)
        leftover.append((rel, old)); return m.group(0)
    s = img_re.sub(sub, s)
    open(path, "w", encoding="utf8").write(s)
print("unmapped:", leftover)

# video: both background-video blocks use the supplied hero video
p = "src/app/page.tsx"
s = open(p, encoding="utf8").read()
s, n = re.subn(r'data-player-src="[^"]+"', 'data-player-src="/video/hero.mp4"', s)
open(p, "w", encoding="utf8").write(s); print("video blocks:", n)

# project data (cards + detail galleries)
p = "src/data/projects.ts"
s = open(p, encoding="utf8").read()
a = s.index("export const projects: Project[] = ") + len("export const projects: Project[] = ")
b = s.index(" as unknown as Project[];")
data = json.loads(s[a:b])
card = {"palm-villa-garden": POOL, "arabian-ranches-community-park": P1, "downtown-sky-terrace": PERGOLA, "al-barari-family-retreat": FOOT,
        "emirates-hills-estate": INTRO, "saadiyat-hotel-courtyard": P2, "jumeirah-beachfront-residence": ENJOY}
pool = [POOL, PERGOLA, P1, P2, INTRO, FOOT, ENJOY]
for i, d in enumerate(data):
    first = card[d["slug"]]
    rest = [x for x in pool if x != first]
    # gallery starts with the project's own cover, then the others rotated so galleries differ
    rot = rest[i % len(rest):] + rest[:i % len(rest)]
    d["cardImage"] = first
    d["images"] = [first] + rot
    d["highlightImages"] = [rot[0], rot[1]]
s = s[:a] + json.dumps(data, ensure_ascii=False, indent=2) + s[b:]
open(p, "w", encoding="utf8").write(s)
print("projects updated")
