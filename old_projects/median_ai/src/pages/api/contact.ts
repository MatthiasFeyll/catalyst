import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
    recaptchaToken: z.string(),
});

function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const data = schema.parse(req.body);

        // Verify reCAPTCHA token
        const recaptchaResponse = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            `secret=${RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5) {
            return res.status(400).json({
                success: false,
                message: 'reCAPTCHA verification failed'
            });
        }

        console.log(recaptchaResponse.data.score);


        // Prepare Discord message
        const discordPayload = {
            embeds: [{
                title: escapeHtml(data.name),
                color: 0x3498db,
                fields: [
                    { name: 'Email', value: escapeHtml(data.email) },
                    { name: 'Message', value: escapeHtml(data.message) },
                ],
                timestamp: new Date().toISOString()
            }]
        };

        // Send to Discord webhook
        await axios.post(WEBHOOK_URL, discordPayload);

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}