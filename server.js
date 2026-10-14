const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração da URI e do Banco de Dados
const uri = process.env.MONGODB_URI || "mongodb+srv://ricardodime_db_user:VRm9WGOwTzKb1fiq@cluster0.wxgj33t.mongodb.net/";
const dbName = "tesouro_db";
const collectionName = "preco_clc";

// Configurar o Express para usar EJS (motor de visualização) ou servir HTML estático
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rota principal para buscar os dados e exibi-los
app.get('/', async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Busca todos os documentos da coleção (ou use .find({}).limit(50) se forem muitos)
        const titulos = await collection.find({}).toArray();

        // Renderiza a página enviando os dados
        res.render('index', { titulos });
    } catch (error) {
        console.error("Erro ao conectar ou buscar dados do MongoDB:", error);
        res.status(500).send("Erro interno no servidor ao consultar o banco de dados.");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});