const thresholdPercent = 0.1; // allow 0.1% difference

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

  const totalPixels = width * height;
  const percentDiff = (numDiffPixels / totalPixels) * 100;

  console.log(`📊 Difference: ${percentDiff.toFixed(4)}%`);

  if (percentDiff > thresholdPercent) {
    fs.writeFileSync("diff.png", PNG.sync.write(diff));
    console.error("❌ Visual regression detected! diff.png generated.");
    process.exit(1);
  } else {
    console.log("✅ Within tolerance. No significant visual change.");
    fs.unlinkSync(newScreenshotPath);
    process.exit(0);
  }
} else {
  fs.renameSync(newScreenshotPath, "homepage.png");
  console.log("📸 Baseline screenshot created.");
  process.exit(0);
}