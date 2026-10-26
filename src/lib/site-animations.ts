/* eslint-disable */
// @ts-nocheck
// Port of the original Webflow site's custom script (Slater "mejuma.js").
// Same behaviour; Barba page transitions are replaced by Next.js navigation
// (see components/SiteEffects.tsx) and Webflow's Lottie runtime by lottie-web.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import Hls from "hls.js";
import lottie from "lottie-web";
import LocomotiveScroll from "locomotive-scroll";

window.Hls = Hls;

// GSAP
gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, Observer);
CustomEase.create("navEase", "0.65, 0.05, 0, 1");
CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99");

// Lottie (logo + menu icon): replaces Webflow's built-in Lottie player
const lottieAnimations = [];
function initLotties() {
  $$('[data-animation-type="lottie"]').forEach((el) => {
    if (el.dataset.lottieReady) return;
    el.dataset.lottieReady = "true";
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: el.dataset.src,
    });
    anim.wrapper = el;
    lottieAnimations.push(anim);
  });
}

// Helpers
const $ = (selector, root = document) => root?.querySelector(selector);
const $$ = (selector, root = document) => [...(root?.querySelectorAll(selector) || [])];
const getScrollY = () => window.locomotiveScroll?.lenis?.scroll ?? window.scrollY;
const rmMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = rmMQ.matches;

rmMQ.addEventListener?.('change', (e) => {
  reducedMotion = e.matches;
});

// Page cleanup
let pageCtx = null;
let pageCleanups = [];

function addPageCleanup(fn) {
  if (typeof fn === 'function') pageCleanups.push(fn);
}

function destroyPageFunctions() {
  const cleanups = pageCleanups.splice(0).reverse();
  cleanups.forEach((fn) => {
    try {
      fn();
    } catch (error) {
      console.warn('Page cleanup failed:', error);
    }
  });
  if (pageCtx) {
    pageCtx.revert();
    pageCtx = null;
  }
}

// Custom form submit
function initFormSubmit() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-form-submit="true"]');
    if (!trigger) return;
    const form = trigger.closest('form');
    const button = form?.querySelector('.form-btn');
    if (!button || button === trigger || button.contains(e.target)) return;
    e.preventDefault();
    button.click();
  });
}

// Page loader
// The hero video waits for the page loader (the intro curtain) to start lifting before it plays.
let loaderGate = Promise.resolve();
let releaseLoaderGate = () => {};

function preparePageLoader(root = document) {
  const loaderBg = $('.p-loader__bg', root);
  const titleWrap = $('.header-title-wrap', root);
  const nav = $('.nav');

  if (!loaderBg || !titleWrap) {
    if (nav) {
      gsap.set(nav, {
        opacity: 1,
        visibility: 'visible'
      });
    }
    loaderGate = Promise.resolve();
    return false;
  }

  loaderGate = new Promise((resolve) => {
    releaseLoaderGate = resolve;
  });

  gsap.set(titleWrap, {
    width: '50%'
  });
  gsap.set(loaderBg, {
    height: '100%'
  });
  if (nav) {
    gsap.set(nav, {
      opacity: 0,
      visibility: 'visible'
    });
  }
  return true;
}

function runPageLoader(root = document) {
  const loaderBg = $('.p-loader__bg', root);
  const titleWrap = $('.header-title-wrap', root);
  const nav = $('.nav');
  if (!loaderBg || !titleWrap) return null;

  const tl = gsap.timeline({
    delay: 1.5,
    onStart() {
      releaseLoaderGate();
    },
    onComplete() {
      if (nav) {
        gsap.set(nav, {
          opacity: 1,
          visibility: 'visible'
        });
      }
      window.dispatchEvent(new Event('resize'));
      window.locomotiveScroll?.resize?.();
      ScrollTrigger.refresh();
    }
  });

  tl.to(
    titleWrap,
    {
      width: '100%',
      duration: 1.2,
      ease: 'navEase'
    },
    0
  ).to(
    loaderBg,
    {
      height: '0%',
      duration: 1.2,
      ease: 'navEase'
    },
    0
  );

  if (nav) {
    tl.to(
      nav,
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      },
      0.45
    );
  }

  addPageCleanup(() => {
    tl.kill();
    releaseLoaderGate();
  });
  return tl;
}

// Stagger text
function initStaggerText(root = document) {
  $$('[data-stagger-text]', root).forEach((el) => {
    const variant = el.dataset.staggerText || 'chars';
    const duration = parseFloat(el.dataset.staggerTextDuration) || 1;
    const stagger = parseFloat(el.dataset.staggerTextStagger) || 0.05;
    const start = el.dataset.staggerTextStart || 'top 85%';
    const byLines = variant === 'lines';

    const split = new SplitText(el, {
      type: byLines ? 'lines' : 'lines,chars',
      linesClass: 'line-inner'
    });

    const masks = [];
    split.lines.forEach((line) => {
      const mask = document.createElement('div');
      mask.className = 'line-mask';
      mask.style.overflow = 'hidden';
      mask.style.paddingTop = '0.12em';
      mask.style.paddingBottom = '0.12em';
      mask.style.marginTop = '-0.12em';
      mask.style.marginBottom = '-0.12em';
      line.parentNode.insertBefore(mask, line);
      mask.appendChild(line);
      masks.push(mask);
    });

    const targets = byLines ? split.lines : split.chars;
    gsap.set(targets, { yPercent: 120 });
    gsap.set(el, { visibility: 'visible' });

    const tween = gsap.to(targets, {
      yPercent: 0,
      duration,
      stagger,
      ease: 'navEase',
      scrollTrigger: {
        trigger: el,
        start,
        once: true
      }
    });

    addPageCleanup(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
      masks.forEach((mask) => {
        if (mask.parentNode) mask.replaceWith(...mask.childNodes);
      });
    });
  });
}

// Navigation
function initNav() {
  const nav = $('.nav');
  const navBg = $('.nav-bg');
  const navLogo = $('.logo');
  const navButtons = $$('.button-040.is--nav');
  if (!nav) return;

  const SAND = '#f1f1f1';
  const GREEN = '#38352c';
  const SCROLLED_WIDTH = '30rem';
  const DESKTOP_MIN = 992;
  const TABLET_MIN = 768;
  const DUR = 1;
  const EASE = 'navEase';
  const CLIP_HIDDEN = 'inset(0% 0% 100% 0% round 0rem)';
  const CLIP_SHOWN = 'inset(0% 0% 0% 0% round 5rem)';

  let isLight = Boolean($('[data-nav-light]'));
  let forceDark = false;
  let scrolled = null;

  const isDesktop = () => innerWidth >= DESKTOP_MIN;
  const isTablet = () => innerWidth >= TABLET_MIN && innerWidth < DESKTOP_MIN;

  function topPadding() {
    if (isDesktop()) return ['3rem', '3rem', '3rem', '3rem'];
    if (isTablet()) return ['2rem', '2rem', '2rem', '2rem'];
    return ['1.5rem', '1.5rem', '1.5rem', '1.5rem'];
  }

  function scrolledPadding() {
    if (isDesktop() || isTablet()) {
      return ['1.5rem', '1.5rem', '1.5rem', '2rem'];
    }
    return ['1rem', '1rem', '1rem', '1.5rem'];
  }

  function navVars(maxWidth, padding) {
    return {
      maxWidth,
      paddingTop: padding[0],
      paddingRight: padding[1],
      paddingBottom: padding[2],
      paddingLeft: padding[3]
    };
  }

  let navBgTl = null;
  if (navBg) {
    gsap.set(navBg, {
      clipPath: CLIP_HIDDEN
    });
    navBgTl = gsap
      .timeline({
        paused: true
      })
      .to(navBg, {
        clipPath: CLIP_SHOWN,
        duration: DUR,
        ease: EASE
      });
  }

  function applyButtonColors(light, immediate = false) {
    const text = light ? GREEN : SAND;
    const bg = light ? SAND : GREEN;
    const vars = {
      '--button-040-color': text,
      '--button-040-color-arrow': text,
      '--button-040-color-background': bg,
      '--button-040-color-arrow-background': bg
    };

    navButtons.forEach((button) => {
      if (immediate) {
        gsap.set(button, vars);
      } else {
        gsap.to(button, {
          ...vars,
          duration: DUR,
          ease: EASE,
          overwrite: 'auto'
        });
      }
      button.classList.toggle('is--light', light);
      button.classList.toggle('is--dark', !light);
    });
  }

  function setNavBg(active, immediate = false) {
    if (!navBgTl) return;
    if (immediate) {
      navBgTl.progress(active ? 1 : 0).pause();
      return;
    }
    active ? navBgTl.timeScale(1).play() : navBgTl.timeScale(2).reverse();
  }

  function applyTop(immediate = false) {
    const light = isLight && !forceDark;
    const vars = navVars('100%', topPadding());

    if (navLogo) {
      const colorVars = {
        color: light ? SAND : GREEN
      };
      immediate
        ? gsap.set(navLogo, colorVars)
        : gsap.to(navLogo, {
            ...colorVars,
            duration: DUR,
            ease: EASE,
            overwrite: 'auto'
          });
    }

    applyButtonColors(light, immediate);

    immediate
      ? gsap.set(nav, vars)
      : gsap.to(nav, {
          ...vars,
          duration: DUR,
          ease: EASE,
          overwrite: 'auto'
        });

    setNavBg(false, immediate);
  }

  function applyScrolled(immediate = false) {
    const vars = navVars(isDesktop() ? SCROLLED_WIDTH : '100%', scrolledPadding());

    if (navLogo) {
      immediate
        ? gsap.set(navLogo, { color: GREEN })
        : gsap.to(navLogo, {
            color: GREEN,
            duration: DUR,
            ease: EASE,
            overwrite: 'auto'
          });
    }

    applyButtonColors(false, immediate);

    immediate
      ? gsap.set(nav, vars)
      : gsap.to(nav, {
          ...vars,
          duration: DUR,
          ease: EASE,
          overwrite: 'auto'
        });

    setNavBg(true, immediate);
  }

  function evaluate(immediate = false) {
    const next = getScrollY() > 50;
    if (next === scrolled && !immediate) return;
    scrolled = next;
    next ? applyScrolled(immediate) : applyTop(immediate);
  }

  gsap.set(nav, {
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 1,
    visibility: 'visible',
    y: 0
  });

  evaluate(true);

  if (window.locomotiveScroll?.on) {
    window.locomotiveScroll.on('scroll', () => evaluate());
  } else {
    window.addEventListener('scroll', () => evaluate(), {
      passive: true
    });
  }

  window.navSetForceDark = (value) => {
    forceDark = value;
    if (scrolled) return;
    const light = isLight && !forceDark;

    if (navLogo) {
      gsap.to(navLogo, {
        color: light ? SAND : GREEN,
        duration: DUR,
        ease: EASE,
        overwrite: 'auto'
      });
    }
    applyButtonColors(light);
  };

  window.navRefreshTheme = () => {
    isLight = Boolean($('[data-nav-light]'));
    scrolled = null;
    evaluate();
  };

  let mode = isDesktop() ? 'desktop' : isTablet() ? 'tablet' : 'mobile';
  let resizeTimer;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nextMode = isDesktop() ? 'desktop' : isTablet() ? 'tablet' : 'mobile';
      if (nextMode === mode) return;
      mode = nextMode;
      evaluate(true);
    }, 150);
  });
}

// Nav menu
function initNavBase() {
  const toggle = $('.button-040.is--nav');
  const navBase = $('.nav-base');
  const navBg = $('.nav-base__bg');
  if (!toggle || !navBase || !navBg) return;

  const links = $$('.link-wrap', navBase);
  const localeLinks = $$('.locale-link', navBase);
  const contacts = $$('.nav-base__contact-wrap', navBase);
  let open = false;

  gsap.set(navBase, {
    autoAlpha: 0,
    pointerEvents: 'none'
  });
  gsap.set(navBg, {
    scaleY: 0,
    transformOrigin: 'top center'
  });
  gsap.set([...links, ...contacts], {
    autoAlpha: 0,
    y: 20
  });

  const tl = gsap.timeline({
    paused: true,
    onReverseComplete() {
      gsap.set(navBase, {
        autoAlpha: 0,
        pointerEvents: 'none'
      });
    }
  });

  tl.set(navBase, {
    autoAlpha: 1,
    pointerEvents: 'auto'
  })
    .to(
      navBg,
      {
        scaleY: 1,
        duration: 1,
        ease: 'navEase'
      },
      0
    )
    .to(
      links,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'navEase',
        stagger: 0.08
      },
      0.3
    );

  if (contacts.length) {
    tl.to(
      contacts,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'navEase',
        stagger: 0.08
      },
      0.5
    );
  }

  function setOpen(value) {
    open = value;
    window.navSetForceDark?.(open);
    window.lottieMenuSetOpen?.(open);

    if (open) {
      window.locomotiveScroll?.stop?.();
      tl.play();
    } else {
      window.locomotiveScroll?.start?.();
      tl.reverse();
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(!open);
  });

  [...links, ...localeLinks].forEach(link => {
  link.addEventListener('click', () => {
    if (open) setOpen(false);
  });
  });
}

// Lottie menu
function initLottieMenu() {

  let animations = [];
  let open = false;

  function setup(attempt = 0) {
    const player = { lottie: { getRegisteredAnimations: () => lottieAnimations } };
    animations =
      player?.lottie
        ?.getRegisteredAnimations()
        ?.filter((anim) => anim.wrapper?.classList.contains('lottie-menu')) || [];

    if (!animations.length) {
      if (attempt < 20) {
        setTimeout(() => setup(attempt + 1), 100);
      }
      return;
    }

    animations.forEach((anim) => {
      anim.loop = false;
      anim.stop();
    });

    window.lottieMenuSetOpen = (value) => {
      if (value === open) return;
      open = value;
      animations.forEach((anim) => {
        anim.setDirection(open ? 1 : -1);
        anim.play();
      });
    };
  }

  setup();
}

// Lottie logo
function initLottieLogo() {

  function setup(attempt = 0) {
    const player = { lottie: { getRegisteredAnimations: () => lottieAnimations } };
    const anim = player?.lottie
      ?.getRegisteredAnimations()
      ?.find((item) => item.wrapper?.closest('.logo'));

    if (!anim) {
      if (attempt < 20) {
        setTimeout(() => setup(attempt + 1), 100);
      }
      return;
    }

    anim.loop = false;
    anim.stop();
    anim.goToAndStop(0, true);

    const lastFrame = anim.totalFrames - 1;
    let scrolled = false;
    let tween = null;

    function animate(from, to) {
      tween?.kill();
      const state = {
        frame: from
      };

      tween = gsap.to(state, {
        frame: to,
        duration: 1,
        ease: 'navEase',
        onUpdate() {
          anim.goToAndStop(Math.round(state.frame), true);
        }
      });
    }

    function update() {
      const next = getScrollY() > 50;
      if (next === scrolled) return;
      scrolled = next;
      animate(next ? 0 : lastFrame, next ? lastFrame : 0);
    }

    if (window.locomotiveScroll?.on) {
      window.locomotiveScroll.on('scroll', update);
    } else {
      window.addEventListener('scroll', update, {
        passive: true
      });
    }

    update();
  }

  setup();
}

// Swiper
function initSlider(root = document) {
  const sliders = $$('.slider', root);
  if (!sliders.length) return;

  const instances = [];
  const PARALLAX = 5;

  sliders.forEach((el) => {
    const swiper = new Swiper(el, {
      modules: [Autoplay, Navigation],
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 24,
      grabCursor: true,
      allowTouchMove: true,
      loop: true,
      speed: 800,
      watchSlidesProgress: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: $('.slider-next', el),
        prevEl: $('.slider-prev', el)
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 24
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 24
        },
        767: {
          slidesPerView: 3.2,
          spaceBetween: 24
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 24
        }
      },
      on: {
        progress(swiper) {
          swiper.slides.forEach((slide) => {
            const img = $('.image.is-slider', slide);
            if (img) {
              img.style.transform = `translateX(${slide.progress * PARALLAX}%)`;
            }
          });
        },
        setTransition(swiper, duration) {
          swiper.slides.forEach((slide) => {
            const img = $('.image.is-slider', slide);
            if (img) {
              img.style.transitionDuration = `${duration}ms`;
            }
          });
        }
      }
    });
    instances.push(swiper);
  });

  return () => {
    instances.forEach((swiper) => {
      if (!swiper.destroyed) {
        swiper.destroy(true, true);
      }
    });
  };
}

// Text fit width
function initTextFitToWidth(root = document) {
  const elements = $$('[data-fit-width]', root);
  if (!elements.length) return;

  const groups = new Map();
  let disposed = false;

  elements.forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    el.style.whiteSpace = 'nowrap';
    if (!groups.has(parent)) {
      groups.set(parent, []);
    }
    groups.get(parent).push(el);
  });

  function fit(el, available) {
    if (available <= 0) return;
    const max = available * 0.95;
    let size = parseFloat(getComputedStyle(el).fontSize) || 16;

    for (let i = 0; i < 5; i++) {
      const width = el.getBoundingClientRect().width;
      if (!width) break;
      const ratio = max / width;
      if (Math.abs(ratio - 1) < 0.002) break;
      size *= ratio;
      el.style.fontSize = `${size}px`;
    }
  }

  function refit() {
    if (disposed) return;
    groups.forEach((els, parent) => {
      const styles = getComputedStyle(parent);
      const available =
        parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      els.forEach((el) => fit(el, available));
    });
  }

  let raf = null;
  function schedule() {
    if (disposed || raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      refit();
    });
  }

  const ro = window.ResizeObserver ? new ResizeObserver(schedule) : null;
  groups.forEach((_, parent) => {
    ro?.observe(parent);
  });

  window.addEventListener('resize', schedule);
  refit();
  document.fonts?.ready?.then(refit);

  return () => {
    disposed = true;
    if (raf) {
      cancelAnimationFrame(raf);
    }
    ro?.disconnect();
    window.removeEventListener('resize', schedule);
    elements.forEach((el) => {
      el.style.whiteSpace = '';
      el.style.fontSize = '';
    });
  };
}

// Marquee
function initMarqueeScrollDirection(root = document) {
  $$('[data-marquee-scroll-direction-target]', root).forEach((marquee) => {
    const content = $('[data-marquee-collection-target]', marquee);
    const scroll = $('[data-marquee-scroll-target]', marquee);
    if (!content || !scroll) return;

    const speed = parseFloat(marquee.dataset.marqueeSpeed) || 20;
    const direction = marquee.dataset.marqueeDirection === 'right' ? 1 : -1;
    const duplicates = parseInt(marquee.dataset.marqueeDuplicate || '0', 10);
    const scrollSpeed = parseFloat(marquee.dataset.marqueeScrollSpeed) || 0;
    const multiplier = innerWidth < 479 ? 0.25 : innerWidth < 991 ? 0.5 : 1;
    const duration = speed * (content.offsetWidth / innerWidth) * multiplier;

    scroll.style.marginLeft = `${-scrollSpeed}%`;
    scroll.style.width = `${scrollSpeed * 2 + 100}%`;

    const clones = [];
    for (let i = 0; i < duplicates; i++) {
      const clone = content.cloneNode(true);
      clones.push(clone);
      scroll.appendChild(clone);
    }
    addPageCleanup(() => clones.forEach((clone) => clone.remove()));

    const items = $$('[data-marquee-collection-target]', marquee);
    const animation = gsap
      .to(items, {
        xPercent: -100,
        repeat: -1,
        duration,
        ease: 'none'
      })
      .totalProgress(0.5);

    gsap.set(items, {
      xPercent: direction === 1 ? 100 : -100
    });
    animation.timeScale(direction).play();

    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const inverted = self.direction === 1;
        animation.timeScale(inverted ? -direction : direction);
        marquee.dataset.marqueeStatus = inverted ? 'normal' : 'inverted';
      }
    });

    const start = direction === -1 ? scrollSpeed : -scrollSpeed;

    gsap.fromTo(
      scroll,
      {
        x: `${start}vw`
      },
      {
        x: `${-start}vw`,
        ease: 'none',
        scrollTrigger: {
          trigger: marquee,
          start: '0% 100%',
          end: '100% 0%',
          scrub: true
        }
      }
    );
  });
}

// Image slideshow
function initSlideShow(el) {
  const slides = $$('[data-slideshow="slide"]', el);
  const inner = $$('[data-slideshow="parallax"]', el);
  const thumbs = $$('[data-slideshow="thumb"]', el);
  if (!slides.length) return null;

  const controller = new AbortController();
  const { signal } = controller;
  let current = 0;
  let animating = false;
  let observer = null;
  let timeline = null;
  let disposed = false;
  const DURATION = 0.9;
  const MAX_THUMBS = 5;

  gsap.killTweensOf([...slides, ...inner]);

  slides.forEach((slide, i) => {
    slide.dataset.index = i;
  });
  thumbs.forEach((thumb, i) => {
    thumb.dataset.index = i;
  });
  slides.forEach((slide) => {
    slide.classList.remove('is--current');
  });
  thumbs.forEach((thumb) => {
    thumb.classList.remove('is--current');
  });

  slides[current]?.classList.add('is--current');
  thumbs[current]?.classList.add('is--current');

  gsap.set(slides, {
    xPercent: 100
  });
  gsap.set(slides[current], {
    xPercent: 0
  });
  gsap.set(inner, {
    xPercent: 0
  });

  const hiddenCount = Math.max(0, thumbs.length - MAX_THUMBS);
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('is--hidden', i >= MAX_THUMBS);
    thumb.classList.toggle('is--last-visible', i === MAX_THUMBS - 1 && hiddenCount > 0);
  });

  if (hiddenCount > 0 && thumbs[MAX_THUMBS - 1]) {
    thumbs[MAX_THUMBS - 1].dataset.remaining = `+${hiddenCount}`;
  }

  function navigate(direction, target = null) {
    if (disposed || animating || slides.length < 2) return;
    animating = true;
    observer?.disable();

    const previous = current;
    current =
      target ??
      (direction === 1
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length);

    const tl = (timeline = gsap.timeline({
      defaults: {
        duration: DURATION,
        ease: 'slideshow-wipe'
      },
      onStart() {
        slides[current]?.classList.add('is--current');
        thumbs[previous]?.classList.remove('is--current');
        thumbs[current]?.classList.add('is--current');
      },
      onComplete() {
        slides[previous]?.classList.remove('is--current');
        animating = false;
        observer?.enable();
      }
    }));

    tl.to(
      slides[previous],
      {
        xPercent: -direction * 100
      },
      0
    ).fromTo(
      slides[current],
      {
        xPercent: direction * 100
      },
      {
        xPercent: 0
      },
      0
    );

    if (inner[previous]) {
      tl.to(
        inner[previous],
        {
          xPercent: direction * 50
        },
        0
      );
    }

    if (inner[current]) {
      tl.fromTo(
        inner[current],
        {
          xPercent: -direction * 50
        },
        {
          xPercent: 0
        },
        0
      );
    }
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener(
      'click',
      (e) => {
        const target = parseInt(e.currentTarget.dataset.index, 10);
        if (target === current || animating) return;
        navigate(target > current ? 1 : -1, target);
      },
      { signal }
    );
  });

  $('.img-slider__arrow.is--prev', el)?.addEventListener('click', () => navigate(-1), { signal });
  $('.img-slider__arrow.is--next', el)?.addEventListener('click', () => navigate(1), { signal });

  observer = Observer.create({
    target: el,
    type: 'wheel,touch,pointer',
    tolerance: 10,
    wheelSpeed: -1,
    onLeft: () => navigate(1),
    onRight: () => navigate(-1),
    onWheel(e) {
      if (animating || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (e.deltaX > 50) {
        navigate(1);
      } else if (e.deltaX < -50) {
        navigate(-1);
      }
    }
  });

  observer.disable();
  const enableRaf = requestAnimationFrame(() => {
    if (!disposed) observer?.enable();
  });

  return {
    destroy() {
      disposed = true;
      cancelAnimationFrame(enableRaf);
      timeline?.kill();
      controller.abort();
      observer?.kill();
      gsap.killTweensOf([...slides, ...inner]);
    }
  };
}

function initImgSlideshowsDelayed(root = document) {
  let instances = [];
  let cancelled = false;
  let raf1 = null;
  let raf2 = null;

  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(() => {
      if (cancelled) return;
      instances = $$('[data-slideshow="wrap"]', root).map(initSlideShow).filter(Boolean);
      window.locomotiveScroll?.resize?.();
      ScrollTrigger.refresh();
    });
  });

  return () => {
    cancelled = true;
    if (raf1) {
      cancelAnimationFrame(raf1);
    }
    if (raf2) {
      cancelAnimationFrame(raf2);
    }
    instances.forEach((instance) => {
      instance?.destroy?.();
    });
    instances = [];
  };
}

// Preview follower
function initPreviewFollower(root = document) {
  const controllers = [];
  const cleanups = [];

  $$('[data-follower-wrap]', root).forEach((wrap) => {
    const collection = $('[data-follower-collection]', wrap);
    const items = $$('[data-follower-item]', wrap);
    const follower = $('[data-follower-cursor]', wrap);
    const inner = $('[data-follower-cursor-inner]', wrap);
    if (!collection || !follower || !inner) return;

    const controller = new AbortController();
    const { signal } = controller;
    controllers.push(controller);

    const clones = new Set();
    let previous = null;
    let firstEntry = true;
    const OFFSET = 100;
    const DURATION = 0.5;
    const EASE = 'power2.inOut';
    const HORIZONTAL = 0.3;

    gsap.set(follower, {
      xPercent: -50,
      yPercent: -50
    });

    const yTo = gsap.quickTo(follower, 'y', {
      duration: 0.6,
      ease: 'power3'
    });

    function setX() {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width) return;
      gsap.set(follower, {
        x: rect.left + rect.width * HORIZONTAL
      });
    }

    const move = (e) => {
      yTo(e.clientY);
    };

    setX();
    const positionRaf = requestAnimationFrame(setX);

    cleanups.push(() => {
      cancelAnimationFrame(positionRaf);
      yTo.tween.kill();
      clones.forEach((clone) => {
        gsap.killTweensOf(clone);
        clone.remove();
      });
      clones.clear();
    });

    window.addEventListener('resize', setX, { signal });
    window.addEventListener('mousemove', move, { signal });
    collection.addEventListener('mouseenter', setX, { signal });

    function removeVisuals(direction = -OFFSET) {
      $$('[data-follower-visual]', follower).forEach((visual) => {
        gsap.killTweensOf(visual);
        gsap.to(visual, {
          yPercent: direction,
          duration: DURATION,
          ease: EASE,
          overwrite: 'auto',
          onComplete() {
            clones.delete(visual);
            visual.remove();
          }
        });
      });
    }

    items.forEach((item, index) => {
      item.addEventListener(
        'mouseenter',
        () => {
          const forward = previous === null || index > previous;
          previous = index;
          removeVisuals(forward ? -OFFSET : OFFSET);

          const source = $('[data-follower-visual]', item);
          if (!source) return;
          const clone = source.cloneNode(true);
          clones.add(clone);
          inner.appendChild(clone);

          if (!firstEntry) {
            gsap.fromTo(
              clone,
              {
                yPercent: forward ? OFFSET : -OFFSET
              },
              {
                yPercent: 0,
                duration: DURATION,
                ease: EASE,
                overwrite: 'auto'
              }
            );
          }
          firstEntry = false;
        },
        { signal }
      );

      item.addEventListener(
        'mouseleave',
        () => {
          removeVisuals(-OFFSET);
        },
        { signal }
      );
    });

    collection.addEventListener(
      'mouseleave',
      () => {
        removeVisuals(-OFFSET);
        firstEntry = true;
        previous = null;
      },
      { signal }
    );
  });

  return () => {
    controllers.forEach((controller) => {
      controller.abort();
    });
    cleanups.forEach((cleanup) => cleanup());
  };
}

// Bunny background video
function initBunnyPlayerBackground(root = document) {
  const cleanups = [];

  $$('[data-bunny-background-init]', root).forEach((player) => {
    const src = player.dataset.playerSrc;
    const video = $('video', player);
    if (!src || !video) return;

    const controller = new AbortController();
    const { signal } = controller;
    let hls = null;
    let io = null;
    let attached = false;
    let pendingPlay = false;
    let lastPauseBy = '';

    // Hero video: wait for the intro curtain (page loader) before playing
    const gated = !!player.closest('section')?.querySelector('.p-loader__bg');
    let allowed = !gated;
    let inView = false;
    if (gated) {
      loaderGate.then(() => {
        allowed = true;
        if (inView && !signal.aborted && video.paused && lastPauseBy !== 'manual') play();
      });
    }

    const lazy = player.dataset.playerLazy === 'true';
    const autoplay = player.dataset.playerAutoplay === 'true';

    function status(value) {
      player.dataset.playerStatus = value;
    }

    function activated(value) {
      player.dataset.playerActivated = value ? 'true' : 'false';
    }

    try {
      video.pause();
      video.removeAttribute('src');
      video.load();
    } catch (_) {}

    activated(false);
    video.muted = autoplay || player.dataset.playerMuted === 'true';
    video.loop = autoplay;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    if ('disableRemotePlayback' in video) {
      video.disableRemotePlayback = true;
    }

    // Grefton: plain MP4 files are played directly; only .m3u8 streams go through HLS
    const isHls = /\.m3u8(\?|$)/i.test(src);
    const nativeHls = isHls && !!video.canPlayType('application/vnd.apple.mpegurl');
    const useHls = isHls && !!window.Hls?.isSupported?.() && !nativeHls;

    function ready() {
      if (!pendingPlay && player.dataset.playerActivated !== 'true') {
        status('ready');
      }
    }

    function attach() {
      if (attached) return;
      attached = true;

      if (nativeHls) {
        video.preload = lazy ? 'none' : 'auto';
        video.src = src;
        video.addEventListener('loadedmetadata', ready, {
          once: true,
          signal
        });
        return;
      }

      if (useHls) {
        hls = new Hls({
          maxBufferLength: 10
        });
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(src);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, ready);
        return;
      }

      video.src = src;
    }

    if (lazy) {
      video.preload = 'none';
    } else {
      attach();
    }

    function play() {
      if (lazy && !attached) {
        attach();
      }
      pendingPlay = true;
      lastPauseBy = '';
      status('loading');
      video.play()?.catch?.(() => {});
    }

    function pause(by = 'manual') {
      lastPauseBy = by;
      video.pause();
    }

    function togglePlay() {
      video.paused || video.ended ? play() : pause();
    }

    player.addEventListener(
      'click',
      (e) => {
        const button = e.target.closest('[data-player-control]');
        if (!button || !player.contains(button)) return;
        const type = button.dataset.playerControl;

        if (type === 'play' || type === 'pause' || type === 'playpause') {
          togglePlay();
        }
        if (type === 'mute') {
          video.muted = !video.muted;
          player.dataset.playerMuted = video.muted ? 'true' : 'false';
        }
      },
      { signal }
    );

    video.addEventListener(
      'play',
      () => {
        activated(true);
        status('playing');
      },
      { signal }
    );

    video.addEventListener(
      'playing',
      () => {
        pendingPlay = false;
        status('playing');
      },
      { signal }
    );

    video.addEventListener(
      'pause',
      () => {
        pendingPlay = false;
        status('paused');
      },
      { signal }
    );

    video.addEventListener(
      'waiting',
      () => {
        status('loading');
      },
      { signal }
    );

    video.addEventListener('canplay', ready, { signal });

    video.addEventListener(
      'ended',
      () => {
        pendingPlay = false;
        activated(false);
        status('paused');
      },
      { signal }
    );

    if (autoplay) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const visible = entry.isIntersecting && entry.intersectionRatio > 0;
            inView = visible;

            if (visible) {
              if (lazy && !attached) {
                attach();
              }
              if (!allowed) return;
              if (lastPauseBy === 'io' || (video.paused && lastPauseBy !== 'manual')) {
                play();
              }
            } else if (!video.paused && !video.ended) {
              pause('io');
            }
          });
        },
        {
          threshold: 0.1
        }
      );
      io.observe(player);
    }

    cleanups.push(() => {
      controller.abort();
      io?.disconnect();
      hls?.destroy();
      try {
        video.pause();
      } catch (_) {}
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
  };
}

// Content reveal
function initContentRevealScroll(root = document) {
  $$('[data-reveal-group]', root).forEach((group) => {
    if (reducedMotion) {
      gsap.set(group, {
        y: 0,
        autoAlpha: 1
      });
      return;
    }

    const stagger = (parseFloat(group.dataset.stagger) || 100) / 1000;
    const distance = group.dataset.distance || '2em';
    const start = group.dataset.start || 'top 80%';
    const items = [...group.children].filter(
      (el) => el.nodeType === 1 && el.dataset.ignore !== 'true'
    );
    if (!items.length) return;

    gsap.set(items, {
      y: distance,
      autoAlpha: 0
    });

    ScrollTrigger.create({
      trigger: group,
      start,
      once: true,
      onEnter() {
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power4.inOut',
          stagger,
          onComplete() {
            gsap.set(items, {
              clearProps: 'transform,opacity,visibility'
            });
          }
        });
      }
    });
  });
}

// Line reveal
function initLineReveal(root = document) {
  $$('.line', root).forEach((line) => {
    ScrollTrigger.create({
      trigger: line,
      start: 'top 90%',
      once: true,
      onEnter() {
        line.classList.add('in-view');
      }
    });
  });
}

// Services: sticky image that wipes to the next service's image as each item scrolls into view
function initServiceScroller(root = document) {
  $$('[data-service-scroller]', root).forEach((wrap) => {
    const imgs = $$('[data-service-image]', wrap);
    const items = $$('[data-service-item]', wrap);
    if (imgs.length < 2 || imgs.length !== items.length) return;

    const HIDDEN_BELOW = 'inset(100% 0% 0% 0%)'; // wipes up from the bottom
    const HIDDEN_ABOVE = 'inset(0% 0% 100% 0%)'; // wipes down from the top
    const SHOWN = 'inset(0% 0% 0% 0%)';
    let current = 0;
    let z = 1;

    gsap.set(imgs, { clipPath: HIDDEN_BELOW, zIndex: 0 });
    gsap.set(imgs[0], { clipPath: SHOWN, zIndex: 1 });
    items[0].classList.add('is-active');

    function show(next, direction) {
      if (next === current) return;
      current = next;
      items.forEach((item, i) => item.classList.toggle('is-active', i === next));

      const layer = imgs[next];
      const photo = $('img', layer);
      gsap.killTweensOf([layer, photo]);
      z += 1;

      if (reducedMotion) {
        gsap.set(layer, { zIndex: z, clipPath: SHOWN });
        imgs.forEach((other, i) => i !== next && gsap.set(other, { clipPath: HIDDEN_BELOW }));
        return;
      }

      gsap.set(layer, { zIndex: z, clipPath: direction === 1 ? HIDDEN_BELOW : HIDDEN_ABOVE });
      gsap.to(layer, {
        clipPath: SHOWN,
        duration: 0.9,
        ease: 'navEase',
        onComplete() {
          imgs.forEach((other, i) => i !== current && gsap.set(other, { clipPath: HIDDEN_BELOW }));
        }
      });
      gsap.fromTo(photo, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: 'navEase' });
    }

    // One trigger over the whole pinned section: scroll progress picks the active service
    ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const index = Math.min(items.length - 1, Math.floor(self.progress * items.length));
        show(index, index > current ? 1 : -1);
      }
    });
  });
}

// Locomotive Scroll
function initSmoothScroll() {
  if (typeof LocomotiveScroll === 'undefined') return null;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  const loco = new LocomotiveScroll({
    lenisOptions: {
      lerp: isMobile ? 0.12 : 0.1,
      syncTouch: isMobile,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 30,
      touchMultiplier: 1,
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    }
  });

  window.locomotiveScroll = loco;
  return loco;
}

// Layout refresh
function refreshPageLayout(container) {
  const loco = window.locomotiveScroll;
  const controller = new AbortController();
  let disposed = false;
  let raf2 = 0;

  function refresh() {
    if (disposed || !container.isConnected) return;
    loco?.resize?.();
    window.dispatchEvent(new Event('resize'));
    ScrollTrigger.refresh();
  }

  const raf1 = requestAnimationFrame(() => {
    if (!disposed) raf2 = requestAnimationFrame(refresh);
  });

  document.fonts?.ready?.then(refresh);

  $$('img', container).forEach((img) => {
    if (!img.complete)
      img.addEventListener('load', refresh, {
        once: true,
        signal: controller.signal
      });
  });

  const timers = [100, 300, 700].map((delay) => setTimeout(refresh, delay));

  addPageCleanup(() => {
    disposed = true;
    controller.abort();
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
    timers.forEach((timer) => clearTimeout(timer));
  });
}

// Global init
let onceInitialized = false;

function initOnceFunctions() {
  if (onceInitialized) return;
  onceInitialized = true;
  initLotties();
  initSmoothScroll();
  initNav();
  initNavBase();
  initLottieMenu();
  initLottieLogo();
  initFormSubmit();
}

// Page init
function initPageFunctions(container) {
  pageCtx = gsap.context(() => {
    initStaggerText(container);
    initMarqueeScrollDirection(container);
    initContentRevealScroll(container);
    initLineReveal(container);
    initServiceScroller(container);
    addPageCleanup(initSlider(container));
    addPageCleanup(initImgSlideshowsDelayed(container));
    addPageCleanup(initTextFitToWidth(container));
    addPageCleanup(initPreviewFollower(container));
    addPageCleanup(initBunnyPlayerBackground(container));
  }, container);

  refreshPageLayout(container);
}

// Page positioning
function finalizePage(container) {
  gsap.set(container, {
    clearProps: 'all'
  });
  window.scrollTo(0, 0);

  const loco = window.locomotiveScroll;
  loco?.resize?.();
  loco?.start?.();
}

// Page transitions
function runPageLeaveAnimation(current) {
  const wrap = $('[data-transition-wrap]');
  const dark = $('[data-transition-dark]', wrap);
  const tl = gsap.timeline();

  if (reducedMotion) {
    return tl.to(current, {
      autoAlpha: 0,
      duration: 0.3
    });
  }

  if (wrap) {
    tl.set(wrap, {
      zIndex: 100
    });
  }

  if (dark) {
    tl.fromTo(
      dark,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }
    );
  }

  return tl;
}

function runPageEnterAnimation(next) {
  const wrap = $('[data-transition-wrap]');
  const dark = $('[data-transition-dark]', wrap);

  const tl = gsap.timeline({
    onComplete() {
      if (wrap) {
        gsap.set(wrap, {
          zIndex: -1
        });
      }
    }
  });

  if (reducedMotion) {
    if (dark) {
      tl.set(dark, {
        autoAlpha: 0
      });
    }
    return tl.from(next, {
      autoAlpha: 0,
      duration: 0.3
    });
  }

  if (dark) {
    tl.to(dark, {
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    });
  }

  return tl;
}


// ---- Lifecycle (replaces Barba) -------------------------------------------
history.scrollRestoration = "manual";
let lastPath = null;

export function currentContainer() {
  return document.querySelector(".page-wrap");
}

// First load of the site
export function once(path) {
  if (lastPath === path) return;
  lastPath = path;
  const container = currentContainer();
  if (!container) return;
  initOnceFunctions();
  finalizePage(container);
  preparePageLoader(container);
  initPageFunctions(container);
  runPageLoader(container);
}

// Before swapping pages: dark fade + teardown
export async function leave() {
  const loco = window.locomotiveScroll;
  const current = currentContainer();
  loco?.stop?.();
  await runPageLeaveAnimation(current);
  loco?.removeScrollElements?.(current);
  destroyPageFunctions();
}

// After the new page has rendered
export async function enter(path) {
  if (lastPath === path) return;
  lastPath = path;
  destroyPageFunctions();
  const loco = window.locomotiveScroll;
  const container = currentContainer();
  if (!container) return;

  finalizePage(container);
  const hasLoader = preparePageLoader(container);
  window.navRefreshTheme?.();

  await runPageEnterAnimation(container);

  loco?.addScrollElements?.(container);
  initPageFunctions(container);
  if (hasLoader) runPageLoader(container);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loco?.resize?.();
      loco?.start?.();
      window.dispatchEvent(new Event("resize"));
      ScrollTrigger.refresh();
    });
  });
}
