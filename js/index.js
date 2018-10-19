// set main vars
var leaf;
var data;
var url = window.location.href;

//check for leaf query string
if (url.indexOf("leaf") > -1) {
  leaf = url.substring(url.indexOf("=") + 1);
}
else {
  leaf = 0;
}

//get json
(function getData() {

  var request = new XMLHttpRequest();
  request.open('GET', 'data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // success!
      data = JSON.parse(request.responseText);
      buildAd();
    } else {
      // error msg from server
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

}());

//build & style ad
function buildAd() {

  var headline = data.data[leaf].HEADLINE_1;
  var cta = data.data[leaf].CTA;
  // var url = data.data[leaf].URL;
  var bg = data.data[leaf].BACKGROUND_IMAGE;

  document.getElementById("headline").innerHTML = headline;
  document.getElementById("cta").innerHTML = cta;
  document.getElementById("ad").style.backgroundImage = "url(" + bg + ")";
 
  // get wrapper width (again)
  var wrapperWidth = document.getElementById("wrapper").parentNode.offsetWidth;
  var wrapperHeight = document.getElementById("wrapper").parentNode.offsetHeight;

  // make ad match iframe size
  document.getElementById("ad").style.width = wrapperWidth + "px";
  document.getElementById("ad").style.height = wrapperHeight + "px";
  
  // set ad width vars
  var adWidth = document.getElementById("ad").offsetWidth;
  var adHeight = document.getElementById("ad").offsetHeight;
  
  // figure out multiplier value for exact window size
  // var scale = Math.min(wrapperWidth, wrapperHeight) / Math.min(adWidth, adHeight);
  
  // set text var
  var txt = wrapperWidth + " x " + wrapperHeight;
  
  // change layout at 600px breakpoint
  if (wrapperWidth > 600 || wrapperHeight < 60) {
    document.getElementById("action-box").style.width = "50%";
    document.getElementById("action-box").style.height = "100%";
    document.getElementById("action-box").style.right = "0";
  }

  // styles for tiny mobile sizes
  if (wrapperHeight < 60) {
    document.getElementById("headline").style.margin = "0 0 2px 0";
    document.getElementById("headline").style.fontSize = "10px";
    document.getElementById("cta").style.padding = "2px 8px";
    document.getElementById("cta").style.fontSize = "10px";
    document.getElementById("action-box").style.width = "auto";
    document.getElementById("action-box").style.padding = "12px";
    document.getElementById("logo").style.width = "27px";
  }

  // styles for 728x90
  if (wrapperWidth == 728) {
    document.getElementById("headline").style.fontSize = "20px";
    document.getElementById("cta").style.padding = "4px 16px";
    document.getElementById("action-box").style.width = "auto";
  }

  if (wrapperWidth == 970 && wrapperHeight < 70 ) {
    document.getElementById("action-box").style.flexDirection = "row";
    document.getElementById("headline").style.alignSelf = "center";
    document.getElementById("headline").style.fontSize = "18px";
    document.getElementById("headline").style.margin = "0 12px 0 0";
    document.getElementById("cta-wrapper").style.alignSelf = "center";
    document.getElementById("logo").style.width = "36px";
  }

  // scale ad according to multiplier
  // document.getElementById("ad").style.transform = "scale(" + scale + ")";
  
  // inject text
  document.getElementById("value").innerHTML = txt;
  
  // console.log(adWidth + ":" + adHeight);

};