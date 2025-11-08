const { promises } = require("dns");

const clienteController = {
    /**
     * controlador que lista todos os clientes do banco de dados
     * @async
     * @function
     * @param {object} req -  Objeto da requisição (recebido ao cliente HTTP)
     * @param {object} res - Objeto da resposta  (enviado ao cliente HTTP)
     * @returns {promise<void>} Retorna uma resposta JSON com a lista de clientes.
     * @throws mostra no console e retorna erro 409  se ocorrer falha ao buscar clientes.
     */

     listarClientes: async (req, res) => {
        try {
            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente.length !=36) {
                    return res.status(409).json({erro: " cpf já cadastrado! "});
                }

    },
},
}