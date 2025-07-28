import { use } from 'react';
import Spinner from './Spinner';
import { useEffect } from 'react';

function PreviewPanel({ iframeContent, loading }) {
  useEffect(() => {
    // This effect can be used to handle any side effects related to the iframe content
    if (iframeContent) {
      console.log("Iframe content updated",iframeContent);
    }
  }, [iframeContent]);
  return (
    <div className="panel preview-panel">
      {loading && (
        <div className="loading-overlay">
          <Spinner />
        </div>
      )}
      {iframeContent ? (
        <iframe
          srcDoc={iframeContent}
          title="Component Preview"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Component Preview will appear here</p>
        </div>
      )}
    </div>
  );
}
export default PreviewPanel;
