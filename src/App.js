import React, { useState, useCallback } from 'react';
import QrScanner from 'react-qr-scanner';
import Papa from 'papaparse';
import LogonLogo from './LogonLogo.png';

function App() {
  const [qrData, setQrData] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState('Painel BI');
  const [showModal, setShowModal] = useState(false);
  const [lastScan, setLastScan] = useState(null);

  // Função para enviar log para o servidor
  const sendLogToServer = logData => {
    fetch('https://qrcode-rueda.vercel.app//save-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logData)
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Exibe a resposta do servidor
      })
      .catch(error => {
        console.error('Erro ao enviar o log para o servidor:', error);
      });
  };

  // Função de escaneamento para capturar o QR code
  const handleScan = useCallback(
    result => {
      if (result && result.text) {
        const scannedText = result.text;

        // Evita leituras repetidas dentro de 3 segundos
        if (lastScan && new Date() - lastScan < 3000) return;
        
        setLastScan(new Date());

        const newQrData = {
          data: scannedText,
          timestamp: new Date().toISOString(),
          interest: selectedInterest
        };

        setQrData(prevData => [...prevData, newQrData]);

        // Exibir modal
        setShowModal(true);

        // Fecha o modal automaticamente após 3 segundos
        setTimeout(() => {
          setShowModal(false);
        }, 3000);

        // Enviar log para o servidor
        sendLogToServer(newQrData);
      }
    },
    [selectedInterest, lastScan]
  );

  const handleError = err => {
    console.error(err);
  };

  const handleInterestChange = event => {
    setSelectedInterest(event.target.value);
  };

  // Função para download CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(qrData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'qr_codes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src={LogonLogo} alt="Logo" />
      </div>

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

      <div className="qr-scanner-container">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          className="qr-scanner"
        />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Concluído!</h2>
          </div>
        </div>
      )}

      <button className="download-btn" onClick={downloadCSV}>
        Download CSV
      </button>

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

        .logo-container {
          margin-bottom: 20px;
        }

        .dropdown-container {
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 10px;
          border-radius: 5px;
          border: none;
          background-color: #ff6500;
          color: #1e3e62;
        }

        .qr-scanner-container {
          width: 100%;
          max-width: 500px;
          margin-bottom: 20px;
        }

        .qr-scanner {
          width: 100%;
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

        .download-btn {
          margin-top: 20px;
          padding: 10px;
          background-color: #ff6500;
          color: #fff;
          border-radius: 5px;
          border: none;
        }

        @media (max-width: 768px) {
          .dropdown {
            width: 80%;
          }

          .qr-scanner-container {
            width: 100%;
            max-width: 350px;
          }

          .download-btn {
            width: 80%;
          }
        }

        @media (max-width: 480px) {
          .dropdown {
            width: 90%;
          }

          .qr-scanner-container {
            width: 100%;
            max-width: 300px;
          }

          .download-btn {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
