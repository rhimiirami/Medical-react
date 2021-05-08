'use strict';

const _publics = {};
var config = require('../config/config');

var getRawBody= require('raw-body')
var pool=config.pool;

_publics.getAllRoles = () => {

    return new Promise((resolve, reject) => {
    var sql = "select * FROM roles";
    
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

        
_publics.createRole = (role) => {
    var role = JSON.parse(role);
    var name = role.name;
    return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO roles SET ? ";
    const newMember = { name:name};
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
    message = {message:"success",roleId:result.insertId};
    }
    return resolve(message);
    });
    });
    });
    };

    
_publics.updateRole = (req, role) => {
    var role = JSON.parse(role);  
    var name = role.name;
    var id = req.query.id;
    return new Promise((resolve, reject) => {
    var message = "";
    var sql = "UPDATE roles SET name=? WHERE id = ?";
    pool.getConnection(function(err,connection){
    if (err) {
    reject(err);
    }
    connection.query(sql, [name,id], function (err, result) {
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

    _publics.deleteRole = (req) => {
        var id = req.query.id;
        console.log("id "+id);
        console.log(id);
        return new Promise((resolve, reject) => {
        var sql = "DELETE FROM roles WHERE id = ?";
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

        _publics.getRoleById = (idRole) => {
            return new Promise((resolve, reject) => {
            var sql = "select *  FROM roles where id=?";
            pool.getConnection(function(err,connection){
            if (err) {
            reject(err);
            }
            connection.query(sql, [idRole], function (err, result) {
            connection.release();
            if (err) reject(err);
            return resolve(result[0]);
            });
            });
            });
            };
            _publics.getRoleByName = (nameRole) => {
                return new Promise((resolve, reject) => {
                var sql = "select id  FROM roles where name=?";
                pool.getConnection(function(err,connection){
                if (err) {
                reject(err);
                }
                connection.query(sql, [nameRole], function (err, result) {
                connection.release();
                if (err) reject(err);
                return resolve(result[0].id);
                });
                });
                });
                };
  
    module.exports= _publics;