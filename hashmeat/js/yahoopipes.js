function get_yahoo_pipes() {

urlStr = "http://pipes.yahoo.com/pipes/pipe.run?_id=bc70b0517a440a21f72ba84627a754d1&_render=json&q=hashmeat&_callback=?";
$.getJSON(urlStr,
function(data) {
	var count = data.count;
	var arr = [];
	for(var i = 0; i < count; i++) {
		var obj = data.value.items[i];
		
		var text = obj.content;
		var countVal = parseInt(obj['y:repeatcount']);
		
		var arrObj = {tag: text, count: countVal};
		arr.push(arrObj);
		//var count = obj.y:repeatcount;
		
	}
	
	var x = 4;
	
});


}
