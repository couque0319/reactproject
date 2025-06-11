import React, { useState } from 'react';
import './AIBar.css';

function AIBar() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost/reactproject/api/ask_ai.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });

      const data = await res.json();
      console.log("Gemini 응답:", data);

      if (data.response) {
        setResponse(data.response);
      } else if (data.error) {
        setResponse('❗ Gemini 오류: ' + data.error);
      } else {
        setResponse('AI 응답 오류');
      }
    } catch (err) {
      setResponse('요청 실패: ' + err.message);
    }

    setLoading(false);
    setInput('');
  };

  return (
    <div className={`ai-container ${response ? 'expanded' : ''}`}>
      <form className="ai-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="AI에게 물어보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? '...' : '▶'}
        </button>
      </form>

      {response && (
        <div className="ai-response">
          <strong>AI 응답:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AIBar;
