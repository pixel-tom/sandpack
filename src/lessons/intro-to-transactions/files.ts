// lessons/intro-to-transactions/files.ts

export const file = 
`
import { useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js";

export default function Home() {
  const [keypair, setKeypair] = useState();
  const [pubKey, setPubkey] = useState();

  async function newWallet() {
    try {
      let keypair = Keypair.generate();
      setKeypair(keypair);
      setPubkey(keypair.publicKey.toString());
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <h1>gm, solana.</h1>
      
      <button onClick={newWallet}>Generate New Wallet</button>
      {pubKey && <div>{pubKey}</div>}
    </div>
  );
}
`
