// lessons/intro-to-transactions/courseContent.ts

import styles from './CourseContent.module.css';

export const courseContent = [
  {
    title: "Lesson 1: Generate a New Keypair",
    content: `
<h2 class="${styles.lessonTitle}">Lesson 1: Generate a New Keypair</h2>

<p class="${styles.lessonText}">In this lesson, you will learn how to generate a new keypair and display the public key using Solana's <code class="${styles.lessonCode}">web3.js</code> library. A keypair in Solana consists of a private key and a public key, where the private key is kept secret and the public key can be shared. The public key is used as your wallet address.</p>

<br>

<h3 class="${styles.lessonHeader}">Step-by-Step Explanation:</h3>

<br>

<ol class="${styles.lessonList}">
  <li><strong>Import Necessary Modules:</strong>
    <ul class="${styles.lessonSubList}">
      <li>We import <code class="${styles.lessonCode}">useState</code> from React to manage our component state.</li>
      <li>We import <code class="${styles.lessonCode}">Keypair</code> and <code class="${styles.lessonCode}">PublicKey</code> from <code class="${styles.lessonCode}">@solana/web3.js</code> to work with Solana keypairs.</li>
    </ul>
    <pre class="${styles.lessonPre}">
import { useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js";
    </pre>
  </li>

  <br>

  <li><strong>Initialize State:</strong>
    <ul class="${styles.lessonSubList}">
      <li>We use <code class="${styles.lessonCode}">useState</code> to create two state variables: <code class="${styles.lessonCode}">keypair</code> and <code class="${styles.lessonCode}">pubKey</code>. These will store the generated keypair and its public key, respectively.</li>
    </ul>
    <pre class="${styles.lessonPre}">
const [keypair, setKeypair] = useState();
const [pubKey, setPubkey] = useState();
    </pre>
  </li>

  <br>

  <li><strong>Create a Function to Generate a New Wallet:</strong>
    <ul class="${styles.lessonSubList}">
      <li>The <code class="${styles.lessonCode}">newWallet</code> function generates a new keypair using <code class="${styles.lessonCode}">Keypair.generate()</code>.</li>
      <li>We then update our state with the new keypair and set the public key as a string.</li>
    </ul>
    <pre class="${styles.lessonPre}">
async function newWallet() {
  try {
    let keypair = Keypair.generate();
    setKeypair(keypair);
    setPubkey(keypair.publicKey.toString());
  } catch (error) {
    console.log(error);
  }
}
    </pre>
  </li>

  <br>

  <li><strong>Render the UI:</strong>
    <ul class="${styles.lessonSubList}">
      <li>We create a simple UI with a header, a button to generate a new wallet, and a div to display the public key if it exists.</li>
    </ul>
    <pre class="${styles.lessonPre}">
return (
  <div>
    <h1>gm, solana.</h1>
    
    <button onClick={newWallet}>Generate New Wallet</button>
    {pubKey && <div>{pubKey}</div>}
  </div>
);
    </pre>
  </li>

  <br>
</ol>

<h3 class="${styles.lessonHeader}">Full Code Example:</h3>
<pre class="${styles.lessonPre}">
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
</pre>

<br>

<h3 class="${styles.lessonHeader}">Explanation:</h3>
<p class="${styles.lessonText}">When the "Generate New Wallet" button is clicked, the <code class="${styles.lessonCode}">newWallet</code> function is called. This function generates a new Solana keypair and updates the component state with the new keypair and its public key. The public key is then displayed below the button if it exists.</p>

<br>

<h3 class="${styles.lessonHeader}">Summary:</h3>
<p class="${styles.lessonText}">In this lesson, you have learned how to generate a new Solana keypair and display the public key using the <code class="${styles.lessonCode}">@solana/web3.js</code> library. This is a fundamental step in interacting with the Solana blockchain, as every transaction and interaction will involve signing with your private key and using your public key as your wallet address.</p>
    `,
    code: `import { useState } from "react";
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
`,
  },
  {
    title: "Lesson 2: Setting Up",
    content: "",
    code: `// Lesson 2 code example
console.log('Setting up');`,
  },
  {
    title: "Lesson 3: First Steps",
    content: "",
    code: `// Lesson 3 code example
console.log('First steps');`,
  },
  {
    title: "Conclusion",
    content: "",
    code: `// Conclusion code example
console.log('Congratulations on completing the course!');`,
  },
];
