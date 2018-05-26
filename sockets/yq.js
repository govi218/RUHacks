//var PythonShell = require('python-shell');

var chat = function(io) {
    
     connections = [];

    io.sockets.on('connection', function(socket){
        connections.push(socket);
        console.log('connected %s sockets connected', connections.length);

        //initial message
        socket.on('page ready', function(data){
            io.sockets.emit('forUser', {msg: "Welcome to Yung Quant, your personal quantitative developer and analyst. If you're a regular, you know what to do. If you're a newbie ask for help!", sender: "yq", id: data.id});
            io.sockets.emit('forUser', {msg: "If you're on a mobile device you can see the prompts and universes by sending 'prompts' or 'universes'", sender: "yq", id: data.id});
        
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
                io.sockets.emit('forUser', {msg: "Hi! Let's make some money \\m/", sender: "yq", id: data.id}); return;
            }
            //user asks for help
            else if(data.message == "Help" || data.message == "help" || data.message == "Help me" || data.message == "help me"){
                io.sockets.emit('forUser', {msg: "First, make sure you've had a look at the Strategies page and know which strategy you're interested in. Once you've done that, find your strategy under the prompts heading to my left and send me a message with your strategy prompt with the universe that you're interested in trading", sender: "yq", id: data.id});
                io.sockets.emit('forUser', {msg: "Here's and example: 'mac spdr' This will screen for stocks from the spdr ETFs using the moving average crossover strategy", sender: "yq", id: data.id});
            }
            //user wants to be reminded of prompts (mobile)
            else if(data.message == "prompts" || data.message == "Prompts"){
                var prompts = "<li class='list-item'> Monte-Carlo Simulation: monte (symbol) </li>\
                        <li class='list-item'> Reversion to the mean: rev (universe) </li>\
                        <li class='list-item'> Channel Breakouts: breakout (universe) </li>\
                        <li class='list-item'> Basic Momentum: momentum (universe) </li>\
                        <li class='list-item'> Moving Average Crossover: mac (universe) </li>\
                        <li class='list-item'> Sentiment Analysis: Coming Soon! </li>";
                io.sockets.emit('forUser', {msg: prompts, sender: "yq", id: data.id});
            }
            //user wants to be reminded of universes available (mobile)
            else if(data.message == "universes" || data.message == "Universes"){
                var universes = "<li class='list-item'> S&P 100: sp100 </li>\
                        <li class='list-item'> NASDAQ 100: nas100 </li>\
                        <li class='list-item'> SPDR ETFs: spdr </li>";
                io.sockets.emit('forUser', {msg: universes, sender: "yq", id: data.id});
            }
            //user enters anything else, likely a proper prompt
            else{
                
                io.sockets.emit('forUser', {msg: "This could take up to 15 seconds...", sender: "yq", id: data.id});
                data.message = data.message.toLowerCase();
                var options = {
                    args: data.message,
                    pythonPath: "python3"
                }
                if(data.message.split(' ')[0] == 'monte'){
                    io.sockets.emit('forUser', {msg: "ayyyyyyy", sender: "yq", id: data.id, monte: 1});
                }
                else{
                    io.sockets.emit('forUser', {msg: 'AYYYY', sender: "yq", id: data.id, monte: 1});
                }
                
            }
        });
    });
}

module.exports = chat;