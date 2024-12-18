import React from "react";
import { Editor } from "react-simple-wysiwyg";

export default function OutputJson({ jsonData, error }) {

    const formatJsonForDisplay = (json) => {
        try {
          return JSON.stringify(JSON.parse(json), null, 2); 
        } catch (e) {
          return 'Invalid JSON';
        }
      };
  return (
    <div>
      {error ? (
        <div style={{ color: "red" }}>
          <Editor value={error} readOnly /> 
        </div>
      ) : (
        <Editor value={formatJsonForDisplay(jsonData)} readOnly
        style={{
            fontFamily: 'monospace',
            whiteSpace: 'pre', 
            backgroundColor: '#f4f4f4',
            padding: '1px',
            border: '1px solid #ddd',

           
            textAlign: 'left' ,
            width: '100%', 
            height: '835px',
            overflowX: 'auto',
            wordWrap: 'normal' 
          }} /> 
      )}
    </div>
  );
}
