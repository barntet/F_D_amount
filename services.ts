const service = require('pushstate-server');

service.start({
  port: 5021,
  directory: './dist',
});
