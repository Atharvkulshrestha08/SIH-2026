/**
 * Cyclic Welcome Message Service
 * Rotates across 4 tailored engineering & customer service messages.
 * Every 4th visitor cycles back to the 1st message (visitIndex % 4).
 */

export const CYCLIC_MESSAGES = [
  {
    id: 0,
    heading: "Where should we begin?",
    subheading: "Ready for on-premise SOP lookup, sandboxed calculations, or inspection deliverables.",
    hint: "Ask an engineering question, paste code, or request an approval memo...",
    actionLabel: "Search SOPs",
  },
  {
    id: 1,
    heading: "Good to see you. What are we analyzing today?",
    subheading: "Zero-egress industrial assistant ready to verify equipment specs and ASME standards.",
    hint: "Calculate pressure vessel stresses, check pump vibration limits, or draft notes...",
    actionLabel: "Run Calculation",
  },
  {
    id: 2,
    heading: "How can I assist your engineering shift?",
    subheading: "Air-gapped models resident in local VRAM for confidential refinery workflows.",
    hint: "Query refinery procedures, review ultrasonic thickness, or draft documents...",
    actionLabel: "Draft Approval Memo",
  },
  {
    id: 3,
    heading: "All local nodes nominal. What's on your desk?",
    subheading: "Local reasoning and AST execution running 100% offline with zero external network egress.",
    hint: "Task an agent with SOP compliance, run Python calculations, or inspect files...",
    actionLabel: "Explore Knowledge",
  },
];

const STORAGE_KEY_VISIT_INDEX = "max_visitor_cycle_index";

/**
 * Get the current cyclic message for this visitor session.
 * Increments or retrieves the cyclic visitor counter.
 */
export function getCyclicMessage() {
  let currentIndex = 0;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_VISIT_INDEX);
    if (stored !== null) {
      currentIndex = parseInt(stored, 10) || 0;
    } else {
      // First visit on this client, initialize at 0
      currentIndex = 0;
      localStorage.setItem(STORAGE_KEY_VISIT_INDEX, "0");
    }
  } catch {
    currentIndex = 0;
  }

  const cyclicIndex = Math.abs(currentIndex) % CYCLIC_MESSAGES.length;
  const msgObj = CYCLIC_MESSAGES[cyclicIndex];

  return {
    ...msgObj,
    cycleNumber: cyclicIndex + 1,
    personalizedHeading: msgObj.heading,
  };
}

/**
 * Advance to next visitor cycle (every 4th visitor gets the 1st message)
 */
export function advanceCyclicVisitor() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_VISIT_INDEX);
    const currentIndex = stored !== null ? parseInt(stored, 10) || 0 : 0;
    const nextIndex = (currentIndex + 1) % 4; // strictly modulo 4
    localStorage.setItem(STORAGE_KEY_VISIT_INDEX, nextIndex.toString());
    return nextIndex;
  } catch {
    return 0;
  }
}
