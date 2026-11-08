/**
 * ============================================================================
 * SSU Portal - Local Development Demonstration Server
 * ============================================================================
 * Zero-dependency Node.js HTTP server.
 * Serves isolated local files with mock ASP.NET endpoints and synthetic data.
 * Zero external calls to university production services.
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.axd': 'application/javascript; charset=utf-8',
    '.ashx': 'image/jpeg',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Synthetic attendance data store (CMTS Theory = 71, Attendance = 51%)
// Ground truth 23 subjects matching mobile student.e.srisriuniversity.edu.in
const GROUND_TRUTH_SUBJECTS = [
    "PMM", "P L", "AST", "DCFATAI", "DFAL", "DATA STRUC C",
    "EGD", "IDTL", "DESIGN THINK", "DIGITAL LOG", "EXP SOFT COMP",
    "RPAUB", "MRN", "ML TI", "FNTC", "CMTS",
    "OOP", "J L", "ADA", "AGTS", "DAT", "MOL", "EVTA"
];

const GROUND_TRUTH_LAB = [
    0, 40, 61, 0, 57, 0,
    56, 67, 0, 67, 91,
    0, 0, 36, 49, 36,
    0, 53, 0, 100, 0, 57, 56
];

const SYNTHETIC_DATA = {
    demonstration: {
        labels: GROUND_TRUTH_SUBJECTS,
        lab: GROUND_TRUTH_LAB,
        theory: [
            56, 0, 26, 55, 0, 0,
            0, 0, 13, 38, 0,
            43, 54, 0, 47, 71, // CMTS Theory = 71 (Green) Demonstration Target
            48, 0, 45, 0, 35, 0, 0
        ],
        workshop: new Array(23).fill(0),
        attendancePercentage: "51 %"
    },
    baseline: {
        labels: GROUND_TRUTH_SUBJECTS,
        lab: GROUND_TRUTH_LAB,
        theory: [
            56, 0, 26, 55, 0, 0,
            0, 0, 13, 38, 0,
            43, 54, 0, 47, 39, // CMTS Theory = 39 (Green) Baseline Reference
            48, 0, 45, 0, 35, 0, 0
        ],
        workshop: new Array(23).fill(0),
        attendancePercentage: "46 %"
    }
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Set CORS headers for local sandbox safety
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Mock ASP.NET WebMethod Endpoint: Attendance.aspx/ChartData
    if (pathname.endsWith('/ChartData') || pathname === '/Attendance.aspx/ChartData') {
        const mode = parsedUrl.query.mode === 'baseline' ? 'baseline' : 'demonstration';
        const d = SYNTHETIC_DATA[mode];
        const payload = {
            d: JSON.stringify([
                d.labels,
                d.lab,
                d.theory,
                d.workshop
            ])
        };
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(payload));
        return;
    }

    // Reference files routing for visual comparison
    if (pathname.startsWith('/reference/')) {
        const refRoot = path.resolve(__dirname, '..', 'extracted');
        const rel = pathname.replace('/reference/', '');
        let targetPath = '';
        if (rel.startsWith('login/')) {
            targetPath = path.join(refRoot, 'login', rel.replace('login/', ''));
        } else if (rel.startsWith('attendance/')) {
            targetPath = path.join(refRoot, 'page2', rel.replace('attendance/', ''));
        } else if (rel.startsWith('econtent/')) {
            targetPath = path.join(refRoot, 'page1', rel.replace('econtent/', ''));
        } else if (rel.startsWith('dashboard/')) {
            targetPath = path.join(refRoot, 'page2', rel.replace('dashboard/', ''));
        }
        if (targetPath && fs.existsSync(targetPath)) {
            const ext = path.extname(targetPath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'text/html; charset=utf-8';
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(targetPath).pipe(res);
            return;
        }
    }

    // Friendly URL routing
    if (pathname === '/' || pathname === '/index.html' || pathname === '/dashboard.html' || pathname.toLowerCase() === '/dashboard.aspx') {
        pathname = '/index.html';
    } else if (pathname === '/login.html' || pathname.toLowerCase() === '/login.aspx') {
        pathname = '/login.html';
    } else if (pathname === '/attendance.html' || pathname.toLowerCase() === '/attendance.aspx') {
        pathname = '/attendance.html';
    } else if (pathname === '/econtent.html' || pathname.toLowerCase() === '/econtent.aspx') {
        pathname = '/econtent.html';
    }

    // Map to filesystem
    let filePath = path.join(ROOT_DIR, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Check if fallback file exists
            if (pathname.endsWith('.ashx')) {
                // Return avatar fallback
                const fallbackImg = path.join(ROOT_DIR, 'images', 'shape.png');
                if (fs.existsSync(fallbackImg)) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    fs.createReadStream(fallbackImg).pipe(res);
                    return;
                }
            }
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found: ' + pathname);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

if (require.main === module) {
    let currentPort = parseInt(process.env.PORT, 10) || 8080;
    const maxPortAttempts = 10;
    let attempts = 0;

    server.once('listening', () => {
        const actualPort = server.address().port;
        console.log(`=================================================================`);
        console.log(` SSU Local Dev Demonstration Server`);
        console.log(` Local URL:         http://localhost:${actualPort}`);
        console.log(` - Login Page:      http://localhost:${actualPort}/login.html`);
        console.log(` - Main Dashboard:  http://localhost:${actualPort}/index.html`);
        console.log(` - Attendance Page: http://localhost:${actualPort}/attendance.html`);
        console.log(` - E-Content Page:  http://localhost:${actualPort}/econtent.html`);
        console.log(` - Synthetic API:   http://localhost:${actualPort}/Attendance.aspx/ChartData`);
        console.log(` Mode: Isolated Demonstration (CMTS Theory = 71, Attendance = 51%)`);
        console.log(`=================================================================`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            attempts++;
            if (attempts <= maxPortAttempts) {
                console.warn(`[WARN] Port ${currentPort} is currently in use. Automatically falling back to port ${currentPort + 1}...`);
                currentPort++;
                server.listen(currentPort);
            } else {
                console.error(`[ERROR] Unable to bind to any port between 8080 and ${currentPort}.`);
                process.exit(1);
            }
        } else {
            console.error('Server error:', err);
        }
    });

    server.listen(currentPort);
}

module.exports = server;

