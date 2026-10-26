import PageEnd from "@/components/PageEnd";
import { legalMeta, type LegalDoc } from "@/data/legal";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="page-wrap">
      <section>
        <div className="padding-global">
          <div className="padding-top padding-xhuge">
            <div className="relative">
              <div className="line"></div>
              <div className="padding-vertical padding-large">
                <div data-reveal-group="" className="flex-vertical gap-s align-left">
                  <h6>Legal</h6>
                  <h1>{doc.title}</h1>
                  <p>Last updated: {legalMeta.updated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="padding-global">
          <div className="padding-vertical padding-large">
            <div className="legal-body">
              <p className="legal-body__intro">{doc.intro}</p>
              {doc.sections.map((s, i) => (
                <div key={s.heading} className="legal-body__section">
                  <h3>
                    <span>{String(i + 1).padStart(2, "0")}</span> {s.heading}
                  </h3>
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PageEnd />
    </div>
  );
}
