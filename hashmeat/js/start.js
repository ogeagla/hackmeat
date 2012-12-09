$(function(){
    
    $(document).pitchdeck({ top_links : '#navcenter a'});

    $(".nav").click(function(){
    	var sid = $(this).attr("title");
    	console.log(sid);
    });

    $(document).scroll(function(){
    	var sid = $("body").find(".current").attr("title");
		console.log(sid);
    });


});