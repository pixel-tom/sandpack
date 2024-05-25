export const indexFile = `import { Keypair } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [keypair, setKeypair] = useState(null);

  useEffect(() => {
    const storedKeypair = localStorage.getItem('keypair');

    if (storedKeypair) {
      const { publicKey, secretKey } = JSON.parse(storedKeypair);
      const keypairFromStorage = Keypair.fromSecretKey(new Uint8Array(secretKey));
      setKeypair(keypairFromStorage);
    } else {
      const newKeypair = Keypair.generate();
      localStorage.setItem('keypair', JSON.stringify({
        publicKey: newKeypair.publicKey.toString(),
        secretKey: Array.from(newKeypair.secretKey),
      }));
      setKeypair(newKeypair);
    }
  }, []);

  return (
    <main style={styles.main}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>BONK ME</h1>
        <div style={styles.flexCenter}>
          {keypair ? (
            <>
              <p>Public Key: {(keypair.publicKey.toString()).slice(0,4)}...{(keypair.publicKey.toString()).slice(-4)}</p>
            </>
          ) : (
            <p>Generating keypair...</p>
          )}
        </div>
      </div>

      {/* Game Section */}
      <div style={styles.gameSection}>
        <div style={styles.gameSectionContent}>
          <p style={styles.bonkText}>NUMBER OF BONKS</p>

          <div style={styles.bonkInputContainer}>
            <div style={styles.arrowContainer}>
              {/* Increment Button can be added here */}
            </div>
            <input style={styles.bonkInput} type="number" min="3" />
            <div style={styles.arrowContainer}>
              {/* Decrement Button can be added here */}
            </div>
          </div>
          <p style={styles.bonkValue}>30000 $BONK</p>
        </div>
        <div style={styles.balanceContainer}>
          <p style={styles.balanceText}>
            <span style={styles.balanceLabel}>$BONK Balance:</span> 0
          </p>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.bonkButton}>
            {/* Bonk Button can be added here */}
          </button>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    margin: "0",
    backgroundColor: "#f5a623",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: "2rem",
    color: "#fb8c00",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  gameSection: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "55rem",
    width: "100%",
    marginTop: "1rem",
  },
  gameSectionContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
  },
  bonkText: {
    textAlign: "center",
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#db4437",
    margin: "0.5rem 0",
  },
  bonkInputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 2.5rem",
  },
  arrowContainer: {
    width: "1.3rem",
    cursor: "pointer",
  },
  bonkInput: {
    backgroundColor: "#00abcd",
    textAlign: "center",
    width: "3rem",
    height: "1.5rem",
    fontSize: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid #db4437",
    color: "#fff",
  },
  bonkValue: {
    textAlign: "center",
    minWidth: "36%",
    fontSize: "1.125rem",
    fontWeight: "bold",
    color: "#db4437",
    margin: "0.5rem 0",
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  balanceText: {
    fontSize: "1.25rem",
  },
  balanceLabel: {
    fontSize: "0.875rem",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
  },
  bonkButton: {
    // Add button styles here
  },
};`