const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const Element = require('../models/Element.model');
const Response = require("../models/Response.model");
const User = require("../models/User.model");


const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.use(bodyParser.json());
router.use(cors());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Ruta para crear un nuevo elemento


router.post("/elements", (req, res, next) => {
  const { title, code, userId } = req.body;
  console.log(userId)

  Element.create({ title: title, code: code, user: userId })

    .then((element) => {
      User.findByIdAndUpdate(
        userId,
        { $push: { elements: element._id } }
      )
        .then(() => {
          res.json(element);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Error updating user elements" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error creating the element" });
    });
});



// Ruta para obtener todos los elementos
router.get("/elements", (req, res, next) => {
  Element.find()
  .populate('user')
    .then((allElements) => res.json(allElements))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error al obtener los elementos" });
    });
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
    const responseText = completion.data.choices[0].text;


    res.json({ response: responseText });
  } else {
    res.json({ response: "No se encontró ninguna respuesta" });
  }
});

router.get("/elements/:id", (req, res, next) => {
  const elementId = req.params.id;

  Element.findById(elementId)
    .populate("user", 'name') 
    .then((element) => {
      if (!element) {
        return res.status(404).json({ error: "Element not found" });
      }

      res.json(element);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving the element" });
    });
});



module.exports = router;

