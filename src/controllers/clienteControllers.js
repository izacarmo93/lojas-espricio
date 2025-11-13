const { clienteModel } = require("../models/clienteModel")

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
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);
dy
        } catch (error) {
            console.error("erro ao buscar clientes:",error)
            res.status(500).json({ error: 'erro ao buscar clientes ' });
        }
    }

    






}
module.exports = { clienteController }
