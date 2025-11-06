const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "LojaEspricio",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};
/**
 *Cria e retorna uma conexão com o banco de bados SQL server
 * 
 * @async
 * @function getConnection
 * @returns {Promise<object>} Retorna o objeto de conexão (pool) com o banco de dados.
 * @throws Mostra no controle ser ocorrer erro na conexão.
 */
async function getConnection() {
    try{
        const pool = await sql.connect(config);

        return pool;
    } catch (error) {
        console.error('erro na conexão SQL Server:', error);
    }
    
}

// (async () => {
//     const pool = await getConnection();

//     const result = await pool.request().query("SELECT* FROM Produtos");

//     console.log(result.recordset);
// })()

module.exports = {sql, getConnection};
