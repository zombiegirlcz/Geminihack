const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;
const sessionsDir = path.join(__dirname, 'sessions');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

// Ensure sessions directory exists
fs.ensureDirSync(sessionsDir);

// --- SESSION MANAGEMENT ---

// List all sessions
app.get('/api/sessions', async (req, res) => {
    try {
        const files = await fs.readdir(sessionsDir);
        const sessions = await Promise.all(files.filter(f => f.endsWith('.json')).map(async f => {
            const content = await fs.readJson(path.join(sessionsDir, f));
            return { id: f.replace('.json', ''), title: content.title || f };
        }));
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Load specific session
app.get('/api/sessions/:id', async (req, res) => {
    try {
        const content = await fs.readJson(path.join(sessionsDir, `${req.params.id}.json`));
        res.json(content);
    } catch (error) {
        res.status(404).json({ error: "Session not found" });
    }
});

// Save/Update session
app.post('/api/sessions/save', async (req, res) => {
    const { id, messages, title } = req.body;
    try {
        await fs.writeJson(path.join(sessionsDir, `${id}.json`), { title, messages });
        res.json({ status: "saved" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- OPERATOR CAPABILITIES ---

app.post('/api/operator/execute', (req, res) => {
    const { command } = req.body;
    exec(command, (error, stdout, stderr) => {
        res.json({ output: stdout || stderr, error: error ? error.message : null });
    });
});

app.post('/api/operator/write', async (req, res) => {
    const { filePath, content, isDir } = req.body;
    try {
        const fullPath = path.resolve(process.env.HOME, filePath);
        if (isDir) await fs.ensureDir(fullPath);
        else await fs.outputFile(fullPath, content);
        res.json({ status: "success" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- AI ENGINE ---

app.post('/api/chat', async (req, res) => {
    try {
        const { message, apiKey, model, history } = req.body;
        if (!apiKey) return res.status(400).json({ error: "Missing API Key" });

        const genAI = new GoogleGenerativeAI(apiKey);
        const aiModel = genAI.getGenerativeModel({ 
            model: model || "gemini-1.5-flash",
            systemInstruction: "Jsi RENEGADE KERNEL. Autonomní rozhraní Operátora v Termuxu. Pomáhej stroze a technicky."
        });

        // Přidání historie do chatu pro kontinuitu
        const chat = aiModel.startChat({ history: history || [] });
        const result = await chat.sendMessage(message);
        const response = await result.response;
        
        res.json({ reply: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`\x1b[36m[RENEGADE_KERNEL] Operator Uplink active on port ${port}\x1b[0m`);
});
