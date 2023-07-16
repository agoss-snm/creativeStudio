import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../Element/Element.css";
import { AuthContext } from "../../context/auth.context";

const ElementDetailPage = () => {
    const { id } = useParams();
    const [element, setElement] = useState(null);
    const [renderedCode, setRenderedCode] = useState(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:5005/api/elements/${id}`)
            .then((response) => {
                setElement(response.data);
                setRenderedCode(response.data.code);
                setIsCurrentUser(response.data.user._id === user._id);
            })
            .catch((error) => console.log(error));
    }, [id, user]);

    const handleDelete = () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
          axios
            .delete(`http://localhost:5005/api/elements/${id}`)
            .then(() => {
              navigate("/elements");
            })
            .catch((error) => console.log(error));
        }
      };

    if (!element) {
        return <div>Cargando...</div>;
    }

    const createMarkup = () => {
        return { __html: renderedCode };
    };

    return (
        <div className="altura">
            <div className="container">
                <div className="middle">
                    <h2 className="subtitle">{element.title}</h2>
                </div>
                <div className="padd2">
                    <p>{element.code}</p>
                </div>
                <div className="padd2">
                    <div
                        className="rendered-code"
                        dangerouslySetInnerHTML={createMarkup()}
                    />
                </div>
                <div className="padd2">
                    <p>Usuario: {element.user.name}</p>
                </div>
            </div>
            <div className="linksDetail">
                <button className="buttonDetail">
                    <Link to={"/elements"}>Back</Link>
                </button>
                {isCurrentUser && (
                    <>
                        <button className="buttonDetail" onClick={handleDelete}>
                            Delete
                        </button>
                        <button className="buttonDetail"><Link to={`/elements/${id}/edit`}>Edit</Link></button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ElementDetailPage;
