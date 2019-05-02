import * as driver from 'bigchaindb-driver'
import * as bip39 from "bip39";

const conn = new driver.Connection(process.env.REACT_APP_BIGCHAINDB_API);
const keyPair = generateKeypair("Naima-Client");

/**
 * Create a transaction
 * @param {string} project - The donation project
 * @param {number} amount - The amount of the donation
 * @param {string} message - A message
 * @returns {tx} The transaction data
 */

export async function createTransaction(project, amount, message) {
  const transaction = driver.Transaction.makeCreateTransaction(
    // assets - define the asset to store, the project
    { project: project, issued: "Naima-Poc" },

    // Metadata contains information about the transaction
    { action: "Donation", amount: amount, message: message, date: Date.now() },

    // A transaction needs an output
    [
      driver.Transaction.makeOutput(
        // A transaction has a condition
        driver.Transaction.makeEd25519Condition(keyPair.publicKey)
      )
    ],
    // Signature to use
    keyPair.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(
    transaction,
    keyPair.privateKey
  );

  try {
    let tx = await conn.postTransaction(txSigned);
    let hashMsg = `transaction hash: ${tx.id}`;
    console.log(hashMsg);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log("Error!");
    console.error(error);
    return false;
  }
}

export async function getTransaction(hash) {
  try {
    let tx = await conn.getTransaction(hash);
    let hashMsg = `transaction hash: ${tx.id}`;
    console.log(hashMsg);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log("Error!");
    console.error(error);
    return false;
  }
}

export async function getHistory(hash) {
  try {
    let listHistory = await conn.listTransactions(hash);
    console.log(listHistory);
    return listHistory;
  } catch (error) {
    console.log("Error!");
    console.error(error);
    return false;
  }
}

export async function getTransactions() {
  try {
    let listOutputs = await conn.searchAssets("Naima-Client");
    console.log(listOutputs);
    return listOutputs;
  } catch (error) {
    console.log("Error!");
    console.error(error);
    return false;
  }
}

/**
 * Update the asset by issuing a TRANSFER transaction with metadata containing the action performed on the asset.
 *
 * @param {*} transaction - The transaction that needs to be chained upon.
 * @param {*} action - The action performed on the asset (e.g. processed with preservative).
 */

export async function updateTransaction(transaction, action) {
  console.log(transaction);
  const updatedMeta = {
    action: action,
    date: new Date().toISOString()
  };

  const updateTransaction = driver.Transaction.makeTransferTransaction(
    // 1- Previous transaction.
    [{ tx: transaction, output_index: 0 }],

    // 2- new output
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(keyPair.publicKey)
      )
    ],

    // 3- new metadata.
    updatedMeta
  );

  const txSigned = driver.Transaction.signTransaction(
    updateTransaction,
    keyPair.privateKey
  );

  try {
    let tx = await conn.postTransactionCommit(txSigned);
    let hashMsg = `transaction hash: ${tx.id}`;
    console.log(hashMsg);
    console.log(tx);
    return tx;
  } catch (error) {
    console.log("Error!");
    console.error(error);
    return false;
  }
}

/**
 * Generate a keypair based on the supplied seed string.
 * @param {string} keySeed - The seed that should be used to generate the keypair.
 * @returns {*} The generated keypair.
 */
function generateKeypair(keySeed) {
  if (typeof keySeed === "undefined" || keySeed === "")
    return new driver.Ed25519Keypair();
  return new driver.Ed25519Keypair(bip39.mnemonicToSeed(keySeed).slice(0, 32));
}
