import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005/api/chat";

function CreateIa() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(API_URL, { prompt })  // Corregir la URL de la solicitud
      .then((res) => {
        setResponse(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Hola</h1>
      <div className="containerForm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe tu pregunta"
          />
          <button type="submit">Enviar</button>
        </form>
         <p>Respuesta: {response}</p>
      </div>
    </>
  );
}

export default CreateIa;
