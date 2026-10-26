/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
      <div role="listitem" className="w-dyn-item">
        <Link href={`/projects/${p.slug}`} className="property-base w-inline-block">
          <div className="property-base__img-wrap">
            <img src={p.cardImage} loading="lazy" alt={p.name} className="image is-hover" />
          </div>
          <div className="property-base__info-wrap">
            <div className="flex-horizontal space-between is-center">
              <h3 className="heading-style-golos">
                {p.name}
              </h3>
              <div data-button-040="" className="button-040">
                <span className="button-040__icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="button-040__icon">
                    <path d="M14 19L21 12L14 5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
                    <path d="M21 12H2" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
                  </svg>
                </span>
                <span className="button-040__icon-wrap is--duplicate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="button-040__icon">
                    <path d="M14 19L21 12L14 5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
                    <path d="M21 12H2" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="line"></div>
            <div className="flex-vertical gap-xs">
              <div className="flex-horizontal space-between">
                <h6>
                  Type
                </h6>
                <h6 className="text-align-right">
                  {p.type}
                </h6>
              </div>
              <div className="flex-horizontal space-between">
                <h6>
                  Location
                </h6>
                <h6 className="text-align-right">
                  {p.location}
                </h6>
              </div>
              <div className="flex-horizontal space-between">
                <h6>
                  Area
                </h6>
                <h6 className="text-align-right">
                  {p.area}
                </h6>
              </div>
            </div>
          </div>
        </Link>
      </div>
  );
}
