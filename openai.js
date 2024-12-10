const OpenAI = require('openai');
const { HttpsProxyAgent } = require('https-proxy-agent');

const getAgent = () => {
    const proxyHost = '88.119.175.107';
    const proxyPort = 8888; // Replace with your proxy's port
    const proxyUser = process.env.PROXY_USER; // Optional
    const proxyPass = process.env.PROXY_PASS; // Optional

    // Create a proxy agent
    const proxyUrl = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;
    const httpAgent = new HttpsProxyAgent(proxyUrl)
    return httpAgent
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    httpAgent: getAgent()
});

async function main() {
    const stream = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say this is a test' }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
}

main();