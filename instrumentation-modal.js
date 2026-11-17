/**
 * Resoline Techbis - Instrumentation Division Showcase Pop-up & Tab Logic
 * Provides interactive modal showcasing Coriolis, Electromagnetic, Ultrasonic Flow,
 * Vortex Flow, and Ultrasonic Level instruments with high-resolution image views,
 * full technical specifications, and direct engineering enquiry (WhatsApp + RFQ).
 */

const instrumentationDevices = {
  coriolis: {
    id: "coriolis",
    name: "Coriolis Mass Flow Meter",
    shortName: "CORIOLIS",
    tag: "Division 02 • Custody Transfer",
    badge: "Direct Mass Flow Measurement",
    desc: "High-precision twin-tube Coriolis meters providing simultaneous mass flow rate, density, temperature, and viscosity measurement for custody transfer, chemical dosing, and fuel oil metering — completely independent of flow profile, pressure, or viscosity changes.",
    images: [
      { src: "coriolis mass flow meter.jpg?v=2", label: "Coriolis Mass Flow Meter Assembly" }
    ],
    specs: [
      { k: "Mass Accuracy", v: "±0.1% to ±0.05% of Reading" },
      { k: "Density Accuracy", v: "±0.0005 g/cm³ Inline" },
      { k: "Tube Material", v: "SS316L / Hastelloy C22 Wetted" },
      { k: "Temp Range", v: "-200°C to +350°C Process" },
      { k: "Output Protocol", v: "HART 7, Modbus RS485, 4-20mA" },
      { k: "Process Connection", v: "DN15 to DN300 Flanged / Tri-Clamp" }
    ],
    features: [
      "Direct mass measurement independent of flow profile, viscosity, or pressure changes",
      "Simultaneous real-time readout of mass flow, density, temperature, and derived viscosity",
      "Custody transfer grade accuracy certified to OIML R117 and API MPMS standards",
      "Zero moving parts with self-draining tube geometry for hygienic CIP/SIP applications"
    ],
    apps: "Petroleum custody transfer, chemical dosing & batching, fuel oil bunkering, pharmaceutical production, food-grade hygienic metering, and LPG/LNG loading.",
    quoteKey: "Coriolis Mass Flow Meter"
  },
  emflow: {
    id: "emflow",
    name: "Electromagnetic Flow Meter (Magmeter)",
    shortName: "MAGMETER",
    tag: "Division 02 • Conductive Liquids",
    badge: "Volumetric Flow Measurement",
    desc: "Full-bore obstructionless electromagnetic flow meters using Faraday's law of induction for accurate volumetric measurement of conductive liquids, slurries, effluent, and corrosive acids — with zero pressure drop across the pipe.",
    images: [
      { src: "e.m flow meter.jpg?v=2", label: "Electromagnetic Flow Meter (Magmeter)" }
    ],
    specs: [
      { k: "Accuracy", v: "±0.5% / ±0.2% of Reading" },
      { k: "Size Range", v: "DN10 to DN2000 Flanged" },
      { k: "Liner Options", v: "PTFE / PFA / Hard Rubber / Neoprene" },
      { k: "Electrode", v: "Hastelloy C / Titanium / Platinum" },
      { k: "Protection", v: "IP68 Submersible Rated Sensor" },
      { k: "Output", v: "4-20mA, HART, Modbus RTU, Pulse" }
    ],
    features: [
      "Zero pressure drop with fully obstructionless bore — no turbine or orifice element",
      "Bidirectional measurement with intelligent empty pipe detection and alarm output",
      "Advanced pulsed DC field excitation eliminating electrode fouling and zero drift",
      "IP68 rated for fully submersible, buried, and flooded pit installations"
    ],
    apps: "Raw water intake headers, wastewater effluent, acid & alkali chemical dosing, mining slurry pipelines, municipal water distribution, and sugar mill juice lines.",
    quoteKey: "Electromagnetic Flow Meter"
  },
  ultraflow: {
    id: "ultraflow",
    name: "Non-Invasive Ultrasonic Flow Meter",
    shortName: "ULTRASONIC",
    tag: "Division 02 • Non-Invasive",
    badge: "Transit-Time Acoustic Flow",
    desc: "Clamp-on and insertion transit-time ultrasonic flow meters enabling non-invasive volumetric and energy measurement on existing pipelines — without process shutdown, pipe cutting, or production interruption.",
    images: [
      { src: "ultra sonic flow meter.jpg?v=2", label: "Clamp-On Ultrasonic Flow Meter" }
    ],
    specs: [
      { k: "Installation", v: "Clamp-On / Insertion / Hot-Tap" },
      { k: "Pipe Range", v: "DN15 to DN6000 OD (Any Material)" },
      { k: "Velocity", v: "0.01 to ±32 m/s Bidirectional" },
      { k: "Accuracy", v: "±1% of Reading (Calibrated)" },
      { k: "Media", v: "Clean Liquids, Gases, Condensate" },
      { k: "Output", v: "4-20mA, Modbus, HART, Pulse, BTU" }
    ],
    features: [
      "Zero pipe shutdown — clamp-on transducer installation in minutes on live lines",
      "Integrated BTU and energy metering for HVAC chilled water and district heating",
      "Multi-path transit-time compensation for improved accuracy in disturbed flow profiles",
      "Portable audit and permanent fixed installation options in the same platform"
    ],
    apps: "HVAC energy metering, cooling water circuits, chilled water systems, district heating networks, portable flow audit surveys, and condensate return measurement.",
    quoteKey: "Ultrasonic Flow Meter"
  },
  vortex: {
    id: "vortex",
    name: "Vortex Shedding Flow Meter",
    shortName: "VORTEX",
    tag: "Division 02 • Steam & Gas",
    badge: "Multivariable Vortex Measurement",
    desc: "Inline vortex shedding flow meters with integrated temperature and pressure sensors providing direct mass flow computation for saturated steam, superheated steam, compressed gases, and clean process fluids.",
    images: [
      { src: "vertex flow meter.jpg?v=2", label: "Vortex Shedding Flow Meter" }
    ],
    specs: [
      { k: "Medium", v: "Saturated / Superheated Steam & Gas" },
      { k: "Max Temperature", v: "+350°C Continuous Process" },
      { k: "Accuracy", v: "±1.0% of Reading (Liquid & Gas)" },
      { k: "Built-in Sensors", v: "Temp + Pressure Compensation" },
      { k: "Body Material", v: "SS304 / SS316 Forged Body" },
      { k: "Size Range", v: "DN15 to DN300 Flanged (ANSI/JIS)" }
    ],
    features: [
      "Integrated mass steam flow computation without external flow computers or calculators",
      "No moving parts — zero mechanical wear even in high-vibration steam headers",
      "Built-in Pt1000 RTD and pressure sensor for real-time density compensation",
      "Wide rangeability up to 30:1 turndown for variable boiler load conditions"
    ],
    apps: "Saturated and superheated steam metering, compressed air consumption auditing, natural gas distribution, nitrogen purge lines, and boiler efficiency monitoring.",
    quoteKey: "Vortex Flow Meter"
  },
  ultralevel: {
    id: "ultralevel",
    name: "Non-Contact Ultrasonic Level Transmitter",
    shortName: "LEVEL TX",
    tag: "Division 02 • Level Sensing",
    badge: "Non-Contact Acoustic Level",
    desc: "Non-contact acoustic echo-ranging level transmitters providing continuous liquid and solid level measurement for storage tanks, sump wells, open channels, and chemical reservoirs — with corrosion-proof PVDF sensor construction.",
    images: [
      { src: "ultrasonic level transmitter.jpg?v=2", label: "Ultrasonic Level Transmitter Probe" }
    ],
    specs: [
      { k: "Measuring Range", v: "0.25m to 15m Continuous" },
      { k: "Beam Angle", v: "7° Narrow Focused Acoustic" },
      { k: "Sensor Body", v: "PVDF / PP Corrosion-Proof" },
      { k: "Output", v: "4-20mA 2-Wire / RS485 / Relay" },
      { k: "Display", v: "Backlit LCD with Echo Curve" },
      { k: "Protection", v: "IP67 / IP68 Harsh Environment" }
    ],
    features: [
      "Smart false-echo learning algorithm for reliable measurement with internal obstructions",
      "Open channel flow calculation with Parshall flume and V-notch weir metering built-in",
      "Automatic temperature compensation for accurate echo-ranging in outdoor installations",
      "ATEX / IECEx intrinsically safe versions available for hazardous classified areas"
    ],
    apps: "Water treatment clarifiers, chemical storage reservoirs, sump and lift station wells, open channels with Parshall flumes, grain silos, and effluent equalization tanks.",
    quoteKey: "Ultrasonic Level Transmitter"
  }
};

let activeInstKey = 'coriolis';

function ensureInstModalInDOM() {
  if (document.getElementById('instModal')) return;

  const modalHtml = `
  <div class="auto-modal" id="instModal" role="dialog" aria-modal="true" aria-labelledby="instModalTitle">
    <div class="auto-modal__backdrop" id="instModalBackdrop"></div>
    <div class="auto-modal__container">
      <div class="auto-modal__panel">
        <div class="auto-modal__header">
          <div class="auto-modal__head-left">
            <span class="auto-modal__eyebrow" id="instModalTag">Division 02 • Custody Transfer</span>
            <h2 class="auto-modal__title" id="instModalTitle">Coriolis Mass Flow Meter</h2>
          </div>
          <button class="auto-modal__close" id="instModalClose" aria-label="Close Showcase Modal">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="auto-modal__nav-bar">
          <span class="auto-nav-label">Select Instrument:</span>
          <div class="auto-modal__tabs" id="instModalTabs" role="tablist">
            <button type="button" class="inst-tab-btn active" data-inst-machine="coriolis" role="tab" aria-selected="true"><span class="tab-icon">🌊</span><span class="tab-name">CORIOLIS</span></button>
            <button type="button" class="inst-tab-btn" data-inst-machine="emflow" role="tab" aria-selected="false"><span class="tab-icon">⚡</span><span class="tab-name">MAGMETER</span></button>
            <button type="button" class="inst-tab-btn" data-inst-machine="ultraflow" role="tab" aria-selected="false"><span class="tab-icon">📡</span><span class="tab-name">ULTRASONIC</span></button>
            <button type="button" class="inst-tab-btn" data-inst-machine="vortex" role="tab" aria-selected="false"><span class="tab-icon">🌀</span><span class="tab-name">VORTEX</span></button>
            <button type="button" class="inst-tab-btn" data-inst-machine="ultralevel" role="tab" aria-selected="false"><span class="tab-icon">📏</span><span class="tab-name">LEVEL TX</span></button>
          </div>
        </div>

        <div class="auto-modal__body">
          <div class="auto-modal__view">
            <div class="auto-img-frame">
              <img src="coriolis mass flow meter.jpg?v=2" alt="Coriolis Mass Flow Meter" id="instModalImg" class="auto-main-image"/>
              <span class="auto-img-badge" id="instModalImgBadge">Coriolis Mass Flow Meter Assembly</span>
            </div>
            <div class="auto-thumbs" id="instModalThumbs"></div>
          </div>

          <div class="auto-modal__details">
            <div class="auto-badge-pill" id="instModalBadge">Direct Mass Flow Measurement</div>
            <p class="auto-desc" id="instModalDesc"></p>
            <div class="auto-specs-box">
              <h4 class="auto-box-heading">Technical Specifications</h4>
              <div class="auto-specs-grid" id="instModalSpecs"></div>
            </div>
            <div class="auto-features-box">
              <h4 class="auto-box-heading">Engineering Highlights</h4>
              <ul class="auto-features-list" id="instModalFeatures"></ul>
            </div>
            <div class="auto-app-box">
              <span class="app-label">Typical Industrial Applications:</span>
              <span class="app-text" id="instModalApps"></span>
            </div>
          </div>
        </div>

        <div class="auto-modal__footer">
          <div class="auto-footer__left">
            <span class="auto-footer__status">● Certified Instrumentation Facility — Bhubaneswar, Odisha</span>
            <span class="auto-footer__sub">Turnkey Sizing, Calibration, Installation & NABL-Traceable Commissioning</span>
          </div>
          <div class="auto-footer__actions">
            <a href="RESOLINE CATALOGUE.pdf" download class="btn-auto-cat" title="Download Product Catalogue">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Datasheet / Catalog</span>
            </a>
            <a href="https://wa.me/91637053100" class="btn-auto-wa" id="instModalWaBtn" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
              <span>WhatsApp Enquiry</span>
            </a>
            <button type="button" class="btn-auto-enquire" id="instModalEnquireBtn">
              <span>Enquire For This Instrument →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function renderInstShowcase(key) {
  ensureInstModalInDOM();
  const m = instrumentationDevices[key] || instrumentationDevices.coriolis;
  activeInstKey = key;

  const instModalTag = document.getElementById('instModalTag');
  const instModalTitle = document.getElementById('instModalTitle');
  const instModalBadge = document.getElementById('instModalBadge');
  const instModalDesc = document.getElementById('instModalDesc');
  const instModalApps = document.getElementById('instModalApps');
  const instModalImg = document.getElementById('instModalImg');
  const instModalImgBadge = document.getElementById('instModalImgBadge');
  const instModalThumbs = document.getElementById('instModalThumbs');
  const instModalSpecs = document.getElementById('instModalSpecs');
  const instModalFeatures = document.getElementById('instModalFeatures');
  const instModalWaBtn = document.getElementById('instModalWaBtn');
  const instTabBtns = document.querySelectorAll('.inst-tab-btn');

  if (instModalTag) instModalTag.textContent = m.tag;
  if (instModalTitle) instModalTitle.textContent = m.name;
  if (instModalBadge) instModalBadge.textContent = m.badge;
  if (instModalDesc) instModalDesc.textContent = m.desc;
  if (instModalApps) instModalApps.textContent = m.apps;

  const firstImg = m.images[0];
  if (instModalImg) {
    instModalImg.src = firstImg.src;
    instModalImg.alt = firstImg.label;
  }
  if (instModalImgBadge) instModalImgBadge.textContent = firstImg.label;

  if (instModalThumbs) {
    instModalThumbs.innerHTML = '';
    if (m.images.length > 1) {
      m.images.forEach((imgObj, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'auto-thumb-btn' + (idx === 0 ? ' active' : '');
        btn.innerHTML = `<img src="${imgObj.src}" alt="${imgObj.label}"/> <span>${imgObj.label.split(' ')[0]} View</span>`;
        btn.addEventListener('click', () => {
          instModalImg.src = imgObj.src;
          instModalImg.alt = imgObj.label;
          instModalImgBadge.textContent = imgObj.label;
          instModalThumbs.querySelectorAll('.auto-thumb-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
        instModalThumbs.appendChild(btn);
      });
    }
  }

  if (instModalSpecs) {
    instModalSpecs.innerHTML = '';
    m.specs.forEach(s => {
      const item = document.createElement('div');
      item.className = 'auto-spec-item';
      item.innerHTML = `<span class="auto-spec-k">${s.k}</span><span class="auto-spec-v">${s.v}</span>`;
      instModalSpecs.appendChild(item);
    });
  }

  if (instModalFeatures) {
    instModalFeatures.innerHTML = '';
    m.features.forEach(f => {
      const li = document.createElement('li');
      li.className = 'auto-feature-li';
      li.textContent = f;
      instModalFeatures.appendChild(li);
    });
  }

  if (instModalWaBtn) {
    const waText = encodeURIComponent(`Hello Resoline Techbis team, I would like to inquire about ${m.name}. Please share technical specifications, sizing consultation, availability, and quotation.`);
    instModalWaBtn.href = `https://wa.me/91637053100?text=${waText}`;
  }

  instTabBtns.forEach(t => {
    if (t.getAttribute('data-inst-machine') === key) {
      t.classList.add('active');
      t.setAttribute('aria-selected', 'true');
    } else {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    }
  });
}

function openInstModal(instKey) {
  ensureInstModalInDOM();
  if (typeof closeQuoteModal === 'function') closeQuoteModal();
  if (typeof closeInspectModal === 'function') closeInspectModal();
  if (typeof closeAutoModal === 'function') closeAutoModal();
  renderInstShowcase(instKey || 'coriolis');
  const instModal = document.getElementById('instModal');
  if (instModal) {
    instModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeInstModal() {
  const instModal = document.getElementById('instModal');
  if (instModal) {
    instModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  ensureInstModalInDOM();

  const instModalClose = document.getElementById('instModalClose');
  const instModalBackdrop = document.getElementById('instModalBackdrop');
  const instModalEnquireBtn = document.getElementById('instModalEnquireBtn');

  if (instModalClose) instModalClose.addEventListener('click', closeInstModal);
  if (instModalBackdrop) instModalBackdrop.addEventListener('click', closeInstModal);

  document.addEventListener('click', e => {
    const tabBtn = e.target.closest('.inst-tab-btn');
    if (tabBtn) {
      const key = tabBtn.getAttribute('data-inst-machine');
      renderInstShowcase(key);
      return;
    }

    const openTrigger = e.target.closest('[data-open-inst]');
    if (openTrigger) {
      e.preventDefault();
      const key = openTrigger.getAttribute('data-open-inst') || 'coriolis';
      openInstModal(key);
      if (typeof closeMenu === 'function') closeMenu();
      return;
    }
  });

  if (instModalEnquireBtn) {
    instModalEnquireBtn.addEventListener('click', () => {
      const m = instrumentationDevices[activeInstKey] || instrumentationDevices.coriolis;
      closeInstModal();
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
      closeInstModal();
    }
  });
});
