import { chromium } from "playwright";
import { exec } from "child_process";
import waitOn from "wait-on";
import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

(async () => {
  try {
    const server = exec("npx serve dist -l 3000");

    await waitOn({
      resources: ["http://localhost:3000"],
      timeout: 10000,
    });

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle",
    });

    const newScreenshotPath = "homepage-new.png";
    await page.screenshot({
      path: newScreenshotPath,
      fullPage: true,
    });

    await browser.close();
    server.kill();

    // If baseline exists → compare
    if (fs.existsSync("homepage.png")) {
      const img1 = PNG.sync.read(fs.readFileSync("homepage.png"));
      const img2 = PNG.sync.read(fs.readFileSync(newScreenshotPath));

      const { width, height } = img1;
      const diff = new PNG({ width, height });

      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );

      if (numDiffPixels > 0) {
  console.log("⚠️ Updating baseline screenshot...");
  fs.renameSync(newScreenshotPath, "homepage.png");
  process.exit(0);
} else {
        console.log("✅ No visual changes detected.");
        fs.unlinkSync(newScreenshotPath);
        process.exit(0);
      }
    } else {
      fs.renameSync(newScreenshotPath, "homepage.png");
      console.log("📸 Baseline screenshot created.");
      process.exit(0);
    }

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
})();