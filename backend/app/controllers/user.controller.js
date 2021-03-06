
 'use strict';

const _publics = {};
//const auth = require("../config/auth.config");

var config = require('../config/config');
var role = require('../config/utils');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var getRawBody= require('raw-body')
var pool=config.pool;

    _publics.getAllUsers = () => {

    return new Promise((resolve, reject) => {
  
    var sql = "select u.* , r.name as role from users u left join roles r on (r.id = u.id_role)"
    pool.getConnection(function(err,connection){
    if (err) {
    reject(err);
    }
    connection.query(sql, function (err, result) {
    connection.release();
    if (err) reject(err);
    return resolve(result);
    });
    });
    });
    };


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

        //elle sera appele dans app.js 
        

        _publics.createUserAdmin = () => {
        
            return new Promise((resolve, reject) => {
            var message = {};
            var password=bcrypt.hashSync('adminsqoin')
            var sql=
            " INSERT INTO users (username, email, password,id_role) SELECT * from ( select 'admin','admin@gmail.com',?, 1)"+
            " AS tmp WHERE NOT EXISTS ( SELECT id FROM users WHERE username = 'admin')"
                           
           
            pool.getConnection(function(err,connection){
            if (err) {
            reject(err);
            }
            connection.query(sql,[password], function (err, result) {
            connection.release();
            if (err) {
               
            message ={message:"failure"};
            reject(err);
            } else {
               
                message = {message:"success",id:result.insertId};
            }
            return resolve(message);
            });
            });
            });
            };
                
_publics.createUser = (user , roleId) => {
    var user = JSON.parse(user);
    var username = user.username;
    var email = user.email;
    var password= bcrypt.hashSync(user.password,8) ;
    var  id_role=roleId;
    return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO users SET ? ";
    const newMember = { username:username , email:email,password:password,id_role:id_role};
    pool.getConnection(function(err,connection){
    if (err) {
    reject(err);
    }
    connection.query(sql, newMember, function (err, result) {
    connection.release();
    if (err) {
    message ={message:"failure"};
    reject(err);
    } else {
    message = {message:"success",id:result.insertId};
    }
    return resolve(message);
    });
    });
    });
    };
   
    
_publics.updateUsers = (req, user , roleId) => {
  var user = JSON.parse(user);
    var username = user.username;
    var  email = user.email;
    var  password= bcrypt.hashSync(user.password,8) ;
    var  id_role= roleId ;
    var id = req.query.id;
    return new Promise((resolve, reject) => {
    var message = "";
    var sql = "UPDATE users SET name=? WHERE id = ?";
    pool.getConnection(function(err,connection){
    if (err) {
    reject(err);
    }
    connection.query(sql, [username,email,password,id_role,id], function (err, result) {
    connection.release();
    if (err) {
        message = "failure";
    reject(err);
    } else {
        message = "success";
    }
    return resolve(message);
    });
    });
    });
    };

    _publics.deleteUsers = (req) => {
        var id = req.query.id;
        console.log("id "+id);
        console.log(id);
        return new Promise((resolve, reject) => {
        var sql = "DELETE FROM users WHERE id = ?";
        var message = "";
        pool.getConnection(function(err,connection){
        if (err) {
        reject(err);
        }
        connection.query(sql, [id], function (err, result) {
        connection.release();
        if (err) {
            message = "failure";
        reject(err);
        } else {
            message = "success";
        }
        return resolve(message);
        });
        });
        });
        };

        _publics.getUsersById = (id) => {
            return new Promise((resolve, reject) => {
            var sql = "select u.* , r.name as role from users u left join roles r on (r.id = u.id_role)";
            pool.getConnection(function(err,connection){
            if (err) {
            reject(err);
            }
            connection.query(sql, [id], function (err, result) {
            connection.release();
            if (err) reject(err);
            return resolve(result[0]);
            });
            });
            });
            };

            _publics.getUserByEmail = (email) => {
                return new Promise((resolve, reject) => {
                var sql = "select * from users where email=?";
                var message="" ;
                pool.getConnection(function(err,connection){
                if (err) {
                reject(err);
                }
                connection.query(sql, [email], function (err, result) {
                connection.release();
                if (err) reject(err);
                if (result[0]===undefined){
                                message={message :"user not exist"}
                }else{
                    message={message :"user alerady exist"}
                }
                return resolve(message);
                });
                });
                });
                };
    
  
                _publics.allAccess = (req, res) => {
                    res.status(200).send("Public Content.");
                  };
                  
                  _publics.userBoard = (req, res) => {
                    res.status(200).send("User Content.");
                  };
                  
                  _publics.adminBoard = (req, res) => {
                    res.status(200).send("Admin Content.");
                  };
                  
                

    module.exports= _publics;