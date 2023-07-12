import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../Element/Element.css'
import { Link } from "react-router-dom";

const ElementDetailPage = () => {
    const { id } = useParams();
    console.log(id);
    const [element, setElement] = useState(null);
    const [renderedCode, setRenderedCode] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5005/api/elements/${id}`)
            .then((response) => {
                setElement(response.data);
                setRenderedCode(response.data.code); // Guardar el código renderizado en el estado
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
        <div className='altura'>
            <div className='container'>
                <div className='middle'>
                    <h2 className="subtitle">{element.title}</h2>
                </div>
                <div className='padd2'>
                    <p>{element.code}</p> {/* Campo para mostrar el código */}
                </div>
                <div className='padd2'>
                    <div className="rendered-code" dangerouslySetInnerHTML={createMarkup()} /> {/* Campo para mostrar el código renderizado */}
                </div>
            </div>
            <div>
                <button><Link to={'/elements'}>Back</Link></button>
            </div>
        </div>
    );
};

export default ElementDetailPage;
