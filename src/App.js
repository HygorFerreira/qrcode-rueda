import React, { useEffect, useState } from 'react'
import QrScanner from 'react-qr-scanner'

const App = () => {
  const [scannedValue, setScannedValue] = useState('')

  const handleScan = data => {
    if (data) {
      setScannedValue(data)
      sendLogToServer(data)
    }
  }

  const handleError = err => {
    console.error(err)
  }

  const sendLogToServer = scannedValue => {
    // Defina logData com o valor do QR Code lido
    const logData = {
      codeValue: scannedValue, // O valor lido do QR Code
      timestamp: new Date().toISOString(), // Horário da leitura
      userId: 'user123' // Exemplo de ID do usuário, substitua conforme necessário
    }

    // Envie logData para o servidor
    fetch('https://qrcode-rueda.vercel.app/save-log', {
      method: 'POST', // Use POST para enviar dados
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logData) // Converte logData em uma string JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => console.log('Log enviado com sucesso:', data))
      .catch(error =>
        console.error('Erro ao enviar o log para o servidor:', error)
      )
  }

  return (
    <div>
      <h1>Leitor de QR Code</h1>
      <QrScanner
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{scannedValue}</p>
    </div>
  )
}

export default App
