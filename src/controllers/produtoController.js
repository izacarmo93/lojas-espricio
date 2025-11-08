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
            const { idProduto } = req.query;

            if (idProduto) {
                if (idProduto.length !=36) {
                    return res.status(400).json({erro: "id do produto inválido! "});
                }

                const produto = await produtoModel.buscarUm(idProduto);

                return res.status(200).json(produto);
            }

            const Produtos = await produtoModel.buscarTodos();

            res.status(200).json(Produtos);

        } catch (error) {
            console.error('erro ao listar produtos:', error);
            res.status(500).json({ error: 'erro ao buscar produto' });

        }
    },

    /** Contorlador que cria um novo produto no banco de dados.
     * 
     * @async
     * @function CriarProduto
     * @param {object} req - Objeto da requisição (recebidodo cliente HTTP)
     * @param {object} res - objeto da resposta (enviado ao cliente HTTP)
     * @returns {promise<void>} Retorna uma mensagem de sucesso ou erroem formato JSON
     * @throws {400} Se algum campo obrigatório não for prenchido corretamente.
     * @throws {500} Se ocorrer qualquer erro interno no servidor.
     * 
     * @example
     * POST/ produtos
     * BODY:
     * { 
     * "nomeProduto": "camiseta",
     * "precoProduto": 49.90
     * }
     */
    CriarProduto: async (req, res) => {
        try {

            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || nomeProduto.trim() == "" || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: "Campos obrigatórios não prenchidos " });
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ message: "Produto cadastrado com sucesso!" });



        } catch (error) {
            console.error('Erro ao cadastrar produto', error);
            res.status(500).json({ erro: 'ERRO AO CADASTRAR PRODUTOS ' });

        }
    },






}

module.exports = { produtoController };