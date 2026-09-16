import { chromium } from "playwright-core";
const EXE = process.env.LOCALAPPDATA + "\ms-playwright\chromium-1234\chrome-win64\chrome.exe";
const OUT = "C:\Users\nafiz\AppData\Local\Temp\claude\e--Garage\7f65a9fd-9675-46fc-8489-16037592ae60\scratchpad\\";
const b = await chromium.launch({ executablePath: EXE });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
await p.goto("http://localhost:3000/landrover-engine-rebuild", { waitUntil: "networkidle" });
await p.screenshot({ path: OUT + "auth-leftalign.png", fullPage: true });
await b.close();
