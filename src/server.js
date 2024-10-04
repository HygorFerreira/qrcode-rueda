const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()
const app = express()
const port = 3001

// Conexão com o Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(cors())
app.use(express.json())

// Endpoint para salvar logs no Supabase
app.post('/save-log', async (req, res) => {
  const logData = req.body
  console.log('Recebido:', logData)

  const { data, error } = await supabase
    .from('qr_logs')
    .insert([
      {
        qr_code: logData.data,
        timestamp: logData.timestamp,
        interest: logData.interest
      }
    ])

  if (error) {
    console.error('Erro ao salvar no Supabase:', error)
    return res.status(500).send('Erro ao salvar o log.')
  }

  res.send('Log salvo com sucesso no Supabase.')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
