import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ElementsPage() {
  const [elements, setElements] = useState([]);

  const getAllElements = () => {
    axios
      .get(`${API_URL}/api/elements`)
      .then((response) => setElements(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllElements();
  }, []);

  return (
    <div className="containerForm">
      <div className="container">
        <h1 className="title">AI-powered strategy creation</h1>
        {elements.map((element) => (
          <div key={element._id}>
            <Link to={`/elements/${element._id}`}>
              <h3>{element.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementsPage;
