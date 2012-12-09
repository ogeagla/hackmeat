
jQuery(function() {

  var tweets = {main: "Food monopolies affect all of us!", 
                companies: "4 companies product 70% of pork.",
                health: "Diabetes, antibiotic resistance, obesity - brought to you by food monopolies.",
                pollution: "Meat monopolies are shitty.",
                economy: "You can't support farmers if you're taking money from food monopolies.",
                tags: "See what people are tweeting about meat."};

  function get_representatives(position) {
    urlStr1 = "http://services.sunlightlabs.com/api/legislators.allForLatLong.json";
  	var lat = position.coords.latitude;
	  var long = position.coords.longitude;
	  var akey = "0eb72fee736c4d518acabf303ad90dce";
	  var bullShitJsonpParameter = "?";
	  urlStr1 = urlStr1 + "?apikey=" + akey + "&latitude=" + lat + "&longitude=" + long + "&jsonp=?";
	
  	$.getJSON(urlStr1, 
	  function(data) {
		  var handles = write_representatives(data);
		  bind_tweet_button(tweets["main"], handles);
	  });
  }

  function get_representatives_by_zip(zipcode) {
    urlStr1 = "http://services.sunlightlabs.com/api/legislators.allForZip.json";
    var akey = "0eb72fee736c4d518acabf303ad90dce";
    var bullShitJsonpParameter = "?";
    urlStr1 = urlStr1 + "?apikey=" + akey + "&zip=" + zipcode + "&jsonp=?";
  
    $.getJSON(urlStr1, 
    function(data) {
      var handles = write_representatives(data);
      bind_tweet_button(tweets["main"], handles);
    });
  }

  function successGeo(position) {
    var reps = jQuery("#reps");
    get_representatives(position);
  }

  function errorGeo(msg) {
    bind_tweet_button(tweets["main"], "");
  }

  function write_representatives(json) {
    jQuery("#reps").empty();
    legislators = json.response.legislators;
    handles = "";
    for (var i = 0; i < Math.max(legislators.length,3); i++) {
      var legislator = legislators[i].legislator;
      var rep = jQuery("<div class='rep'></div>").appendTo("#reps");
      bioguide_id = legislator.bioguide_id;
      rep.append("<img class='headshot' src='img/congress/medium/"+bioguide_id+".jpg'>");
      rep.append("<div class='repinfo'>");
      rep.append("<span class='name'>"+legislator.title+" "+legislator.lastname+" ("+legislator.party+")</span>");
      rep.append("</div>");
      if(legislator.twitter_id != null || legislator.twitter_id != ""){
        handles += "@" + legislator.twitter_id + " ";
      }
    }
    $("#twitternav").addClass("withreps");
    jQuery("#reps").data("handles", handles);
    return handles;
  }

  function get_reps_handles() {
    var handles = jQuery("#reps").data("handles");
    alert(handles);
  }

  function bind_tweet_button(message, handles){
    jQuery("#tweetmsg").html(message);
    jQuery('#tweet-button').click(function() {
      window.open("http://twitter.com/share?url=http://hashmeat.org&hashtags=hashmeat&text="+encodeURI(message+" "+handles),"tweetwindow","menubar=1,resizable=1,scrollbar=1,height=400, width=560, left=200, top=200");
    });
  }

  function bind_correct_links() {
    jQuery('#correct #showform').click(function(){
      jQuery('#zipcodeform').slideToggle('fast');
    });
    jQuery('#zipcodeform a').click(function(){
      var zip = jQuery('#zip').val();
      get_representatives_by_zip(zip);
      jQuery('#zipcodeform').slideToggle('fast');
    });
  }
  bind_correct_links();

  jQuery(function(){
    jQuery('#twitterstream').liveTwitter('hashmeat', {limit: 8, imageSize: 32, rate: 1000}, function(){
    });
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
  } else {
    error('not supported');
  }

});
