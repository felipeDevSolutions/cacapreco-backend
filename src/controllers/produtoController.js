const admin = require('firebase-admin'); // Importe somente o admin
const { db } = require('../firebaseConfig');
const Produto = require('../models/produto');

const getProdutos = async (req, res) => {
  try {
    const snapshot = await db.collection('produtos').get(); // Admin SDK
    const produtos = snapshot.docs.map(doc => {
      const data = doc.data();
      return new Produto(doc.id, data.nome, data.preco, data.categoria, data.supermercado, data.imagem, data.descricao);
    });
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos: ' + error.message });
  }
};

const getProdutoById = async (req, res) => {
    const productId = req.params.id;
    try {
        const docSnap = await db.collection('produtos').doc(productId).get(); // Admin SDK
        if (docSnap.exists) {
            const data = docSnap.data();
            res.json(new Produto(docSnap.id, data.nome, data.preco, data.categoria, data.supermercado, data.imagem, data.descricao));
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Error getting document:', error);
        res.status(500).json({ error: 'Erro ao buscar produto: ' + error.message });
    }
};


const getCategorias = async (req, res) => {
  try {
    const categorias = new Set();
    const querySnapshot = await getDocs(collection(db, "produtos"));
    querySnapshot.forEach((doc) => {
      const categoria = doc.data().categoria;
      if (categoria) {
        categorias.add(categoria);
      }
    });
    res.json(Array.from(categorias));
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

module.exports = { getProdutos, getProdutoById, getCategorias };