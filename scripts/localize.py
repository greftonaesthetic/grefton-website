# One-off: rewrite the converted Mejuma pages for Grefton (UAE landscaping).
# Run from the grefton/ folder:  python scripts/localize.py
# After this runs the generated TSX is hand-maintained (do NOT re-run scripts/convert.mjs).
import json, os, re, shutil, io, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf8")
APP = "src/app"
ROOT = os.getcwd()

# ----------------------------------------------------------------------------
# Content
# ----------------------------------------------------------------------------
PHONE = "+971 00 000 0000"          # TODO real number
PHONE2 = "+971 00 000 0001"         # TODO real number
EMAIL = "info@grefton.ae"           # TODO real email
EMAIL_FOUNDER = "founder@grefton.ae"
EMAIL_LEAD = "projects@grefton.ae"

# old project -> new project (1:1)
PROJECTS = [
    dict(old="La Valle di Semifonte", oldslug="la-valle-di-semifonte", oldfile="la-valle-di-semifonte",
         name="Palm Villa Garden", slug="palm-villa-garden", location="Palm Jumeirah, Dubai", type="Private villa", area="850 m²",
         desc="A private oasis on the Palm: a family garden with a resort-style pool, a shaded majlis and an outdoor kitchen, designed around sea breezes and long summer evenings. Heat-tolerant planting and smart irrigation keep it green all year.",
         specs=[("Emirate", "Dubai"), ("Plot area", "850 m²"), ("Features", "Pool, majlis garden, outdoor kitchen"), ("Duration", "14 weeks"),
                ("Client type", "Private villa owner"), ("Planted area", "320 m²"), ("Completed", "2025"), ("Trees planted", "28")],
         intro="A private oasis on the Palm: a family garden with a resort-style pool, a shaded majlis and an outdoor kitchen, designed around sea breezes and long summer evenings.",
         sections=[("The design", "The garden is organised around the pool, with a shaded majlis on one side and an outdoor kitchen and dining terrace on the other. Layered planting softens the boundaries and frames the view of the water."),
                   ("Planting & irrigation", "Date palms, ghaf trees and salt-tolerant shrubs were chosen for the coastal climate. A zoned drip system with smart controls keeps water use low while the garden stays green."),
                   ("Scope", "Landscape design, hardscape, pool, softscape, irrigation and lighting.")],
         delivery=("Completed", "2025"),
         highlights=["A pool framed by palms. Long evenings by the water, with the Gulf breeze all around you.",
                     "A shaded majlis garden. A cool, private place to host family and friends."]),
    dict(old="Dimora Montecchio", oldslug="dimora-montecchio", oldfile="dimora-montecchio",
         name="Arabian Ranches Community Park", slug="arabian-ranches-community-park", location="Arabian Ranches, Dubai", type="Community", area="4,500 m²",
         desc="A shared park for a residential community: shaded walking paths, a children's play area, a barbecue lawn and a water feature at its heart. Planted for shade, designed for daily use and built to be maintained efficiently.",
         specs=[("Emirate", "Dubai"), ("Plot area", "4,500 m²"), ("Features", "Play area, walking paths, barbecue lawn, water feature"), ("Duration", "9 months"),
                ("Client type", "Developer / community"), ("Planted area", "2,800 m²"), ("Completed", "2024"), ("Trees planted", "140")],
         intro="A shared park for a residential community: shaded walking paths, a children's play area, a barbecue lawn and a water feature at its heart.",
         sections=[("Community first", "The park is designed for daily use by families, with shaded routes, seating nooks and safe, clearly separated play zones."),
                   ("Low-maintenance planting", "Native and adapted species keep irrigation and maintenance needs low, so the park looks good long after handover."),
                   ("Scope", "Masterplan, softscape, hardscape, play equipment, irrigation and lighting.")],
         delivery=("Completed", "2024"),
         highlights=["Shade where it matters. Tree-lined paths that stay comfortable well into the afternoon.",
                     "A lawn made for gatherings. Space for weekend barbecues, picnics and celebrations."]),
    dict(old="Le Logge Del Papa", oldslug="le-lodge-del-papa-09gze", oldfile="le-lodge-del-papa-09gze",
         name="Downtown Sky Terrace", slug="downtown-sky-terrace", location="Downtown Dubai", type="Rooftop terrace", area="180 m²",
         desc="A rooftop terrace high above the city, turned into a planted retreat. Raised planters, a compact water feature and a lounge area bring calm to an urban setting, with wind-resistant planting and discreet lighting for the evening.",
         specs=[("Emirate", "Dubai"), ("Terrace area", "180 m²"), ("Features", "Raised planters, water feature, lounge area"), ("Duration", "8 weeks"),
                ("Client type", "Private apartment owner"), ("Planted area", "60 m²"), ("Completed", "2025"), ("Trees planted", "9")],
         intro="A rooftop terrace high above the city, turned into a planted retreat with raised planters, a compact water feature and a lounge area.",
         sections=[("Designing for height", "Wind, sun and weight limits shaped every choice, from lightweight planters to wind-resistant species and a carefully engineered drainage layer."),
                   ("An evening retreat", "Warm, low-level lighting and a small water feature turn the terrace into a calm escape once the sun goes down."),
                   ("Scope", "Design, structural coordination, planters, planting, lighting and irrigation.")],
         delivery=("Completed", "2025"),
         highlights=["A garden in the sky. Green planting against the skyline, a world away from the street below.",
                     "Designed for the evening. Soft lighting and the sound of water once the heat of the day has passed."]),
    dict(old="Tuscan Farmhouse Portion in the Heart of Chianti Classico", oldslug="tuscan-farmhouse-portion-in-the-heart-of-chianti-classico",
         oldfile="tuscan-farmhouse-portion-in-the-heart-of-chianti-classico",
         name="Al Barari Family Retreat", slug="al-barari-family-retreat", location="Al Barari, Dubai", type="Private villa", area="1,100 m²",
         desc="A lush family retreat in a green community: mature trees, a natural-style pool, a kids' lawn and a pergola for long lunches in the shade. A mix of lush and desert-adapted planting keeps the garden rich without waste.",
         specs=[("Emirate", "Dubai"), ("Plot area", "1,100 m²"), ("Features", "Natural-style pool, pergola, kids' lawn"), ("Duration", "16 weeks"),
                ("Client type", "Private villa owner"), ("Planted area", "520 m²"), ("Completed", "2024"), ("Trees planted", "36")],
         intro="A lush family retreat in a green community: mature trees, a natural-style pool, a kids' lawn and a pergola for long lunches in the shade.",
         sections=[("A garden to live in", "Every zone has a purpose: a lawn for play, a pergola for dining, a pool for cooling off and quiet corners for rest."),
                   ("Planting palette", "Mature shade trees, flowering shrubs and desert-adapted groundcovers create layers of texture while keeping water use in check."),
                   ("Scope", "Design, build, planting, pool, pergola and smart irrigation.")],
         delivery=("Completed", "2024"),
         highlights=["A pool among the greenery. Swimming with leafy planting all around you.",
                     "Lunch in the shade. A pergola built for long meals with family and friends."]),
    dict(old="Villa Le Scotte", oldslug="villa-le-scotte", oldfile="villa-le-scotte",
         name="Emirates Hills Estate", slug="emirates-hills-estate", location="Emirates Hills, Dubai", type="Estate garden", area="2,600 m²",
         desc="A grand estate garden with formal lawns, a long reflecting pool, an outdoor pavilion and a mature planting scheme. Designed for large-scale entertaining and equally for quiet everyday moments.",
         specs=[("Emirate", "Dubai"), ("Plot area", "2,600 m²"), ("Features", "Reflecting pool, pavilion, formal lawns"), ("Duration", "7 months"),
                ("Client type", "Private estate owner"), ("Planted area", "1,200 m²"), ("Completed", "2025"), ("Trees planted", "64")],
         intro="A grand estate garden with formal lawns, a long reflecting pool, an outdoor pavilion and a mature planting scheme.",
         sections=[("Formal structure", "A strong central axis, clipped hedging and a reflecting pool give the estate an elegant, ordered backbone."),
                   ("Entertaining at scale", "The pavilion, terraces and lawn can host large gatherings, while smaller seating areas keep quieter moments intimate."),
                   ("Scope", "Masterplan, design, hardscape, water features, softscape, irrigation and lighting.")],
         delivery=("Completed", "2025"),
         highlights=["A reflecting pool on axis. Still water that mirrors the sky and the pavilion beyond.",
                     "Mature trees from day one. Instant shade and presence, planted with care."]),
    dict(old="Villa Isabella", oldslug="villa-isabella", oldfile="villa-isabella",
         name="Saadiyat Hotel Courtyard", slug="saadiyat-hotel-courtyard", location="Saadiyat Island, Abu Dhabi", type="Hospitality", area="1,400 m²",
         desc="The central courtyard of a boutique beachside hotel, redesigned as a garden that guests remember. Shaded seating, a lap pool, evening lighting and planting that stands up to sea air and heavy daily use.",
         specs=[("Emirate", "Abu Dhabi"), ("Plot area", "1,400 m²"), ("Features", "Courtyard garden, lap pool, lighting"), ("Duration", "5 months"),
                ("Client type", "Hospitality"), ("Planted area", "480 m²"), ("Completed", "2025"), ("Trees planted", "42")],
         intro="The central courtyard of a boutique beachside hotel, redesigned as a garden that guests remember.",
         sections=[("The brief", "A calm, shaded heart for the hotel, durable enough for daily use by guests and staff, and beautiful from every window."),
                   ("Built for sea air", "Salt-tolerant planting, marine-grade materials and a robust irrigation system keep the courtyard looking fresh with minimal upkeep."),
                   ("Scope", "Design, hardscape, pool, softscape, lighting and maintenance programme.")],
         delivery=("Completed", "2025"),
         highlights=["A courtyard worth lingering in. Shaded seating and soft planting at the centre of the hotel.",
                     "Lit for the evening. Warm lighting that makes the garden glow after sunset."]),
    dict(old="Historic Villa Di Larniano Residence", oldslug="histori-villa-di-larniano-residence", oldfile="histori-villa-di-larniano-residence",
         name="Jumeirah Beachfront Residence", slug="jumeirah-beachfront-residence", location="Jumeirah, Dubai", type="Private villa", area="950 m²",
         desc="A beachfront villa garden that opens straight onto the sand: a sweeping lawn, a feature pool with sun terrace and layered coastal planting. Designed to frame the sea view and handle salt, wind and sun.",
         specs=[("Emirate", "Dubai"), ("Plot area", "950 m²"), ("Features", "Feature pool, sun terrace, coastal planting"), ("Duration", "12 weeks"),
                ("Client type", "Private villa owner"), ("Planted area", "300 m²"), ("Completed", "2024"), ("Trees planted", "22")],
         intro="A beachfront villa garden that opens straight onto the sand: a sweeping lawn, a feature pool with sun terrace and layered coastal planting.",
         sections=[("Framing the view", "The garden steps down toward the beach, with planting kept low along the sightlines so the sea remains the main feature."),
                   ("Coastal resilience", "Salt- and wind-tolerant species, durable materials and careful drainage keep the garden strong against the elements."),
                   ("Scope", "Design, hardscape, pool, planting, irrigation and lighting.")],
         delivery=("Completed", "2024"),
         highlights=["A pool with the sea beyond. Swim with the horizon in view.",
                     "A lawn that rolls to the beach. Open space for play, walks and sunsets."]),
]
BY_OLD = {p["old"]: p for p in PROJECTS}

# exact text replacements (global)
EXACT = {
    "Turnkey Solutions": "Services", "Properties": "Projects", "Our Process": "Our Process", "Tuscany": "UAE Landscaping",
    "Turnkey solutions": "Services", "Our proces": "Our process", "Tuscany, 2026": "Grefton, UAE 2026",
    "+316 45 69 61 42": PHONE, "+316 50 89 20 89": PHONE2,
    "info@mejuma-tuscany.com": EMAIL, "meike@mejuma-tuscany.com": EMAIL_FOUNDER, "pim@mejuma-tuscany.com": EMAIL_LEAD,
    "nl": "ar", "Let’s meet!": "Let’s talk!", "mejuma": "Grefton",
    "Explore our properties": "Explore our projects", "Selected properties": "Selected projects",
    "Price from to": "Project type", "Price from – to": "Project type",
    "Request a viewing": "Request a quote", "Whatsapp us": "WhatsApp us",
    "Curious what we have to offer?": "Curious what we can build?",
    "Discover our properties.": "Discover our projects.",
    "Turnkey property solutions": "Turnkey landscape solutions",
    "Why choose mejuma": "Why choose Grefton",
    "Discover": "Consult", "Find": "Design", "Secure": "Approve", "Coordinate": "Build", "Arrive": "Enjoy",
    "Handpicked by design": "Designed for the climate", "Curated homes": "Climate-smart",
    "Verified projects": "Licensed & approved", "Local expertise": "Local expertise",
    "Property search": "Landscape design", "Purchase guidance": "Softscape & planting",
    "Construction & project management": "Hardscape & construction", "Interior design": "Pools & water features",
    "Local team selection": "Trusted specialists", "Interior & finishing": "Finishing & lighting",
    "Interior styling": "Smart irrigation & lighting", "Second home buyers": "Villa owners",
    "Property investors": "Developers & communities", "Permant relocation": "Hotels & hospitality",
    "For your next chapter": "For your guests", "Initial call": "Initial call",
    "Search and selection": "Site visit and design", "Due Diligence": "Quotation and approvals",
    "Purchase": "Construction", "After the Purchase": "After handover",
    "The small letters": "The small print", "How a purchase works": "How a project works",
    "The buying process": "The project process",
    "Life moves differently here": "Outdoor living, reimagined",
    "A slower pace. A richer life.": "Built for the sun. Made to be lived in.",
    "It's about feeling at home.": "It's about feeling at home outside.",
    "What we love about Tuscany.": "What we love about UAE landscaping.",
    "It’s time to explore.": "It’s time to explore.",
    "The benefits of Tuscany.": "The benefits of outdoor living.",
    "Why we fell in love with Tuscany.": "Why we love landscaping in the UAE.",
    "Meet Meike.": "Meet the founder.", "Meet Pim.": "Meet the project lead.",
    "Off-market properties": "Custom projects",
    "Tuscan buildings, reimagined for modern living.": "Outdoor spaces, designed for modern living.",
    "Thinking about Tuscany?": "Planning your outdoor space?",
    "Haven't found the right property?": "Don't see your kind of project?",
    "Discover our process": "Discover our process",
    "Buying in Italy is romantic. Managing it from abroad rarely is.": "Landscaping in the UAE is hard to get right. Managing it shouldn't be.",
    "That's why we founded mejuma.": "That's why we founded Grefton.",
    "Price": "Type", "Size": "Area",
    "Our solutions": "Our services", "How it works": "How it works",
    "Turnkey solutions ": "Services",
}
# the "Selected properties"/Discover/etc. singletons above are exact; page headings handled by prefix below
PREFIX = [
    ("Discover a carefully curated selection of Tuscan homes", "Landscape design, build and care for villas, hotels and communities across the UAE, with one trusted team from concept to handover."),
    ("We guide the search, purchase, renovation", "We guide the design, approvals, build and long-term care of your outdoor space."),
    ("Our mission is simple", "Our mission is simple: to make your outdoor space as enjoyable to live in as it is to look at. Every project is tailored to your property, your lifestyle and the UAE climate, with one trusted partner guiding you from concept to completion. We believe great work starts with honest advice, the right plants and materials, and local expertise. We look forward to working with you."),
    ("We start by understanding your needs", "We visit your site and listen to how you use the space, your style, budget and timeline. This creates a clear foundation for the whole project."),
    ("Based on your criteria, we curate", "We prepare a concept, planting plan and 3D visuals, then refine them with you until the design feels right."),
    ("We guide you through the entire purchase process", "We prepare the drawings and handle developer and municipality approvals, and connect you with our trusted network of engineers, irrigation specialists, pool builders and suppliers."),
    ("Once the purchase is complete", "Our project manager coordinates the groundwork, planting, hardscape, pool and lighting teams, monitors progress and keeps you informed at every stage."),
    ("Your property is delivered ready to enjoy", "Your landscape is handed over ready to enjoy, with a care guide and an optional maintenance plan to keep it thriving through summer and winter."),
    ("Language barriers, legal procedures", "Extreme heat, salt, water costs, permits and contractors who disappear halfway through can quickly turn a dream garden into a headache. Great design is only the beginning."),
    ("We coordinate the entire journey, from property search", "We coordinate the entire journey, from design and approvals to planting, construction and long-term care, so you can focus on enjoying the space you've created."),
    ("We went through the same journey ourselves", "We know the UAE climate, developer guidelines and the local supply chain. Today we use that experience to deliver outdoor spaces that look beautiful and last. Now it's your turn."),
    ("Every home is carefully selected for its location", "Heat- and salt-tolerant planting, smart irrigation and durable materials, chosen to look great and use less water all year round."),
    ("Our trusted construction partners", "Our licensed teams deliver every project with the required approvals in place and in full compliance with local regulations."),
    ("We coordinate the entire process and connect you", "We coordinate the entire process and connect you with our trusted network of engineers, irrigation specialists, pool builders and suppliers."),
    ("Having made the move ourselves", "With years of experience across the UAE, we help you navigate approvals, suppliers and the climate with confidence."),
    ("We know how exciting", "Whether it's a villa garden, a hotel courtyard or a community park, we're here to help. Tell us about your project and we'll reply with honest advice and a clear plan."),
    ("We're Pim (Dutch) and Meike (German)", "We're Grefton, a landscaping team based in the UAE. We design, build and care for outdoor spaces, and we know every step of the process first-hand. Today, we use that experience to make yours as smooth and enjoyable as possible."),
    ("We work with clients from around the world", "We work with villa owners, hotels, developers and communities across the UAE, helping them design, create and enjoy their outdoor spaces."),
    ("Like many of our clients, we dreamed", "Like many of our clients, we believed a beautiful garden in the Gulf meant compromises: heat, water bills, delays and contractors who never finish. That frustration became our mission: outdoor spaces that are lasting, efficient and beautiful."),
    ("Meike founded Mejuma", "Our founder combines a passion for landscape design with deep knowledge of the UAE, guiding clients through every step with care and local expertise."),
    ("Originally from the Netherlands, Pim", "With a background in construction and project management, our project lead keeps every project clear, structured and running smoothly."),
    ("“The beauty of Tuscany", "“A great landscape in the UAE isn't just about plants. It's about cool shade at midday, evenings on the terrace, the sound of water and finally having an outdoor space you want to spend time in.”"),
    ("“Life in Tuscany is built around", "“Outdoor life in the UAE is built around simple pleasures: shade, water, good company and the time to enjoy them. A landscape isn't just decoration. It's about creating a place that values quality, craftsmanship and time well spent.”"),
    ("We coordinate the local experts, protect the timeline", "We coordinate the design, approvals and build teams, protect the timeline, handle the practical details and keep decisions clear. You stay informed, confident and in control, without needing to manage the site yourself."),
    ("Many of our clients are looking for more than", "Many of our clients are looking for more than a standard landscaping package. They want an outdoor space that reflects their own taste and the way they live."),
    ("That is where we come in", "That is where we come in. Our projects are delivered turnkey and finished entirely to your taste, with every choice made in close consultation along the way."),
    ("Projects like these require careful coordination", "Projects like these require careful coordination, trusted specialists and continuous attention to quality, budget and timelines. We take care of all of it, so that when we hand over, everything is simply ready."),
    ("Every home is priced against transaction data", "Every quote is itemised for materials, plants and labour, not rough estimates. Before work begins, drawings are approved and permits confirmed, so the price you see is a price you can trust."),
    ("Here's a brief overview of how the buying process", "Here's a brief overview of how a project works and how we'll guide you every step of the way."),
    ("We get to know your vision, preferred region", "We get to know your vision, location, lifestyle, budget and goals so we can shape a tailored brief."),
    ("We source carefully selected homes", "We visit your site, review the conditions and prepare a concept, planting plan and 3D visuals that fit your brief."),
    ("Every property is thoroughly reviewed", "You receive a clear, itemised quotation, and we handle the drawings and approvals needed to start work."),
    ("From negotiations and contracts", "From groundwork and hardscape to planting, irrigation, pools and lighting, we coordinate every trade and keep you updated throughout."),
    ("Working with carefully selected designers", "Working with selected suppliers and craftspeople, we add the final layers, from furniture and lighting to mature planting, so your space is ready to enjoy."),
    ("From utilities and insurance", "From warranty and maintenance to seasonal planting and irrigation checks, we're here long after the project is complete."),
    ("Turnkey means a carefully curated selection", "Turnkey means a complete service: design, approvals, build and care, with one trusted partner managing every detail."),
    ("For people who want Tuscany", "For people who want a beautiful outdoor space without the burden of managing it alone."),
    ("For buyers looking for a second home", "For homeowners who want a garden, pool or terrace they can enjoy every day."),
    ("For investors looking for carefully", "For developers and communities looking for landscapes that add value and last."),
    ("For those making the move to Tuscany", "For hotels, resorts and restaurants creating outdoor spaces guests remember."),
    ("Some clients fall in love with a historic farmhouse", "Some clients dream of a lush family garden, others of a sleek courtyard or a resort-style pool. We design and build outdoor spaces for each, from first sketch to finished landscape, ready to enjoy from the day you step outside."),
    ("Finding the property that truly matches", "Turning your vision into a clear concept, planting plan and 3D visuals."),
    ("Managing negotiations, legal procedures", "Heat- and salt-tolerant trees, shrubs and lawns, chosen to thrive in the UAE climate."),
    ("From contractor selection to planning", "Paving, pergolas, decking, walls and outdoor kitchens, built with quality control at every stage."),
    ("Optional bespoke furnishing", "Swimming pools, fountains and water walls designed as part of the landscape."),
    ("Whether you're living in Tuscany full-time", "Scheduled maintenance plans keep your landscape healthy through summer and winter, with reliable local support."),
    ("Work with trusted local professionals", "Work with trusted engineers, irrigation specialists and suppliers, carefully selected through our network."),
    ("We become your local point of contact, coordinating", "We become your single point of contact, coordinating everyone involved, monitoring progress and keeping communication clear and transparent."),
    ("Whether you furnish it yourself", "From outdoor lighting to furniture and mature planting, we make sure your space is ready from day one."),
    ("Once the project is complete, we make sure every detail", "Once the project is complete, we make sure every detail is in place before handover."),
    ("When we first arrived in Tuscany", "Landscaping in the UAE is different. The heat, the salt air and the strong sun mean plants, materials and irrigation all have to be chosen with care. But done well, an outdoor space becomes the best room in the house: long evenings, shade at midday and the sound of water."),
    ("Like many international buyers", "Like many homeowners, we also faced questions, uncertainties and a long list of practical challenges. Having delivered these projects many times, we now help others get far more than just a garden."),
    ("Whether you're looking for a new way of life", "Whether you're looking for a family garden, a resort-style pool or a calm courtyard, we're here to make your outdoor space as enjoyable to use as it is to look at."),
    ("Whether you're exploring the idea of buying", "Whether you're exploring the idea of a new garden, actively planning or ready to build, we're here to help. Give us a call, send us a WhatsApp or email us, and we'll be happy to answer your questions."),
    ("Your local contact in Tuscany", "Your local contact in the UAE. We're happy to assist you in English and Arabic."),
    ("We know how exciting (and sometimes overwhelming) the process can feel. We've been there ourselves.", "Every outdoor space is different. Tell us what you have in mind."),
    ("We're here to guide you with honest advice and local expertise. ", "We're here to guide you with honest advice and local expertise."),
]
# prefix entries for the project-listing page descriptions
for p in PROJECTS:
    pass  # filled per-project from the old file (see below)

# ----------------------------------------------------------------------------
# helpers
# ----------------------------------------------------------------------------
def read(path):
    with open(path, encoding="utf8") as f:
        return f.read()

def write(path, s):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf8", newline="\n") as f:
        f.write(s)

def render_text(t):
    if re.search(r"""[{}<>&"'\\]|[^\x00-\x7f]""", t):
        return "{" + json.dumps(t, ensure_ascii=False) + "}"
    return t

def is_code_line(s):
    return (not s or s.startswith(("<", "/", "import ", "export ", "title:", "description:", "}", ")", "return", "const ", "{/*"))
            or s.endswith(("=>", "{")) and not s.startswith('{"'))

def node_text(s):
    """Return (kind, text) if line is a JSX text node else None."""
    if s.startswith('{"') and s.endswith('"}'):
        try:
            return json.loads(s[1:-1])
        except Exception:
            return None
    if is_code_line(s):
        return None
    return s

# ----------------------------------------------------------------------------
# 1. gather old data (images) from the old detail pages
# ----------------------------------------------------------------------------
def srcs(text, attr):
    return re.findall(attr, text)

old_dir = os.path.join(APP, "properties")
for p in PROJECTS:
    src = read(os.path.join(old_dir, p["oldfile"], "page.tsx"))
    imgs = re.findall(r'data-slideshow="parallax" alt="" src="([^"]+)"', src)
    p["images"] = imgs
    hl = re.findall(r'<img src="([^"]+)" loading="lazy" data-scroll-speed="0.025" data-scroll="" alt=""', src)
    p["highlightImages"] = hl[:2] if hl else imgs[:2]

listing = read(os.path.join(old_dir, "page.tsx"))
for p in PROJECTS:
    m = re.search(r'href="/(?:properties/)?%s"[^>]*>\s*<div className="property-base__img-wrap">\s*<img src="([^"]+)"' % re.escape(p["oldslug"]), listing)
    if not m:
        m = re.search(r'/%s"[^>]*>\s*<div[^>]*>\s*<img src="([^"]+)"' % re.escape(p["oldslug"]), listing)
    p["cardImage"] = m.group(1) if m else p["images"][0]

# prefix replacements for listing descriptions (taken from the old listing file's own text)
for p in PROJECTS:
    pass
LISTING_DESC_PREFIX = {
    "Set among the rolling hills of the Val d'Elsa": "La Valle di Semifonte",
    "Overlooking Lake Trasimeno and just 11 km": "Dimora Montecchio",
    "In the heart of Siena's historic centre": "Le Logge Del Papa",
    "In the heart of Chianti Classico, near Pianella": "Tuscan Farmhouse Portion in the Heart of Chianti Classico",
    "Nestled in the rolling hills of Le Scotte": "Villa Le Scotte",
    "Just north of Siena's medieval gates stands Villa Isabella": "Villa Isabella",
    "Villa Piccolomini di Larniano, a noble residence": "Historic Villa Di Larniano Residence",
}
for pref, old in LISTING_DESC_PREFIX.items():
    PREFIX.insert(0, (pref, BY_OLD[old]["desc"]))

# ----------------------------------------------------------------------------
# 2. Data files
# ----------------------------------------------------------------------------
def ts(v):
    return json.dumps(v, ensure_ascii=False, indent=2)

write("src/data/site.ts", f'''// Contact details and global content. TODO: replace the placeholder phone/email/WhatsApp/socials.
export const site = {{
  name: "Grefton",
  phone: {json.dumps(PHONE)},
  phoneHref: "tel:+971000000000",
  email: {json.dumps(EMAIL)},
  whatsapp: "971000000000",
  location: "United Arab Emirates",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  facebook: "https://www.facebook.com/",
}};
''')

proj_objs = []
for p in PROJECTS:
    proj_objs.append({
        "slug": p["slug"], "name": p["name"], "location": p["location"], "type": p["type"], "area": p["area"],
        "summary": p["desc"], "intro": p["intro"], "specs": [list(s) for s in p["specs"]],
        "sections": [list(s) for s in p["sections"]], "delivery": list(p["delivery"]),
        "highlights": p["highlights"], "cardImage": p["cardImage"], "images": p["images"],
        "highlightImages": p["highlightImages"],
    })
write("src/data/projects.ts", f'''// Sample project data for the Grefton site. Replace with real UAE projects and photos.
// Images are still the original template's placeholders (/_external/...) until real photos are supplied.
export type Project = {{
  slug: string;
  name: string;
  location: string;
  type: string;
  area: string;
  summary: string;
  intro: string;
  specs: [string, string][];
  sections: [string, string][];
  delivery: [string, string];
  highlights: [string, string];
  cardImage: string;
  images: string[];
  highlightImages: string[];
}};

export const projects: Project[] = {ts(proj_objs)} as unknown as Project[];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
''')

# ----------------------------------------------------------------------------
# 3. ProjectCard (from the home page's first card) and ProjectDetail (from villa-isabella)
# ----------------------------------------------------------------------------
home = read(os.path.join(APP, "page.tsx")).split("\n")
# card block: first `<div role="listitem" className="w-dyn-item">` after the marquee
start = next(i for i, l in enumerate(home) if 'role="listitem" className="w-dyn-item"' in l)
indent = len(home[start]) - len(home[start].lstrip())
end = next(i for i in range(start + 1, len(home)) if home[i] == " " * indent + "</div>")
card = home[start:end + 1]
# de-indent to 6 spaces
shift = indent - 6
card = [l[shift:] if l.startswith(" " * shift) else l for l in card]
slots = iter(["{p.name}", "Type", "{p.type}", "Location", "{p.location}", "Area", "{p.area}"])
out = []
for l in card:
    s = l.strip()
    if "<Link href=" in l:
        l = re.sub(r'href="[^"]+"', 'href={`/projects/${p.slug}`}', l)
    elif s.startswith("<img src="):
        l = re.sub(r'src="[^"]+"', 'src={p.cardImage}', l)
        l = l.replace('alt=""', 'alt={p.name}')
    else:
        t = node_text(s)
        if t is not None and not s.startswith("<"):
            l = l[: len(l) - len(l.lstrip())] + next(slots)
    out.append(l)
write("src/components/ProjectCard.tsx", '''/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
''' + "\n".join(out) + '''
  );
}
''')

vi = read(os.path.join(old_dir, "villa-isabella", "page.tsx")).split("\n")
# strip header (everything up to `export default function Page`)
fn = next(i for i, l in enumerate(vi) if l.startswith("export default function Page"))
body = vi[fn + 2: -3]     # lines inside `return (` ... `);`
def find_list_items(lines, role_idx):
    """Return (first_item_idx, end_idx_exclusive, item_len) for the list that opens at role_idx."""
    first = role_idx + 1
    ind = len(lines[first]) - len(lines[first].lstrip())
    item_len = next(i for i in range(first + 1, len(lines)) if lines[i] == " " * ind + "</div>") - first + 1
    close_ind = ind - 2
    end = next(i for i in range(first, len(lines)) if lines[i] == " " * close_ind + "</div>")
    return first, end, item_len

roles = [i for i, l in enumerate(body) if 'role="list" className="w-dyn-items"' in l]
slides_role, thumbs_role = roles[0], roles[1]
# do thumbs first (later in file) so indices stay valid
f2, e2, n2 = find_list_items(body, thumbs_role)
thumb_item = body[f2:f2 + n2]
thumb_item = [re.sub(r'src="[^"]+"', "src={src}", l) for l in thumb_item]
f1, e1, n1 = find_list_items(body, slides_role)
slide_item = body[f1:f1 + n1]
slide_item = [re.sub(r'src="[^"]+"', "src={src}", l) for l in slide_item]
def mapper(item, var):
    pad = " " * (len(item[0]) - len(item[0].lstrip()))
    item = [item[0].replace('<div role="listitem"', '<div key={%s} role="listitem"' % var)] + item[1:]
    return [pad + "{p.images.map((src, i) => (", ] + ["  " + l for l in item] + [pad + "))}"]
new_thumbs = mapper(thumb_item, "i")
new_slides = mapper(slide_item, "i")
body = body[:f2] + new_thumbs + body[e2:]
body = body[:f1] + new_slides + body[e1:]

# related cards (3 cards in the final list): replace the list items with ProjectCard
rel_role = [i for i, l in enumerate(body) if 'role="list"' in l and "_2-col mobile-vertical" in l][-1]
rf, re_, rn = find_list_items(body, rel_role)
pad = " " * (len(body[rf]) - len(body[rf].lstrip()))
body = body[:rf] + [pad + "{related.map((r) => (", pad + "  <div key={r.slug} role=\"listitem\" className=\"w-dyn-item\">", pad + "    <ProjectCard p={r} />", pad + "  </div>", pad + "))}"] + body[re_:]

# rich text block
rt = next(i for i, l in enumerate(body) if 'className="text-rich-text text-2-col w-richtext"' in l)
ind = len(body[rt]) - len(body[rt].lstrip())
rt_end = next(i for i in range(rt + 1, len(body)) if body[i] == " " * ind + "</div>")
P = " " * (ind + 2)
rich = [
    " " * ind + '<div className="text-rich-text text-2-col w-richtext">',
    P + "{p.sections.map(([title, text]) => (",
    P + "  <h6 key={title}>",
    P + "    <strong>{title}</strong>",
    P + "    <br />",
    P + "    {text}",
    P + "  </h6>",
    P + "))}",
    P + "<h6>",
    P + "  <strong>{p.delivery[0]}</strong>",
    P + "  <br />",
    P + "  {p.delivery[1]}",
    P + "</h6>",
    " " * ind + "</div>",
]
body = body[:rt] + rich + body[rt_end + 1:]

# text slots (sequential)
seq = {"loc": 0}
spec_labels = ["Region", "Property size", "Outdoor", "Bedrooms", "Location type", "Landsize", "Year", "Bathrooms"]
state = {"first_siena": True, "name": True, "next_value": None, "hl": 0, "img_hl": 0}
res = []
for l in body:
    s = l.strip()
    pad = l[: len(l) - len(l.lstrip())]
    if s.startswith("<img src=") and "is-btn-fill" not in l and 'data-scroll=""' in l:
        l = re.sub(r'src="[^"]+"', "src={p.highlightImages[%d]}" % state["img_hl"], l)
        state["img_hl"] += 1
        res.append(l)
        continue
    t = node_text(s)
    if t is not None:
        if state["next_value"] is not None:
            res.append(pad + state["next_value"])
            state["next_value"] = None
            continue
        if t == "Siena" and state["first_siena"]:
            res.append(pad + "{p.location}"); state["first_siena"] = False; continue
        if t == "Villa Isabella":
            res.append(pad + "{p.name}"); continue
        if t == "Price from to":
            res.append(pad + "Project type"); state["next_value"] = "{p.type}"; continue
        if t in spec_labels:
            i = spec_labels.index(t)
            res.append(pad + "{p.specs[%d][0]}" % i); state["next_value"] = "{p.specs[%d][1]}" % i; continue
        if t.startswith("Just north of Siena's medieval gates"):
            res.append(pad + "{p.intro}"); continue
        if t.startswith("Frescoed vaults") or t.startswith("A private garden, a short walk"):
            res.append(pad + "{p.highlights[%d]}" % state["hl"]); state["hl"] += 1; continue
    res.append(l)
body = res

tail_marker = "      </div>"
detail = '''/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects, type Project } from "@/data/projects";

export default function ProjectDetail({ p }: { p: Project }) {
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
''' + "\n".join(body) + '''
  );
}
'''
write("src/components/ProjectDetail.tsx", detail)

write("src/app/projects/[slug]/page.tsx", '''import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: `${p.name} | Grefton`, description: p.summary } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return <ProjectDetail p={p} />;
}
''')

# ----------------------------------------------------------------------------
# 4. Move routes
# ----------------------------------------------------------------------------
for src, dst in [("properties", "projects"), ("solutions", "services"), ("tuscany", "uae-landscaping"), ("about-us", "about")]:
    s = os.path.join(APP, src, "page.tsx")
    d = os.path.join(APP, dst, "page.tsx")
    os.makedirs(os.path.dirname(d), exist_ok=True)
    shutil.move(s, d)
for p in PROJECTS:
    shutil.rmtree(os.path.join(old_dir, p["oldfile"]), ignore_errors=True)
for d in ["properties", "solutions", "tuscany", "about-us"]:
    shutil.rmtree(os.path.join(APP, d), ignore_errors=True)

# ----------------------------------------------------------------------------
# 5. Text/href localisation of every remaining generated file
# ----------------------------------------------------------------------------
TITLES = {
    "app/page.tsx": ("Grefton | Landscaping & Outdoor Living in the UAE", "Grefton designs, builds and maintains gardens, pools and outdoor spaces across the UAE, from villa gardens to hotels and community landscapes."),
    "app/about/page.tsx": ("About us | Grefton", "Meet Grefton, a UAE landscaping team that designs, builds and cares for outdoor spaces."),
    "app/process/page.tsx": ("Our process | Grefton", "How a Grefton project works, from first call and site visit to design, approvals, build and aftercare."),
    "app/services/page.tsx": ("Services | Grefton", "Landscape design, planting, hardscape, pools, irrigation and maintenance across the UAE."),
    "app/uae-landscaping/page.tsx": ("UAE Landscaping | Grefton", "What makes landscaping in the UAE different, and how to design an outdoor space that thrives in the climate."),
    "app/contact/page.tsx": ("Contact | Grefton", "Talk to Grefton about your garden, pool or outdoor space anywhere in the UAE."),
    "app/projects/page.tsx": ("Projects | Grefton", "A selection of villa gardens, community parks, rooftop terraces and hospitality landscapes by Grefton."),
}

card_names = {p["old"]: p for p in PROJECTS}
HREF_MAP = [(r'href="/properties/([^"]+)"', None), (r'href="/(%s)"' % "|".join(re.escape(p["oldslug"]) for p in PROJECTS), None)]
slug_new = {p["oldslug"]: p["slug"] for p in PROJECTS}

def fix_hrefs(text):
    text = re.sub(r'href="/properties/([^"]+)"', lambda m: 'href="/projects/%s"' % slug_new.get(m.group(1), m.group(1)), text)
    text = re.sub(r'href="/(%s)"' % "|".join(re.escape(k) for k in slug_new), lambda m: 'href="/projects/%s"' % slug_new[m.group(1)], text)
    for a, b in [("/properties", "/projects"), ("/solutions", "/services"), ("/tuscany", "/uae-landscaping"), ("/about-us", "/about")]:
        text = text.replace('href="%s"' % a, 'href="%s"' % b)
    text = text.replace('https://www.instagram.com/mejuma.tuscany/', "https://www.instagram.com/")
    text = text.replace('https://www.linkedin.com/company/mejuma-tuscany/', "https://www.linkedin.com/")
    text = text.replace('https://https//www.facebook.com/mejuma.tuscany', "https://www.facebook.com/")
    text = text.replace('href="/nl"', 'href="#"').replace('href="/de"', 'href="#"')
    return text

def localise(path, rel):
    lines = read(path).split("\n")
    out = []
    cur_proj = None
    label_state = None
    in_jsx = False
    for idx, l in enumerate(lines):
        s = l.strip()
        pad = l[: len(l) - len(l.lstrip())]
        if s.startswith("return ("):
            in_jsx = True
        if rel in TITLES:
            if s.startswith("title:"):
                out.append('  title: %s,' % json.dumps(TITLES[rel][0], ensure_ascii=False)); continue
            if s.startswith("description:"):
                out.append('  description: %s,' % json.dumps(TITLES[rel][1], ensure_ascii=False)); continue
        t = node_text(s) if in_jsx else None
        if t is None or s.startswith("<"):
            out.append(l); continue
        new = None
        # project-card context
        if t in BY_OLD:
            cur_proj = BY_OLD[t]; label_state = None
            new = cur_proj["name"]
        elif cur_proj and label_state:
            val = {"price": cur_proj["type"], "location": cur_proj["location"], "size": cur_proj["area"]}[label_state]
            new = val; label_state = None
        elif cur_proj and t in ("Price", "Location", "Size", "Price from – to"):
            label_state = {"Price": "price", "Price from – to": "price", "Location": "location", "Size": "size"}[t]
            new = {"price": "Type", "location": "Location", "size": "Area"}[label_state]
        elif t in EXACT:
            new = EXACT[t]
        else:
            for pref, repl in PREFIX:
                if t.startswith(pref):
                    new = repl; break
        if new is None:
            out.append(l); continue
        # keep empty label tracking sane after a card completes
        if t in ("Selected projects", "Selected properties"):
            cur_proj = None; label_state = None
        out.append(pad + render_text(new))
        # phone / mail link fix: patch the enclosing <Link href=...>
        if new == PHONE or new == PHONE2 or "@grefton.ae" in new:
            href = "tel:+971000000000" if new.startswith("+971") else "mailto:" + new
            for j in range(len(out) - 2, max(len(out) - 8, 0), -1):
                if "<Link " in out[j] and "href=" in out[j]:
                    out[j] = re.sub(r'href="[^"]*"', 'href="%s"' % href, out[j], count=1)
                    break
    text = "\n".join(out)
    text = fix_hrefs(text)
    # leftover dead links: CTA buttons -> contact (form submit buttons excluded)
    def dead(m):
        tag = m.group(0)
        return tag if "data-form-submit" in tag else tag.replace('href="/."', 'href="/contact"')
    text = re.sub(r"<Link [^>]*href=\"/\.\"[^>]*>", dead, text)
    write(path, text)

targets = []
for root, _, files in os.walk("src"):
    for f in files:
        if f.endswith(".tsx") and not f.startswith("SiteEffects"):
            targets.append(os.path.join(root, f))
for path in sorted(targets):
    rel = os.path.relpath(path, "src").replace("\\", "/")
    if rel in ("components/ProjectCard.tsx", "components/ProjectDetail.tsx", "app/layout.tsx", "app/projects/[slug]/page.tsx"):
        # these are templates with data slots; still localise their static text/hrefs
        pass
    localise(path, rel)
    print("localised", rel)

# ----------------------------------------------------------------------------
# 6. Logo (replace the animated Lottie wordmark with the Grefton logo)
# ----------------------------------------------------------------------------
nav = read("src/components/generated/NavGroup.tsx")
nav = re.sub(r'<div className="logo" data-w-id="[^"]*" data-animation-type="lottie"[^>]*></div>',
             '<div className="logo" role="img" aria-label="Grefton"></div>', nav)
# locales: en / ar (Arabic not built yet)
write("src/components/generated/NavGroup.tsx", nav)
print("done")
