import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { saveData } from './firebase'; // Importa a função de salvar dados

function App() {
  const [qrData, setQrData] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState('interesse1');
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);

  const handleScan = data => {
    if (data) {
      const link = data.text; // Obtém o texto lido do QR Code
      saveData(link, selectedInterest); // Salva o link e o interesse no Firestore
      setQrData(link); // Armazena o dado lido
      setShowModal(true); // Exibe o modal de sucesso
      setTimeout(() => setShowModal(false), 3000); // Fecha o modal após 3 segundos
    }
  };

  const handleError = err => {
    console.error(err);
  };

  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current, handleScan);
    qrScanner.start();

    return () => {
      qrScanner.stop(); // Para o scanner ao desmontar o componente
    };
  }, []);

  return (
    <div className="app-container">
      <div className="dropdown-container">
        <select value={selectedInterest} onChange={e => setSelectedInterest(e.target.value)} id="interestDropdown">
          <option value="interesse1">Interesse 1</option>
          <option value="interesse2">Interesse 2</option>
          <option value="interesse3">Interesse 3</option>
        </select>
      </div>

      <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Concluído!</h2>
          </div>
        </div>
      )}

      <style jsx>{`
        .app-container {
          text-align: center;
          background-color: #1e3e62;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .dropdown-container {
          margin-bottom: 20px;
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
      `}</style>
    </div>
  );
}

export default App;
