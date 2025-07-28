function ChatPanel({ prompt, setPrompt, handleSubmit, loading, error }) {
  return (
    <div className="panel chat-panel">
      <h3>Generator Controls</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} // Bug fixed here!
          placeholder="e.g., 'Make a card with an image and a red button that says Click Me'"
          rows="6"
          style={{ width: '100%', resize: 'none', padding: '10px', backgroundColor: 'var(--background-light)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', flexGrow: 1 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
export default ChatPanel;