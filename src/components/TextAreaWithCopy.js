import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TextareaWithCopy = ({ initialText = '' }) => {
  const [text, setText] = useState(initialText);

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Texto copiado para a área de transferência!');
      })
      .catch((err) => {
        console.error('Falha ao copiar o texto: ', err);
      });
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
        placeholder="Digite seu texto aqui..."
      />
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <ContentCopyIcon />
      </button>
    </div>
  );
};

export default TextareaWithCopy;
