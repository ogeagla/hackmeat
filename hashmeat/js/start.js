$(function(){
    
    $(document).pitchdeck({ top_links : '#navcenter a'});

    $(".nav").click(function(){
    	var sid = $(this).attr("title");
    	window.location.hash = sid;
    	console.log(sid);
    });

    $(document).scroll(function(){
    	var sid = $("body").find(".current").attr("title");
    	if(window.location.hash != sid) {
    		 window.location.hash = sid;
    	}
		console.log(sid);
    });


});
