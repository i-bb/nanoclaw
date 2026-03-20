import express from 'express';
import { randomUUID } from 'crypto';
import { storeMessage } from './db.js';
const ECHO_AGENT_API_TOKEN = process.env.ECHO_AGENT_API_TOKEN;
const ECHO_TELEGRAM_TOKEN = process.env.ECHO_TELEGRAM_TOKEN;
const TELEGRAM_GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID;
const PORT = parseInt(process.env.AGENT_API_PORT || '3001', 10);
async function notifyGroup(text) {
    if (!ECHO_TELEGRAM_TOKEN || !TELEGRAM_GROUP_CHAT_ID)
        return;
    try {
        await fetch(`https://api.telegram.org/bot${ECHO_TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_GROUP_CHAT_ID, text }),
        });
    }
    catch (err) {
        console.error('[agent-api] notify error:', err);
    }
}
export function startAgentApiServer() {
    if (!ECHO_AGENT_API_TOKEN) {
        console.warn('[agent-api] ECHO_AGENT_API_TOKEN not set — agent API server not started');
        return;
    }
    const app = express();
    app.use(express.json({ limit: '4mb' }));
    app.post('/agent', (req, res) => {
        const auth = req.headers['authorization'];
        if (!auth || auth !== `Bearer ${ECHO_AGENT_API_TOKEN}`) {
            res.status(401).json({ error: 'unauthorized' });
            return;
        }
        const body = req.body;
        if (!body.task || !body.sessionTag) {
            res.status(400).json({ error: 'task and sessionTag are required' });
            return;
        }
        res.status(200).json({ accepted: true, sessionTag: body.sessionTag });
        const fullMessage = body.payload
            ? `${body.task}\n\n${body.payload}`
            : body.task;
        // Notify group that ARIA handed off a task
        notifyGroup(`[ARIA → ECHO handoff]\nSession: ${body.sessionTag}\nTask: ${body.task}`).catch(console.error);
        // Insert as a synthetic message into NanoClaw's SQLite DB so the polling
        // loop picks it up and routes it through a container as normal.
        // The group chat JID is used so ECHO's response goes back to the group.
        const groupJid = TELEGRAM_GROUP_CHAT_ID ?? 'group';
        try {
            storeMessage({
                id: randomUUID(),
                chat_jid: groupJid,
                sender: `aria-handoff:${body.sessionTag}`,
                sender_name: 'ARIA',
                content: fullMessage,
                timestamp: new Date().toISOString(),
                is_from_me: false,
                is_bot_message: false,
            });
            console.log(`[agent-api] Enqueued handoff task for session ${body.sessionTag}`);
        }
        catch (err) {
            console.error('[agent-api] storeMessage error:', err);
        }
    });
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', agent: 'echo' });
    });
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`[agent-api] ECHO agent API listening on port ${PORT}`);
    });
}
//# sourceMappingURL=agent-api.js.map