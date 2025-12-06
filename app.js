const express = require("express");
const app = express();
require('dotenv').config();

const {produtoRoutes} = require("./src/routes/produtoRoutes");
const {clienteRoutes} = require("./src/routes/clientesRoutes");

const PORT = process.env.PORT;


app.use(express.json());

app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});