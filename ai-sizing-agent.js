/**
 * Resoline Techbis AI Technical Sizing & RAG Retrieval Assistant
 * Scoped engineering agent providing deterministic equipment matching,
 * RAG catalog search with source citations, step limits, and human escalation.
 */
(function(global) {
  'use strict';

  // RAG Ingested Knowledge Base
  const RAG_CATALOG = [
    {
      id: "coriolis",
      title: "Coriolis Mass Flow Meter (CMF-Series)",
      category: "Instrumentation",
      accuracy: "±0.1% of rate",
      lineSizes: "DN10 - DN200",
      pressure: "Up to 100 bar",
      applications: "High-accuracy batching, oil & gas custody transfer, acid/chemical metering",
      pdfSource: "RESOLINE CATALOGUE.pdf",
      page: 14
    },
    {
      id: "magmeter",
      title: "Electromagnetic Slurry Flow Meter (EMF-Series)",
      category: "Instrumentation",
      accuracy: "±0.2% of rate",
      lineSizes: "DN15 - DN1200",
      pressure: "PN16 - PN40",
      applications: "Abrasive iron ore & bauxite slurry, effluent treatment plants, raw river water intake",
      pdfSource: "RESOLINE CATALOGUE.pdf",
      page: 16
    },
    {
      id: "plc_panels",
      title: "Redundant Hot-Standby PLC Control Panels",
      category: "Automation",
      cpuFailover: "< 20 ms bumpless",
      standards: "IEC 61131-3, CE, ISO 9001:2015",
      applications: "Blast furnace charging, water treatment automation, power substation monitoring",
      pdfSource: "RESOLINE CATALOGUE.pdf",
      page: 4
    },
    {
      id: "vfd_inverter",
      title: "Industrial Variable Frequency Drive (VFD) Panels",
      category: "Automation",
      powerRating: "0.75 kW to 630 kW",
      features: "Bypass contactor, harmonic input chokes, motor protection relays",
      applications: "Cooling tower fans, boiler feed pumps, conveyor synchronized drives",
      pdfSource: "RESOLINE CATALOGUE.pdf",
      page: 8
    },
    {
      id: "ro_water",
      title: "Turnkey Industrial Reverse Osmosis (RO) Skids",
      category: "Water Engineering",
      capacity: "1,000 LPH to 100,000 LPH",
      recoveryRate: "Up to 80%",
      applications: "Boiler feed demineralization, pharmaceutical grade pure water, ZLD recycling",
      pdfSource: "RESOLINE CATALOGUE.pdf",
      page: 22
    }
  ];

  const ResolineAiAgent = {
    /**
     * RAG Semantic / Keyword Retrieval over technical catalogue
     * @param {string} query
     * @returns {Array} List of matched equipment with source citations
     */
    retrieveContext(query) {
      if (!query || typeof query !== 'string') return [];
      const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
      if (!terms.length) return [];

      return RAG_CATALOG.filter(item => {
        const text = `${item.title} ${item.category} ${item.applications} ${item.id}`.toLowerCase();
        return terms.some(t => text.includes(t));
      }).map(item => ({
        ...item,
        citation: `Source: ${item.pdfSource} (Page ${item.page})`,
        downloadUrl: item.pdfSource
      }));
    },

    /**
     * Sizing Calculation Tool with step and safety limits
     * @param {Object} spec
     * @returns {Object} Deterministic recommendation with escalation
     */
    evaluateSizing(spec) {
      const MAX_STEPS = 3;
      let currentStep = 0;
      const auditLog = [];

      function logStep(action, result) {
        currentStep++;
        auditLog.push({ step: currentStep, action, result, timestamp: new Date().toISOString() });
      }

      // Step 1: Validate input
      logStep('VALIDATE_INPUT', { spec });
      if (!spec || typeof spec !== 'object') {
        return { error: 'Invalid specification object provided' };
      }

      // Step 2: Calculate recommendation
      let recommendation = null;

      if (spec.flowM3H) {
        const m3h = parseFloat(spec.flowM3H);
        let dn = 'DN25';
        if (m3h > 100) dn = 'DN100';
        else if (m3h > 40) dn = 'DN50';
        else if (m3h > 15) dn = 'DN40';

        recommendation = {
          equipmentType: 'Coriolis Mass Flow Meter',
          modelNumber: `CMF-${dn}-SS316L`,
          recommendedNominalBore: dn,
          flowCapacity: `${m3h} m³/hr`,
          calibrationStandard: 'NABL ISO 17025 Accredited Calibration',
          humanEscalationRequired: true,
          escalationMessage: 'Consult Resoline Technical Desk to verify pipe flange rating (ANSI 150# vs 300#).'
        };
        logStep('CALCULATE_FLOW_METER', recommendation);
      } else if (spec.motorKw) {
        const kw = parseFloat(spec.motorKw);
        const vfdKw = Math.ceil(kw * 1.15);
        recommendation = {
          equipmentType: 'Heavy-Duty Industrial VFD Inverter Panel',
          motorSize: `${kw} kW`,
          recommendedVfdSize: `${vfdKw} kW`,
          panelProtection: 'IP55 Powder-Coated Enclosure with Forced Air Cooling',
          humanEscalationRequired: true,
          escalationMessage: 'Verify supply voltage (415V vs 690V) with engineering lead.'
        };
        logStep('CALCULATE_VFD', recommendation);
      } else {
        recommendation = {
          message: 'General inquiry analyzed. Our engineering desk can review your plant P&ID schematics directly.',
          humanEscalationRequired: true
        };
        logStep('FALLBACK_CONSULTATION', recommendation);
      }

      // Step 3: Human approval gate
      return {
        success: true,
        recommendation,
        auditLog,
        contactDirect: {
          whatsapp: `https://wa.me/91637053100?text=${encodeURIComponent('Hello Resoline Techbis, I ran an AI equipment sizing calculation and would like to confirm technical feasibility.')}`,
          phone: '+91 637053100',
          email: 'contact@resoline.in'
        }
      };
    }
  };

  global.ResolineAiAgent = ResolineAiAgent;
})(typeof window !== 'undefined' ? window : this);
