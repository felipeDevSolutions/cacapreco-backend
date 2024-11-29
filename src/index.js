const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');
const supermercadoRoutes = require('./routes/supermercadoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const admin = require('firebase-admin');



const app = express();
const port = 5000;

// Defina as opções CORS
const corsOptions = {
  origin: 'https://cacapreco-backend.onrender.com',
};

// Aplica o middleware cors com as opções configuradas
app.use(cors(corsOptions)); 
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/supermercados', supermercadoRoutes);
app.use('/produtos', produtoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
