import React, { useState, useCallback } from 'react'
import QrScanner from 'react-qr-scanner'
import LogonLogo from '../src/LogonLogo.png'
import { FaCamera } from 'react-icons/fa' // Ícone de câmera
import { saveData } from './firebase' // Função para salvar os dados no Firebase

function App() {
  // Estado para controlar o interesse selecionado no dropdown
  const [selectedInterest, setSelectedInterest] = useState('Painel BI')

  // Estado para controlar a exibição do modal de "Concluído"
  const [showModal, setShowModal] = useState(false)

  // Estado para guardar o último QR code escaneado e evitar escaneamentos repetidos
  const [lastScan, setLastScan] = useState(null)

  // Estado para alternar entre a câmera frontal e traseira
  const [isFrontCamera, setIsFrontCamera] = useState(false)

  // Função para alternar entre a câmera frontal e traseira
  const toggleCamera = () => {
    setIsFrontCamera(prevState => !prevState)
  }

  // Função para enviar os logs para o Firebase
  const sendLogToServer = async logData => {
    try {
      await saveData(logData.data, logData.interest) // Salva os dados no Firebase
      console.log('Log salvo no Firebase com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar o log no Firebase:', error)
    }
  }

  // Função que lida com o escaneamento do QR code
  const handleScan = useCallback(
    result => {
      if (result && result.text) {
        const scannedText = result.text

        // Verifica se o QR code já foi lido nos últimos 3 segundos
        if (lastScan && new Date() - lastScan < 3000) return

        // Atualiza o estado com o timestamp da última leitura
        setLastScan(new Date())

        // Cria um objeto com os dados do QR code escaneado
        const newQrData = {
          data: scannedText,
          timestamp: new Date().toISOString(),
          interest: selectedInterest
        }

        // Exibe o modal de "Concluído"
        setShowModal(true)

        // Fecha o modal automaticamente após 3 segundos
        setTimeout(() => {
          setShowModal(false)
        }, 3000)

        // Envia os logs para o servidor (Firebase)
        sendLogToServer(newQrData)
      }
    },
    [selectedInterest, lastScan]
  )

  // Função que lida com erros durante o escaneamento
  const handleError = err => {
    console.error(err)
  }

  // Função que atualiza o interesse selecionado no dropdown
  const handleInterestChange = event => {
    setSelectedInterest(event.target.value)
  }

  // Estilos de visualização para o scanner de QR code
  const previewStyle = {
    height: 240,
    width: 320
  }

  // Restrições de câmera para alternar entre a frontal e traseira
  const cameraConstraints = {
    facingMode: isFrontCamera ? 'user' : 'environment' // 'user' para câmera frontal, 'environment' para traseira
  }

  return (
    <div className="app-container">
      {/* Container para o logo */}
      <div className="logo-container">
        <img src={LogonLogo} alt="Logo" />
      </div>

      {/* Dropdown para selecionar o interesse */}
      <div className="dropdown-container">
        <select
          value={selectedInterest}
          onChange={handleInterestChange}
          className="dropdown"
        >
          <option value="Painel BI">Painel BI</option>
          <option value="Automação">Automação</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Componente para o scanner de QR code */}
      <div className="qr-scanner-container">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle} // Estilo para o componente de scanner
          constraints={{ video: cameraConstraints }} // Definir modo de câmera
        />
      </div>

      {/* Modal que aparece ao concluir a leitura do QR code */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Concluído!</h2>
          </div>
        </div>
      )}

      {/* Botão para alternar entre a câmera frontal e traseira */}
      <div className="controls-container">
        <button className="camera-toggle" onClick={toggleCamera}>
          <FaCamera size={24} />
        </button>
      </div>

      {/* Estilos em CSS */}
      <style jsx>{`
        .app-container {
          text-align: center;
          background-color: #1e3e62;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .logo-container {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 300px; /* Ajusta o tamanho máximo do logo */
        }

        .logo-container img {
          width: 100%;
          height: auto;
        }

        .dropdown-container {
          margin-bottom: 20px;
          width: 100%;
          max-width: 300px;
        }

        .dropdown {
          padding: 10px;
          width: 100%;
          border-radius: 5px;
          border: none;
          background-color: #ff6500;
          color: #1e3e62;
          font-size: 16px;
        }

        .qr-scanner-container {
          width: 100%;
          max-width: 500px;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .qr-scanner-container canvas {
          width: 100% !important; /* Garante que o scanner ocupe toda a largura do container */
          height: auto !important; /* Ajusta a altura proporcionalmente */
        }

        .controls-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .camera-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .dropdown {
            width: 80%;
            font-size: 14px;
          }

          .qr-scanner-container {
            max-width: 350px;
          }

          .logo-container {
            max-width: 250px; /* Ajusta o tamanho do logo para telas menores */
          }
        }

        @media (max-width: 480px) {
          .dropdown {
            width: 90%;
            font-size: 14px;
          }

          .qr-scanner-container {
            max-width: 400px;
          }

          .logo-container {
            max-width: 300px; /* Ajusta ainda mais o logo no mobile */
          }
        }

        @media (max-width: 428px) {
          .dropdown {
            width: 100%;
            font-size: 12px;
          }

          .qr-scanner-container {
            max-width: 320px;
          }

          .logo-container {
            max-width: 220px; /* Ajusta o logo para o menor tamanho de tela */
          }
        }
      `}</style>
    </div>
  )
}

export default App
