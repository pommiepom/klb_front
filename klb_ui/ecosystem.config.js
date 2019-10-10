module.exports = {
  apps : [{
    name: 'kbapi',
    script: '../../knowledgebase/server_api/index.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
