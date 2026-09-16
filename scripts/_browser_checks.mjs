import { chromium } from "playwright-core";
import fs from "fs";

const EXE = process.env.LOCALAPPDATA + "\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const BASE = "http://localhost:3000";
const OUT = "C:\\Users\\nafiz\\AppData\\Local\\Temp\\claude\\e--Garage\\7f65a9fd-9675-46fc-8489-16037592ae60\\scratchpad";

const results = [];
const pass = (n, x = "") => results.push(`PASS  ${n}${x ? "  — " + x : ""}`);
const fail = (n, x = "") => results.push(`FAIL  ${n}${x ? "  — " + x : ""}`);
const info = (n) => results.push(`····  ${n}`);
const step = async (name, fn) => {
  try {
    await fn();
  } catch (e) {
    fail(name, "threw: " + (e.message || e).split("\n")[0]);
  }
};

const browser = await chromium.launch({ executablePath: EXE });
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(`[${page.url()}] ${m.text()}`.slice(0, 200));
});
page.on("pageerror", (e) => consoleErrors.push(`[${page.url()}] pageerror: ${e.message}`.slice(0, 200)));

const go = async (p) => {
  const r = await page.goto(BASE + p, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  return r ? r.status() : 0;
};

// 1. HOMEPAGE
await step("homepage", async () => {
  const s = await go("/");
  s === 200 ? pass("homepage 200") : fail("homepage", "status " + s);
  const t = await page.title();
  t.length > 5 ? pass("homepage <title>", t) : fail("homepage <title>", t);
});

// 2. NAV DROPDOWNS
for (const label of ["Models", "Engines", "Variants", "Guides"]) {
  await step("nav " + label, async () => {
    await page.locator(`header nav div.group > a`, { hasText: new RegExp(`^${label}$`) }).first().hover();
    await page.waitForTimeout(300);
    const n = await page
      .locator(`header nav div.group:has(> a:text-is("${label}")) .menu-scroll a`)
      .count();
    n > 0 ? pass(`nav "${label}" dropdown opens`, n + " links") : fail(`nav "${label}" dropdown`, "0 links");
  });
}
await step("Models dropdown scrollable", async () => {
  await page.locator(`header nav div.group > a`, { hasText: /^Models$/ }).first().hover();
  await page.waitForTimeout(250);
  const m = await page.evaluate(() => {
    const g = [...document.querySelectorAll("header nav div.group")].find(
      (d) => d.querySelector("a")?.textContent.trim() === "Models"
    );
    const sc = g?.querySelector(".menu-scroll");
    return sc ? { s: sc.scrollHeight, c: sc.clientHeight, cls: /menu-scroll/.test(sc.className) } : null;
  });
  m && m.s > m.c && m.cls
    ? pass("Models dropdown scrollable + .menu-scroll", `${m.s}>${m.c}px`)
    : info("Models scroll: " + JSON.stringify(m));
});

// 3. PHONE + CTA ONE LINE
await step("nav phone/cta line", async () => {
  await page.mouse.move(5, 5);
  await page.waitForTimeout(150);
  const c = await page.evaluate(() => {
    const q = [...document.querySelectorAll("header a")];
    const ph = q.find((a) => /0203 488 4649/.test(a.textContent));
    const bt = q.find((a) => /get a quote/i.test(a.textContent));
    const b = (e) => (e ? e.getBoundingClientRect() : null);
    const p = b(ph), t = b(bt);
    return { ph: p && Math.round(p.height), bt: t && Math.round(t.height) };
  });
  c.bt && c.bt <= 40 ? pass("'Get a Quote' single-line", `h=${c.bt}px`) : fail("'Get a Quote' wraps", JSON.stringify(c));
  c.ph == null
    ? info("phone hidden at 1366px (lg+ only) — ok")
    : c.ph <= 28
    ? pass("nav phone single-line", `h=${c.ph}px`)
    : fail("nav phone wraps", `h=${c.ph}px`);
  await page.screenshot({ path: OUT + "\\nav-1366.png", clip: { x: 300, y: 0, width: 1066, height: 110 } });
});
// also at a wide viewport where the phone shows
await step("nav at 1600px", async () => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await go("/");
  const c = await page.evaluate(() => {
    const q = [...document.querySelectorAll("header a")];
    const ph = q.find((a) => /0203 488 4649/.test(a.textContent));
    const bt = q.find((a) => /get a quote/i.test(a.textContent));
    const r = (e) => (e ? { top: Math.round(e.getBoundingClientRect().top), h: Math.round(e.getBoundingClientRect().height) } : null);
    return { ph: r(ph), bt: r(bt) };
  });
  if (c.ph && c.bt) {
    const sameLine = Math.abs(c.ph.top - c.bt.top) < 24 && c.ph.h <= 28 && c.bt.h <= 40;
    sameLine ? pass("nav phone+button same line @1600", JSON.stringify(c)) : fail("nav phone+button misaligned @1600", JSON.stringify(c));
  } else info("phone/button @1600: " + JSON.stringify(c));
  await page.screenshot({ path: OUT + "\\nav-1600.png", clip: { x: 400, y: 0, width: 1200, height: 110 } });
  await page.setViewportSize({ width: 1366, height: 900 });
});

// 4. MODEL PAGE + #quote-form scroll
await step("model page + quote anchor", async () => {
  const s = await go("/landrover-e-class-engines");
  s === 200 ? pass("model page 200") : fail("model page", "status " + s);
  (await page.locator("#quote-form").count()) ? pass("model page has #quote-form") : fail("model page missing #quote-form");
  const cta = page.locator('a[href="#quote-form"]:visible').first();
  if (await cta.count()) {
    await cta.scrollIntoViewIfNeeded();
    await cta.click();
    await page.waitForTimeout(700);
    const hash = new URL(page.url()).hash;
    const inView = await page.evaluate(() => {
      const el = document.getElementById("quote-form");
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    hash === "#quote-form" && inView ? pass("quote CTA scrolls to form") : fail("quote CTA scroll", `hash=${hash} inView=${inView}`);
  } else info("no visible #quote-form CTA at this viewport");
});

// 5. R-CLASS Sec10 + Sec15
await step("R-Class sections", async () => {
  await go("/landrover-r-class-engines");
  const sec10 = await page.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((x) => /most popular/i.test(x.textContent));
    if (!h) return null;
    const sec = h.closest("section");
    const cards = [...sec.querySelectorAll("a,div")].filter((e) => e.querySelector && e.querySelector("img") && /rebuild/i.test(e.textContent));
    return { cards: cards.length, links: cards.filter((c) => c.tagName === "A").length };
  });
  if (sec10)
    sec10.links === sec10.cards || sec10.links === 0
      ? pass("R-Class 'Most Popular' cards consistent", `${sec10.links}/${sec10.cards} linked`)
      : fail("R-Class 'Most Popular' half-dead", `${sec10.links}/${sec10.cards} linked`);
  const sec15 = await page.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((x) => /coverage/i.test(x.textContent));
    if (!h) return null;
    const sec = h.closest("section");
    const grid = [...sec.querySelectorAll("*")].find((e) => /grid-cols-2/.test(e.className) && e.children.length === 2);
    if (!grid) return { note: "no 2-col grid" };
    const L = grid.children[0].getBoundingClientRect(), R = grid.children[1].getBoundingClientRect();
    return { lh: Math.round(L.height), rh: Math.round(R.height), diff: Math.round(Math.abs(L.height - R.height)) };
  });
  if (sec15 && sec15.diff != null)
    sec15.diff < 48
      ? pass("R-Class coverage columns balanced", `L=${sec15.lh} R=${sec15.rh} Δ${sec15.diff}px`)
      : fail("R-Class coverage empty space", `L=${sec15.lh} R=${sec15.rh} Δ${sec15.diff}px`);
  else info("R-Class sec15: " + JSON.stringify(sec15));
  await page.screenshot({ path: OUT + "\\rclass-full.png", fullPage: true });
});

// 6. VARIANT / ENGINE / AUTHORITY
for (const p of ["/landrover-glc220d-engines", "/landrover-om642-engine", "/landrover-amg-gt-63-engines"]) {
  await step(p, async () => {
    const s = await go(p);
    s === 200 ? pass(p + " 200") : fail(p, "status " + s);
  });
}
await step("authority page", async () => {
  const s = await go("/landrover-diesel-timing-chain-repair");
  s === 200 ? pass("authority page 200") : fail("authority page", "status " + s);
  const imgs = await page.evaluate(() =>
    [...document.querySelectorAll("main img")].map((i) => i.currentSrc || i.src).filter((u) => /\.(webp|jpg|png)/i.test(u))
  );
  imgs.length >= 3 ? pass("authority ≥3 images", imgs.length + "") : fail("authority images", imgs.length + "");
  const det = page.locator("main details").first();
  if (await det.count()) {
    const b = await det.evaluate((d) => d.open);
    await det.locator("summary").click();
    await page.waitForTimeout(150);
    const a = await det.evaluate((d) => d.open);
    b !== a ? pass("authority FAQ accordion toggles") : fail("authority FAQ stuck");
  }
});

// 7. CORE PAGES
for (const p of ["/about", "/contact", "/privacy-policy", "/terms-and-conditions", "/warranty", "/financing", "/pricing-legal-disclaimer"]) {
  await step("core " + p, async () => {
    const s = await go(p);
    const h1 = (await page.locator("h1").first().textContent().catch(() => "")) || "";
    const t = await page.title();
    s === 200 && h1.trim() && t ? pass(p + " 200", `h1="${h1.trim().slice(0, 38)}"`) : fail(p, `status ${s} h1="${h1}"`);
  });
}
await step("contact phone", async () => {
  await go("/contact");
  const txt = await page.locator("body").textContent();
  /0203 488 4649/.test(txt) ? pass("/contact shows correct phone") : fail("/contact phone missing");
});

// 8. DIRECTORY
for (const p of ["/engines", "/models", "/variants"]) {
  await step("dir " + p, async () => {
    const s = await go(p);
    const n = await page.locator("main a").count();
    s === 200 && n > 10 ? pass(p + " 200", n + " links") : fail(p, `status ${s} links ${n}`);
  });
}

// 9. MOBILE
await step("mobile", async () => {
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mp = await mob.newPage();
  await mp.goto(BASE + "/", { waitUntil: "networkidle" });
  const info1 = await mp.evaluate(() => ({
    burger: !!document.querySelector("header button[aria-label='Toggle menu']"),
    overflow: document.documentElement.scrollWidth - window.innerWidth,
  }));
  info1.burger ? pass("mobile hamburger present") : fail("mobile no hamburger");
  info1.overflow <= 2 ? pass("mobile no h-scroll", `overflow ${info1.overflow}px`) : fail("mobile h-overflow", info1.overflow + "px");
  await mp.locator("header button[aria-label='Toggle menu']").click();
  await mp.waitForTimeout(250);
  const n = await mp.locator("header nav a").count();
  n > 3 ? pass("mobile menu opens", n + " items") : fail("mobile menu empty");
  const subBtn = mp.locator("header nav button[aria-label*='Models']").first();
  if (await subBtn.count()) {
    await subBtn.click();
    await mp.waitForTimeout(250);
    const sn = await mp.locator("header nav .menu-scroll a").count();
    sn > 5 ? pass("mobile submenu expands", sn + " items") : info("mobile submenu: " + sn);
  }
  await mp.screenshot({ path: OUT + "\\mobile-home.png" });
  await mp.goto(BASE + "/landrover-e-class-engines", { waitUntil: "networkidle" });
  const o2 = await mp.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  o2 <= 2 ? pass("mobile model page no h-scroll") : fail("mobile model page h-overflow", o2 + "px");
  await mob.close();
});

// 10. CONSOLE ERRORS
consoleErrors.length === 0
  ? pass("no console/page errors across all visited pages")
  : fail(consoleErrors.length + " console errors", consoleErrors.slice(0, 5).join("  ||  "));

await browser.close();
const report = results.join("\n");
fs.writeFileSync(OUT + "\\browser_check_report.txt", report);
console.log(report);
const fails = results.filter((r) => r.startsWith("FAIL")).length;
console.log("\n" + (fails === 0 ? "== ALL PASS ==" : "== " + fails + " FAILURES =="));
