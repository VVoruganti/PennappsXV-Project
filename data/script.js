$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "test.csv",
        dataType: "text",
        success: function(data) {console.log(data);}
     });
});
