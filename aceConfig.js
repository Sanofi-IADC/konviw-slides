import dotenv from 'dotenv'

dotenv.config()

const aceConfig = {
  config: {
    development: {
      port: 3000,
      errorTemplate: true,
      store: {
        adapter: 'sequelize',
        dialect: 'sqlite3',
        logging: false,
        type: 'memory'
      }
    },
    deployment: {
      environment: 'deployment',
      port: process.env.APP_PORT,
      store: {
        adapter: 'sequelize',
        dialect: 'postgres',
        url: `postgres://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASSWORD}@${process.env.POSTGRESQL_URL}:${process.env.POSTGRESQL_PORT}/${process.env.POSTGRESQL_DATABASE}`,
        pool: {
          max: 1,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      },
      errorTemplate: true,
      localBaseUrl: process.env.APP_BASE_URL,
      product: 'confluence'
    }
  }
}

export default aceConfig