const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, timepstamp, data, previousHash = ''){
		this.index = index;
		this.timepstamp = timepstamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timepstamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined: " + this.hash);
	}
}


class Blockchain{

	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 5;
	}

	createGenesisBlock(){
		return new Block(0, "18/12/2017", "Genesis Block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isBlockValid(){
		for(let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}

			return true;
		}

	}
}

let kalCoin = new Blockchain();
console.log("Mining block 1...");
kalCoin.addBlock(new Block(1, "01/01/2018", {doc:"private data 1"}));
console.log("Mining block 2...");
kalCoin.addBlock(new Block(2, "10/01/2018", {doc:"private data 2"}));

//console.log(JSON.stringify(kalCoin, null, 4));
//console.log("is blockchain valid: " + JSON.stringify(kalCoin.isBlockValid(), null, 4));