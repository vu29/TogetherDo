const Sequelize = require("sequelize-cockroachdb");
const fs = require('fs');

// env variables
require('dotenv').config();

// Connect to CockroachDB through Sequelize.
var db = new Sequelize({
    dialect: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "free-tier6.gcp-asia-southeast1.cockroachlabs.cloud",
    port: 26257,
    database: "togetherdo-db-386.togetherdodb",
    dialectOptions: {
        ssl: { // For secure connection:
            ca: fs.readFileSync(process.env.BASE_DIR + '/certs/cc-ca.crt').toString()
        }
    },
    logging: false
});

const User = db.define("users", {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
    },
    username : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    passwordHash : {
        type : Sequelize.STRING,
        allowNull : false
    }
  });

module.exports = {
    db
}
