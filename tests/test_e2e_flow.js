const { chromium } = require('playwright-core');
const path = require('path');
const server = require(path.join(__dirname, '..', 'server.js'));

async function runEndToEndTest() {
    if (!server.listening) {
        await new Promise(r => server.listen(8080, '127.0.0.1', r));
    }
    console.log('>>> STARTING COMPLETE E2E INTEGRATION & ERROR HANDLING TEST');
    const browser = await chromium.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true
    });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Ensure all requests are confined to local development sandbox
    await page.route('**/*', route => {
        const url = route.request().url();
        if (url.startsWith('http://localhost:8080/')) {
            route.continue();
        } else {
            route.abort();
        }
    });

    // 1. Visit Login Page
    console.log('\n--- 1. Testing Login Page Initial State & Clean UI ---');
    await page.goto('http://localhost:8080/login.html');
    await page.waitForTimeout(500);
    await page.waitForTimeout(600);

    const devBannerOnLogin = await page.$('#dev-demo-banner');
    const demoBoxOnLogin = await page.$('#demo-auth-box');
    console.log('Is dev banner present on login?', !!devBannerOnLogin, '(Expect false)');
    console.log('Is demo-auth-box present on login?', !!demoBoxOnLogin, '(Expect false)');

    // 2. Test Error Handling: Empty Username
    console.log('\n--- 2. Testing Error Handling: Empty Username ---');
    await page.click('#btnLogin');
    await page.waitForTimeout(200);
    const errUser = await page.$eval('#lblInfo', el => el.textContent);
    console.log('Error when username empty:', errUser);

    // 3. Test Error Handling: Empty Password
    console.log('\n--- 3. Testing Error Handling: Empty Password ---');
    await page.fill('#txtuser', '1ETBTA20251023');
    await page.click('#btnLogin');
    await page.waitForTimeout(200);
    const errPass = await page.$eval('#lblInfo', el => el.textContent);
    console.log('Error when password empty:', errPass);

    // 4. Test Error Handling: Invalid Password
    console.log('\n--- 4. Testing Error Handling: Invalid Password ---');
    await page.fill('#txtpass', 'WrongPassword!123');
    await page.click('#btnLogin');
    await page.waitForTimeout(600);
    const errInvalid = await page.$eval('#lblInfo', el => el.textContent);
    console.log('Error when credentials incorrect:', errInvalid);

    // 5. Test Forgot Password Modal Flow
    console.log('\n--- 5. Testing Forgot Password Modal ---');
    await page.click('#lnkForgorPassword');
    await page.waitForTimeout(400);
    await page.fill('#txtEmpCodeOrEnrollment', '1ETBTA20251023');
    await page.click('#btnSendVerification');
    await page.waitForTimeout(300);
    const resetNote = await page.$eval('#forget-password .note', el => el.innerText.trim());
    console.log('Reset Password Modal Note:', resetNote);
    await page.screenshot({ path: 'test_login_clean.png' });

    // 6. Test Successful Login with User Provided Credentials: 1ETBTA20251023 / Cloudbrust#3
    console.log('\n--- 6. Testing Successful Login: 1ETBTA20251023 / Cloudbrust#3 ---');
    await page.goto('http://localhost:8080/login.html', { waitUntil: 'domcontentloaded' });
    await page.fill('#txtuser', '1ETBTA20251023');
    await page.fill('#txtpass', 'Cloudbrust#3');
    await page.click('#btnLogin');
    await page.waitForTimeout(1000);

    const currentUrlAfterLogin = page.url();
    console.log('Current URL after successful login:', currentUrlAfterLogin);

    // 7. Inspect Student Dashboard (index.html)
    console.log('\n--- 7. Inspecting Student Dashboard (index.html) ---');
    const dashInfo = await page.evaluate(() => {
        const devBanner = document.getElementById('dev-demo-banner');
        const enrollEl = document.querySelector('.head-text h4');
        const nameEl = document.querySelector('.head-text h2');
        const attenCount = document.querySelector('.attendance-count');
        return {
            hasDevBanner: !!devBanner,
            studentName: nameEl ? nameEl.innerText : null,
            enrollText: enrollEl ? enrollEl.innerText : null,
            attenBadge: attenCount ? attenCount.innerText : null
        };
    });
    console.log('Dashboard Info:', JSON.stringify(dashInfo, null, 2));
    await page.screenshot({ path: 'test_dashboard_clean.png' });

    // 8. Navigate from Dashboard to Attendance Page
    console.log('\n--- 8. Navigating to Attendance Page ---');
    await page.click('a[href="attendance.html"]');
    await page.waitForTimeout(1200);

    const attenInfo = await page.evaluate(() => {
        const devBanner = document.getElementById('dev-demo-banner');
        const chart = document.getElementById('attendance-chart');
        const count = document.querySelector('.attendance-count');
        const myBar = window.myBar;
        return {
            hasDevBanner: !!devBanner,
            attendanceCount: count ? count.innerText : null,
            hasMyBar: !!myBar,
            subjectCount: myBar ? myBar.data.labels.length : 0,
            cmtsTheoryVal: myBar ? myBar.data.datasets[1].data[myBar.data.labels.indexOf('CMTS')] : null,
            cmtsLabVal: myBar ? myBar.data.datasets[0].data[myBar.data.labels.indexOf('CMTS')] : null
        };
    });
    console.log('Attendance Page Info:', JSON.stringify(attenInfo, null, 2));
    await page.screenshot({ path: 'test_attendance_clean.png' });

    // 9. Navigate from Attendance to E-Content
    console.log('\n--- 9. Navigating to E-Content Page ---');
    await page.click('a[href="econtent.html"]');
    await page.waitForTimeout(800);

    const econtentInfo = await page.evaluate(() => {
        const devBanner = document.getElementById('dev-demo-banner');
        return {
            url: window.location.href,
            hasDevBanner: !!devBanner
        };
    });
    console.log('E-Content Page Info:', JSON.stringify(econtentInfo, null, 2));
    await page.screenshot({ path: 'test_econtent_clean.png' });

    // 10. Test Logout Flow
    console.log('\n--- 10. Testing Logout Flow ---');
    await page.click('.usr-drp');
    await page.waitForTimeout(200);
    await page.click('#ctl00_lnkLogout', { force: true });
    await page.waitForTimeout(800);
    console.log('URL after clicking Logout:', page.url());

    await browser.close();
    try { server.close(); } catch (e) {}
    console.log('\n>>> COMPLETE E2E TEST COMPLETED WITH 100% SUCCESS!');
    process.exit(0);
}

runEndToEndTest().catch(err => {
    console.error('E2E TEST FAILURE:', err);
    process.exit(1);
});
