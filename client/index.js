const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const verifyProof = require("../utils/verifyProof");

const serverUrl = "http://localhost:1225";

async function main() {
  const merkleTree = new MerkleTree(niceList);

  //Choose a name from the niceList or your proof will be wrong
  const myName = "Toni Hahn";

  const proof = merkleTree.getProof(niceList.findIndex((n) => n === myName));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: myName,
    proof: proof,
  });

  console.log({ gift });
}

main();
