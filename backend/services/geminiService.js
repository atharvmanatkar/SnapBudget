// services/geminiService.js
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Extract products from a bill image using Gemini API
 * @param {string} filePath - Path to uploaded image
 * @returns {Promise<Array>} - JSON array of extracted products
 */
async function extractProducts(url) {
   try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY missing in environment variables");
        }

        // 1. Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Note: Ensure your model name is correct (e.g., "gemini-1.5-flash")
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 2. Fetch the image from Cloudinary URL as a Buffer
        const responseData = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBase64 = Buffer.from(responseData.data, 'binary').toString('base64');

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg", // Cloudinary usually provides jpeg/png
            },
        };

        const prompt = `
        Extract product name and FINAL price from this bill image.
        Ignore GST, subtotal, discount lines.
        Only extract actual purchased items.

        Categorize each item into:
        Grocery, Dairy, Snacks, Cleaning, Personal Care, Cloths. Provide one category per product.

        Return STRICT JSON format:
        [
          { "product": "Item name", "price": 123, "category": "Category" }
        ]
        `;

        // 3. Generate Content
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        let text = response.text();
        
        // Clean the JSON response from Gemini
        text = text.replace(/```json|```/g, "").trim();
        const aiResult = JSON.parse(text);

        // Note: fs.unlinkSync(filePath) is removed because the file is hosted on Cloudinary, not your disk.

        return aiResult;

    } catch (error) {
        console.error("Gemini Service Error:", error.message);
        throw error;
    }
}

module.exports = { extractProducts };