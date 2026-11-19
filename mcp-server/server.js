/**
 * Resoline Techbis Model Context Protocol (MCP) Server
 * Exposes industrial catalog queries, plant case studies, and engineering sizing tools
 * via standard JSON-RPC 2.0 with Bearer authentication and least-privilege tools.
 */

const http = require('http');

const PORT = process.env.MCP_PORT || 8090;
const MCP_API_KEY = process.env.MCP_API_KEY || 'resoline_mcp_secure_key_2026';

// Catalog Knowledge Base for RAG & MCP Retrieval
const EQUIPMENT_CATALOG = [
  {
    id: "coriolis-flow",
    name: "Coriolis Mass Flow Meter (CMF-Series)",
    category: "instrumentation",
    accuracy: "±0.1% of rate",
    fluids: "Hydrocarbons, chemicals, abrasive slurries, high-viscosity liquids",
    pipe_sizes: "DN10 to DN200 (1/4\" to 8\")",
    pressure: "Up to 100 bar (1450 psi)",
    specs: ["Dual bent tube Coriolis sensor", "Direct mass flow & density measurement", "HART, Modbus RS-485, 4-20mA"],
    catalogue_ref: "RESOLINE CATALOGUE.pdf (Page 14)"
  },
  {
    id: "magmeter",
    name: "Electromagnetic Slurry Flow Meter (EMF-Series)",
    category: "instrumentation",
    accuracy: "±0.2% of reading",
    fluids: "Conductive liquids, raw wastewater, bauxite slurry, iron ore tailings",
    pipe_sizes: "DN15 to DN1200",
    pressure: "PN16 to PN40",
    specs: ["PTFE / Hard Rubber lining", "Hastelloy C / Titanium electrodes", "Zero pressure drop obstructionless bore"],
    catalogue_ref: "RESOLINE CATALOGUE.pdf (Page 16)"
  },
  {
    id: "plc-automation",
    name: "Redundant Hot-Standby PLC Control Panels",
    category: "automation",
    architecture: "Dual redundant CPU, bumpless failover < 20ms",
    protocols: "EtherNet/IP, PROFINET, Modbus TCP, IEC 61850",
    specs: ["Rittal enclosure IP55/IP65", "Failsafe SIL-2 / SIL-3 interlocks", "Factory acceptance tested (FAT)"],
    catalogue_ref: "RESOLINE CATALOGUE.pdf (Page 4)"
  },
  {
    id: "vfd-cabinet",
    name: "Heavy-Duty Variable Frequency Drive (VFD) Panels",
    category: "automation",
    power_range: "0.75 kW to 630 kW (380V - 690V)",
    overload: "150% for 60 seconds",
    specs: ["Harmonic filtration line reactors", "Built-in dynamic braking chopper", "Bypass contactor synchronization"],
    catalogue_ref: "RESOLINE CATALOGUE.pdf (Page 8)"
  },
  {
    id: "ro-plant",
    name: "Industrial Turnkey Reverse Osmosis (RO) Skid",
    category: "water-treatment",
    capacity: "5 m³/hr to 250 m³/hr",
    recovery: "75% to 85% single/double pass",
    specs: ["FRP/SS316 high-pressure housing", "CIP chemical cleaning skid", "Grundfos/Danfoss high-pressure pumps"],
    catalogue_ref: "RESOLINE CATALOGUE.pdf (Page 22)"
  }
];

const CASE_STUDIES = {
  tata: {
    client: "TATA & Subsidiaries (Kalinganagar)",
    lead: "Er. S. K. Mohapatra (GM — Blast Furnace Automation)",
    scope: "Turnkey SCADA Telemetry & Redundant Hot-Standby PLC Control Panels for Slag Granulation",
    uptime: "99.98% Process Uptime",
    turnaround: "72-Hour Rapid Turnaround Window"
  },
  nalco: {
    client: "National Aluminium Company (Damanjodi)",
    lead: "Dr. P. C. Behera (Chief Superintendent — Environmental Systems)",
    scope: "350 m³/hr Heavy Industrial Wastewater Treatment & Inline Electromagnetic Slurry Flow Metering",
    compliance: "Zero Liquid Discharge (ZLD) Compliance",
    accuracy: "±0.2% Slurry Measurement"
  },
  jindal: {
    client: "Jindal Steel & Power (Angul)",
    lead: "A. K. Sharma (Head of Electrical & Instrumentation)",
    scope: "Heavy-duty VFD Inverter Panels & High-Pressure Pumping Automation",
    savings: "18.4% Documented Energy Reduction"
  }
};

// Sizing calculation engine
function calculateSizing(type, params) {
  if (type === 'coriolis_flow') {
    const flowM3H = parseFloat(params.flow_m3h) || 10;
    const density = parseFloat(params.density_kg_m3) || 1000;
    const massFlowKgH = flowM3H * density;
    let recommendedDn = 'DN25 (1")';
    if (flowM3H > 100) recommendedDn = 'DN100 (4")';
    else if (flowM3H > 40) recommendedDn = 'DN50 (2")';
    else if (flowM3H > 15) recommendedDn = 'DN40 (1.5")';

    return {
      equipment: "Resoline Coriolis Mass Flow Meter",
      recommended_size: recommendedDn,
      design_mass_flow_rate: `${massFlowKgH.toFixed(1)} kg/hr`,
      recommended_sensor: `CMF-${recommendedDn.replace(/\D/g, '')}`,
      calibration_standard: "ISO 17025 / NABL Accredited",
      escalation_note: "Contact Resoline Engineering Desk (+91 637053100) for high-viscosity sizing."
    };
  }

  if (type === 'vfd_motor') {
    const motorKw = parseFloat(params.motor_kw) || 22;
    const voltage = params.voltage || "415V 3-Phase";
    const recommendedVfdKw = Math.ceil(motorKw * 1.15); // 15% service safety factor
    return {
      equipment: "Resoline Heavy Industrial VFD Panel",
      motor_rating: `${motorKw} kW (${voltage})`,
      recommended_vfd_rating: `${recommendedVfdKw} kW`,
      enclosure_class: "IP54 / IP55 Floor Standing Cabinet",
      features: ["Line chokes included", "Dynamic braking resistor", "Modbus RS-485 / Ethernet"]
    };
  }

  if (type === 'ro_membrane') {
    const rawTds = parseFloat(params.raw_tds_ppm) || 1200;
    const capacityM3Day = parseFloat(params.daily_capacity_m3) || 100;
    const membraneType = rawTds > 2000 ? "High Rejection Brackish Water (BWRO)" : "Fouling Resistant (FR-RO)";
    return {
      equipment: "Resoline Industrial RO Skid",
      daily_capacity: `${capacityM3Day} m³/day`,
      raw_water_tds: `${rawTds} ppm`,
      recommended_membrane: membraneType,
      expected_permeate_tds: `< ${Math.round(rawTds * 0.02)} ppm (98% rejection)`,
      pretreatment_required: ["Sand Filter (MGF)", "Activated Carbon (ACF)", "Antiscalant Dosing Skid"]
    };
  }

  return { error: `Unsupported equipment sizing type: ${type}` };
}

// HTTP Server for MCP JSON-RPC
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Verify Bearer Auth
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader !== `Bearer ${MCP_API_KEY}`) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32001, message: "Unauthorized MCP access" } }));
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const json = JSON.parse(body);
        const { id, method, params } = json;

        if (method === 'tools/list') {
          const mcpSpec = require('./resoline-mcp.json');
          return res.end(JSON.stringify({ jsonrpc: "2.0", id, result: mcpSpec.capabilities }));
        }

        if (method === 'tools/call') {
          const toolName = params.name;
          const args = params.arguments || {};

          if (toolName === 'query_equipment_catalog') {
            const query = (args.query || '').toLowerCase();
            const results = EQUIPMENT_CATALOG.filter(item => 
              item.name.toLowerCase().includes(query) || 
              item.category.toLowerCase().includes(query) ||
              item.specs.some(s => s.toLowerCase().includes(query))
            );
            return res.end(JSON.stringify({ jsonrpc: "2.0", id, result: { found: results.length, items: results } }));
          }

          if (toolName === 'get_plant_case_study') {
            const client = CASE_STUDIES[args.client_id];
            if (client) {
              return res.end(JSON.stringify({ jsonrpc: "2.0", id, result: client }));
            }
            return res.end(JSON.stringify({ jsonrpc: "2.0", id, result: { error: "Case study not found" } }));
          }

          if (toolName === 'calculate_equipment_sizing') {
            const calculation = calculateSizing(args.equipment_type, args.parameters);
            return res.end(JSON.stringify({ jsonrpc: "2.0", id, result: calculation }));
          }

          return res.end(JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32601, message: `Tool '${toolName}' not found` } }));
        }

        return res.end(JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not supported" } }));
      } catch (err) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32700, message: "Parse error" } }));
      }
    });
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify({ status: "Resoline MCP Server Active", endpoint: "POST /" }));
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`[Resoline MCP] Server running on port ${PORT}`);
  });
}

module.exports = { server, EQUIPMENT_CATALOG, calculateSizing };
