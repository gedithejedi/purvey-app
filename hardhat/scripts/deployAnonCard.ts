// scripts/deploy.js
async function main () {
  // We get the contract to deploy
  const AnonCard = await ethers.getContractFactory('AnonCard');
  console.log('Deploying AnonCard...');
  const anonCard = await AnonCard.deploy();
  await anonCard.deployed();
  console.log('NFT Factory deployed to:', anonCard.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});