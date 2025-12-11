const { pool } = require("mssql");
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
    },

    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            SELECT * FROM clientes 
            WHERE idCliente = @idcliente
            `;

            const result = await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar cliente:", error);
            throw error; // Reverberar o erro para a função que o chama.

        }
    },

    buscarEmailOrCPF: async (cpfCliente, emailCliente) => {
        try{
            const pool = await getConnection();
            
            let querySQL = "SELECT * FROM clientes WHERE cpfCliente = @cpfCliente OR emailCliente = @emailCliente";

            const result = await pool
                .request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao buscar cliente", error);
        }

        },
        
    

    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {

        try {

            const pool = await getConnection();

            const querySQL = `
            INSERT INTO clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente ) 
            VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)
            `
            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .input("senhaCliente", sql.VarChar(255), senhaCliente)
                .query(querySQL); 

        } catch (error) {
            console.error("Erro ao inserir cliente:", error);
            throw error

        }

    },

 verificarCpf: async (cpfCliente) => {

        try {

            const pool = await getConnection();

            const querySQL = `
           SELECT * FROM CLIENTES
           WHERE cpfCliente = @cpfCliente
            `
          const result =  await pool.request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);
            
            return result.recordset[0];

        } catch (error) {
            console.error("Erro ao buscar cpf:", error);
            throw error

        }

    }
}


module.exports = { clienteModel };