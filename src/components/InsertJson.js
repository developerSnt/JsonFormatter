import React, { useState, useEffect, useRef } from 'react';

function AutoResizeTextArea({ setJsonData, setError }) {

  const [json, setJson] = useState('');
  const [history, setHistory] = useState([json]);  // History array for undo/redo
  const [historyIndex, setHistoryIndex] = useState(0);  // To track the current position in history

  const textareaRef = useRef(null);

 
  function changejson(e) {
    const newJson = e.target.value;
    setJson(newJson);
    setJsonData(newJson);

   
    try {
      const cleanedJson = newJson.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim();
      const parsedJson = JSON.parse(cleanedJson);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setJsonData(formattedJson);
      setError(null);
    } catch (error) {
      console.log('Invalid JSON:', error);
      setError("Invalid JSON format!");
    }

     if (historyIndex === history.length - 1) {
      setHistory([...history, newJson]);
    } else {
      setHistory([...history.slice(0, historyIndex + 1), newJson]);
    }
    setHistoryIndex(historyIndex + 1);
  }

  // Handle undo functionality
  function undo() {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setJson(history[historyIndex - 1]);
    }
  }

  // Handle redo functionality
  function redo() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setJson(history[historyIndex + 1]);
    }
  }

  // Auto resize the textarea based on its content
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Calculate line numbers based on scrollHeight
  const calculateLineNumbers = () => {
    if (textareaRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight, 10);
      const totalHeight = textareaRef.current.scrollHeight;
      const numberOfLines = Math.ceil(totalHeight / lineHeight);
      return numberOfLines;
    }
    return 1;
  };

  useEffect(() => {
    adjustHeight();
  }, [json]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      
     
      <div style={{ position: 'relative', zIndex: 2, marginBottom: '0px',backgroundColor:'white',width:"100%",textAlign:'left',borderRight:'1px solid black',borderLeft:'1px solid black',borderTop:'1px solid black' , padding:'10px' }}>
        <button className='btn btn-outline-danger' onClick={undo} disabled={historyIndex === 0}>Undo</button> &nbsp;
        <button className='btn btn-outline-success' onClick={redo} disabled={historyIndex === history.length - 1}>Redo</button>
      </div>

      
      <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
        
       
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#666',
            marginRight: '10px',
            lineHeight: '1.5',
            textAlign: 'right',
            whiteSpace: 'pre-wrap',
            paddingTop: '10px',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '35px',
            height: 'auto',
            overflowY: 'hidden',
            overflowX: 'hidden',
          }}
        >
          
          {Array.from({ length: calculateLineNumbers() }).map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>

    
        <textarea
          ref={textareaRef}
          value={json}
          onChange={changejson}
           onInput={adjustHeight}
          style={{
            padding: '10px',
            paddingLeft: '40px',  
          
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            resize: 'none',
            minHeight: '800px',
            height: 'auto',
            overflowX: 'hidden',
            overflowY: 'hidden',  
          }}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
}

export default AutoResizeTextArea;
