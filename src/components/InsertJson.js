import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css'; // for default styling
import 'codemirror/mode/javascript/javascript'; // or any mode you need

export default function InsertJson({ setJsonData,setError }) {
    const [json, setjson] = useState("");
    function changejson (e){
    setjson(e.target.value)
   setJsonData(e.target.value)
   const newJson = e.target.value;
    setjson(newJson);
   try {
    const ans = newJson.replace(/&nbsp;/g, ' ');
    const cleanedJson = ans.replace(/<[^>]*>/g, '').trim();
    const parsedJson = JSON.parse(cleanedJson);
    const formattedJson = JSON.stringify(parsedJson, null, 2);

    setJsonData(formattedJson);
    setError(null); 
  } catch (error) {
    console.log('Invalid JSON:', error);
    setError("Invalid JSON format!");
  }
    }
  return (
    
       <Editor value={json} placeholder='Enter Json Here' onChange={changejson} toll style={{
           
            backgroundColor: '#f4f4f4',
            padding: '1px',
            border: '1px solid #ddd',
           
            minHeight: '800px',
            textAlign: 'left' ,
            width: '100%', 
            height: '800px',
            overflowX: 'auto',
            wordWrap: 'normal' 
          }} /> 


        
    
  )
}
