const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_gemini_key');

exports.handleChat = async (req, res, next) => {
  try {
    // Flavor-recommendation / order-status AI assistant using Gemini
    res.status(200).json({ success: true, message: 'Chat response generated' });
  } catch (error) {
    next(error);
  }
};
