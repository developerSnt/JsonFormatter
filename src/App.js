import React from 'react';

import './App.css';
import InsertJson from './components/InsertJson';
import Button from './components/Button';
import OutputJson from './components/OutputJson';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditorProvider } from 'react-simple-wysiwyg';

function App() {
  const [jsonData, setJsonData] = React.useState("");
  const [error, setError] = React.useState(null);
 
 
  return (
    <div className="App"  >
    
      <div className="container-fluid" >
        <br></br>
        <div className="row">
        
          <div className="col-12 col-md-5">
            <InsertJson setJsonData={setJsonData} setError={setError}/>
          </div>

         
          <div className="col-12 col-md-2">
            <Button setJsonData={setJsonData} jsonData={jsonData} setError={setError} />
          </div>

         
          <div className="col-12 col-md-5" >
            <EditorProvider>
            <OutputJson  jsonData={jsonData}  error={error}/>

            </EditorProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
