import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Dynamic Handles Logic
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    setVariables(matches);
  }, [currText]);

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      // Distribute handles vertically
      style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` }
    }))
  ];

  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label className="node-label">Text</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
          style={{
            minHeight: '20px',
            overflow: 'hidden'
          }}
        />
      </div>
    </BaseNode>
  );
}
