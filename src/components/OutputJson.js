import React, { useState, useRef, useEffect } from "react";

export default function OutputJson({ jsonData, error }) {
    const [jsonContent, setJsonContent] = useState(jsonData);
    const [lineNumbers, setLineNumbers] = useState([]);
    const textareaRef = useRef(null);

    
    const formatJsonForDisplay = (json) => {
        try {
            return JSON.stringify(JSON.parse(json), null, 2); 
        } catch (e) {
            return 'Invalid JSON';  
        }
    };

    // Function to calculate line numbers based on the content of the textarea
    const calculateLineNumbers = (jsonContent) => {
        const lines = jsonContent.split("\n");
        return lines.map((_, index) => index + 1); 
    };

   
    useEffect(() => {
        const formattedJson = formatJsonForDisplay(jsonData); 
        setJsonContent(formattedJson); 
        setLineNumbers(calculateLineNumbers(formattedJson)); 
    }, [jsonData]); 

   
    const adjustTextAreaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";  
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
        }
    };

    // Adjust the height of the textarea when content changes
    useEffect(() => {
        adjustTextAreaHeight(); 
    }, [jsonContent]); // Run when jsonContent changes

    return (
        <div style={{ display: "flex", width: "100%", position: "relative" }}>
            {error ? (
                <div style={{ color: "red" }}>
                    <textarea
                        value={error}
                        readOnly
                        style={{
                            fontFamily: "monospace",
                            backgroundColor: "#f4f4f4",
                            color: "red",
                            border: "1px solid #ddd",
                            width: "100%",
                            height: "100%",
                            padding: "10px",
                            whiteSpace: "pre",
                            overflowY: "auto", 
                            resize: "none",
                        }}
                    />
                </div>
            ) : (
                <div style={{ display: "flex", position: "relative", width: "100%" }}>
                    
                    <div
                        style={{
                            fontFamily: "monospace",
                            fontSize: "14px",
                            color: "#666",
                            lineHeight: "1.5",
                            textAlign: "right",
                            whiteSpace: "pre-wrap",
                            paddingTop: "10px",
                            zIndex: 1,
                            position: "relative",
                            width: "35px", 
                            height: "auto",
                            overflowY: "auto", 
                            overflowX: "hidden",
                            border: "1px solid black",
                            borderRight:"0px",
                            paddingRight:"5px",
                            background: "#f4f4f4"
                        }}
                    >
                       
                        {lineNumbers.map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>

                    
                    <textarea
                        ref={textareaRef}
                        value={jsonContent} 
                        readOnly
                        style={{
                            fontFamily: "monospace",
                            backgroundColor: "#f4f4f4",
                            padding: "10px",
                             
                            border: "1px solid #ddd",
                            textAlign: "left",
                            width: "100%",
                            minHeight: "859px",
                            border: "1px solid black",
                            borderLeft:'0px',
                            height: "auto", 
                            overflowX: "auto", 
                            overflowY: "hidden", 
                            wordWrap: "normal", 
                            resize: "none", 
                            whiteSpace: "pre", 
                        }}
                         onInput={adjustTextAreaHeight} 
                    />
                </div>
            )}
        </div>
    );
}
