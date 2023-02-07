module.exports = {
  apps: [
    {
      name: 'F_D_amount',
      script: 'services.js',
    },
  ],
  deploy: {
    production: {
      key: 'C:/Users/1/.ssh/id_rsa.pub',
      user: 'root',
      host: ['106.52.158.163'],
      ref: 'origin/master',
      repo: 'https://github.com/barntet/F_D_amount.git',
      path: '/home/ubuntu/www/F_D_amount',
      'post-deploy':
        'git reset --hard && git checkout master && git pull &&  pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
