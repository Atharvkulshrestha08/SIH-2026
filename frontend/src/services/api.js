const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

/** Ask the model a question */
export const askModel = (prompt, model = "llama3") =>
  request("/ask/", { method: "POST", body: JSON.stringify({ prompt, model }) });

/** Upload a document file */
export const uploadFile = (file) => {
  const form = new FormData();
  form.append("file", file);
  return request("/upload/", { method: "POST", headers: {}, body: form });
};

/** Execute code in the sandbox */
export const executeCode = (code, language = "python") =>
  request("/execute/", { method: "POST", body: JSON.stringify({ code, language }) });

/** Get service status */
export const getStatus = () => request("/status/");
