"use strict";

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

//Requerimos todos los paquetes que necesitaremos

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

//Usamos express un manejo mas simplificado de nodejs
const app = express();

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
const whiteList = [
	"https://taxpeoples.azureedge.net",
	"https://taxpeoples.z21.web.core.windows.net",
	"http://localhost:4200",
];
app.use(cors({ origin: whiteList }));

// cargar archivos rutas
const home_routes = require("./routes/home");
const auth_routes = require("./routes/auth");
const user_routes = require("./routes/user");
const persona_routes = require("./routes/persona");
const empresa_routes = require("./routes/empresa");
const categoria_routes = require("./routes/categoria");
const ruta_routes = require("./routes/ruta");
const publication_routes = require("./routes/publication");
const like_routes = require("./routes/like");
const coment_routes = require("./routes/coment");
const calificacion_routes = require("./routes/calificacion");
const upload_routes = require("./routes/upload");

// rutas
app.use("/", home_routes);
app.use("/api", home_routes);
app.use("/api", auth_routes);
app.use("/api", user_routes);
app.use("/api", persona_routes);
app.use("/api", empresa_routes);
app.use("/api", categoria_routes);
app.use("/api", ruta_routes);
app.use("/api", publication_routes);
app.use("/api", like_routes);
app.use("/api", coment_routes);
app.use("/api", calificacion_routes);
app.use("/api", upload_routes);

// exportar
module.exports = app;
