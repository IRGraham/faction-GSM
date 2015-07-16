var Q = require('q');
var minecraftDriver = require('./minecraftDriver.js');
var data = require('./mysql-Driver');
var servers = [];

var actions = {
    //Start Server
    start: function(id){
        var deferred = Q.defer();
        if(!server[id]){
            //probably need to deserialize json here
            var serverData = JSON.parse(data.getServerData(id));
            servers[id] = new minecraftDriver.Server(
                serverData.serverDir,
                serverData.serverJar,
                null
            );
            servers[id].start(function(){
                console.log("starting server: "+id);
            });
        }
        else{
            console.log("Server"+id+"is already running");
        }
        return deferred.promise;
    },
    stop: function(id){
        if(!server[id]){
            console.log("server"+id+" is not running");
            return;
        }
        server[id].stop();
    },
    find: function(){
        var Sdata = data.getServerData(1);
        console.log("Sdata"+Sdata);
    }
}
module.exports = actions;

