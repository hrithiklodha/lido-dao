const LidoStaker = artifacts.require('LidoStaker');

let LidoStaker;

require('chai').use(require('chai-as-promised')).should();


/* 
 * We test the functionality of the LidoStaker contract (deposits and withdraws)
 * Using the local testnet provided by truffle we test the "require" statements of our contract
 */
contract("Testing the LidoStaker", ([admin]) => {
	
	/*
	 * The address of the Lido contract 0x278b194f849858a5537D69f869Df56e72413a877
	 * The address is only valid on the Gorli testnet
	 * For these tests it doen't matter since we never actually call the Lido contract
	 */
	before(async () => {
		// We use a fake address to call the contructor
		LidoStaker = await LidoStaker.new("0x278b194f849858a5537D69f869Df56e72413a877");
	})
	
	it("A user is not allow to depost zero ether", async () => {
		await LidoStaker.deposit().should.be.rejectedWith("Can not deposit 0 Ether");
	});
	 
	it("A user is not allow withdraw zero stEth", async () => {
		await LidoStaker.withdraw(0).should.be.rejectedWith("You can not withdraw zero stEth");
	});
	
	it("A user is not allow withdraw stEth if they don't have Eth deposited", async () => {
		await LidoStaker.withdraw(14).should.be.rejectedWith("You don't have enough stEth");
	});
	
});
		