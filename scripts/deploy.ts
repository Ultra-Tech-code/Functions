import { ethers } from "hardhat";

async function main() {


  //Deploy USDT contract
  const Donation = await ethers.deployContract("Donation");
  await Donation.waitForDeployment();
  console.log(`Donation deployed to ${Donation.target}`);

  //-------------interact with contract------------//
const donation = await ethers.getContractAt("Donation", Donation.target);

const donateEthers = await donation.donate(ethers.parseEther("1"), "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",{value: ethers.parseEther("1")});
await donateEthers.wait();
console.log(donateEthers);



const convertToWei = await donation.convertToWei(1);
console.log(convertToWei)

const viewAmount = await donation.viewAmount("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
console.log(viewAmount)



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});