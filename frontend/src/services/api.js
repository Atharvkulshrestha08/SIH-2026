const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? { ...options.headers }
    : { "Content-Type": "application/json", ...options.headers };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = res.statusText;
    try {
      const errJson = await res.json();
      errorMsg = errJson.detail || JSON.stringify(errJson);
    } catch {
      const errText = await res.text();
      if (errText) errorMsg = errText;
    }
    throw new Error(errorMsg);
  }
  return res.json();
}

/** Ask the model or multi-agent orchestrator a question */
export const askModel = (prompt, model = "auto") =>
  request("/ask", { method: "POST", body: JSON.stringify({ prompt, model }) });

/** Execute Python code inside the AST-guarded sandbox */
export const executeCode = (code, language = "python") =>
  request("/execute", { method: "POST", body: JSON.stringify({ code, language }) });

/** Upload and extract text from an inspection PDF, DOCX, or TXT */
export const uploadFile = (file) => {
  const form = new FormData();
  form.append("file", file);
  return request("/upload", { method: "POST", body: form });
};

/** Generate a signed Word (.docx) approval memo or Excel (.xlsx) workbook */
export const generateDocument = (title, findings, author = "Lead Inspector", doc_format = "docx") =>
  request("/generate", {
    method: "POST",
    body: JSON.stringify({ title, findings, author, doc_format }),
  });

/** Query sovereign SOP RAG knowledge base */
export const searchRag = (query) =>
  request(`/rag?query=${encodeURIComponent(query)}`);

/** Get service status and zero-egress attestation */
export const getStatus = () => request("/status");

/** Get audit trail */
export const getAudit = () => request("/audit");
