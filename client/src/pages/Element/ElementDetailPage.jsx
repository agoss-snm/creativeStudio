import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Element/Element.css";
import { Link } from "react-router-dom";

const ElementDetailPage = () => {
    const { id } = useParams();
    console.log(id);
    const [element, setElement] = useState(null);
    const [renderedCode, setRenderedCode] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:5005/api/elements/${id}`)
            .then((response) => {
                setElement(response.data);
                setRenderedCode(response.data.code);
                console.log(`response.data = ${response.data._id}`);

                axios
                    .get(`http://localhost:5005/api/users/${response.data.user}`)
                    .then((userResponse) => {
                        setUserName(userResponse.data.name);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }, [id]);

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
                    />{" "}

                </div>
                <div className="padd2">
                    <p>Usuario: {userName}</p>
                </div>
            </div>
            <div className="linksDetail">
                <button className="buttonDetail">
                    <Link to={"/elements"}>Back</Link>
                </button>
                <button className="buttonDetail">Save</button>
                <button className="buttonDetail">Delete</button>
                <button className="buttonDetail">Edit</button>
            </div>
        </div>
    );
};

export default ElementDetailPage;
