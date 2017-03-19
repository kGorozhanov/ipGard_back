const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.NODE_ENV === 'prod' ? 'mongodb://kGorozhanov:123123@ds133249.mlab.com:33249/ipgard' : 'mongodb://localhost/ipgard'
  },
  secrets: {
    session: 'ipgard-secret'
  },
  userRoles: ['admin', 'productionAdmin', 'productionUser', 'salesAdmin', 'salesUser', 'support']
};
module.exports = config;
