module.exports = (sequelize, DataTypes) => {
  // User라는 테이블을 만들꺼임.
  // DB에서는 테이블인데. 시퀄라이즈에서는 모델이라 부름.
  // 시퀄라이즈 문서 보는게 좋음.
  // 첫번쨰 객체(두번쨰 인수)는 타입정의, 세번째 인수는 설정 설정
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: false, //필수
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
      // 시퀄라이즈가 두가지 더 추가해줌. createdAt, updatedAt 이런거, ID도 추가됨
    },
    {
      charrset: 'utf8',
      collate: 'utf8_general_ci', //한글저장됨
    }
  );
  User.associate = (db) => {};
  return User;
};

// 노드에서는 각 파일이 모듈 역할해서 module.exports있는 경우가 많음.
// 함수를 모듈로 만든거임.
