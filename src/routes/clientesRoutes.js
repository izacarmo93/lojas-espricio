const express = require("express");
const router = express.Router();
const {clienteController} = require("../controllers/clienteControllers");
const {authController} = require("../controllers/authController");

router.post("/clientes/login", authController.clienteLogin);

router.get("/clientes", clienteController.listarClientes);

router.post("/clientes", clienteController.inserirCliente);


module.exports = {clienteRoutes: router}