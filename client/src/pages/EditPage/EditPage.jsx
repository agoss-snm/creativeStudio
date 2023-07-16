import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPage(){  const { id } = useParams();
const [element, setElement] = useState(null);
const [editedCode, setEditedCode] = useState("");

useEffect(() => {
  axios
    .get(`http://localhost:5005/api/elements/${id}/edit`)
    .then((response) => {
      setElement(response.data);
      setEditedCode(response.data.code);
    })
    .catch((error) => console.log(error));
}, [id]);

const handleUpdate = () => {
  axios
    .put(
      `http://localhost:5005/api/elements/${id}`,
      { code: editedCode }
    )
    .then((response) => {
      console.log(response.data);
      // Manejar la respuesta del servidor después de la actualización
    })
    .catch((error) => console.log(error));
};

if (!element) {
  return <div>Cargando...</div>;
}

return (
  <div className="altura">
    <div className="container">
      <div className="middle">
        <h2 className="subtitle">{element.title}</h2>
      </div>
      <div className="padd2">
        <textarea
          value={editedCode}
          onChange={(e) => setEditedCode(e.target.value)}
          rows={10}
          cols={50}
        />
      </div>
    </div>
    <div className="linksDetail">
      <button className="buttonDetail">
        <Link to={`/elements/${id}`}>Back</Link>
      </button>
      <button className="buttonDetail" onClick={handleUpdate}>
        Save
      </button>
    </div>
  </div>
);
};

export default EditPage;