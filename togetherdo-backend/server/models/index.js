const Sequelize = require("sequelize-cockroachdb");
const fs = require('fs');
const {SequelizeScopeError} = require("sequelize-cockroachdb");

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
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Task = db.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true
    },
    expireAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    taskType: {
        // 0 -> assignment
        // 1 -> exam-type
        type: Sequelize.BOOLEAN,
        default: 0,
        allowNull: false
    }
});

const Team = db.define("teams", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },

    teamName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Member = db.define("members", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    }
});


// Relations

User.belongsToMany(Team, {through : Member});
Team.belongsToMany(User, {through : Member});

Team.hasMany(Task);
Task.belongsTo(Team);

Member.hasMany(Task, {as : "tasksCreated"});
Task.belongsTo(Member, {as : "createdBy"});


module.exports = {
    db,
    User,Task,Team,Member
}
