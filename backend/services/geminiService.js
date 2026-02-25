// services/geminiService.js
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Extract products from a bill image using Gemini API
 * @param {string} filePath - Path to uploaded image
 * @returns {Promise<Array>} - JSON array of extracted products
 */
async function extractProducts(filePath) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY missing in environment variables");
        }

        // Initialize client here
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const imageBuffer = fs.readFileSync(filePath);
        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/jpeg",
            },
        };

        const prompt = `
        Extract product name and FINAL price from this bill image.
        Ignore GST, subtotal, discount lines.
        Only extract actual purchased items.

        Categorize each item into:
        Grocery, Dairy, Snacks, Cleaning, Personal Care, Cloths give one category for one product.

        Return STRICT JSON like this:
        [
          { "product": "Item name", "price": 123, "category": "Category" }
        ]
        `;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json|```/g, "").trim();
        const aiResult = JSON.parse(text);

        fs.unlinkSync(filePath); // Delete file after processing

        return aiResult;

    } catch (error) {
        console.error("Gemini Service Error:", error);
        throw error;
    }
}

module.exports = { extractProducts };