const { promises } = require("dns");
const { sql, getConnection } = require("../config/db");
const { query, UniqueIdentifier } = require("mssql");

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
/**
 * Busca apenas um produto no banco de dados.
 * 
 * @async
 * @function buscarUm
 * @param {string} idProduto - Id do produto em UUID no banco de dados.
 * @returns {promise<void>} - Retorna uma lista com um produto caso encontre no banco de dados.
 * @throws Mostra no console e propaga o erro caso a busca falhe.
 */
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

    },
/**
 * Atualiza um produto no banco de dados.
 * 
 * @async
 * @function
 * @param {string} idProduto - Id do produto em UUID no banco de dados.
 * @param {string} nomeProduto - Nome do produto a ser atualizado.
 * @param {number} precoProduto - Preço do produto a ser atualizado.
 * @returns {promise<void>} - Não retorna nada, apenas executa a atualização.
 * @throws Mostra no console e propaga o erro caso a atualização falhe.
 */
    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            UPDATE Produtos
            SET nomeProduto = @nomeProduto, 
            precoProduto = @precoProduto
            WHERE idProduto = @idProduto
            `;

            await pool.request()
            .input('idPoduto', sql.UniqueIdentifier, idProduto)
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto', sql.Decimal(10,2), precoProduto)
            .querySQL(querySQL);

        } catch (error) {
             console.error("Erro ao autualizar produto:", error);
            throw error;
            
        }
    }

}


module.exports = { produtoModel };