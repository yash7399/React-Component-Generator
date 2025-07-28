// server/controllers/generatorController.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const generateComponent = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ msg: 'Prompt is required.' });
    }

    try {
        const API_KEY = process.env.GOOGLE_API_KEY;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            ],
        });
        
        const fullPrompt = `You are an expert React component generator. You will be given a prompt to create a component. The main component function MUST be named "GeneratedComponent". Do not use 'export default'. You must respond with only a valid JSON object in the format {\"jsx\": \"your_jsx_code_string\", \"css\": \"your_css_code_string\"}. Do not include any other text, explanations, or markdown. also do not add inline css alwayd give css file differently Here is the user's prompt: "${prompt}"`;


        const result = await model.generateContent(fullPrompt);
        const responseText = result.response.text();
        
        // ## START: ADDED CLEANING LOGIC ##
        // Find the start and end of the JSON object
        const startIndex = responseText.indexOf('{');
        const endIndex = responseText.lastIndexOf('}');

        if (startIndex === -1 || endIndex === -1) {
          throw new Error("Valid JSON object not found in AI response.");
        }
        
        const cleanedJsonString = responseText.substring(startIndex, endIndex + 1);
        // ## END: ADDED CLEANING LOGIC ##
        
        // Parse the cleaned JSON string
        res.status(200).json(JSON.parse(cleanedJsonString));

    } catch (error) {
        console.error('AI generation error:', error);
        res.status(500).json({ msg: 'Failed to generate component from AI.' });
    }
};
