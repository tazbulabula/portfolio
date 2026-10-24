module.exports = async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Método não permitido.' });
    }

    const { name, email, message, website } = req.body || {};

    if (website) {
        return res.status(200).json({ ok: true });
    }

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (
        !cleanName || cleanName.length > 120 ||
        !cleanEmail || cleanEmail.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
        !cleanMessage || cleanMessage.length > 5000
    ) {
        return res.status(400).json({ error: 'Verifique os campos do formulário.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO;
    const sender = process.env.CONTACT_FROM;

    if (!apiKey || !recipient || !sender) {
        return res.status(503).json({ error: 'O serviço de email ainda não está configurado.' });
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: sender,
                to: [recipient],
                reply_to: cleanEmail,
                subject: `Contato do portfólio: ${cleanName.replace(/[\r\n]/g, ' ')}`,
                text: `Nome: ${cleanName}\nEmail: ${cleanEmail}\n\nMensagem:\n${cleanMessage}`
            })
        });

        if (!response.ok) {
            console.error('Falha no envio pelo Resend:', response.status);
            return res.status(502).json({ error: 'Não foi possível enviar sua mensagem.' });
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Erro ao conectar ao Resend:', error.message);
        return res.status(502).json({ error: 'Não foi possível enviar sua mensagem.' });
    }
};
