const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const basePath = '/Users/moon/work/05_section/beb-02-MangoBeer/daemon';

// 가장 마지막에 확인한 블록번호 조회
const checkedBlockNum = Number(
  fs.readFileSync(path.join(basePath, '/utils/blockNumber'), {
    encoding: 'utf-8',
  })
);

const contractAddress = process.env.CONTRACT_ADDR;
// fs.readFileSync('./deployedAddress',{
//   encoding: 'utf-8', 
// });

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_NETWORK));
const allTransactions = [];
let lastest = checkedBlockNum;

const getTx = async (tx) => await web3.eth.getTransaction(tx); // 주어진 트랜잭션 해시와 일치하는 트랜잭션 반환

const getLastestTransactions = async () => {
	try {
		// 최신 블록번호가 마지막에 확인한 블록번호보다 크다면,
		// 그 차이만큼 블록을 조회하기 위해 범위 업데이트
		await web3.eth.getBlockNumber((err, result) => {   //현재 블록 번호 반환
			if (err) throw err;
			if (result > lastest) {
				lastest = result;
			}
		});

		if (checkedBlockNum === lastest) {   // 가장 마지막 확인한 블록과 현재 블록 일치.
			return [];
		} else {
			// 가장 마지막에 확인한 블록의 다음 블록부터 가장 최신 블록까지의 모든 트랜잭션 조회
			for (let i = checkedBlockNum + 1; i <= lastest; i++) {
				const block = await web3.eth.getBlock(i);

				// 트랜잭션 해시로 모든 트랜잭션 조회
				for (let tx of block.transactions) {
					allTransactions.push(getTx(tx));
				}
			}

			// 모든 트랜잭션 중에서, 조건에 부합하는 트랜잭션을 배열로 리턴(Promise)
			return Promise.all(allTransactions)
				.then((data) => {
					const result = [];
					for (let tx of data) {
						if (tx.from === contractAddress || tx.to === contractAddress) {
							result.push(tx);
						}
					}
					return result;
				})
				.then((data) => {
					// 가장 마지막에 확인한 블록번호 저장
					fs.writeFileSync(
						path.join(basePath, '/utils/blockNumber'),
						String(lastest),
					);
					return data;
				});
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = { getLastestTransactions };