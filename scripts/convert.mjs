// One-off converter: original Webflow export (HTML) -> React/JSX with identical markup.
// Usage: node scripts/convert.mjs
import fs from "node:fs";
import path from "node:path";
import { parseDocument } from "htmlparser2";

const SRC = path.resolve("../www.mejuma-tuscany.com");
const OUT_APP = path.resolve("src/app");
const OUT_COMP = path.resolve("src/components/generated");

const VOID = new Set(["img", "input", "br", "hr", "source", "link", "meta", "area", "base", "col", "embed", "track", "wbr"]);
const ATTR = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  hreflang: "hrefLang",
  autoplay: "autoPlay",
  playsinline: "playsInline",
  crossorigin: "crossOrigin",
  maxlength: "maxLength",
  readonly: "readOnly",
  colspan: "colSpan",
  rowspan: "rowSpan",
  autocomplete: "autoComplete",
  novalidate: "noValidate",
  frameborder: "frameBorder",
  allowfullscreen: "allowFullScreen",
  enctype: "encType",
  "accept-charset": "acceptCharset",
};
const BOOL = new Set(["muted", "autoplay", "playsinline", "loop", "controls", "disabled", "required", "checked", "readonly", "novalidate", "selected", "hidden", "multiple"]);
const DROP = new Set(["srcset", "sizes"]);

const camel = (s) => s.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase());

function fixPath(v) {
  return v.replace(/(\.\.\/)+_external\//g, "/_external/");
}

function fixHref(v) {
  if (/^(https?:|mailto:|tel:|#)/.test(v)) return v;
  let h = v.replace(/^\.\.\//, "").replace(/^\//, "");
  if (h === "index.html" || h === "") return "/";
  return "/" + h.replace(/\.html$/, "");
}

function styleObj(css) {
  const entries = css
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const i = d.indexOf(":");
      const k = d.slice(0, i).trim();
      const val = d.slice(i + 1).trim();
      const key = k.startsWith("--") ? JSON.stringify(k) : camel(k);
      return `${key}: ${JSON.stringify(val)}`;
    });
  return `{{ ${entries.join(", ")} }}`;
}

function isInternal(node) {
  if (node.name !== "a") return false;
  const href = node.attribs?.href;
  if (!href) return false;
  return !/^(https?:|mailto:|tel:|#)/.test(href);
}

function attrs(node, tag) {
  const out = [];
  for (const [rawName, rawVal] of Object.entries(node.attribs || {})) {
    const lname = rawName.toLowerCase();
    if (DROP.has(lname)) continue;
    if (tag === "img" && (lname === "width" || lname === "height") && /^auto$/i.test(rawVal)) continue;
    if (lname === "style") {
      out.push(`style=${styleObj(rawVal)}`);
      continue;
    }
    let name;
    if (rawName.startsWith("data-") || rawName.startsWith("aria-")) name = rawName;
    else if (ATTR[lname]) name = ATTR[lname];
    else if (rawName.includes("-") || rawName.includes(":")) name = camel(rawName);
    else name = rawName;
    if (tag === "input" || tag === "textarea") {
      if (lname === "value") name = "defaultValue";
      if (lname === "checked") name = "defaultChecked";
    }
    let val = rawVal;
    if (lname === "href") val = isInternal(node) ? fixHref(val) : val;
    else if (lname === "src" || lname === "data-src" || lname === "poster") {
      val = fixPath(val);
      val = val.replace(
        /^https:\/\/cdn\.prod\.website-files\.com\/6a71d6d6aa3293dbfd19a3b7\/(.+)\.json$/,
        (_, f) => "/lottie/" + decodeURIComponent(f).replace(/ \(7\)$/, "") + ".json",
      );
    } else val = fixPath(val);
    if (["maxlength", "tabindex", "rows", "cols", "colspan", "rowspan"].includes(lname) && /^-?\d+$/.test(val)) {
      out.push(`${name}={${val}}`);
      continue;
    }
    if (BOOL.has(lname) && (rawVal === "" || rawVal.toLowerCase() === lname)) out.push(name);
    else if (/[{}]/.test(val) || val.includes("\n")) out.push(`${name}={${JSON.stringify(val)}}`);
    else out.push(`${name}=${JSON.stringify(val)}`);
  }
  return out.length ? " " + out.join(" ") : "";
}

function text(t) {
  const s = t.replace(/\s+/g, " ");
  if (!s.trim()) return "";
  if (/[{}<>&"'\\]|[^\x00-\x7f]/.test(s)) return `{${JSON.stringify(s)}}`;
  return s;
}

function render(node, depth = 0) {
  const pad = "  ".repeat(depth);
  if (node.type === "text") {
    const t = text(node.data);
    return t ? pad + t + "\n" : "";
  }
  if (node.type === "comment" || node.type === "directive") return "";
  if (node.type !== "tag" && node.type !== "style" && node.type !== "script") return "";
  const tag = node.name;
  if (tag === "script" || tag === "style") return "";
  const link = isInternal(node);
  const jsxTag = link ? "Link" : tag;
  const a = attrs(node, tag);
  if (VOID.has(tag)) return `${pad}<${jsxTag}${a} />\n`;
  const kids = (node.children || []).map((c) => render(c, depth + 1)).join("");
  if (!kids.trim()) return `${pad}<${jsxTag}${a}></${jsxTag}>\n`;
  return `${pad}<${jsxTag}${a}>\n${kids}${pad}</${jsxTag}>\n`;
}

function find(node, pred) {
  if (pred(node)) return node;
  for (const c of node.children || []) {
    const r = find(c, pred);
    if (r) return r;
  }
  return null;
}

const hasClass = (n, c) => n.attribs?.class?.split(/\s+/).includes(c);

function meta(doc) {
  const title = find(doc, (n) => n.name === "title");
  const desc = find(doc, (n) => n.name === "meta" && n.attribs?.name === "description");
  const t = title ? title.children.map((c) => c.data).join("") : "";
  return { title: t, description: desc?.attribs?.content || "" };
}

function pageSource(name, node, m) {
  const body = render(node, 2);
  return `/* eslint-disable @next/next/no-img-element */
// Generated from the original ${name}.html by scripts/convert.mjs, then hand-edited.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ${JSON.stringify(m.title)},
  description: ${JSON.stringify(m.description)},
};

export default function Page() {
  return (
${body}  );
}
`;
}

const pages = [
  ["index", "page.tsx"],
  ["about-us", "about-us/page.tsx"],
  ["process", "process/page.tsx"],
  ["solutions", "solutions/page.tsx"],
  ["tuscany", "tuscany/page.tsx"],
  ["contact", "contact/page.tsx"],
  ["properties", "properties/page.tsx"],
  ...fs
    .readdirSync(path.join(SRC, "properties"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => [`properties/${f.replace(/\.html$/, "")}`, `properties/${f.replace(/\.html$/, "")}/page.tsx`]),
];

for (const [name, outFile] of pages) {
  const html = fs.readFileSync(path.join(SRC, name + ".html"), "utf8");
  const doc = parseDocument(html, { lowerCaseAttributeNames: false, decodeEntities: true });
  const container = find(doc, (n) => n.attribs?.["data-barba"] === "container");
  if (!container) {
    console.warn("no container in", name);
    continue;
  }
  const dest = path.join(OUT_APP, outFile);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, pageSource(name, container, meta(doc)));
  console.log("page", name, "->", outFile);
}

// Shared nav (identical on every page; take from index)
{
  const html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");
  const doc = parseDocument(html, { lowerCaseAttributeNames: false, decodeEntities: true });
  const nav = find(doc, (n) => hasClass(n, "nav-group"));
  fs.mkdirSync(OUT_COMP, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_COMP, "NavGroup.tsx"),
    `/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function NavGroup() {
  return (
${render(nav, 2)}  );
}
`,
  );
  console.log("nav -> components/generated/NavGroup.tsx");
}
