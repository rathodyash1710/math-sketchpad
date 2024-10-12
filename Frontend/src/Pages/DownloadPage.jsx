import React from 'react';

const DownloadPage = () => {
  const styles = {
    downloadPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    downloadContainer: {
      textAlign: 'center',
      padding: '20px',
      background: 'white',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      width: '60%',
    },
    downloadTitle: {
      fontSize: '2.5rem',
      marginBottom: '20px',
    },
    downloadDescription: {
      fontSize: '1.2rem',
      marginBottom: '30px',
    },
    downloadButtons: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px',
    },
    downloadBtn: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    downloadLogo: {
      width: '30px',
      height: '30px',
      marginRight: '10px',
    },
    windowsBtn: {
      backgroundColor: '#0078d7',
    },
    macBtn: {
      backgroundColor: '#333333',
    },
    linuxBtn: {
      backgroundColor: '#fcd116',
    },
    supportText: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.downloadPage}>
      <div style={styles.downloadContainer}>
        <h1 style={styles.downloadTitle}>Download Our Desktop Application</h1>
        <p style={styles.downloadDescription}>
          Get the full experience on your desktop by downloading our application for your operating system.
        </p>

        <div style={styles.downloadButtons}>
          <a
            href="/path-to-windows-download"
            style={{ ...styles.downloadBtn, ...styles.windowsBtn }}
          >
            <img src="https://img.icons8.com/?size=100&id=108792&format=png&color=000000" alt="Windows Logo" style={styles.downloadLogo} />
            Download for Windows
          </a>

          <a
            href="/path-to-mac-download"
            style={{ ...styles.downloadBtn, ...styles.macBtn }}
          >
            <img src="https://img.icons8.com/?size=100&id=17843&format=png&color=000000" alt="Mac Logo" style={styles.downloadLogo} />
            Download for macOS
          </a>
        </div>

        <p style={styles.supportText}>
          Having trouble? <a href="/help">Visit our Help Page</a> for installation instructions and troubleshooting.
        </p>
      </div>
    </div>
  );
};

export default DownloadPage;
