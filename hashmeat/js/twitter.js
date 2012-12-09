
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
    //get_representatives(position);

  }

  function error(msg) {
    var s = jQuery('#status');
    s.html("failed");
  }

  function write_representatives(json) {
    var obj = jQuery.parseJSON(json);
    legislators = obj.response.legislators;
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
  var REPS = '{"response": {"legislators": [{"legislator": {"website": "http://www.gillibrand.senate.gov", "fax": "202-225-1168", "govtrack_id": "412223", "firstname": "Kirsten", "chamber": "senate", "middlename": "E.", "lastname": "Gillibrand", "congress_office": "478 Russell Senate Office Building", "eventful_id": "", "phone": "202-224-4451", "webform": "http://www.gillibrand.senate.gov/contact/", "youtube_url": "http://www.youtube.com/KirstenEGillibrand", "nickname": "", "gender": "F", "district": "Junior Seat", "title": "Sen", "congresspedia_url": "http://www.opencongress.org/wiki/Kirsten_Gillibrand", "in_office": true, "senate_class": "I", "name_suffix": "", "twitter_id": "SenGillibrand", "birthdate": "1966-12-09", "bioguide_id": "G000555", "fec_id": "H6NY20167", "state": "NY", "crp_id": "N00027658", "official_rss": "", "facebook_id": "KirstenGillibrand", "party": "D", "email": "", "votesmart_id": "65147"}}, {"legislator": {"website": "http://www.schumer.senate.gov/", "fax": "202-228-3027", "govtrack_id": "300087", "firstname": "Charles", "chamber": "senate", "middlename": "E.", "lastname": "Schumer", "congress_office": "322 Hart Senate Office Building", "eventful_id": "", "phone": "202-224-6542", "webform": "http://www.schumer.senate.gov/Contact/contact_chuck.cfm", "youtube_url": "http://www.youtube.com/senatorschumer", "nickname": "Chuck", "gender": "M", "district": "Senior Seat", "title": "Sen", "congresspedia_url": "http://www.opencongress.org/wiki/Charles_Schumer", "in_office": true, "senate_class": "III", "name_suffix": "", "twitter_id": "chuckschumer", "birthdate": "1950-11-23", "bioguide_id": "S000148", "fec_id": "S8NY00082", "state": "NY", "crp_id": "N00001093", "official_rss": "", "facebook_id": "chuckschumer", "party": "D", "email": "", "votesmart_id": "26976"}}, {"legislator": {"website": "http://maloney.house.gov/", "fax": "202-225-4709", "govtrack_id": "400251", "firstname": "Carolyn", "chamber": "house", "middlename": "B.", "lastname": "Maloney", "congress_office": "2332 Rayburn House Office Building", "eventful_id": "", "phone": "202-225-7944", "webform": "http://maloney.house.gov/index.php?option=com_email_form&Itemid=73", "youtube_url": "http://www.youtube.com/carolynbmaloney", "nickname": "", "gender": "F", "district": "14", "title": "Rep", "congresspedia_url": "http://www.opencongress.org/wiki/Carolyn_Maloney", "in_office": true, "senate_class": "", "name_suffix": "", "twitter_id": "carolynbmaloney", "birthdate": "1948-02-19", "bioguide_id": "M000087", "fec_id": "H2NY14037", "state": "NY", "crp_id": "N00000078", "official_rss": "", "facebook_id": "RepCarolynMaloney", "party": "D", "email": "", "votesmart_id": "26978"}}]}}'
  write_representatives(REPS);

  function get_reps_handles(json) {
    var obj = jQuery.parseJSON(json);
    legislators = obj.response.legislators;
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
  bind_tweet_button("MESSAGE HERE", get_reps_handles(REPS));

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('not supported');
  }

});
