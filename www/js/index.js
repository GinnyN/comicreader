/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var imagePath;
var filesystem;
var zip;
var resourceDIR, resourceURL;

function loadImage(data){
  if (data) {
    var tmp = "data:";
    tmp += "image/jpeg;base64,";
   /* switch(getFileExtension(url).toLowerCase()) {
        case 'gif' :
            tmp += "image/gif;base64,";
            break;
        case 'png' :
            tmp += "image/png;base64,";
            break;
        case 'jpg':
        case 'jpeg':
            tmp += "image/jpeg;base64,";
            break;
    }*/
    tmp += Base64(data);
  }
  return tmp;
}
var Base64 = function(input) {
    var StringMaker = undefined;
    if(navigator.userAgent.toLowerCase().indexOf(" chrome/")>=0||navigator.userAgent.toLowerCase().indexOf(" firefox/")>=0||
    navigator.userAgent.toLowerCase().indexOf(' gecko/')>=0){StringMaker=function(){this.str="";this.length=0;
    this.append=function(s){this.str+=s;this.length+=s.length;};this.prepend=function(s){this.str=s+this.str;this.length+=s.length;};
    this.toString=function(){return this.str;}}}else{StringMaker=function(){this.parts=[];this.length=0;this.append=function(s){
    this.parts.push(s);this.length+=s.length;};this.prepend=function(s){this.parts.unshift(s);this.length+=s.length;};
    this.toString=function(){return this.parts.join('');}}}
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o=new StringMaker(),a,b,c,d,f,g,h,i=0;while(i<input.length){a=input.charCodeAt(i++);
    b=input.charCodeAt(i++);c=input.charCodeAt(i++);d=a>>2;f=((a&3)<<4)|(b>>4);g=((b&15)<<2)|(c>>6);h=c&63;
    if(isNaN(b)){g=h=64;}else if(isNaN(c)){h=64;}o.append(keyStr.charAt(d)+keyStr.charAt(f)+keyStr.charAt(g)
    +keyStr.charAt(h));}return o.toString();
}

function loading(url, filename){
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    filesystem = fs;
    imagePath = fs.root.fullPath + "/" + filename
    var fileTransfer = new FileTransfer();

    fileTransfer.download(url, imagePath, function (entry) {
       console.log("Hello!"); // entry is fileEntry object
       
       var req = getXMLHttpObj();
      req.open('GET', imagePath, false);
      req.overrideMimeType('text/plain; charset=x-user-defined');
      req.send();
      zip = new JSZip(req.responseText);
      $.each(zip.file(/.jpg/), function(i,text){ 
        $("#Gallery").append("<li><a href=''><img src=''/></a></li>");
        $("#Gallery li:last-child a").attr("href",loadImage(text["data"]));
        $("#Gallery li:last-child img").attr("src",loadImage(text["data"]));
      })
      myPhotoSwipe = $("#Gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
    });
  });
}

function unzipping()
{
  console.log("Hola!");
  dir = "/Users/xcontreras/Library/Application Support/iPhone Simulator/6.0/Applications/ED95F016-FE03-4845-ACD4-1206C88197BD/Documents/sigueDestino.zip";
  var req = getXMLHttpObj();
  req.open('GET', dir, false);
  req.overrideMimeType('text/plain; charset=x-user-defined');
  req.onreadystatechange=function()
  {
  if (req.readyState==4)
    {
      zip = new JSZip(req.responseText);
      $.each(zip.file(/.jpg^/), function(i,text){ 
        $("#Gallery").append("<li><a href=''><img src=''/></a></li>");
        $("#Gallery li:last-child a").attr("href",loadImage(text["data"]));
        $("#Gallery li:last-child img").attr("src",loadImage(text["data"]));
      })
      myPhotoSwipe = $("#Gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
    }
  }
  req.send();
  
}

function getXMLHttpObj(){
    if(typeof(XMLHttpRequest)!='undefined') {
        return new XMLHttpRequest();
    }
    var axO = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'], i;
    for (i = 0; i < axO.length; i++) {
        try{
            return new ActiveXObject(axO[i]);
        }catch(e){}
    }
    return null;
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

      loading("http://ginnyn.dreamhosters.com/comic/sigueTuDestino.zip", "sigueDestino.zip");

        
        //var myPhotoSwipe = $("#Gallery a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });

        //unzipping();

        console.log('Received Event: ' + id);
    }
};
