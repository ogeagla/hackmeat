
$(function() {

  function get_representatives(position) {

    /*jQuery.ajax({
      type: 'GET',
      url: 'http://services.sunlightlabs.com/api/',
      jsonp: 'legislators.allForLatLong.json',
      dataType: 'jsonp',
      data: 'apikey=0eb72fee736c4d518acabf303ad90dce&latitude=35.778788&longitude=-78.787805',
      success: function(data) {
        return data;
      }
    });*/
    urlStr1 = "http://services.sunlightlabs.com/api/legislators.allForLatLong.json";
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	var akey = "0eb72fee736c4d518acabf303ad90dce";
	var bullShitJsonpParameter = "?";
	urlStr1 = urlStr1 + "?apikey=" + akey + "&latitude=" + lat + "&longitude=" + long + "&jsonp=?";
	
	/*$.getJSON(urlStr1,{apikey: akey, latitude: lat, longitude : long, jsonp : bullShitJsonpParameter}, function(data) {
		alert("works");
	});*/
	//http://services.sunlightlabs.com/api/legislators.allForLatLong.json?apikey=0eb72fee736c4d518acabf303ad90dce&latitude=35.778788&longitude=-78.787805&jsonp=jQuery16404366799786632103_1355022158589&_=1355022165324
	$.getJSON(urlStr1, 
	function(data) {
		write_representatives(data);
		bind_tweet_button("test_message", get_reps_data(data));
	});
  }

  function success(position) {
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

  function error(msg) {
    var s = jQuery('#status');
    s.html("failed");
  }

  function write_representatives(json) {
    //var obj = jQuery.parseJSON(json);
    legislators = json.response.legislators;
    for (var i = 0; i < legislators.length; i++) {
      var legislator = legislators[i].legislator;
      var rep = jQuery("<div class='rep'></div>").appendTo("#reps");
      bioguide_id = legislator.bioguide_id;
      rep.append("<img class='headshot' src='img/congress/medium/"+bioguide_id+".jpg'>")
      rep.append("<span class='name'>"+legislator.firstname+" "+legislator.middlename+" "+legislator.lastname+"</span>");
      rep.append("<span class='meta'>"+legislator.title+" "+legislator.state+" ("+legislator.party+")</span>");
      rep.append("<a href='http://www.twitter.com/"+legislator.twitter_id+"' class='twitter'>@"+legislator.twitter_id+"</a>");
    }
  }

  function get_reps_handles(json) {
    //var obj = jQuery.parseJSON(json);
    legislators = json.response.legislators;
    handles = "";
    for (var i = 0; i < legislators.length; i++) {
      var legislator = legislators[i].legislator;
      handles += "@" + legislator.twitter_id + " ";
    }
    return handles;
  }

  function bind_tweet_button(message, handles){
    jQuery('#tweet-button').click(function() {
      window.open("http://twitter.com/share?url=http://www.hashmeat.org&hashtags=hashmeat&text="+encodeURI(message+" "+handles),"tweetwindow","menubar=1,resizable=1,scrollbar=1,height=400, width=560, left=200, top=200");
    });
  }
  //bind_tweet_button("MESSAGE HERE", "");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('not supported');
  }

});
