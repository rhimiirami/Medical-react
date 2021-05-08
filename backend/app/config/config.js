var mysql = require('mysql');
//var nodemailer = require('nodemailer');
const Pool = require('pg').Pool

module.exports = {
  port: process.env.PORT || 3002,
  env: process.env.NODE_ENV || 'development',
  mediane: 6,

  pool: mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'medicale',
    debug: false,
    dateStrings: true
  }),

  /* pool: new Pool({
    user: 'ridha',
    //host: '18.220.209.238',
    host: 'localhost',
    //database: 'sagecity',
    database: 'medicale',
    password: 'postgres',
    //password: 'J2VgcQnEUNCjry88',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  }),
 */
  /* transporter : nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'engulfsqoin2021@gmail.com',
        pass: 'sqoinEngulf2021'
    }
  }),
  userFrom: 'engulfsqoin2021@gmail.com', */
};