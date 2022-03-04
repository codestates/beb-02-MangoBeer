module.exports = {
  apps : [{  // 환경설정
    name: 'transaction_check',  
    script: './index.js',   // pm2 시작에 대한 스크립트 경로
    instances: 1,           // 시작할 프로세스 수
    autorestart: false,     // 재시작 on/off -> false인 경우 앱이 충돌하거나 평화롭게 종료되는 경우 pm2가 앱을 다시 시작하지 않는다.
    watch: true,           // watch on/off -> true인 경우 폴더 또는 하위 폴더의 파일이 변경되면 앱이 다시 로드된다.
    env: {                  // Node.js 환경변수
      CONTRACT_ADDR:'0xeAc1E62039e89Fbe4E2cB5BA118083C2126dA41b',
      GANACHE_NETWORK:'HTTP://127.0.0.1:7545'
    }
  }],

  // deploy : {   // 원격 서버와 git을 연동해서 배포하는 방식.
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
