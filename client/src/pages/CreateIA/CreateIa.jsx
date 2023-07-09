import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CreateIa.css";
import Spinner from "../../components/Spinner/Spinner"; 

const API_URL = "http://localhost:5005/api/chat";

function CreateIa({ isDarkMode }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const iframeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const prefixedPrompt = `Devuélveme en HTML y CSS: ${prompt}`;

    setIsLoading(true); // Inicia la carga

    axios
      .post(API_URL, { prompt: prefixedPrompt })
      .then((res) => {
        const { response } = res.data;
        setResponse(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // Finaliza la carga
      });
  };

  useEffect(() => {
    if (response) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.open();
      iframeDocument.write(response);
      iframeDocument.close();
    }
  }, [response]);

  
  return (
    <div className="containerCreation">
      <div className="center">
        <h1 className="title">&lt;/&gt;Design and Code by AI</h1>
      </div>

      <div className="">
        <div className="containerB">
          <form onSubmit={handleSubmit} id="formAI">
            <div>
              <p>Insert whatever you want the AI ​​to create for you</p>
            </div>
            <div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                id="inputForm"
              />
              <button type="submit" id="buttonSendCreateAI">
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className="grid">
          <div>
            <div className="flex">
              {isLoading ? ( // Muestra el spinner si isLoading es true
                <Spinner />
              ) : (
                <p>{response}</p>
              )}
            </div>
          </div>
          <div className="row padd">
            <label htmlFor="result" className="form-label"></label>
            <div className="result-container">
              <iframe
                ref={iframeRef}
                title="Result"
                sandbox="allow-same-origin allow-scripts"
                className={isDarkMode ? "dark-mode" : ""}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateIa;
