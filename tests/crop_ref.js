const fs = require('fs');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules', 'playwright-core'));

(async () => {
    const browser = await chromium.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true
    });
    const page = await browser.newPage({ viewport: { width: 575, height: 1024 } });
    const imgPath = 'C:/Users/LENOVO/.gemini/antigravity/brain/6cf7d42d-169b-45f2-9bd6-20c2a0b5bfd5/.user_uploaded/media_1794161760035_1015851f.jpg';
    const b64 = fs.readFileSync(imgPath).toString('base64');
    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0"><img id="ref" src="data:image/jpeg;base64,${b64}" style="width:575px;height:1024px;display:block"></body></html>`);
    await page.waitForTimeout(500);

    const el = await page.$('#ref');
    await el.screenshot({ 
        path: 'local_development/cmts_region_reference.png',
        clip: { x: 50, y: 600, width: 450, height: 180 }
    });
    await el.screenshot({
        path: 'local_development/top_legend_reference.png',
        clip: { x: 50, y: 60, width: 480, height: 120 }
    });
    console.log('Cropped reference successfully with base64!');
    await browser.close();
    process.exit(0);
})().catch(err => {
    console.error(err);
    process.exit(1);
});
