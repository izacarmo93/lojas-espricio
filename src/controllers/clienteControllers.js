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
    },
    inserirCliente: async (req, res) => {
        try {

            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || nomeCliente.trim() == "" || cpfCliente == undefined || isNaN(cpfCliente)) {
                return res.status(400).json({ erro: "Campos obrigatórios não prenchidos " });
            }
            
            const cliente = await clienteModel.verificarCpf(cpfCliente);
            
            if (cliente.length > 0 ) {

            return res.status(409).json({erro:"Cliente com cpf já cadastrado."});

            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });



        } catch (error) {
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).json({ erro: 'ERRO AO CADASTRAR CLIENTES ' });

        }
    }


    






}
module.exports = { clienteController }
