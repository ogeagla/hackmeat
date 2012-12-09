
jQuery(document).ready(function() {

  function get_representatives(position) {

	urlStr1 = "http://services.sunlightlabs.com/api/legislators.allForLatLong.json";
	urlStr2 = "http://services.sunlightlabs.com/api/legislators.allForLatLong.json?apikey=0eb72fee736c4d518acabf303ad90dce&latitude=35.778788&longitude=-78.787805&jsonp=?";
	var lat = 35.778788;
	var long = -78.787805;
	var akey = "0eb72fee736c4d518acabf303ad90dce";
	param2 = "jsonpcallback";
	
	/*var jqxhr = $.getJSON(urlStr2, function() {
	  alert("success");
	})
	.success(function() { alert("second success"); })
	.error(function() { alert("error"); })
	.complete(function() { alert("complete"); });

	// perform other work here ...

	// Set another completion function for the request above
	jqxhr.complete(function(){ alert("second complete"); });*/
	url1 = "http://services.sunlightlabs.com/api/legislators.allForLatLong.json";
	
	$.getJSON(urlStr2, function(data) {
		alert("huh");
	}
		
	);
	
	/*$.ajax({
		type:"GET",
		url: urlStr2
		//crossDomain : true,
		//dataType: 'jsonp',
		//cache: true
		success: function(data) {
			
			alert('suc');
		},
		error: function(data) {
			alert('err');
		}
		
		
	});*/
	
    /*$.ajax({
      type: "GET",
      url: url1,
      //jsonp: 'legislators.allForLatLong.json',
      dataType: "jsonp",
      data: {apikey: akey, latitude: lat, longitude: long, jsonp: param2},
      crossDomain : true
      //jsonp: "jsonpcallback"
      //jsonpCallback: "jsonpcallback"
      //jsonpCallback: "jsonpcallback",
      /*success: function(json) {
        return json;
      },
      error: function(error) {
      	return error;
      }
    });*/
  }
  function jsonpcallback(data) {
  	
  	var reps = jQuery("#reps");
  	//reps.append(data.)
  	
  }

  function successGeo(position) {
    var s = jQuery('#status');

    if (s.className == 'success') {
    // not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
    return;
    }
  
    s.html("found you!");
  
    var reps = jQuery("#reps");
    reps.append(position.coords.latitude + " " + position.coords.longitude);
    get_representatives(position);
    

  }

  function errorGeo(msg) {
    var s = jQuery('#status');
    s.html("failed");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  } else {
    error('not supported');
  }

});
