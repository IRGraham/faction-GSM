var mysql = require('mysql');
var connOpts = require('../config/config').mysql;
var serverDataEx = /\[{serverData:'({.*})'}]/;

var ServerDBController = {
    findServerByName: function(serverName) {
        var connection = mysql.createConnection(connOpts);
        connection.query('SELECT * FROM `servers` WHERE `name` = "'+ serverName +'"',
            function(err, result){
                if(err){
                    return err;
                }
                return result;
            }
        );
        connection.end()
    },
    //TODO: fix the SQL query
    getAll: function(req, res) {
        var connection = mysql.createConnection(connOpts);
        connection.query('SELECT * FROM `servers`', function(err, result) {
            if(err) return res.status(502).send(err);
            return res.status(200).send(result);
        });
        connection.end()
    },
    getServerData:function(req, res) {
        var id = req.params.id;
        var connection = mysql.createConnection(connOpts);
        connection.query('SELECT `serverData` FROM `servers` WHERE `sid` = ' + id,
            function(err, result){
                if(err) return err;
                res.status(200).send(JSON.parse(result[0].serverData));
        });
        connection.end()
        return;
     },
/*
     getServerData:function(req, res) {
         console.log(req);
         connection.query('SELECT `serverData` FROM `servers` WHERE `id` = "'+ req +'"',
            function(err, result){
                if(err){
                    return res.status(502).send(err);
                }
                return res.status(200).send(result);
            });
    },
*/
    createNewServer: function(ServerData){
        var dataStr = JSON.stringify(ServerData);
        var connection = mysql.createConnection(connOpts);
        connection.query("INSERT INTO servers (serverData, name, mods, client, game, gameVer, descr, created)"
                + "VALUES ('"
                + dataStr
                + "', 'working vanila','none','none', 'minecraft', '1.8.X', 'this server is a mod free minecraft instance that is kept up to date with the latest minecraft builds', '"
                + new Date()
                + "')");

        connection.end();
    }
};

module.exports = ServerDBController;
