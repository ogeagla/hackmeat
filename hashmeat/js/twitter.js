
jQuery(function() {

  function get_representatives(position) {
    urlStr1 = "http://services.sunlightlabs.com/api/legislators.allForLatLong.json";
  	var lat = position.coords.latitude;
	  var long = position.coords.longitude;
	  var akey = "0eb72fee736c4d518acabf303ad90dce";
	  var bullShitJsonpParameter = "?";
	  urlStr1 = urlStr1 + "?apikey=" + akey + "&latitude=" + lat + "&longitude=" + long + "&jsonp=?";
	
  	$.getJSON(urlStr1, 
	  function(data) {
		  write_representatives(data);
		  bind_tweet_button("test_message", get_reps_handles(data));
	  });
  }

  function get_representatives_by_zip(zipcode) {
    urlStr1 = "http://services.sunlightlabs.com/api/legislators.allForZip.json";
    var akey = "0eb72fee736c4d518acabf303ad90dce";
    var bullShitJsonpParameter = "?";
    urlStr1 = urlStr1 + "?apikey=" + akey + "&zip=" + zipcode + "&jsonp=?";
  
    $.getJSON(urlStr1, 
    function(data) {
      write_representatives(data);
      bind_tweet_button("test_message", get_reps_handles(data));
    });
  }

  function success(position) {
    var s = jQuery('#status');

    if (s.className == 'success') {
    // not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
    return;
    }
  
    var reps = jQuery("#reps");
    get_representatives(position);

  }

  function error(msg) {
    bind_tweet_button("MESSAGE HERE", "");
  }

  function write_representatives(json) {
    jQuery("#reps").empty();
    legislators = json.response.legislators;
    for (var i = 0; i < legislators.length; i++) {
      var legislator = legislators[i].legislator;
      var rep = jQuery("<div class='rep'></div>").appendTo("#reps");
      bioguide_id = legislator.bioguide_id;
      rep.append("<img class='headshot' src='img/congress/small/"+bioguide_id+".jpg'>")
      rep.append("<span class='name'>"+legislator.title+". "+legislator.lastname+" ("+legislator.party+")</span>");
    }
  }

  function get_reps_handles(json) {
    //var obj = jQuery.parseJSON(json);
    legislators = json.response.legislators;
    handles = "";
    for (var i = 0; i < legislators.length; i++) {
      var legislator = legislators[i].legislator;
      if (legislator.twitter_id != "")
        handles += "@" + legislator.twitter_id + " ";
    }
    return handles;
  }

  function bind_tweet_button(message, handles){
    jQuery('#tweet-button').click(function() {
      window.open("http://twitter.com/share?url=http://www.hashmeat.org&hashtags=hashmeat&text="+encodeURI(message+" "+handles),"tweetwindow","menubar=1,resizable=1,scrollbar=1,height=400, width=560, left=200, top=200");
    });
  }

  function bind_correct_links() {
    jQuery('#correct #showform').click(function(){
      jQuery('#zipcodeform').slideToggle('fast');
    });
    jQuery('#zipcodeform a').click(function(){
      var zip = jQuery('#zip').val();
      get_representatives_by_zip(zip);
      //jQuery('#zipcodeform').slideToggle('fast');
    });
  }
  bind_correct_links();

  jQuery(function(){
    jQuery('#twitterstream').liveTwitter('hashmeat', {limit: 4, imageSize: 32, rate: 1000}, function(){
    });
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('not supported');
  }

});
