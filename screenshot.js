import { chromium } from "playwright";
import { exec } from "child_process";
import waitOn from "wait-on";

(async () => {
  try {
    // Start static server
    const server = exec("npx serve dist -l 3000");

    // Wait until server is ready
    await waitOn({
      resources: ["http://localhost:3000"],
      timeout: 10000,
    });

    console.log("✅ Server is ready");

    // Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle",
    });

    await page.screenshot({
      path: "homepage.png",
      fullPage: true,
    });

    console.log("✅ Screenshot saved");

    await browser.close();
    server.kill();

    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error);
  }
})();