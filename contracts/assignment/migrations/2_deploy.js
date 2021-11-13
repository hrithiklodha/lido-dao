const LidoStaker = artifacts.require("LidoStaker");

module.exports = async function(deployer) {
	
		
	// The address for the Lido smart contract token
	let lido_address = "0x278b194f849858a5537D69f869Df56e72413a877";
	
	/* 
	 * We deploy the LidoStaker contract with the Lido smart contract address from the gorli testnet
	 */
	await deployer.deploy(LidoStaker, lido_address);
	
	const LidoStaker = await LidoStaker.deployed();
	
	
	console.log("LidoStaker contract address " + LidoStaker.address);
	
};