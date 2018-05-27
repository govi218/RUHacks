const request = require('request');
const https = require('https');

var chat = function(io) {
    
     connections = [];

    io.sockets.on('connection', function(socket){
        connections.push(socket);
        console.log('connected %s sockets connected', connections.length);

        //initial message
        socket.on('page ready', function(data){
            io.sockets.emit('forUser', {msg: "Welcome to Vert!", sender: "vert", id: data.id});
            io.sockets.emit('forUser', {msg: "I can calculate mortgages! Ask me some questions.", sender: "vert", id: data.id})
        });


        //Disconnect
        socket.on('disconnect', function(data){
            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected', connections.length);
        });

        //Send Message
        socket.on('toYQ', function(data){
            io.sockets.emit('forUser', {msg: data.message, sender: data.sender, id: data.id});
            //stock greeting
            if(data.message == "Hi" || data.message == "hi" || data.message == "hey" || data.message == "Hey"){
                io.sockets.emit('forUser', {msg: "Hi! Let's make some money \\m/", sender: "vert", id: data.id}); return;
            } else {
                console.log('y');
                var options = {
                    "method": "POST",
                    "hostname": "5l13sud741.execute-api.us-east-1.amazonaws.com",
                    "path": "/test/message/",
                    "headers": {
                      "Content-Type": "application/json",
                      "Host": "5l13sud741.execute-api.us-east-1.amazonaws.com",
                      "X-Amz-Date": "20180527T000408Z",
                      "Authorization": "AWS4-HMAC-SHA256 Credential=AKIAIGQE4M7VIBJPY4TA/20180527/us-east-1/execute-api/aws4_request, SignedHeaders=cache-control;content-length;content-type;host;postman-token;x-amz-date, Signature=0d53a4a6c536a86d910e3d5fe4969d31bd2376c53cd1bdde5b1e39e93db3b36a",
                      "Cache-Control": "no-cache",
                      "Postman-Token": "f9d8e5b0-3db9-4214-9b8b-64353ce5e5d2"
                    }
                };
                
                var req = https.request(options, function (res) {
                    var chunks = [];
                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });
                    res.on("end", function () {
                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                        var res = JSON.parse(body.toString());
                        //console.log()
                        io.sockets.emit('forUser', {msg: res["message"], sender: "vert", id: data.id}); 
                        return;
                        });
                });
                    
                req.write(JSON.stringify({ message: data.message, uuid: '1234534' }));
                req.end();
                console.log('??');
            }
        });
    });
}

module.exports = chat;