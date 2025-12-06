const sql = require("mssql");

const config = {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.SERVER_DB,
    database: process.env.NAME_DB,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getConnection() {
    try{
        const pool = await sql.connect(config);

        return pool;
    } catch (error) {
        console.error('erro na conexão SQL Server:', error);
    }
    
}

(async () => {
    const pool = await getConnection();

    if (pool) {
       console.log("conexão com o DB estabelecida com sucesso!"); 
    }
    

    
    

})();

module.exports = {sql, getConnection};
