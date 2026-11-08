/**
 * ============================================================================
 * Build & Static Verification Script for SSU Portal Local Dev
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
let errors = [];
let warnings = [];

console.log('>>> Starting Local Dev Demonstration Build & Verification...');

// 1. Verify required HTML files exist
const requiredHtmlFiles = ['login.html', 'index.html', 'attendance.html', 'econtent.html'];
requiredHtmlFiles.forEach(file => {
    const fullPath = path.join(ROOT_DIR, file);
    if (!fs.existsSync(fullPath)) {
        errors.push(`Missing required HTML file: ${file}`);
    } else {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.length < 500) {
            errors.push(`HTML file suspiciously small (${content.length} bytes): ${file}`);
        }
    }
});

// 2. Verify synthetic demonstration values
const attendanceHtml = fs.readFileSync(path.join(ROOT_DIR, 'attendance.html'), 'utf8');
if (!attendanceHtml.includes('51 %')) {
    errors.push('attendance.html does NOT contain required demonstration attendance value: "51 %"');
}

const devDemoJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'dev_demo.js'), 'utf8');
if (!devDemoJs.includes('cmtsTheoryValue: 71')) {
    errors.push('dev_demo.js does NOT contain required CMTS Theory demonstration value: 71');
}

const designCommonJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'design_common.js'), 'utf8');
if (!designCommonJs.includes('#449d44')) {
    errors.push('design_common.js does not specify green color (#449d44) for Theory dataset');
}

// 3. Verify zero production requests in local development files
const prodPatterns = [
    'https://student.e.srisriuniversity.edu.in',
    'https://online-student.firebaseapp.com',
    'https://assets.e.srisriuniversity.edu.in'
];

requiredHtmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
    prodPatterns.forEach(pattern => {
        if (content.includes(pattern)) {
            warnings.push(`${file} contains reference to production host: ${pattern}`);
        }
    });
});

// 4. Verify critical assets exist
const criticalAssets = [
    'css/bootstrap.css',
    'css/style.css',
    'css/mefonlinelogin_1.css',
    'css/dev_demo.css',
    'js/jquery_2.1.3.js',
    'js/dev_demo.js',
    'js/design_common.js',
    'inc/chart_js/chart.bundle.js',
    'inc/owl_carosuel/owl.carousel.js',
    'images/slide_1.jpg',
    'images/banner1.jpg',
    'images/shape.png',
    'cdn.e.srisriuniversity.edu.in/images/logo_full.png',
    'cdn.e.srisriuniversity.edu.in/images/logo_white.png'
];

criticalAssets.forEach(asset => {
    const fullPath = path.join(ROOT_DIR, asset);
    if (!fs.existsSync(fullPath)) {
        errors.push(`Missing critical asset: ${asset}`);
    }
});

console.log('-------------------------------------------------------------');
if (warnings.length > 0) {
    console.log(`Build completed with ${warnings.length} warning(s):`);
    warnings.forEach(w => console.log(' [WARN] ' + w));
} else {
    console.log(' [OK] Zero production request checks passed.');
}

if (errors.length > 0) {
    console.error(`\nBuild FAILED with ${errors.length} error(s):`);
    errors.forEach(e => console.error(' [ERROR] ' + e));
    process.exit(1);
} else {
    console.log('\n[PASS] Build and verification completed successfully!');
    console.log('       All required pages, assets, and synthetic values verified.');
    process.exit(0);
}

