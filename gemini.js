const axios = require("axios");
require('dotenv').config();
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

const main = async () => {
    // Set up the proxy
    const proxyAgent = getAgent();

    // Replace with the actual Gemini API endpoint
    const apiKey = process.env.GEMINI_KEY; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    // Configure the API request
    const data = {
        contents: [{
            "parts": [{ "text": "Explain how AI works" }]
        }]
    };

    try {
        const response = await axios.post(apiUrl, data, {
            httpsAgent: proxyAgent,
        });

        // console.log(response.data);
        console.log(JSON.stringify(response.data.candidates[0]));
    } catch (error) {
        console.error("Error:", error.message);
    }
};

main();