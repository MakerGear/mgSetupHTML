var numPrinters = 0;
/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  //alert("IPstart");
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
    iceServers: []
    }),
  noop = function() {},
  localIPs = {},
  ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
  key;
  // Function declaration for iterateIP
  // Recall from hostname.js, var ip = ["31","-1"] ???
  // the ip argument in this case is a subnet
  function iterateIP(ip) {
      // if this new IP (31, -1) is not found in the array of localIPs, then call the onNewIP function, passing it this ip
      if (!localIPs[ip]) onNewIP(ip);
      localIPs[ip] = true;
  }
   //create a bogus data channel
  pc.createDataChannel("");
  // create offer and set local description
  pc.createOffer().then(function(sdp) {
      // grab each newline of the SDP (Session Description Protocol)
      sdp.sdp.split('\n').forEach(function(line) {
          //for each new line
          if (line.indexOf('candidate') < 0) return;
          // call iterateIP for each ip address found
          line.match(ipRegex).forEach(iterateIP);
      });
      pc.setLocalDescription(sdp, noop, noop);
  }).catch(function(reason) {
      // An error occurred, so handle the failure to connect
  });
  //listen for candidate events
  pc.onicecandidate = function(ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
  //   }
  //catch(err)
  //{
  // alert ("safari");
  // onNewIP = "10.1.1.1";
  // ip = "10.1.1.1";
  // console.log("testss");
  //}
  //console.log("END IP");
}
// Usage
function scanBonjour()
{
  var imgHard = new Image();
  var imgHardUrl = "http://octodemom3.local/static/img/tentacle-20x20@2x.png";
  hardCodeDiv = document.getElementById("hardCode");
  imgHard.onload = function () 
  {
    newOctoUrl = this.src.split("/static");
    hardCodeDiv.innerHTML = hardCodeDiv.innerHTML + '<br /> ' + ' <a target="_blank" href=" ' + newOctoUrl[0] + ' "> ' + ' <img src="images/demeter.png" style="width:50px;">' + '</a> <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> Printer found at ' + newOctoUrl[0] + '</a>'  + '<!-- <a href=" ' + newOctoUrl[0] + ' "><img src=" ' + this.src + '" /> </a>-->' ;
    //numPrinters = numPrinters + 1;
    hardCodeDiv.innerHTML =  "Bonjour Detected! 1 local printer found <br />"  +  hardCodeDiv.innerHTML  ;
    //alert("printer found" + i + this.src);
  }
  imgHard.src = imgHardUrl;
         //  loadJS("http://octodemom31.local/plugin/mgsetup/static/js/hostname.js");
}
function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}
// *** START HERE ***
// This function is called when the 'Scan For Printers' button is clicked
function scanPrinter()
{
  var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  printerDiv = document.getElementById("printers");
  printersFoundDiv = document.getElementById("printersFound");
  scanDiv = document.getElementById("scan");
  printerDiv.innerHTML = "";
  printersFoundDiv.innerHTML = "";
  scanDiv.style.display =  "block"    ;
  numPrinters = 0;
  //alert("scan printer");
  // If we're not using firefox or chrome
  if ((is_firefox != true) && (is_chrome != true)) 
  {
    // Grab the subnet from the DOM
    // Not sure why this value of 10.1.1.2 is hardcoded into the #ipa div
    ip = document.getElementById("ipa").value;
    // alert("IP:" + ip);
    // alert("IP:" + ip);
    subnet = String(ip).split(".");
    // alert(ip);
    // newIp = the subnet
    newIp = subnet[0] + "." + subnet[1] + "." + subnet[2] + "." ; 
    // alert("Got IP! :" + ip);
    var img = new Array();
    var topScan = 256;
    // Iterate through all 255 ip addresses on this subnet and populate the DOM with image tags for all 255 possible urls of the tentacle images
    for ( i = 0; i < topScan + 1; i ++)
    {
      var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
      imageDiv = document.getElementById("images");
      imageDiv.innerHTML = imageDiv.innerHTML + '<img src="' + imageUrl  + '" />';
    }
    var scanCount = 0;
    // Iterate through all 255 ip addresses on this subnet
    for ( i = 0; i < topScan + 1; i ++)
    {
      var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
      var octoUrl = 'http://' + newIp +  i + '';
      //console.log(imageUrl);
      img[i] = new Image();
      img[i].onload = function () 
      {
        //alert(allText);
        //console.log("tra");
        //console.log();
        //  var hostName = " test";
        // Remember, we're in a function handler for an image loaded from the server, so this.src is the url of the image loaded
        newOctoUrl = this.src.split("/static");
        // Load the hostname.js javascript file from the printer - this file contains the printer's local IP address (e.g. 31, -1)
        // this file contains the following line: var ip = ["31","-1"];
        loadJS(newOctoUrl[0] + "/plugin/mgsetup/static/js/hostname.js");
        //a.innerHTML = String(i);
        nip = newOctoUrl[0].split(".");
        console.log("kkksaaaaaassssdiv"+i);
        // nip[3] is the last group of the ip address (e.g. 31)
        holderDiv = document.getElementById("div"+nip[3].toString());
        holderDiv.style.display = "block";
        holderDiv.innerHTML = holderDiv.innerHTML +  '<br /><br /><span id="ip'+'"></span>'  + ' <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> ' + ' <img src="images/demeter.png" style="width:50px;">' + '</a> <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> Printer found at ' + newOctoUrl[0] + '</a>'  + ' <!--<a href=" ' + newOctoUrl[0] + ' "><img src=" ' + this.src + '" /> </a>-->' ;
        numPrinters = numPrinters + 1;
        printersFoundDiv.innerHTML =numPrinters + " IP printers found <br />"   ;
        //alert("printer found" + i + this.src);
        scanCount = scanCount + 1;
      }
      img[i].onerror = function () 
      {
        //console.log('error' + scanCount);
        scanCount = scanCount + 1;
        //cheating
        if(scanCount > 200 )
        {
          scanDiv.style.display =  "none"    ;
          //alert("last errror");//printersFoundDiv.innerHTML = numPrinters + " printers found <br />"   ;
        }
      }
      // img[i].onload =  '; 
      // img[i].onerror = alert("bad" + i);
      // Try to load the image at this iteration of the ip address. If the image loads, the onload callback will trigger, if the images fails to load, the onerror callback will trigger
      img[i].src = imageUrl;
    }
  }
  else
  // We're running either Firefox or Chrome
  {
    // Call getUserIP, passing it this anonymous function
    getUserIP(function(ip)
    {
    // This anonymous function accepts a subnet as a parameter, then
    //   iterates through all 255 ip addresses on the given subnet and updates the DOM with found octoprint instances
      console.log(ip);
     // alert("IP:" + ip);
      subnet = String(ip).split(".");
     //alert(ip);
      newIp = subnet[0] + "." + subnet[1] + "." + subnet[2] + "." ; 
     // alert("Got IP! :" + ip);
      var img = new Array();
      var topScan = 256;
      // Iterate through all 256 ip addresses on this subnet
      for ( i = 0; i < topScan + 1; i ++)
      {
        var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
        imageDiv = document.getElementById("images");
        imageDiv.innerHTML =    imageDiv.innerHTML + '<img src="' + imageUrl  + '" />';
      }
      var scanCount = 0;
      // Iterate through all 256 ip addreses on subnet
      for ( i = 0; i < topScan + 1; i ++)
      {
        var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';
        var octoUrl = 'http://' + newIp +  i + '';
        //console.log(imageUrl);
        img[i] = new Image();
        // Attach a event handler to trigger if we're able to load the tentacle image on this ip address (there must be a server here)
        img[i].onload = function () 
        {
  			  //alert(allText);
  		    //console.log("tra");
  			  //console.log();
          //  var hostName = " test";
          newOctoUrl = this.src.split("/static");
          loadJS(newOctoUrl[0] + "/plugin/mgsetup/static/js/hostname.js");
          //a.innerHTML = String(i);
          nip = newOctoUrl[0].split(".");
          console.log("kkksaaaaaassssdiv"+i);
          holderDiv = document.getElementById("div"+nip[3].toString());
          holderDiv.style.display = "block";
          // Update the DOM with the newly found printer info
          holderDiv.innerHTML = holderDiv.innerHTML +  '<br /><br /><span id="ip'+'"></span>'  + ' <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> ' + ' <img src="images/demeter.png" style="width:50px;">' + '</a> <a  target="_blank"  href=" ' + newOctoUrl[0] + ' "> Printer found at ' + newOctoUrl[0] + '</a>'  + ' <!--<a href=" ' + newOctoUrl[0] + ' "><img src=" ' + this.src + '" /> </a>-->' ;
          numPrinters = numPrinters + 1;
          printersFoundDiv.innerHTML =numPrinters + " IP printers found <br />"   ;
          //alert("printer found" + i + this.src);
          scanCount = scanCount + 1;
        }
        // Attach an event handler to trigger if we're unable to load the tentacle image
        img[i].onerror = function () 
        {
          //console.log('error' + scanCount);
          scanCount = scanCount + 1;
          //cheating
          if(scanCount > 200 )
          {
            scanDiv.style.display =  "none"    ;
           //alert("last errror");//printersFoundDiv.innerHTML = numPrinters + " printers found <br />"   ;
          }
        }
        // img[i].onload =  '; 
        // img[i].onerror = alert("bad" + i); 
        img[i].src = imageUrl;
      }
    });
  }
};