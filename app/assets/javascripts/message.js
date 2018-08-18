$(function(){

  function buildHTML(message){
    if (message){
      var imageUrl = message.image.url;
    }
    if(imageUrl != null) {
      var html = `<div class='chat-main__body__message'>
                  <div class='chat-main__body__message__name'>${message.user_name}</div>
                  <div class='chat-main__body__message__timestamp'>${message.timestamp}</div>
                  <div class='chat-main__body__message__content'>${message.body}</div>
                  <div class='chat-main__body__message__content'>
                  <img src="${imageUrl}" /></div>
                  </div>`
    }
    else {
      var html = `<div class='chat-main__body__message'>
                  <div class='chat-main__body__message__name'>${message.user_name}</div>
                  <div class='chat-main__body__message__timestamp'>${message.timestamp}</div>
                  <div class='chat-main__body__message__content'>${message.body}</div>
                  </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.pathname;
    $.ajax({
      url: url,
      method: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__body").append(html)
      $("#message_body").val("");
      $("#message_image").val("");
      $(".chat-main__form__send-btn").prop('disabled', false);
      var newest = $("#message_top").get(0);
      newest.scrollTop = newest.scrollHeight;
    })
    .fail(function(){
      alert("書き込みエラーです");
    })
  })
})
