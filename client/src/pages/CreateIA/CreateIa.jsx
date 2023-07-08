import React, { useState } from "react";
import axios from "axios";
import "./CreateIa.css";

const API_URL = "http://localhost:5005/api/chat";

function CreateIa() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [renderedHtml, setRenderedHtml] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(API_URL, { prompt })
      .then((res) => {
        const { response } = res.data;
        setResponse(response);

        // Actualiza el estado renderedHtml con la respuesta HTML generada
        setRenderedHtml(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Hola</h1>
      <div className="">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escribe tu pregunta"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="grid">
          <div>
            <div className="flex">
              <p>Respuesta: {response}</p>
            </div>
          </div>
          <div className="row padd">
            <label htmlFor="result" className="form-label">
              Resultado:
            </label>
            <div
              id="result"
              className="result-container"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateIa;
