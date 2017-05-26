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

          function iterateIP(ip) {
              if (!localIPs[ip]) onNewIP(ip);
              localIPs[ip] = true;
          }

           //create a bogus data channel
          pc.createDataChannel("");

          // create offer and set local description
          pc.createOffer().then(function(sdp) {
              sdp.sdp.split('\n').forEach(function(line) {
                  if (line.indexOf('candidate') < 0) return;
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
    
  
  if ((is_firefox != true) && (is_chrome != true)) 


  {
    ip = document.getElementById("ipa").value;


    // alert("IP:" + ip);


//          alert("IP:" + ip);
          
          subnet = String(ip).split(".");

   //      alert(ip);

          newIp = subnet[0] + "." + subnet[1] + "." + subnet[2] + "." ; 
         // alert("Got IP! :" + ip);


          var img = new Array();
          var topScan = 256;




          for ( i = 0; i < topScan + 1; i ++)
          {
             var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';




            imageDiv = document.getElementById("images");

            imageDiv.innerHTML =    imageDiv.innerHTML + '<img src="' + imageUrl  + '" />';

          }



          var scanCount = 0;

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




                newOctoUrl = this.src.split("/static");


                 loadJS(newOctoUrl[0] + "/plugin/mgsetup/static/js/hostname.js");


            //a.innerHTML = String(i);
                 nip = newOctoUrl[0].split(".");



             console.log("kkksaaaaaassssdiv"+i);

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

              img[i].src = imageUrl;


          }





  }

  else
  {
        getUserIP(function(ip)
        {
          console.log(ip);

         // alert("IP:" + ip);
          
          subnet = String(ip).split(".");

         //alert(ip);

          newIp = subnet[0] + "." + subnet[1] + "." + subnet[2] + "." ; 
         // alert("Got IP! :" + ip);


          var img = new Array();
          var topScan = 256;




          for ( i = 0; i < topScan + 1; i ++)
          {
             var imageUrl = 'http://' + newIp +  i + '/static/img/tentacle-20x20.png';




            imageDiv = document.getElementById("images");

            imageDiv.innerHTML =    imageDiv.innerHTML + '<img src="' + imageUrl  + '" />';

          }



          var scanCount = 0;

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




                newOctoUrl = this.src.split("/static");


                 loadJS(newOctoUrl[0] + "/plugin/mgsetup/static/js/hostname.js");


            //a.innerHTML = String(i);
                 nip = newOctoUrl[0].split(".");



             console.log("kkksaaaaaassssdiv"+i);

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

              img[i].src = imageUrl;


          }


          
        });
  

  }




};