require('dotenv').config();
const odbc = require('odbc');

const connectionString = process.env.CONNECTION_STRING_DEV;

const get = (async (req, res) =>{
    await odbc.connect(connectionString, (error, connection) => {
        connection.query('SELECT * FROM tb_produtos', (error, result) => {
            if(error)
                res.status(500).json(error.message); 
            else
                result.length != 0 ? res.status(200).json(result) : res.status(204).json(result)
            connection.close();
        });
    });
});

const getById = (async (req, res) =>{
    const produtoId = req.params.id;
    await odbc.connect(connectionString, (error, connection) => {
        connection.query(`SELECT * FROM tb_produtos WHERE id=${produtoId}`, (error, result) => {
            if(error)
                res.status(500).json(error.message); 
            else
                result.length != 0 ? res.status(200).json(result) : res.status(204).json(result)
            connection.close();
        });
    });
});

const post = (async (req, res) => {
    const produto = req.body;
    await odbc.connect(connectionString, (error, connection) => {
        connection.query(`INSERT INTO tb_produtos (nome, preco, observacao, imagem) VALUES ('${produto.nome}', ${produto.preco}, '${produto.observacao}', '${produto.imagem}')`, (error, result) => {
            if(error)
                res.status(500).json(error.message); 
            else
                res.status(201).json({result:"ok"});
            connection.close();
        });
    });
});

const remove = (async (req, res) => {
    const produtoId = req.params.id;
    await odbc.connect(connectionString, (error, connection) => {
        connection.query(`DELETE FROM tb_produtos WHERE id = ${produtoId}`, (error, result) => {
            if(error)
                res.status(500).json(error.message); 
            else
                res.status(201).json({result:"ok"});
            connection.close();
        });
    });
})

const put = (async (req, res) => {
    const produto = req.body;
    await odbc.connect(connectionString, (error, connection) => {
        connection.query(`UPDATE tb_produtos SET nome = '${produto.nome}', preco = ${produto.preco}, observacao = '${produto.observacao}', imagem = '${produto.imagem}' WHERE id = ${produto.id}`, (error, result) => {
            if(error)
                res.status(500).json(error.message); 
            else
                res.status(201).json({result:"ok"});
            connection.close();
        });
    });
});

module.exports = {
    get,
    getById,
    post,
    remove,
    put
}