const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 3001;

// Conexão com o Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições

// Endpoint para salvar logs no Supabase
app.post('/save-log', async (req, res) => {
  const logData = req.body; // Recebe os dados do log do corpo da requisição
  console.log('Recebido:', logData);

  // Insere os dados no Supabase
  const { data, error } = await supabase
    .from('qr_logs')
    .insert([
      {
        qr_code: logData.data, // O valor do QR code
        timestamp: logData.timestamp, // Timestamp do log
        interest: logData.interest // Interesse selecionado
      }
    ]);

  if (error) {
    console.error('Erro ao salvar no Supabase:', error);
    return res.status(500).send('Erro ao salvar o log.'); // Retorna erro se a inserção falhar
  }

  res.send('Log salvo com sucesso no Supabase.'); // Retorna sucesso
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
