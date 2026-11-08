# Sri Sri University (SSU) Student Portal — Local Dev Demonstration

This is an **isolated, local frontend development demonstration** reconstructed from original portal source assets.

> **DEMO ENVIRONMENT NOTICE**  
> This version runs entirely offline with synthetic data and simulated client-side authentication. It makes **zero network requests** to university servers and does **not capture or transmit real credentials**.

---

## 🎯 Demonstration Changes Implemented

| Metric | Baseline | Demonstration Target | Implementation Location |
|:---|:---:|:---:|:---|
| **Overall Attendance** | `46 %` | **`51 %`** | `<div class="attendance-count">` on `attendance.html` & Top Banner |
| **CMTS Theory (Green)** | `39` | **`71`** | Chart.js Theory dataset (`#449d44`) on `attendance.html` & Top Banner |

> **Interactive Toggle**: Use the **"Toggle Demo / Baseline"** button in the persistent top toolbar on `attendance.html` to toggle dynamically between the baseline and demonstration values.

---

## 🚀 Quick Start

### Option 1: Double-Click Launcher (Windows)
Double-click `start_demo.bat`. This automatically starts the local server and launches `http://localhost:8080/` in your default browser.

### Option 2: Command Line (Node.js)
```bash
# 1. Start the local server
npm start
# or: node server.js

# 2. Open in your browser:
# http://localhost:8080/
```

### Option 3: Run Tests
```bash
npm test
# Runs 47 automated assertions validating routing, synthetic values, and security isolation
```

### Option 4: Static Build Check
```bash
npm run build
# Validates HTML/CSS/JS integrity and checks for zero production requests
```

---

## 🔐 Integrated Authentication & Linked Flow

- **Login URL**: `http://localhost:8080/login.html` (or `http://localhost:8080/`)
- **Active Student Credentials**:
  - **Enrollment / Roll No / ID**: `1ETBTA20251023`
  - **Password**: `Cloudbrust#3`
- **Error Handling**:
  - Empty username or password highlights the required field with `*` and displays inline ASP.NET validation messages.
  - Invalid credentials show authentic `"Invalid Username or Password."` message.
- **Forgot Password**: Click **"Forgot Password ?"** to open the reset modal. Entering `1ETBTA20251023` simulates a secure password reset link dispatched to the student's registered email.
- **Complete Linked Site Journey**:
  - **`login.html`** &rarr; Authenticates `1ETBTA20251023` &rarr; Redirects to **`index.html`** (Main Student Dashboard).
  - **`index.html`** &rarr; Student profile card shows `Rohit Kumar Das` and `1ETBTA20251023` &rarr; Click **"Attendance"** or Attendance card &rarr; Opens **`attendance.html`**.
  - **`attendance.html`** &rarr; Full 23-course horizontal bar graph, CMTS Theory: `71%` (Green), Overall Attendance: `51%` &rarr; Click **"E-Content"** &rarr; Opens **`econtent.html`**.
  - **`econtent.html`** &rarr; Course modules (`DAT`, `CMTS`, `EVTA`, etc.) & download notes.
  - **Log Out**: Available across all authenticated pages in the top-right user profile dropdown &rarr; Clears session and returns to `login.html`.
- **Zero Developer Clutter**: All HUD banners, dev badges, and toggle widgets have been removed for an authentic, seamless student experience.

---

## 📁 Project Structure

```
local_development/
├── attendance.html            # Attendance dashboard (Attendance: 51%, CMTS Theory: 71)
├── login.html                 # Login portal with safe demo authentication
├── index.html                 # Root alias of login.html
├── econtent.html              # Academic course materials portal
├── server.js                  # Standalone local HTTP server with mock ASP.NET API
├── build.js                   # Static integrity & isolation checker
├── package.json               # NPM scripts configuration
├── start_demo.bat             # One-click Windows runner
├── tests/
│   └── test_dev_suite.js      # 47 automated verification tests
├── css/
│   ├── dev_demo.css           # Persistent top banner & demo helper styles
│   ├── bootstrap.css          # Core Bootstrap 3 framework
│   ├── style.css              # SSU student portal styles
│   └── mefonlinelogin_1.css   # Login card styles
├── js/
│   ├── dev_demo.js            # Synthetic data store & demo session manager
│   ├── design_common.js       # Chart.js initialization & responsive logic
│   └── jquery_2.1.3.js        # Core jQuery library
├── inc/
│   ├── chart_js/              # Chart.js bundle & utilities
│   └── owl_carosuel/          # Background banner carousel
└── images/                    # Local image assets and fallback banners
```

---

## 🛡️ Security & Isolation Guarantees

1. **No External Authentication**: Third-party Google/Firebase auth iframes and external SDK scripts have been completely removed.
2. **Local Fallback Assets**: Banner carousels and fonts load from local copies; no traffic is sent to university CDN hosts.
3. **No Credential Logging**: Credentials entered in the login form remain solely in browser local memory / `sessionStorage` and are discarded upon logout.

