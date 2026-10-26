/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function NavGroup() {
  return (
    <div className="nav-group">
      <div className="nav">
        <Link href="/" aria-current="page" className="w-inline-block w--current">
          <div className="logo" role="img" aria-label="Grefton"></div>
        </Link>
        <Link data-button-040="" href="/" className="button-040 is--nav w-inline-block">
          <span className="button-040__icon-wrap">
            <div className="lottie-menu" data-w-id="0ca6888c-1ca5-49ac-d6bf-5f906a220d65" data-animation-type="lottie" data-src="/lottie/6a7b130f6ab40917cf134855_lottie-mejuma.json" data-loop="0" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="0.48333333333333334" data-loading="lazy"></div>
          </span>
          <span className="button-040__text-wrap">
            <span className="button-040__text">
              Menu
            </span>
          </span>
          <span className="button-040__icon-wrap is--duplicate">
            <div className="lottie-menu" data-w-id="c376a364-4ff7-f815-27f8-b8370e52306b" data-animation-type="lottie" data-src="/lottie/6a7b130f6ab40917cf134855_lottie-mejuma.json" data-loop="0" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="0.48333333333333334" data-loading="lazy"></div>
          </span>
        </Link>
        <div className="nav-bg"></div>
      </div>
      <div className="nav-base">
        <div className="flex-vertical gap-xs">
          <Link href="/services" className="link-wrap w-inline-block">
            <div className="link-hover-circle"></div>
            <div className="nav-link">
              Services
            </div>
          </Link>
          <Link href="/projects" className="link-wrap w-inline-block">
            <div className="link-hover-circle"></div>
            <div className="nav-link">
              Projects
            </div>
          </Link>
          <Link href="/process" className="link-wrap w-inline-block">
            <div className="link-hover-circle"></div>
            <div className="nav-link">
              Our Process
            </div>
          </Link>
          <Link href="/uae-landscaping" className="link-wrap w-inline-block">
            <div className="link-hover-circle"></div>
            <div className="nav-link">
              UAE Landscaping
            </div>
          </Link>
          <Link href="/about" className="link-wrap w-inline-block">
            <div className="link-hover-circle"></div>
            <div className="nav-link">
              About
            </div>
          </Link>
          <Link href="/contact" className="link-wrap w-inline-block">
            <div className="link-hover-circle"></div>
            <div className="nav-link">
              Contact
            </div>
          </Link>
        </div>
        <div className="nav-base__socials">
          <div className="nav-base__contact-wrap">
            <h6 className="text-color-green950">
              Phone
            </h6>
            <Link href="tel:+971554809109" className="link-wrap w-inline-block">
              <div className="link-hover-circle"></div>
              <div className="footer-link is-huge">
                +971 55 480 9109
              </div>
            </Link>
          </div>
          <div className="nav-base__contact-wrap">
            <h6 className="text-color-green950">
              Mail
            </h6>
            <Link href="mailto:info@grefton.ae" className="link-wrap w-inline-block">
              <div className="link-hover-circle"></div>
              <div className="footer-link is-huge">
                info@grefton.ae
              </div>
            </Link>
          </div>
          <div className="nav-base__contact-wrap">
            <h6 className="text-color-green950">
              Socials
            </h6>
            <div className="flex-horizontal gap-xs">
              <a href="https://www.instagram.com/grefton_aesthetics_/" target="_blank" className="social-link-wrap w-inline-block">
                <div className="icon-1x1-medium w-embed">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z" fill="CurrentColor"></path>
                  </svg>
                </div>
              </a>
              <a href="https://www.linkedin.com/company/grefton-aesthetics-pools-and-landscaping-llc" target="_blank" className="social-link-wrap w-inline-block">
                <div className="icon-1x1-medium w-embed">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.94048 5.00091C6.94011 5.81522 6.44608 6.548 5.69134 6.85371C4.9366 7.15943 4.07187 6.97703 3.5049 6.39253C2.93793 5.80802 2.78195 4.93813 3.1105 4.19305C3.43906 3.44797 4.18654 2.97648 5.00048 3.00091C6.08155 3.03336 6.94097 3.91935 6.94048 5.00091ZM7.00048 8.48091H3.00048V21.0009H7.00048V8.48091ZM13.3205 8.48091H9.34048V21.0009H13.2805V14.4309C13.2805 10.7709 18.0505 10.4309 18.0505 14.4309V21.0009H22.0005V13.0709C22.0005 6.90091 14.9405 7.13091 13.2805 10.1609L13.3205 8.48091Z" fill={"CurrentColor\n"}></path>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <div className="nav-base__contact-wrap">
            <h6 className="text-color-green950">
              Translation
            </h6>
            <div className="w-locales-list">
              <div role="list" className="flex-horizontal gap-xs w-locales-items">
                <div role="listitem" className="w-locales-item">
                  <Link data-barba-prevent="true" hrefLang="en" href="/" aria-current="page" className="locale-link w--current">
                    en
                  </Link>
                </div>
                <div role="listitem" className="w-locales-item">
                  <Link data-barba-prevent="true" hrefLang="ar" href="#" className="locale-link">
                    ar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-base__bg"></div>
      </div>
    </div>
  );
}
