const { sql, getConnection } = require("../config/db");

const clienteModel = {
    /**
     * Busca todos os clientes no banco de dados.
     * 
     * @async
     * @function buscarTodos
     * @returns {promise<Array>} Retorna uma lista com todos os clientes.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Clientes';

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar clientes:", error);
            throw error; // Reverberar o erro para a função que o chama.


        }
    }

}


module.exports = { clienteModel };