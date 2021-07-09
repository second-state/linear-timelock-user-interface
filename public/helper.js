function onButtonClick(_address) {
      //var address = $('#recipient_address').val();
      var fullUrl = "http://localhost:8001/transfer/" + _address;
      console.log("Full URL: " + fullUrl);
      $.ajax({
        type: "POST",
        url: fullUrl,
        data: '',
        success: function() {
        console.log("ajax");
        },
      });
    }