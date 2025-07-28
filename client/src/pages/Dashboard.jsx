// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import generatorService from '../services/generatorService';
import sessionService from '../services/sessionService ';
import ChatPanel from '../components/ChatPanel';
import PreviewPanel from '../components/PreviewPanel';
import CodePanel from '../components/CodePanel';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await sessionService.getSessions();
        setSessions(response.data);
      } catch (err) {
        console.error("Could not fetch sessions", err);
      }
    };
    fetchSessions();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    setError('');
    setGeneratedCode(null);
    try {
      const response = await generatorService.generate(prompt);
      setGeneratedCode(response.data);
    } catch (err) {
      setError('Failed to generate component.');
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  const handleSave = async () => {
    if (!generatedCode) {
      alert("Nothing to save!");
      return;
    }
    const sessionName = window.prompt("Enter a name for your session:", "My New Component");
    if (sessionName) {
      const sessionData = {
        name: sessionName,
        lastPrompt: prompt,
        generatedJsx: generatedCode.jsx,
        generatedCss: generatedCode.css,
      };
      try {
        const response = await sessionService.saveSession(sessionData);
        setSessions([response.data, ...sessions]);
        alert("Session saved!");
      } catch (err) {
        alert("Failed to save session.");
      }
    }
  };

  const handleLoad = (session) => {
    setPrompt(session.lastPrompt);
    setGeneratedCode({
      jsx: session.generatedJsx,
      css: session.generatedCss,
    });
  };

  // ## START: RESTORED IFRAME LOGIC ##
  const iframeContent = generatedCode ? `
    <html>
      <head>
        <style>${generatedCode.css}</style>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
        <script type="text/babel">
          ${generatedCode.jsx}
          ReactDOM.createRoot(document.getElementById('root')).render(<GeneratedComponent />);
        <\/script>
      </body>
    </html>` : null;
  // ## END: RESTORED IFRAME LOGIC ##

  return (
    <div className="dashboard">
      <div className="panel chat-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Generator Controls</h3>
          <button onClick={handleLogout} style={{ width: 'auto', padding: '8px 16px' }}>
            Logout
          </button>
        </div>
        <ChatPanel
          prompt={prompt}
          setPrompt={setPrompt}
          handleSubmit={handleGenerate}
          loading={loading}
          error={error}
        />
        <button onClick={handleSave} style={{ marginTop: '1rem' }}>Save Session</button>
        <div style={{ marginTop: '2rem', flexGrow: 1, overflowY: 'auto' }}>
          <h4>Saved Sessions</h4>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {sessions.map(session => (
              <li 
                key={session._id} 
                onClick={() => handleLoad(session)}
                style={{ padding: '0.5rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
              >
                {session.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PreviewPanel iframeContent={iframeContent} loading={loading} />
      <CodePanel generatedCode={generatedCode} />
    </div>
  );
}

export default Dashboard;