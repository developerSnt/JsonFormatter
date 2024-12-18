import React from 'react';

export default function Button({ setJsonData, jsonData, setError }) {
   
   
    const handleFormatJson = () => {
        try {
            const ans = jsonData.replace(/&nbsp;/g, ' ');
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
    <div style={{ backgroundColor: '#E7DDFF',height:'100%' }}>
    <center> <button className='btn btn-outline-secondary' onClick={handleFormatJson}>Format JSON</button></center> 
     
    </div>
  );

};
