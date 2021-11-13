const LidoStaker = artifacts.require('LidoStaker');
const Steth = artifacts.require('ISTETH');

let LidoStaker;
let lido;

require('chai').use(require('chai-as-promised')).should();


/* 
 * We test the functionality of the LidoStaker contract (deposits and withdraws)
 * using the testne Gorli and calling the Lido contract deployed in the testnet
 */
contract("Testing the Lido staker", ([admin]) => {
	
	/*
	 * The address of the Lido contract 0x278b194f849858a5537D69f869Df56e72413a877
	 */
	before(async () => {
		LidoStaker = await LidoStaker.new("0x278b194f849858a5537D69f869Df56e72413a877");
		lido = await Steth.at("0x278b194f849858a5537D69f869Df56e72413a877");
	})
	
	it("A user can deposit Eth using the LidoStaker", async () => {
		let amount = web3.utils.toWei("0.3");
		await LidoStaker.deposit({value: amount} );
		// We use to.be.above because of the variable gas fee that will be requiered to perform the operation
		// We assume that the current gas price on the gorli testnet is 15000 gwei
		expect(Number(web3.utils.fromWei(await lido.balanceOf(LidoStaker.address)))).to.be.above(0.28);
		expect(Number(web3.utils.fromWei(await LidoStaker.balancesEth(admin)))).to.be.above(0.28);
	});
	
	it("A user can deposit Eth multiple times", async () => {
		let amount = web3.utils.toWei("0.3");
		await LidoStaker.deposit({value: amount} );
		// We use to.be.above because of the variable gas fee that will be requiered to perform the operation
		// We assume that the current gas price on the gorli testnet is 15000 gwei
		expect(Number(web3.utils.fromWei(await lido.balanceOf(LidoStaker.address)))).to.be.above(0.56);
		expect(Number(web3.utils.fromWei(await LidoStaker.balancesEth(admin)))).to.be.above(0.56);
	});
	
	it("A user can withdraw StEth", async () => {
		let amount = web3.utils.toWei("0.2");
		await LidoStaker.withdraw(amount);
		// We use to.be.above because of the variable gas fee that will be requiered to perform the operation
		// In the case of withdraw since we are not sure what amount of value was deposited and what amount used as gas
		expect(Number(web3.utils.fromWei(await LidoStaker.balancesEth(admin)))).to.be.above(0.36);
		expect(Number(web3.utils.fromWei(await LidoStaker.balancesEth(admin)))).to.be.below(0.41);
		expect(Number(web3.utils.fromWei(await lido.balanceOf(admin)))).to.be.above(0.18);
	});
	
	it("A user can withdraw StEth multiple times as long as they have enough StEth", async () => {
		let amount = web3.utils.toWei("0.2");
		await LidoStaker.withdraw(amount);
		// We use to.be.above because of the variable gas fee that will be requiered to perform the operation
		// In the case of withdraw since we are not sure what amount of value was deposited and what amount used as gas
		expect(Number(web3.utils.fromWei(await LidoStaker.balancesEth(admin)))).to.be.above(0.16);
		expect(Number(web3.utils.fromWei(await LidoStaker.balancesEth(admin)))).to.be.below(0.21);
		expect(Number(web3.utils.fromWei(await lido.balanceOf(admin)))).to.be.above(0.36);
	});
	
});
		