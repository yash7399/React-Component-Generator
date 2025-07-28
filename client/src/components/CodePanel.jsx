// src/components/CodePanel.jsx
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodePanel({ generatedCode }) {
  const [jsxCopyText, setJsxCopyText] = useState('Copy');
  const [cssCopyText, setCssCopyText] = useState('Copy');

  const syntaxHighlighterStyle = {
    borderRadius: '6px',
    flexGrow: 1,
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  };

  const handleCopy = (code, type) => {
    if (!code) return; // Don't copy if there's no code
    navigator.clipboard.writeText(code);
    
    if (type === 'jsx') {
      setJsxCopyText('Copied!');
      setTimeout(() => setJsxCopyText('Copy'), 2000);
    } else {
      setCssCopyText('Copied!');
      setTimeout(() => setCssCopyText('Copy'), 2000);
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  };

  const copyButtonStyle = {
    width: 'auto',
    padding: '4px 8px',
    fontSize: '12px',
    backgroundColor: 'var(--background)'
  };

  return (
    <div className="panel code-panel" maxWidth="40%">
      <div style={{ display: 'flex', gap: '1rem', height: '100%', width: '100%' }}>
        {/* JSX Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '0' }}>
          <div style={headerStyle}>
            <h5>JSX</h5>
            <button onClick={() => handleCopy(generatedCode?.jsx, 'jsx')} style={copyButtonStyle}>
              {jsxCopyText}
            </button>
          </div>
          <SyntaxHighlighter language="jsx" style={atomOneDark} customStyle={syntaxHighlighterStyle}>
            {generatedCode?.jsx || '// JSX code will appear here'}
          </SyntaxHighlighter>
        </div>
        {/* CSS Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '0' }}>
          <div style={headerStyle}>
            <h5>CSS</h5>
            <button onClick={() => handleCopy(generatedCode?.css, 'css')} style={copyButtonStyle}>
              {cssCopyText}
            </button>
          </div>
          <SyntaxHighlighter language="css" style={atomOneDark} customStyle={syntaxHighlighterStyle}>
            {generatedCode?.css || '/* CSS code will appear here */'}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default CodePanel;