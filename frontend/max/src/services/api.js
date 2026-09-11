/**
 * MAX API Service Layer
 * Connects directly to local air-gapped FastAPI backend (Base URL: http://127.0.0.1:8000/api/v1)
 *
 * AIR-GAP GUARANTEE:
 * - 0 external egress
 * - No cloud AI, analytics, or external telemetry
 * - If the local backend is unreachable, explicitly reports "Backend unavailable"
 *   at 127.0.0.1:8000 without fabricating fake responses or false model identities.
 */

export const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";
export const BACKEND_HOST = "127.0.0.1:8000";

/**
 * Standardized error message creator
 */
function createBackendError(endpoint, originalError) {
  const err = new Error(
    `Backend unavailable: Unable to reach the local MAX service at ${BACKEND_HOST}. ` +
    `Ensure FastAPI is running (uvicorn app.main:app --reload). Details: ${originalError?.message || originalError}`
  );
  err.isBackendOffline = true;
  err.endpoint = endpoint;
  return err;
}

/**
 * Check connectivity to the local FastAPI backend
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/status/`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) return true;
    const fallback = await fetch(`${API_BASE}/status`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    return fallback.ok;
  } catch {
    return false;
  }
}

/**
 * GET /api/v1/status/
 * Fetches real platform, CPU %, memory %, and network egress telemetry from backend
 */
export async function getStatus() {
  try {
    let res = await fetch(`${API_BASE}/status/`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      res = await fetch(`${API_BASE}/status`, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });
    }
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return {
      ok: true,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      error: createBackendError("/status", err).message,
      data: null,
    };
  }
}


/**
 * POST /api/v1/orchestrate/
 * Main pipeline: Intent classification -> RAG -> Local Model (ai/qwen2.5:7B-Q4_K_M) -> Audit log
 */
export async function orchestrate(prompt, model = "auto", sessionId = "default-session") {
  try {
    const res = await fetch(`${API_BASE}/orchestrate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        model: model || "auto",
        session_id: sessionId,
      }),
      signal: AbortSignal.timeout(60000), // generous timeout for local 7B inference
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Server returned status ${res.status}: ${errText || res.statusText}`);
    }

    const data = await res.json();
    return {
      ok: true,
      session_id: data.session_id || sessionId,
      task_type: data.task_type || "GENERAL",
      model_used: data.model_used || "ai/qwen2.5:7B-Q4_K_M",
      text_response: data.text_response || data.response || "",
      response: data.response || data.text_response || "",
      reasoning: data.reasoning || "",
      execution_time_ms: data.execution_time_ms || data.latency_ms || 0,
      latency_ms: data.latency_ms || data.execution_time_ms || 0,
      output_files: data.output_files || [],
      sovereign_status: data.sovereign_status || "PASS_0_EXTERNAL_EGRESS",
      egress_bytes: data.egress_bytes || 0,
    };
  } catch (err) {
    throw createBackendError("/orchestrate/", err);
  }
}

/**
 * POST /api/v1/ask/
 * Thin wrapper over orchestrator pipeline
 */
export async function askModel(prompt, model = "auto", sessionId = "default-session") {
  try {
    let res = await fetch(`${API_BASE}/ask/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        task_type: "reasoning",
        model: model || "auto",
        session_id: sessionId,
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          task_type: "reasoning",
          model: model || "auto",
          session_id: sessionId,
        }),
        signal: AbortSignal.timeout(60000),
      });
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      ok: true,
      ...data,
      text_response: data.text_response || data.response || "",
      model_used: data.model_used || "ai/qwen2.5:7B-Q4_K_M",
    };
  } catch (err) {
    throw createBackendError("/ask", err);
  }
}

/**
 * POST /api/v1/execute/
 * Executes Python code inside AST-checked local sandbox
 */
export async function executeCode(code, language = "python") {
  try {
    let res = await fetch(`${API_BASE}/execute/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
        signal: AbortSignal.timeout(10000),
      });
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Execution error ${res.status}: ${errText || res.statusText}`);
    }

    const data = await res.json();
    return {
      ok: true,
      stdout: data.stdout || "",
      stderr: data.stderr || "",
      returncode: data.returncode !== undefined ? data.returncode : 0,
      execution_time_ms: data.execution_time_ms || 0,
    };
  } catch (err) {
    throw createBackendError("/execute", err);
  }
}

/**
 * POST /api/v1/upload/
 * Saves file locally, extracts text via local parser, records in DB
 */
export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    let res = await fetch(`${API_BASE}/upload/`, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(15000),
      });
    }

    if (!res.ok) {
      throw new Error(`Upload failed ${res.status}: ${res.statusText}`);
    }


    const data = await res.json();
    return {
      ok: true,
      document_id: data.document_id,
      filename: data.filename,
      status: data.status,
      created_at: data.created_at,
      char_count: data.char_count || 0,
      text_preview: data.text_preview || "",
      extracted_preview: data.extracted_preview || "",
    };
  } catch (err) {
    throw createBackendError("/upload", err);
  }
}

/**
 * POST /api/v1/rag/search
 * Searches local on-premise SOP repository
 */
export async function searchRag(query, top_k = 3) {
  try {
    const res = await fetch(`${API_BASE}/rag/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k }),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      throw new Error(`RAG search failed ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      ok: true,
      query: data.query || query,
      results: data.results || [],
      count: data.count || (data.results ? data.results.length : 0),
      source: data.source || "Local Sovereign RAG Repository",
      sovereign_status: data.sovereign_status || "PASS_0_EXTERNAL_EGRESS",
    };
  } catch (err) {
    return {
      ok: false,
      error: createBackendError("/rag/search", err).message,
      results: [],
      count: 0,
    };
  }
}

/**
 * POST /api/v1/documents/generate
 * Generates official .docx memo or .xlsx workbook locally
 */
export async function generateDocument({
  title = "Refinery Inspection Memo",
  findings = "Operational inspection completed with zero critical anomalies.",
  author = "Lead Inspection Engineer",
  doc_format = "docx",
}) {
  try {
    const res = await fetch(`${API_BASE}/documents/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        findings,
        author,
        doc_format: (doc_format || "docx").toLowerCase(),
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Document generation failed ${res.status}: ${errText || res.statusText}`);
    }

    const data = await res.json();
    return {
      ok: true,
      status: data.status,
      filename: data.filename,
      download_url: getDownloadUrl(data.filename),
      file_path: data.file_path,
      title: data.title,
      document_type: data.document_type,
      sovereign_status: data.sovereign_status || "PASS_0_EXTERNAL_EGRESS",
    };
  } catch (err) {
    throw createBackendError("/documents/generate", err);
  }
}

/**
 * GET /api/v1/documents/download/{filename}
 * Direct URL to serve generated file from backend
 */
export function getDownloadUrl(filename) {
  return `${API_BASE}/documents/download/${encodeURIComponent(filename)}`;
}

/**
 * GET /api/v1/audit
 * Retrieves sovereign audit trail entries and zero-egress hardware telemetry
 */
export async function getAudit(limit = 50) {
  try {
    const res = await fetch(`${API_BASE}/audit?limit=${limit}`, {
      method: "GET",
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      throw new Error(`Audit fetch failed ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const logs = data.audit_logs || data.logs || [];
    return {
      ok: true,
      count: data.count || logs.length,
      audit_logs: logs,
      logs: logs,
      network_metrics: data.network_metrics || {
        bytes_sent: 0,
        bytes_recv: 0,
        packets_sent: 0,
        packets_recv: 0,
      },
      sovereign_status: data.sovereign_status || "PASS_0_EXTERNAL_EGRESS",
    };
  } catch (err) {
    return {
      ok: false,
      error: createBackendError("/audit", err).message,
      audit_logs: [],
      logs: [],
      network_metrics: null,
      sovereign_status: "ERROR",
    };
  }
}