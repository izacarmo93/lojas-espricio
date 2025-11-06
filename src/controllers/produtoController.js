const { promises } = require("dns");
const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    /**
     * controlador que lista todos os produtos do banco de dados
     * @async
     * @function
     * @param {object} req -  Objeto da requisição (recebido ao cliente HTTP)
     * @param {object} res - Objeto da resposta  (enviado ao cliente HTTP)
     * @returns {promise<void>} Retorna uma resposta JSON com a lista de produtos.
     * @throws mostra no console e retorna erro 500 se ocorrer falha ao buscar produtos.
     */
    listarProdutos: async (req, res) => {
        try {

        const Produtos = await produtoModel.buscarTodos();

        res.status(200).json(Produtos);

    } catch (error) {
        console.error('erro ao listar produtos:', error);
        res.status(500).json({error:'erro ao buscar produto'});

    }
}
}

module.exports = {produtoController};