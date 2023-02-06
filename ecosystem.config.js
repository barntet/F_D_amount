module.exports = {
  apps: [
    {
      name: 'F_D_amount',
      script: 'services.js',
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '106.52.168.152',
      ref: 'origin/master',
      repo: 'git@github.com:barntet/F_D_amount.git',
      path: '/home/ubuntu/www/F_D_amount',
      'post-deploy':
        'git reset --hard && git checkout master && git pull && yarn --production=false && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
