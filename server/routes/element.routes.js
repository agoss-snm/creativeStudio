const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const Element = require('../models/Element.model');
const Response = require("../models/Response.model");

const config = new Configuration({
  apiKey: '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'
});

const openai = new OpenAIApi(config);

router.use(bodyParser.json());
router.use(cors());

// Agregar middleware para habilitar CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Ruta para crear un nuevo elemento
router.post("/elements", (req, res, next) => {
  const { title, code } = req.body;

  Element.create({ title, code })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Ruta para obtener todos los elementos
router.get("/elements", (req, res, next) => {
  Element.find()
    .then((allElements) => res.json(allElements))
    .catch((err) => res.json(err));
});

// Ruta para realizar la llamada a la API de ChatGPT
router.post("/chat", async (req, res, next) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 512,
    temperature: 0
  });

  console.log(completion.data.choices);
  console.log(completion.data.choices.length);

  if (completion.data && completion.data.choices && completion.data.choices.length > 0) {
    // Guardar la respuesta en la base de datos
    const response = new Response({
      text: completion.data.choices[0].text,
    });

    response
      .save()
      .then((savedResponse) => {
        // La respuesta se ha guardado correctamente en la base de datos
        console.log("Response saved:", savedResponse);
      })
      .catch((error) => {
        // Ha ocurrido un error al guardar la respuesta
        console.error("Error saving response:", error);
      });

    res.json({ response: completion.data.choices[0].text });
  } else {
    res.json({ response: "No se encontró ninguna respuesta" });
  }
});

module.exports = router;
