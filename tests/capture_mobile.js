const path = require('path');
const http = require('http');
const server = require(path.join(__dirname, '..', 'server.js'));
const { chromium } = require(path.join(__dirname, '..', 'node_modules', 'playwright-core'));

(async () => {
    await new Promise((resolve) => {
        server.listen(0, '127.0.0.1', () => {
            console.log('Server listening on port ' + server.address().port);
            resolve();
        });
    });

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

    await page.goto(`http://127.0.0.1:${port}/attendance.html`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const out1 = path.join(__dirname, '..', 'mobile_attendance_current.png');
    await page.screenshot({ path: out1, fullPage: false });

    // Scroll to chart
    const chart = await page.$('.attendance-chart-container');
    if (chart) {
        await chart.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        const out2 = path.join(__dirname, '..', 'mobile_chart_current.png');
        await chart.screenshot({ path: out2 });

        // Also capture full mobile viewport with chart and floating FAB:
        const out3 = path.join(__dirname, '..', 'mobile_chart_viewport.png');
        await page.screenshot({ path: out3, fullPage: false });
    }

    console.log('Done capturing mobile screenshots!');
    await browser.close();
    server.close();
    process.exit(0);
})().catch(err => {
    console.error(err);
    process.exit(1);
});
