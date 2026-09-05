CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    extracted_findings JSONB,
    generated_doc_path TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','done','failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Code execution history
CREATE TABLE IF NOT EXISTS code_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    stdout TEXT,
    stderr TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','success','error')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users (forward-looking, Week 9 auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'engineer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversations (forward-looking, Week 4 orchestration/chat history)
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit logs (forward-looking, Week 9 security requirement)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agent data (forward-looking, Week 4 multi-agent state)
CREATE TABLE IF NOT EXISTS agent_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name TEXT NOT NULL,
    state JSONB,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);