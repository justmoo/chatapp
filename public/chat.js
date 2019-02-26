
var socket =io.connect('http://localhost:3000');

//Query
    var message = document.getElementById('message'),
        user = document.getElementById('user'),
        btn = document.getElementById('send'),
        output = document.getElementById('output'),
        feedback = document.getElementById('feedback');

// Emit 
btn.addEventListener('click',function(){
    // if(message.value==""||user.value==""){
    //     break;
    // }else{
socket.emit('chat',{
    message:message.value,
    user:user.value
    });
    message.reset();

}); 
// typing
message.addEventListener('keypress',function(){
    socket.emit('typing', user.value);
});



//listen
socket.on('chat',function(data){
    feedback.innerHTML='';
output.innerHTML += '<p><strong>' + data.user + ' : </strong>' + data.message + '</p>';
});
socket.on('typing',function(data){
    feedback.innerHTML = '<p><ed>' + data + ' is typing a message... </em></p>'
});