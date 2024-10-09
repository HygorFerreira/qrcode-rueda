import React, { useState, useCallback } from 'react';
import QrScanner from 'react-qr-scanner';
import LogonLogo from '../src/LogonLogo.png';
import { FaCamera } from 'react-icons/fa'; // Ícone de câmera
import { saveData } from './firebase'; // Função para salvar os dados no Firebase
import './app.css';

function App() {
  const [selectedInterest, setSelectedInterest] = useState('Painel BI'); // Controle do dropdown
  const [showModal, setShowModal] = useState(false); // Controle do modal de sucesso
  const [lastScan, setLastScan] = useState(null); // Guarda o último QR code escaneado
  const [isFrontCamera, setIsFrontCamera] = useState(false); // Alterna entre câmera frontal e traseira

  // Alterna entre as câmeras frontal e traseira
  const toggleCamera = () => setIsFrontCamera(prevState => !prevState);

  // Envia os logs para o servidor Firebase
  const sendLogToServer = async (logData) => {
    try {
      await saveData(logData.data, logData.interest);
      console.log('Log salvo no Firebase com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o log no Firebase:', error);
    }
  };

  // Lida com a leitura do QR code
  const handleScan = useCallback(
    (result) => {
      if (result?.text) {
        const scannedText = result.text;

        // Verifica se o QR code já foi lido nos últimos 3 segundos
        if (lastScan && new Date() - lastScan < 3000) return;

        // Atualiza o estado com o timestamp da última leitura
        setLastScan(new Date());

        // Cria o objeto para armazenar os dados
        const newQrData = {
          data: scannedText,
          timestamp: new Date().toISOString(),
          interest: selectedInterest,
        };

        // Exibe o modal de conclusão e o fecha após 3 segundos
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);

        // Envia os logs para o servidor (Firebase)
        sendLogToServer(newQrData);
      }
    },
    [selectedInterest, lastScan]
  );

  // Lida com erros no escaneamento
  const handleError = (err) => {
    console.error(err);
  };

  // Atualiza o interesse selecionado no dropdown
  const handleInterestChange = (event) => {
    setSelectedInterest(event.target.value);
  };

  // Estilo do componente de visualização do QR scanner
  const previewStyle = {
    height: 240,
    width: 320,
  };

  // Restrições da câmera para alternar entre frontal e traseira
  const cameraConstraints = {
    facingMode: isFrontCamera ? 'user' : 'environment', // 'user' para câmera frontal
  };

  return (
    <div className="app-container">
      {/* Exibe o logo */}
      <div className="logo-container">
        <img src={LogonLogo} alt="Logo" />
      </div>

      {/* Dropdown para selecionar o interesse */}
      <div className="dropdown-container">
        <select value={selectedInterest} onChange={handleInterestChange} className="dropdown">
          <option value="Painel BI">Painel BI</option>
          <option value="Automação">Automação</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Scanner de QR code */}
      <div className="qr-scanner-container">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          constraints={{ video: cameraConstraints }} // Alterna entre câmeras
        />
      </div>

      {/* Modal de conclusão */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Concluído!</h2>
          </div>
        </div>
      )}

      {/* Botão para alternar câmeras */}
      <div className="controls-container">
        <button className="camera-toggle" onClick={toggleCamera}>
          <FaCamera size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
