module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define('transaction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    hash: {
      type: Sequelize.STRING
    },
    nonce: {
      type: Sequelize.INTEGER
    },
    blockHash: {
      type: Sequelize.STRING
    },
    blockNumber: {
      type: Sequelize.INTEGER
    },
    transactionIndex: {
      type: Sequelize.INTEGER
    },
    from: {
      type: Sequelize.STRING
    },
    to: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    },
    gas: {
      type: Sequelize.INTEGER
    },
    gasPrice: {
      type: Sequelize.STRING
    },
    input: {
      type: Sequelize.TEXT
    },
    v: {
      type: Sequelize.STRING
    },
    r: {
      type: Sequelize.STRING
    },
    s: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    // timestamps: false,  // 생성일을 Sequelize가 자동으로 생성하지 말라는 옵션 
    underscored: true,   // Snake Case를 권장한다는 옵션
  })
}
