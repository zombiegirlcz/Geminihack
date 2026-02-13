const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const pty = require('node-pty');
const path = require('path');
const fs = require('fs-extra');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const sessionsDir = path.join(__dirname, 'sessions');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
fs.ensureDirSync(sessionsDir);

// --- LIVE TERMINAL (PTY) ---
io.on('connection', (socket) => {
    console.log('\x1b[35m[TERMINAL] Operator connected via WebSocket\x1b[0m');

    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.onData((data) => {
        socket.emit('terminal-output', data);
    });

    socket.on('terminal-input', (data) => {
        ptyProcess.write(data);
    });

    socket.on('terminal-resize', (size) => {
        ptyProcess.resize(size.cols, size.rows);
    });

    socket.on('disconnect', () => {
        ptyProcess.kill();
    });
});

// --- SESSION MANAGEMENT ---
app.get('/api/sessions', async (req, res) => {
    try {
        const files = await fs.readdir(sessionsDir);
        const sessions = await Promise.all(files.filter(f => f.endsWith('.json')).map(async f => {
            const content = await fs.readJson(path.join(sessionsDir, f));
            return { id: f.replace('.json', ''), title: content.title || f };
        }));
        res.json(sessions);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/sessions/:id', async (req, res) => {
    try {
        const content = await fs.readJson(path.join(sessionsDir, `${req.params.id}.json`));
        res.json(content);
    } catch (error) { res.status(404).json({ error: "Not found" }); }
});

app.post('/api/sessions/save', async (req, res) => {
    const { id, messages, title } = req.body;
    try {
        await fs.writeJson(path.join(sessionsDir, `${id}.json`), { title, messages });
        res.json({ status: "saved" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- AI CHAT ---
app.post('/api/chat', async (req, res) => {
    try {
        const { message, apiKey, model, history } = req.body;
        if (!apiKey) return res.status(400).json({ error: "Missing API Key" });

        const genAI = new GoogleGenerativeAI(apiKey);
        const aiModel = genAI.getGenerativeModel({ 
            model: model || "gemini-1.5-flash",
            systemInstruction: "Jsi RENEGADE KERNEL. Autonomní rozhraní Operátora v Termuxu. Pomáhej stroze a technicky. Máš přístup k živému terminálu."
        });

        const chat = aiModel.startChat({ history: history || [] });
        const result = await chat.sendMessage(message);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

server.listen(port, '0.0.0.0', () => {
    console.log(`\x1b[36m[RENEGADE_KERNEL] Operator Dashboard active on port ${port}\x1b[0m`);
});
