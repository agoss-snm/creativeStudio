import { useState, useEffect } from "react";
import axios from "axios";
import './ElementsPage.css'
import ElementCard from "../../components/ElementCard/ElementCard";

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
    <div className='containerForm'>
    <div className="container">
      <h1 className='title'>AI-powered strategy creation</h1>
      {elements.map((element) => (
        <ElementCard key={element._id} {...element}/>
))}
        </div>
        </div>
      );
}

      export default ElementsPage;
