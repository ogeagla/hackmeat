
$(function() {

  function get_representatives(position) {

    jQuery.ajax({
      type: 'GET',
      url: 'http://services.sunlightlabs.com/api/',
      jsonp: 'legislators.allForLatLong.json',
      dataType: 'jsonp',
      data: 'apikey=0eb72fee736c4d518acabf303ad90dce&latitude=35.778788&longitude=-78.787805',
      success: function(data) {
        return data;
      }
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

  function bind_tweet_button(message, handles){
    jQuery('#tweet-button').click(function() {
      window.open("http://twitter.com/share?url=http://www.hashmeat.org&hashtags=hashmeat&text="+encodeURI(message+" "+handles),"tweetwindow","menubar=1,resizable=1,scrollbar=1,height=400, width=560, left=200, top=200");
    });
  }
  bind_tweet_button("MESSAGE HERE", "")

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('not supported');
  }

});
