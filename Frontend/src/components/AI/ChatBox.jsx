import { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('Java'); // default language
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple keyword-based check to detect code-related questions
  const isCodeQuestion = (text) => {
    const codeKeywords = [
      'code', 'program', 'implement', 'function', 'algorithm', 'java', 'python',
      'javascript', 'c++', 'solution', 'debug', 'compile', 'script', 'syntax'
    ];
    return codeKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse('');

    let formattedMessage;

    if (isCodeQuestion(message)) {
      // Use formatted prompt for coding questions
      formattedMessage = `Please respond in the following format:

Answer: <short explanation>

Code:
<${language} code>

Question: ${message}`;
    } else {
      // Send message as-is for personal/general questions
      formattedMessage = message;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        message: formattedMessage,
      });
      setResponse(res.data.content);
    } catch (err) {
      console.error("Error sending message:", err);
      setResponse(
        err.response?.status === 429
          ? "You've exceeded your quota. Please check your billing."
          : "Oops! Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto border rounded-2xl my-5 p-8 py-5'>
      <h2 className='font-bold mb-4 text-lg'>Chat with Gemini AI</h2>

      <div className="mb-4 bg-transparent">
        <label htmlFor="language" className="block mb-1 font-semibold">Select language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-2 text-red-600 bg-transparent"
        >
          <option className='bg-transparent'>Java</option>
          <option className='bg-transparent'>Python</option>
          <option className='bg-transparent'>JavaScript</option>
          <option className='bg-transparent'>C++</option>
          <option className='bg-transparent'>Go</option>
          <option className='bg-transparent'>Rust</option>
          <option className='bg-transparent'>Ruby</option>
          <option className='bg-transparent'>TypeScript</option>
          <option className='bg-transparent'>PHP</option>
        </select>
      </div>

      <div className="flex gap-2">
        <textarea
          rows={3}
          className="w-full p-2 border rounded bg-transparent"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className='bg-red-600 px-4 rounded'
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {response && (
        <div className="mt-4 p-4 bg-transparent rounded">
          <strong>Gemini AI:</strong>
          <pre className="mt-2 whitespace-pre-wrap break-words max-w-full box-border">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
