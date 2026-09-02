# AeroSovereign — API Reference

Base URL: `http://localhost:8000/api/v1`

---

## POST `/ask/`
Ask the model a question.

**Request body**
```json
{ "prompt": "string", "model": "llama3" }
```
**Response**
```json
{ "response": "string" }
```

---

## POST `/upload/`
Upload a document (multipart/form-data).

**Form field**: `file`

**Response**
```json
{ "file_id": "uuid", "filename": "string", "path": "string" }
```

---

## POST `/execute/`
Run code in the sandboxed executor.

**Request body**
```json
{ "code": "print('hello')", "language": "python" }
```
**Response**
```json
{ "stdout": "hello\n", "stderr": "", "returncode": 0 }
```

---

## GET `/status/`
Service health check.

**Response**
```json
{ "status": "ok", "platform": "Linux", "cpu_percent": 5.2, "memory_percent": 42.1 }
```
