/**
 * ============================================================================
 * Automated Test Suite for SSU Portal Local Dev Prototype
 * ============================================================================
 * Tests:
 * 1. HTTP Server & Route Rendering (login, attendance, econtent)
 * 2. Synthetic Attendance Values (Overall = 51%, CMTS Theory = 71, Color = Green)
 * 3. Responsive Meta Tags & Media Queries
 * 4. Demo Login/Logout UI Elements & Event Bindings
 * 5. Forgot Password & Reset Modal Flow
 * 6. Production Network Isolation (No external auth or attendance calls)
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const server = require('../server');

const TEST_PORT = 8999;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details) {
    if (condition) {
        passedTests++;
        console.log(`  [PASS] ${testName}`);
    } else {
        failedTests++;
        console.error(`  [FAIL] ${testName}${details ? ': ' + details : ''}`);
    }
}

function fetch(urlPath) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:${TEST_PORT}${urlPath}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        }).on('error', reject);
    });
}

async function runTests() {
    console.log('================================================================');
    console.log(' RUNNING SSU LOCAL DEVELOPMENT VERIFICATION SUITE');
    console.log('================================================================\n');

    // Start test server
    await new Promise((resolve) => server.listen(TEST_PORT, resolve));

    try {
        // --- SUITE 1: Route Rendering & HTTP 200 ---
        console.log('Suite 1: Page Rendering & Routing');
        const loginRes = await fetch('/login.html');
        assert(loginRes.statusCode === 200, 'GET /login.html returns 200 OK');
        assert(loginRes.body.includes('<title>') && loginRes.body.includes('Login - Sri Sri University'), 'Login page renders valid title');

        const indexRes = await fetch('/');
        assert(indexRes.statusCode === 200 && indexRes.body.includes('Student Dashboard'), 'GET / routes to Main Dashboard');

        const dashRes = await fetch('/index.html');
        assert(dashRes.statusCode === 200 && dashRes.body.includes('Dashboard - Sri Sri University'), 'GET /index.html renders Main Dashboard title');

        const attRes = await fetch('/attendance.html');
        assert(attRes.statusCode === 200, 'GET /attendance.html returns 200 OK');
        assert(attRes.body.includes('attendance-chart'), 'Attendance page contains canvas #attendance-chart');

        const ecRes = await fetch('/econtent.html');
        assert(ecRes.statusCode === 200, 'GET /econtent.html returns 200 OK');

        const chartApiRes = await fetch('/Attendance.aspx/ChartData');
        assert(chartApiRes.statusCode === 200, 'GET /Attendance.aspx/ChartData returns 200 OK');
        const chartJson = JSON.parse(chartApiRes.body);
        assert(typeof chartJson.d === 'string', 'Chart API returns ASP.NET formatted { d: string } JSON');

        // --- SUITE 2: Synthetic Values Verification ---
        console.log('\nSuite 2: Synthetic Data Invariants');
        // Attendance value: 46 -> 51
        assert(attRes.body.includes('51 %'), 'Attendance dashboard displays required 51% attendance');
        
        // CMTS Theory (green): 39 -> 71
        const parsedData = JSON.parse(chartJson.d);
        const subjects = parsedData[0];
        const theoryData = parsedData[2];
        const cmtsIndex = subjects.indexOf('CMTS');
        assert(cmtsIndex !== -1, 'CMTS is present in chart subject labels');
        assert(theoryData[cmtsIndex] === 71, `CMTS Theory value is 71 (found: ${theoryData[cmtsIndex]})`);

        // Check green color configuration for Theory dataset
        const designCommon = fs.readFileSync(path.join(__dirname, '../js/design_common.js'), 'utf8');
        assert(designCommon.includes("backgroundColor: '#449d44'"), 'Theory dataset uses green color (#449d44)');

        // --- SUITE 3: Responsive Behavior ---
        console.log('\nSuite 3: Responsive Behavior & Layout Integrity');
        assert(attRes.body.includes('name="viewport"') && attRes.body.includes('width=device-width'), 'Viewport meta tag configured properly');
        assert(loginRes.body.includes('name="viewport"'), 'Login viewport meta tag configured');
        assert(attRes.body.includes('css/media_query.css'), 'Attendance page links media_query.css');
        assert(loginRes.body.includes('css/media_query_login_1.css'), 'Login page links media_query_login_1.css');
        assert(attRes.body.includes('col-md-12') && attRes.body.includes('col-md-6'), 'Bootstrap grid layout classes present');

        // --- SUITE 4: Login & Session UI ---
        console.log('\nSuite 4: Login & Session UI Controls');
        assert(loginRes.body.includes('id="txtuser"') || loginRes.body.includes('name="txtuser"'), 'Login form contains enrollment/roll-number input');
        assert(loginRes.body.includes('id="txtpass"') || loginRes.body.includes('name="txtpass"'), 'Login form contains password input');
        assert(loginRes.body.includes('id="btnLogin"'), 'Login button is present');
        assert(loginRes.body.includes('id="lnkForgorPassword"'), 'Forgot-password link is present');
        assert(loginRes.body.includes('id="forget-password"'), 'Forgot-password modal is present in DOM');
        assert(loginRes.body.includes('id="txtEmpCodeOrEnrollment"'), 'Reset-password input is present');
        assert(loginRes.body.includes('id="btnSendVerification"'), 'Reset-password Send Email button is present');
        assert(loginRes.body.includes('id="lblInfo"') && loginRes.body.includes('id="rfvtxtuser"'), 'Login form error handling and validation labels are present');
        const devDemoScriptAuth = fs.readFileSync(path.join(__dirname, '../js/dev_demo.js'), 'utf8');
        assert(devDemoScriptAuth.includes('1ETBTA20251023') && devDemoScriptAuth.includes('Cloudbrust#3'), 'Integrated student credentials (1ETBTA20251023 / Cloudbrust#3) verified');

        // --- SUITE 5: Logout & Navigation ---
        console.log('\nSuite 5: Logout & Navigation Flow');
        assert(attRes.body.includes('id="ctl00_lnkLogout"'), 'Logout control (ctl00_lnkLogout) exists in attendance navigation');
        assert(attRes.body.includes('js/dev_demo.js'), 'dev_demo.js is bound to attendance page');
        const devDemoScript = fs.readFileSync(path.join(__dirname, '../js/dev_demo.js'), 'utf8');
        assert(devDemoScript.includes('setupDemoLogout') && devDemoScript.includes("window.location.href = 'login.html'"), 'Logout cleanly clears session and navigates to login.html');
        assert(devDemoScript.includes('setupDemoLogin') && devDemoScript.includes("window.location.href = 'attendance.html'"), 'Login cleanly navigates to attendance.html');

        // --- SUITE 6: Persistent Dev / Demo Indicator ---
        console.log('\nSuite 6: Persistent Development / Demo Indicator');
        assert(devDemoScript.includes('dev-demo-banner'), 'Persistent dev demo banner logic present');
        assert(devDemoScript.includes('toggleDemonstrationValues'), 'Demonstration toggle logic present');
        assert(fs.existsSync(path.join(__dirname, '../css/dev_demo.css')), 'dev_demo.css stylesheet exists');

        // --- SUITE 7: Network Isolation & Zero Production Calls ---
        console.log('\nSuite 7: Network Isolation (Zero Production Requests)');
        const filesToScan = ['login.html', 'attendance.html', 'econtent.html', 'js/dev_demo.js', 'js/design_common.js'];
        const forbiddenHosts = [
            'https://student.e.srisriuniversity.edu.in',
            'https://online-student.firebaseapp.com',
            'https://assets.e.srisriuniversity.edu.in'
        ];

        filesToScan.forEach(f => {
            const content = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
            forbiddenHosts.forEach(host => {
                assert(!content.includes(host), `${f} contains zero calls to production host: ${host}`);
            });
        });

    } finally {
        server.close();
    }

    console.log('\n================================================================');
    console.log(` TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
    console.log('================================================================\n');

    if (failedTests > 0) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

runTests().catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
});

