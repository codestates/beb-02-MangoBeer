const { getLastestTransactions } = require('./utils/main');
const { Transactions, sequelize } = require('./models');

// 한 개의 트랜잭션을 DB에 기록
const storeData = async (data) => await Transactions.create(data);

const startTask = async () => {
	let arr = [];
	getLastestTransactions().then((result) => {
		for (let data of result) {
			arr.push(storeData(data));
		}
		if (arr.length > 0) {
			Promise.all(arr)
				.then(async () => {
					console.log('Done.');
					await sequelize.close();
				})
				.then(() => {
					arr = [];
				})
				.catch(async (err) => {
					console.log(err);
					await sequelize.close();
				});
		} else {
			console.log('No transactions');
		}
	});
};

startTask();