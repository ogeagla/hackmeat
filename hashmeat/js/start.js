$(function(){
    
    $(document).pitchdeck({ top_links : '#navcenter a'});
    
    //titles = ["conglomeration", ]

    $(".nav").click(function(){
    	var sid = $(this).attr("title");
    	//window.location.hash = sid;
    	console.log(sid);
    });

    $(document).scroll(function(){
    	var sid = $("body").find(".current").attr("title");
    	if(window.location.hash != sid) {
    		if(typeof sid === 'undefined') {
    			
    		 	
    		 } else {
    		 	//window.location.hash = sid;
    		 }
    	}
		console.log(sid);
    });


});
