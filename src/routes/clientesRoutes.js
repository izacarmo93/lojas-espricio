const express = require("express");
const router = express.Router();
const {clienteController} = require("../controllers/clienteControllers");

router.get("/clientes", clienteController.listarClientes);
router.post("/clientes", clienteController.inserirCliente);


module.exports = {clienteRoutes: router}