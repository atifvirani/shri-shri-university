const path = require('path');
const server = require(path.join(__dirname, '..', 'server.js'));
const { chromium } = require(path.join(__dirname, '..', 'node_modules', 'playwright-core'));

(async () => {
    await new Promise(r => server.listen(0, '127.0.0.1', r));
    const port = server.address().port;
    const browser = await chromium.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true
    });
    const page = await browser.newPage({ 
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true
    });
    await page.goto('http://127.0.0.1:' + port + '/attendance.html', { waitUntil: 'networkidle' });
    const attenHead = await page.$('.atten-head');
    if (attenHead) {
        await attenHead.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        await page.screenshot({ path: path.join(__dirname, '..', 'mobile_attendance_matching_ref2.png') });
        console.log('Captured screenshot matching reference Image 2!');
    }
    await browser.close();
    server.close();
    process.exit(0);
})().catch(err => {
    console.error(err);
    process.exit(1);
});

