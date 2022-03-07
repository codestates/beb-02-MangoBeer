module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('nfts', {
      username: {
        type: DataTypes.STRING(20),    
        allowNull: false,                        
      },
      nftpath: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nftname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      nftdesc: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      nftprice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('now()') // 회원이 생길 때 자동으로 날짜가 등록이 됨
      },
      useraddr: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sellingflag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    }, {
      timestamps: false,  // 생성일을 Sequelize가 자동으로 생성하지 말라는 옵션 
      underscored: true,   // Snake Case를 권장한다는 옵션
    })
  }
  