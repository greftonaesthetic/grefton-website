import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { Eyebrow, Section } from "@/components/Section";
import { process, projects, reasons, services, site } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#0f5a38] to-brand opacity-90" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <Eyebrow>Landscaping in the UAE</Eyebrow>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
            Outdoor spaces, built for the UAE sun.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Grefton designs, builds and maintains gardens, pools and outdoor living areas for villas, hotels and communities.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className="rounded-full bg-white px-7 py-3.5 font-medium text-brand-dark transition hover:bg-brand-light">
              View projects
            </Link>
            <Link href="/contact" className="rounded-full border border-white/40 px-7 py-3.5 font-medium transition hover:bg-white/10">
              Free consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Intro */}
      <Section className="grid gap-10 md:grid-cols-2">
        <div>
          <Eyebrow>Design to handover</Eyebrow>
          <h2 className="text-4xl font-semibold md:text-5xl">One team for your whole landscape.</h2>
        </div>
        <p className="text-lg leading-relaxed text-ink-soft">
          Our mission is simple: to make your outdoor space as enjoyable to live in as it is to look at. Every project is
          tailored to your property and lifestyle, with one trusted partner guiding you from concept to completion. We
          believe great work starts with honest advice, good materials and local expertise.
        </p>
      </Section>

      {/* Services */}
      <div className="bg-sand">
        <Section>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="text-4xl font-semibold md:text-5xl">Our services</h2>
            </div>
            <Link href="/services" className="hidden text-sm font-medium text-brand hover:underline md:block">
              All services →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-background p-7 shadow-sm">
                <span className="text-sm font-semibold text-brand">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Projects */}
      <Section>
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="text-4xl font-semibold md:text-5xl">Featured projects</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.name}>
              <Placeholder label="Project photo" className="h-72" />
              <h3 className="mt-5 text-2xl font-semibold">{p.name}</h3>
              <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm text-ink-soft">
                <div>
                  <dt className="inline font-medium text-foreground">Location: </dt>
                  <dd className="inline">{p.location}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">Type: </dt>
                  <dd className="inline">{p.type}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">Area: </dt>
                  <dd className="inline">{p.area}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/projects" className="rounded-full bg-brand px-7 py-3.5 font-medium text-white transition hover:bg-brand-dark">
            Explore all projects
          </Link>
        </div>
      </Section>

      {/* Process */}
      <div className="bg-brand-dark text-white">
        <Section>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="text-4xl font-semibold md:text-5xl">Leave the complexity to us.</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-5">
            {process.map((s, i) => (
              <li key={s.title} className="bg-brand-dark p-6">
                <span className="text-sm text-brand-light/70">.0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* Story */}
      <Section className="grid items-center gap-12 md:grid-cols-2">
        <Placeholder label="Team / site photo" className="h-96" />
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">A great garden in the UAE is hard to get right.</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Extreme heat, salt, water costs, approvals and contractors who disappear halfway through. A beautiful landscape
            is only the start. We manage the whole journey, from design and approvals to planting, build and long-term care,
            so you can simply enjoy the result.
          </p>
          <Link href="/about" className="mt-6 inline-block font-medium text-brand hover:underline">
            Read our story →
          </Link>
        </div>
      </Section>

      {/* Why us */}
      <div className="bg-sand">
        <Section>
          <Eyebrow>Why Grefton</Eyebrow>
          <h2 className="text-4xl font-semibold md:text-5xl">Built with confidence.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title}>
                <div className="mb-4 h-1 w-10 rounded bg-brand" />
                <h3 className="text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-ink-soft">{r.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl font-semibold md:text-5xl">Thinking about your outdoor space?</h2>
        <p className="mx-auto mt-5 max-w-xl text-ink-soft">
          Tell us about your project. We&apos;ll reply with honest advice and a clear next step.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-full bg-brand px-7 py-3.5 font-medium text-white transition hover:bg-brand-dark">
            Send us a message
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            className="rounded-full border border-brand px-7 py-3.5 font-medium text-brand transition hover:bg-brand-light"
          >
            WhatsApp us
          </a>
        </div>
      </Section>
    </>
  );
}
