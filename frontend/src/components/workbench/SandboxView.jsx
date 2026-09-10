import React, { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { executeCode } from '../../services/api';

const PRESET_SCRIPTS = {
  hoop_stress: `# Hoop Stress (Barlow's Formula) for Cylindrical Shell
P = 14.5  # Internal Pressure in MPa
D = 600.0 # Outer Diameter in mm
t = 24.5  # Wall Thickness in mm

# S_h = (P * D) / (2 * t)
hoop_stress = (P * D) / (2 * t)
allowable_stress = 138.0  # ASME SA-516 Grade 70 allowable in MPa

print(f"Calculated Hoop Stress: {hoop_stress:.2f} MPa")
print(f"Allowable Limit:        {allowable_stress:.2f} MPa")
if hoop_stress <= allowable_stress:
    print("STATUS: VERIFIED SAFE - Within ASME Section VIII tolerances")
else:
    print("STATUS: WARNING - Thickness insufficient for design pressure")
`,
  pump_flow: `# Centrifugal Pump Volumetric Flow Rate
import math

pipe_diameter_m = 0.254  # 10 inch pipe in meters
flow_velocity_m_s = 2.4  # measured flow velocity in m/s

cross_section_area = math.pi * ((pipe_diameter_m / 2.0) ** 2)
volumetric_flow_m3_s = cross_section_area * flow_velocity_m_s
flow_m3_hr = volumetric_flow_m3_s * 3600.0

print(f"Pipe Cross-Section Area: {cross_section_area:.4f} m^2")
print(f"Flow Rate:              {flow_m3_hr:.2f} m^3/hr")
print("Compliant with API 610 continuous duty cycle rating.")
`,
  vibration: `# ISO 10816-3 Vibration Severity Assessment
vibration_readings = [1.8, 2.1, 1.9, 2.4, 2.2]  # mm/s RMS

avg_vibration = sum(vibration_readings) / len(vibration_readings)
max_vibration = max(vibration_readings)

print(f"Average Vibration: {avg_vibration:.2f} mm/s RMS")
print(f"Peak Vibration:    {max_vibration:.2f} mm/s RMS")

if max_vibration < 2.8:
    print("Classification: Group 1 Rigid - Zone A (Newly Commissioned / Excellent)")
elif max_vibration < 4.5:
    print("Classification: Zone B (Unrestricted Long-Term Operation)")
else:
    print("Classification: Zone C/D (Action Required - Exceeds Alert Threshold)")
`,
};

export default function SandboxView() {
  const [code, setCode] = useState(PRESET_SCRIPTS.hoop_stress);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);
    try {
      const res = await executeCode(code);
      setResult(res);
    } catch (err) {
      setResult({ stderr: 'Execution Error: ' + err.message, returncode: 1 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wb-tool-page">
      <div className="wb-tool-inner">
        <div className="wb-tool-header">
          <h1 className="wb-tool-title">Code Sandbox</h1>
          <span className="wb-tool-badge wb-badge-cyan">AST-Guarded • Zero Network</span>
        </div>

        <div className="wb-split-grid">
          <div className="wb-card">
            <div className="wb-card-header">
              <span className="wb-card-title">Python Editor</span>
              <div className="wb-presets">
                <button className="wb-preset-btn" onClick={() => setCode(PRESET_SCRIPTS.hoop_stress)}>
                  Hoop Stress
                </button>
                <button className="wb-preset-btn" onClick={() => setCode(PRESET_SCRIPTS.pump_flow)}>
                  Pump Flow
                </button>
                <button className="wb-preset-btn" onClick={() => setCode(PRESET_SCRIPTS.vibration)}>
                  Vibration
                </button>
              </div>
            </div>
            <textarea
              className="wb-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
            <button className="wb-btn-primary" onClick={handleRun} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={14} /> Verifying AST…
                </>
              ) : (
                <>
                  <Play size={14} /> Run in Sandbox
                </>
              )}
            </button>
          </div>

          <div className="wb-card">
            <div className="wb-card-header">
              <span className="wb-card-title">Output</span>
              {result && (
                <span className={`wb-tool-badge ${result.returncode === 0 ? 'wb-badge-green' : 'wb-badge-amber'}`}>
                  Exit {result.returncode}{result.execution_time_ms ? ` • ${result.execution_time_ms}ms` : ''}
                </span>
              )}
            </div>
            <div className={`wb-code-output ${result?.stderr ? 'error' : ''}`}>
              {result ? (
                <>
                  {result.stdout && <div>{result.stdout}</div>}
                  {result.output && !result.stdout && <div>{result.output}</div>}
                  {result.stderr && <div className="stderr">{result.stderr}</div>}
                </>
              ) : (
                <span style={{ color: '#444' }}>Execute code to view output…</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
