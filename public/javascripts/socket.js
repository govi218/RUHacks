var id;

$(function () {
    var socket = io.connect();
    var welcome = 1;
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chaß = $('#chat');
    var $messageBox = $('#messageBox');
    id = guid();
    if(welcome==1){
        socket.emit('page ready', {id: id});
        welcome = 0;
    }

    $messageForm.submit(function (e) {
        e.preventDefault();
        socket.emit('toYQ', {message: $message.val(), sender: "user", id: id});
        $message.val('');
    });

    socket.on('forUser', function (data) {
        if(data.sender != "vert"){
            if(data.id == id){
                $messageBox.append("<div class='well messageBubble' id='user' style='width:90%;'>" + data.msg + "</div>");
            }
        }
        else{  
            if(data.id == id){
                if(data.monte === undefined){
                    $messageBox.append("<div class='well messageBubble' id='bot' style='width:90%;'>" + data.msg + "</div>");
                } 
                else{
                    img = data.msg.replace('b\'','');
                    img = img.replace('\'','');
                    $messageBox.append("<div class='well messageBubble' id='bot' style='width:90%;'><img src='data:image/png;base64," + img + "' style='width:75%; height:75%; align-content: center; margin:auto; display:block;'></div>");
                }
            }
        }
        $("#messageBox").animate({ scrollTop: $('#messageBox').prop("scrollHeight")}, 1000);
    })
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
