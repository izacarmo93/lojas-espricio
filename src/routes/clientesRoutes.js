const {clienteController} = require("../controllers/clienteControllers");
const express = require("express");
const router = express.Router();


router.get("/clientes",clienteController.listarClientes);

router.post("/clientes", clienteController.inserirCliente);



module.exports = {clienteRoutes:router}