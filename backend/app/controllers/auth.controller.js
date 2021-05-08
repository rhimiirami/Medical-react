'use strict';

const _publics = {};


var config = require('../config/config');

var bcrypt = require("bcryptjs");
var getRawBody = require('raw-body')
var pool = config.pool;


var bcrypt = require("bcryptjs");
var getRawBody = require('raw-body');



_publics.getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
    }, function (err, string) {
      if (err) return next(err)
      req.text = string;
      return resolve(req.text);
    })
  });
};



_publics.singup = (users) => {
  var user = JSON.parse(users);
  var firstname = user.firstname;
  var lastname = user.lastname;
  var email = user.email;
  var password = bcrypt.hashSync(user.password, 8);

  return new Promise((resolve, reject) => {
    var message = "";
    var sql = "INSERT INTO users SET ? ";
    const newMember = { firstname: firstname, lastname: lastname, email: email, password: password };
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, newMember, function (err, result) {
        connection.release();
        if (err) {


          if (err == "ER_DUP_ENTRY") {
            message = { message: "username or email alerady used" + err };
          } else {
            message = { message: "failure" + err };

          }
          return resolve(message);
        } else {
          //sendEmail(email);
          message = { message: "user created ", id: result.insertId };
        }
        return resolve(message);
      });
    });
  });
};

_publics.signin = (user) => {

  var member = JSON.parse(user);
  var email = member.email
  var userpassword = member.password;
  return new Promise((resolve, reject) => {

    var sql = "select u.*  from users u  where email=? ";
    var message = "";

    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, [email], function (err, result) {
        connection.release();
        if (err) {
          message = { message: "request failed" };
          reject(err);
        } else {
          if (result.length == 0) {
            message = { message: "username not found" };
          } else {
            var password = bcrypt.compareSync(
              userpassword,
              result[0].password
            );
            if (!password) {
              message = { message: "verify your password" }
            } else {

              message = { message: "user exist ", user: result[0] };
            }
          }

        }

        return resolve(message);
      });
    });
  });
};


function sendEmail(email) {
  return new Promise((resolve, reject) => {
    var url = "";
    var msg = "https://kharbga.games";
    config.transporter.sendMail({
      from: config.userFrom,
      to: email,
      subject: 'Registration verification ',
      html: '<h3>Dear User, \n \n </h3>' +
        '<p> You have just join our team by registration \n </p>' +
        '<p>Please click   <a href=\"' + url + '\"\>here to verifier your  registration .</a> \n \n </p>' +
        '<p>Regards, \n </p>' +
        '<p>Engulf Team \n </p>',
    }, (error, info) => {
      if (error) {
        reject(error);
        msg = "failure"
      } else {
        msg = "success"
      }
      return resolve(msg)
    });
  })
}









module.exports = _publics;