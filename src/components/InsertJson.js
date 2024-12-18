import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';

export default function InsertJson({ setJsonData }) {
    const [json, setjson] = useState("");
    function changejson (e){
    setjson(e.target.value)
   setJsonData(e.target.value)
    }
  return (
    <div>
       <Editor value={json} placeholder='Enter Json Here' onChange={changejson}  style={{
           
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


        
    </div>
  )
}
