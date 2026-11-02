/**
 * Resoline Techbis - Automation Division Showcase Pop-up & Dropdown Logic
 * Provides interactive modal showcasing PLC, HMI, VFD, SCADA, and SERVO METER
 * with high-resolution image views, specs, and direct engineering enquiry.
 */

const automationMachines = {
  plc: {
    id: "plc",
    name: "Programmable Logic Controller (PLC) & Automation Panels",
    shortName: "PLC",
    tag: "Division 01 • Turnkey Control",
    badge: "Industrial Automation Core",
    desc: "Engineered modular PLC platforms and custom wired control panels providing mission-critical sequencing, continuous closed-loop feedback, and failsafe interlocks across heavy manufacturing and water utilities.",
    images: [
      { src: "assets/plc.png?v=2", label: "PLC Controller CPU Rack & Modular I/O" },
      { src: "assets/plc-panel.png?v=2", label: "Custom IP65 Control Panel Enclosure" }
    ],
    specs: [
      { k: "Architecture", v: "Modular Hot-Swappable Rack" },
      { k: "I/O Points", v: "Up to 2,048 Digital / 512 Analog" },
      { k: "Processing", v: "< 0.05 ms / 1K Instructions" },
      { k: "Fieldbus Bus", v: "Modbus TCP/IP, Profinet, EtherNet/IP" },
      { k: "Enclosure", v: "IP54 / IP55 / IP65 Sheet Steel" },
      { k: "Power Supply", v: "24V DC Failsafe Dual Redundant" }
    ],
    features: [
      "Custom wiring with ferruled high-grade copper cables and terminal numbering",
      "Integrated emergency stop circuitry and SIL-rated safety interlocks",
      "Remote programming, diagnostics, and over-the-air firmware maintenance",
      "NABL-traceable factory acceptance testing (FAT) before site handover"
    ],
    apps: "Water & wastewater treatment plants, continuous chemical batching, automotive assembly lines, conveyor sorting skids, and boiler automation.",
    quoteKey: "PLC Automation & Control Panels"
  },
  hmi: {
    id: "hmi",
    name: "Human Machine Interface (HMI) Touchscreens",
    shortName: "HMI",
    tag: "Division 01 • Operator Interface",
    badge: "Process Visualization",
    desc: "Industrial-grade capacitive and resistive touchscreen operator consoles delivering crystal-clear real-time process visualization, animated graphic mimics, dynamic alarm annunciators, and recipe management.",
    images: [
      { src: "assets/hmi.png?v=2", label: "Industrial Touchscreen HMI Operator Panel" }
    ],
    specs: [
      { k: "Display Sizes", v: "7.0\", 10.1\", 12.0\", 15.6\" High-Luminance TFT" },
      { k: "Resolution", v: "Up to 1920 × 1080 Full HD with LED Backlight" },
      { k: "Touch Type", v: "Resistive Industrial / Multitouch Capacitive" },
      { k: "Connectivity", v: "Dual RJ45 Ethernet, RS-232, RS-485, USB" },
      { k: "Front Protection", v: "IP65 / NEMA 4X Oil & Dustproof Bezel" },
      { k: "Memory", v: "Flash ROM 1GB+ / SD Expansion Logging" }
    ],
    features: [
      "Custom graphic GUI screens tailored to client plant layout and piping mimics",
      "Multi-level password security and FDA 21 CFR Part 11 compliant audit trail",
      "Real-time dynamic trend curves and historical CSV data export to USB",
      "Supports 300+ industrial protocols including all major PLC brands"
    ],
    apps: "Machine-level operator panels, pump skid control kiosks, batch dosing stations, and packaging machines.",
    quoteKey: "HMI Touchscreen Consoles"
  },
  vfd: {
    id: "vfd",
    name: "Variable Frequency Drives (VFD) & VFD Panel Lineups",
    shortName: "VFD",
    tag: "Division 01 • Drive Systems",
    badge: "Energy Conservation & Speed Control",
    desc: "Heavy-duty AC variable frequency drives engineered for precision motor speed regulation, dynamic torque compensation, and soft-starting, cutting mechanical stress and delivering up to 40% energy savings on centrifugal loads.",
    images: [
      { src: "assets/variable-frequency-drive.png?v=2", label: "Variable Frequency Drive (VFD) Module" },
      { src: "assets/vfd-panel.png?v=2", label: "Floor-Standing VFD Motor Control Panel" }
    ],
    specs: [
      { k: "Power Range", v: "0.75 kW to 630 kW+ (Low & Medium Voltage)" },
      { k: "Supply Voltage", v: "3-Phase 380V – 480V / 690V AC ±10%" },
      { k: "Control Mode", v: "Sensorless Vector Control (SVC), V/f, FOC" },
      { k: "Overload", v: "150% for 60s Heavy Duty / 120% Normal" },
      { k: "Harmonics", v: "Built-in DC Choke & Grade C2/C3 EMC Filter" },
      { k: "Protection", v: "Phase loss, thermal overload, ground fault" }
    ],
    features: [
      "Bypass contactor synchronization for seamless line-to-drive transfer",
      "Integrated PID loops for constant pressure water pumping and fan draft",
      "Conformal coated PCB boards (IEC 60721-3-3 Class 3C2 / 3C3)",
      "Complete panel build with forced ventilation, switchgear, and digital metering"
    ],
    apps: "High-pressure multi-pump boosting, cooling towers, industrial fans, screw compressors, crushers, and material handling.",
    quoteKey: "Variable Frequency Drive (VFD)"
  },
  scada: {
    id: "scada",
    name: "Supervisory Control & Data Acquisition (SCADA)",
    shortName: "SCADA",
    tag: "Division 01 • Plant Telemetry",
    badge: "Centralized Supervision",
    desc: "Centralized server-client SCADA and distributed telemetry suites providing plant-wide data acquisition, interactive P&ID mimic diagrams, automated compliance reporting, and real-time remote diagnostics.",
    images: [
      { src: "assets/scada.png?v=2", label: "Central SCADA Control Center Workstation" }
    ],
    specs: [
      { k: "Architecture", v: "Client-Server Redundant Telemetry Network" },
      { k: "Logging Rate", v: "Sub-second real-time historical logging (SQL)" },
      { k: "Protocols", v: "OPC-UA, OPC-DA, Modbus TCP, MQTT" },
      { k: "Client Access", v: "Multi-seat desktop, Web HTML5, Mobile" },
      { k: "Escalations", v: "SMS, Voice Call, Email & Push Alert triggers" },
      { k: "Redundancy", v: "Hot-standby server failover zero packet loss" }
    ],
    features: [
      "Dynamic interactive plant overview with live equipment run/trip status",
      "Automated daily, weekly, and monthly regulatory production reports",
      "Comprehensive energy consumption analytics and specific power KPI metrics",
      "Encrypted secure VPN tunneling for remote troubleshooting and OEM diagnostics"
    ],
    apps: "Municipal water supply networks, industrial ETP/STP monitoring, power distribution substations, and multi-line factories.",
    quoteKey: "SCADA Telemetry System"
  },
  servo: {
    id: "servo",
    name: "Servo Motors & High-Precision Motion Drives",
    shortName: "SERVO METER",
    tag: "Division 01 • Motion & Precision",
    badge: "High-Dynamic Motion Control",
    desc: "High-dynamic AC brushless servo motors paired with digital multi-axis motion drives, providing micron-level positioning repeatability, instantaneous acceleration/deceleration, and closed-loop feedback for demanding precision machinery.",
    images: [
      { src: "assets/servo-motor.png?v=2", label: "High-Precision AC Brushless Servo Motor" },
      { src: "assets/motor.png?v=2", label: "Industrial Auxiliary Induction Drive Motor" }
    ],
    specs: [
      { k: "Rated Torque", v: "0.32 Nm to 120 Nm+ (Peak up to 350%)" },
      { k: "Rated Speed", v: "1,000 to 6,000 RPM continuous" },
      { k: "Feedback", v: "23-bit Optical / Magnetic Absolute Encoder" },
      { k: "Motion Bus", v: "EtherCAT, CANopen, Mechatrolink-III" },
      { k: "Ingress Rating", v: "IP67 Body with Shaft Oil Seal" },
      { k: "Rotor Inertia", v: "Ultra-low to medium inertia rotor variants" }
    ],
    features: [
      "Microsecond current loop response for zero-vibration dynamic settling",
      "Electronic camming (E-CAM), rotary knife, and electronic gearing functions",
      "Built-in dynamic holding brake for vertical axis anti-drop safety",
      "Rugged military-grade circular connectors for feedback and power"
    ],
    apps: "High-speed packaging, rotary labeling, pick-and-place robotics, CNC machinery, carton forming, and precision metering pumps.",
    quoteKey: "Servo Motors & Motion Control"
  }
};

let activeMachineKey = 'plc';

function ensureAutoModalInDOM() {
  if (document.getElementById('autoModal')) return;

  const modalHtml = `
  <div class="auto-modal" id="autoModal" role="dialog" aria-modal="true" aria-labelledby="autoModalTitle">
    <div class="auto-modal__backdrop" id="autoModalBackdrop"></div>
    <div class="auto-modal__container">
      <div class="auto-modal__panel">
        <div class="auto-modal__header">
          <div class="auto-modal__head-left">
            <span class="auto-modal__eyebrow" id="autoModalTag">Division 01 • Turnkey Control</span>
            <h2 class="auto-modal__title" id="autoModalTitle">PLC — Programmable Logic Controller &amp; Control Panels</h2>
          </div>
          <button class="auto-modal__close" id="autoModalClose" aria-label="Close Showcase Modal">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="auto-modal__nav-bar">
          <span class="auto-nav-label">Select Machine:</span>
          <div class="auto-modal__tabs" id="autoModalTabs" role="tablist">
            <button type="button" class="auto-tab-btn active" data-machine="plc" role="tab" aria-selected="true"><span class="tab-icon">⚡</span><span class="tab-name">PLC</span></button>
            <button type="button" class="auto-tab-btn" data-machine="hmi" role="tab" aria-selected="false"><span class="tab-icon">🖥️</span><span class="tab-name">HMI</span></button>
            <button type="button" class="auto-tab-btn" data-machine="vfd" role="tab" aria-selected="false"><span class="tab-icon">⚙️</span><span class="tab-name">VFD</span></button>
            <button type="button" class="auto-tab-btn" data-machine="scada" role="tab" aria-selected="false"><span class="tab-icon">📊</span><span class="tab-name">SCADA</span></button>
            <button type="button" class="auto-tab-btn" data-machine="servo" role="tab" aria-selected="false"><span class="tab-icon">🎯</span><span class="tab-name">SERVO METER</span></button>
          </div>
        </div>

        <div class="auto-modal__body">
          <div class="auto-modal__view">
            <div class="auto-img-frame">
              <img src="assets/plc.png?v=2" alt="PLC Hardware" id="autoModalImg" class="auto-main-image"/>
              <span class="auto-img-badge" id="autoModalImgBadge">PLC Controller Unit</span>
            </div>
            <div class="auto-thumbs" id="autoModalThumbs"></div>
          </div>

          <div class="auto-modal__details">
            <div class="auto-badge-pill" id="autoModalBadge">Industrial Automation Core</div>
            <p class="auto-desc" id="autoModalDesc"></p>
            <div class="auto-specs-box">
              <h4 class="auto-box-heading">Technical Specifications</h4>
              <div class="auto-specs-grid" id="autoModalSpecs"></div>
            </div>
            <div class="auto-features-box">
              <h4 class="auto-box-heading">Engineering Highlights</h4>
              <ul class="auto-features-list" id="autoModalFeatures"></ul>
            </div>
            <div class="auto-app-box">
              <span class="app-label">Typical Industrial Applications:</span>
              <span class="app-text" id="autoModalApps"></span>
            </div>
          </div>
        </div>

        <div class="auto-modal__footer">
          <div class="auto-footer__left">
            <span class="auto-footer__status">● Certified Engineering Facility — Bhubaneswar, Odisha</span>
            <span class="auto-footer__sub">Turnkey Design, Fabrication, Programming &amp; 24/7 Field Commissioning</span>
          </div>
          <div class="auto-footer__actions">
            <a href="RESOLINE CATALOGUE.pdf" download class="btn-auto-cat" title="Download Product Catalogue">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Datasheet / Catalog</span>
            </a>
            <a href="https://wa.me/91637053100" class="btn-auto-wa" id="autoModalWaBtn" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
              <span>WhatsApp Enquiry</span>
            </a>
            <button type="button" class="btn-auto-enquire" id="autoModalEnquireBtn">
              <span>Enquire For This Machine →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function renderMachineShowcase(key) {
  ensureAutoModalInDOM();
  const m = automationMachines[key] || automationMachines.plc;
  activeMachineKey = key;

  const autoModalTag = document.getElementById('autoModalTag');
  const autoModalTitle = document.getElementById('autoModalTitle');
  const autoModalBadge = document.getElementById('autoModalBadge');
  const autoModalDesc = document.getElementById('autoModalDesc');
  const autoModalApps = document.getElementById('autoModalApps');
  const autoModalImg = document.getElementById('autoModalImg');
  const autoModalImgBadge = document.getElementById('autoModalImgBadge');
  const autoModalThumbs = document.getElementById('autoModalThumbs');
  const autoModalSpecs = document.getElementById('autoModalSpecs');
  const autoModalFeatures = document.getElementById('autoModalFeatures');
  const autoModalWaBtn = document.getElementById('autoModalWaBtn');
  const autoTabBtns = document.querySelectorAll('.auto-tab-btn');

  if (autoModalTag) autoModalTag.textContent = m.tag;
  if (autoModalTitle) autoModalTitle.textContent = m.name;
  if (autoModalBadge) autoModalBadge.textContent = m.badge;
  if (autoModalDesc) autoModalDesc.textContent = m.desc;
  if (autoModalApps) autoModalApps.textContent = m.apps;

  const firstImg = m.images[0];
  if (autoModalImg) {
    autoModalImg.src = firstImg.src;
    autoModalImg.alt = firstImg.label;
  }
  if (autoModalImgBadge) autoModalImgBadge.textContent = firstImg.label;

  if (autoModalThumbs) {
    autoModalThumbs.innerHTML = '';
    if (m.images.length > 1) {
      m.images.forEach((imgObj, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'auto-thumb-btn' + (idx === 0 ? ' active' : '');
        btn.innerHTML = `<img src="${imgObj.src}" alt="${imgObj.label}"/> <span>${imgObj.label.split(' ')[0]} View</span>`;
        btn.addEventListener('click', () => {
          autoModalImg.src = imgObj.src;
          autoModalImg.alt = imgObj.label;
          autoModalImgBadge.textContent = imgObj.label;
          autoModalThumbs.querySelectorAll('.auto-thumb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
        autoModalThumbs.appendChild(btn);
      });
    }
  }

  if (autoModalSpecs) {
    autoModalSpecs.innerHTML = '';
    m.specs.forEach(s => {
      const item = document.createElement('div');
      item.className = 'auto-spec-item';
      item.innerHTML = `<span class="auto-spec-k">${s.k}</span><span class="auto-spec-v">${s.v}</span>`;
      autoModalSpecs.appendChild(item);
    });
  }

  if (autoModalFeatures) {
    autoModalFeatures.innerHTML = '';
    m.features.forEach(f => {
      const li = document.createElement('li');
      li.className = 'auto-feature-li';
      li.textContent = f;
      autoModalFeatures.appendChild(li);
    });
  }

  if (autoModalWaBtn) {
    const waText = encodeURIComponent(`Hello Resoline Techbis team, I would like to inquire about ${m.name}. Please share technical specifications, availability, and quotation.`);
    autoModalWaBtn.href = `https://wa.me/91637053100?text=${waText}`;
  }

  autoTabBtns.forEach(t => {
    if (t.getAttribute('data-machine') === key) {
      t.classList.add('active');
      t.setAttribute('aria-selected', 'true');
    } else {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    }
  });
}

function openAutoModal(machineKey) {
  ensureAutoModalInDOM();
  if (typeof closeQuoteModal === 'function') closeQuoteModal();
  if (typeof closeInspectModal === 'function') closeInspectModal();
  renderMachineShowcase(machineKey || 'plc');
  const autoModal = document.getElementById('autoModal');
  if (autoModal) {
    autoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeAutoModal() {
  const autoModal = document.getElementById('autoModal');
  if (autoModal) {
    autoModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  ensureAutoModalInDOM();

  const autoModalClose = document.getElementById('autoModalClose');
  const autoModalBackdrop = document.getElementById('autoModalBackdrop');
  const autoModalEnquireBtn = document.getElementById('autoModalEnquireBtn');

  if (autoModalClose) autoModalClose.addEventListener('click', closeAutoModal);
  if (autoModalBackdrop) autoModalBackdrop.addEventListener('click', closeAutoModal);

  document.addEventListener('click', e => {
    const tabBtn = e.target.closest('.auto-tab-btn');
    if (tabBtn) {
      const key = tabBtn.getAttribute('data-machine');
      renderMachineShowcase(key);
      return;
    }

    const openTrigger = e.target.closest('[data-open-auto]');
    if (openTrigger) {
      e.preventDefault();
      const key = openTrigger.getAttribute('data-open-auto') || 'plc';
      openAutoModal(key);
      if (typeof closeMenu === 'function') closeMenu();
      return;
    }
  });

  const navAutoDropdownBtn = document.getElementById('navAutoDropdownBtn');
  const navAutoDropdown = document.getElementById('navAutoDropdown');
  if (navAutoDropdownBtn && navAutoDropdown) {
    navAutoDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navAutoDropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!navAutoDropdown.contains(e.target) && e.target !== navAutoDropdownBtn) {
        navAutoDropdown.classList.remove('open');
      }
    });
  }

  if (autoModalEnquireBtn) {
    autoModalEnquireBtn.addEventListener('click', () => {
      const m = automationMachines[activeMachineKey] || automationMachines.plc;
      closeAutoModal();
      if (typeof openQuoteModal === 'function') {
        openQuoteModal(m.quoteKey);
        const scopeArea = document.getElementById('modalScope');
        if (scopeArea) {
          scopeArea.value = `Technical inquiry regarding: ${m.name}.\n\nPlease provide operational datasheet, sizing consultation, and price quotation for project deployment.`;
        }
      } else {
        window.location.href = `contact.html?equipment=${encodeURIComponent(m.quoteKey)}&scope=${encodeURIComponent('Inquiry regarding: ' + m.name)}`;
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAutoModal();
    }
  });
});
