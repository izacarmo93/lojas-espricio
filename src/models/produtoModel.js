const { promises } = require("dns");
const { sql, getConnection } = require("../config/db");
const { query } = require("mssql");

const produtoModel = {
    /**
     * Busca todos os produtos no banco de dados.
     * 
     * @async
     * @function buscarTodos
     * @returns {promise<Array>} Retorna uma lista com todos os produtos.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos';

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            
            console.error("Erro ao buscar produtos:", error);
            throw error; // Reverberar o erro para a função que o chama.


        }
    },

    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection ();
            
            const querySQL = `
            SELECT * FROM produtos 
            WHERE idProduto = @idProduto
            `;

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
             console.error("Erro ao buscar o produto:", error);
            throw error; // Reverberar o erro para a função que o chama.
            
        }
    },

    /**
     * insere um novo produto no banco de dados
     * 
     * @async
     * @function inserirProduto
     * @param {string} nomeProduto - Nome do produto a ser cadastrado 
     * @param {number} precoProduto - Preço do produto
     * @returns {Promise<void>} Não retorna nada, apenas executa a inserção
     * @throws Mostra no controle e propaga o erro caso a inserção falhe.
     */
    inserirProduto: async (nomeProduto, precoProduto) => {

        try {

            const pool = await getConnection();

            const querySQL = `
            INSERT INTO produtos (nomeProduto, precoProduto) 
            VALUES (@nomeProduto, @precoProduto)
            `
            await pool.request()
            .input("nomeProduto", sql.VarChar(100), nomeProduto)
            .input("precoProduto", sql.Decimal(10,2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir produto:", error);
            throw error

        }

    }

}


module.exports = { produtoModel };