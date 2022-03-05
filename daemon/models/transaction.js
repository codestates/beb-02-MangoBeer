module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define('transaction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hash: {
      type: DataTypes.STRING
    },
    nonce: {
      type: DataTypes.INTEGER
    },
    blockHash: {
      type: DataTypes.STRING
    },
    blockNumber: {
      type: DataTypes.INTEGER
    },
    transactionIndex: {
      type: DataTypes.INTEGER
    },
    from: {
      type: DataTypes.STRING
    },
    to: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
    gas: {
      type: DataTypes.INTEGER
    },
    gasPrice: {
      type: DataTypes.STRING
    },
    input: {
      type: DataTypes.TEXT
    },
    v: {
      type: DataTypes.STRING
    },
    r: {
      type: DataTypes.STRING
    },
    s: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    // timestamps: false,  // 생성일을 DataTypes가 자동으로 생성하지 말라는 옵션 
    underscored: true,   // Snake Case를 권장한다는 옵션
  })
}
