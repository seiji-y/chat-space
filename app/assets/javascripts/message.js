$(function(){

  function buildHTML(message){
    if (message){
      var imageUrl = message.image != null ? `<div class='chat-main__body__message__content'><img src=${message.image}></div>` : '';
      var html = `<div class='chat-main__body__message'>
                    <div class='chat-main__body__message__name'>${message.user_name}</div>
                    <div class='chat-main__body__message__timestamp'>${message.timestamp}</div>
                    <div class='chat-main__body__message__content'>${message.body}</div>
                    ${imageUrl}
                  </div>`
    }
    return html;
  }

  function scrollToBottom(targetId){
    $(targetId).get(0).scrollTop = $(targetId).get(0).scrollHeight;
  }

  function autoUpdate(){
    if($(".chat-main__body__message")[0]){
      var message_id = $(".chat-main__body__message:last").data("id");
      } else {
      var message_id = 0
      }
    var url = window.location.pathname;
    $.ajax({
      url: url,
      type: "GET",
      data: {
        id: message_id
      },
      dataType: "json"
    })
    .always(function(data){
      $.each(data,function(index, data){
        var html = buildHTML(data);
      $(".chat-main__body").append(html);
      scrollToBottom("#message_top");
      });
    });
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
      $('#new_message')[0].reset();
      $(".chat-main__form__send-btn").prop('disabled', false);
      scrollToBottom("#message_top");
    })
    .fail(function(){
      alert("書き込みエラーです");
    })
  })

  $(function(){
    setInterval(autoUpdate, 5000);
  });

})
