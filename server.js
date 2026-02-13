const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const pty = require('node-pty');
const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');
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
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color', cols: 80, rows: 24,
        cwd: process.env.HOME, env: process.env
    });
    ptyProcess.onData((data) => socket.emit('terminal-output', data));
    socket.on('terminal-input', (data) => ptyProcess.write(data));
    socket.on('terminal-resize', (size) => ptyProcess.resize(size.cols, size.rows));
    socket.on('disconnect', () => ptyProcess.kill());
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

// --- MODELS LIST ---
app.post('/api/models', async (req, res) => {
    try {
        const { apiKey } = req.body;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            const filtered = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'))
                .map(m => ({ id: m.name.replace('models/', ''), name: m.displayName }));
            res.json({ models: filtered });
        } else { res.status(401).json({ error: "Invalid API Key" }); }
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- AI CHAT WITH TOOLS ---
app.post('/api/chat', async (req, res) => {
    try {
        const { message, apiKey, model, history } = req.body;
        if (!apiKey) return res.status(400).json({ error: "Missing API Key" });

        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Define the tool
        const tools = [{
            functionDeclarations: [{
                name: "execute_bash",
                description: "Spustí bash příkaz v Termuxu a vrátí výstup.",
                parameters: {
                    type: "object",
                    properties: { command: { type: "string", description: "Příkaz k provedení (např. 'ls -la')" } },
                    required: ["command"]
                }
            }]
        }];

        const aiModel = genAI.getGenerativeModel({ 
            model: model || "gemini-1.5-flash",
            tools: tools,
            systemInstruction: "Jsi RENEGADE KERNEL. Autonomní rozhraní Operátora. Máš přístup k systému přes funkci execute_bash. Pokud uživatel chce vidět soubory, smazat něco nebo vytvořit, použij tento nástroj. Odpovídej technicky."
        });

        const chat = aiModel.startChat({ history: history || [] });
        let result = await chat.sendMessage(message);
        let response = await result.response;
        
        // Handle Function Calls
        const calls = response.functionCalls();
        if (calls && calls.length > 0) {
            const call = calls[0];
            if (call.name === "execute_bash") {
                const cmd = call.args.command;
                console.log(`[OPERATOR] Executing: ${cmd}`);
                
                const output = await new Promise((resolve) => {
                    exec(cmd, { cwd: process.env.HOME }, (error, stdout, stderr) => {
                        resolve(stdout || stderr || (error ? error.message : "Příkaz proběhl bez výstupu."));
                    });
                });

                // Send the output back to the model
                result = await chat.sendMessage([{ functionResponse: { name: "execute_bash", response: { content: output } } }]);
                response = await result.response;
            }
        }

        res.json({ reply: response.text() });
    } catch (error) { 
        console.error(`[CHAT_ERROR] ${error.message}`);
        res.status(500).json({ error: error.message }); 
    }
});

server.listen(port, '0.0.0.0', () => {
    console.log(`\x1b[36m[RENEGADE_KERNEL] Operator Dashboard active on port 3000\x1b[0m`);
});
