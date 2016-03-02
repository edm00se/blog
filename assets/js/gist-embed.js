//author: Blair Vanderhoof
//https://github.com/blairvanderhoof/gist-embed
$(function(){
  'use strict';
  var gistMarkerId = 'gist-';
  window.baseurl = '//gist.github.com';

  //find all code elements containing "gist-" the id attribute.
  $('code[id*="' + gistMarkerId + '"]').each(function(){
    var $elem = $(this),
      id,
      url,
      file,
      timestamp = Date.now().toString(),
      callbackFunction = "fun_" + timestamp,
      evalCallbackFunction = "window.fun_" + timestamp + "=function(response){ myCallback(response, '" + timestamp + "'); }",
      data = {};

    $elem.addClass(timestamp);
    eval(evalCallbackFunction);

    id   = $elem.attr('id') || '';
    file = $elem.attr('data-file');

    if(file){
      data.file = file;
    }

    //if the id doesn't begin with 'gist-', then ignore the code block
    if (!id || id.indexOf('gist-') !== 0) return false;

    //make block level so loading text shows properly
    $elem.css('display', 'block');

    //get the numeric id from the id attribute of the element holder
    id = id.substr(0, gistMarkerId.length) === gistMarkerId ? id.replace(gistMarkerId, '') : null;

    //make sure result is a numeric id
    if(!isNaN(parseInt(id, 10))){
      url = baseurl + '/' + id + '.json';
      //loading
      $elem.html('Loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...');
      //request the json version of this gist
      $.ajax({
        type: 'GET',
        async: true,
        jsonpCallback: callbackFunction,
        contentType: "application/json",
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 10000,
        error: function(){
          $elem.html('Failed loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...');
        }
      });
    }else{
      $elem.html('Failed loading gist with incorrect id format: ' + $elem.attr('id'));
    }
  });
});

function getLineNumbers(lineRangeString){
  var lineNumbers = [];
  var lineNumberSections = lineRangeString.split(',');
  for(var k = 0; k < lineNumberSections.length; k++){
    var range = lineNumberSections[k].split('-');
    if(range.length == 2){
      for(var i = parseInt(range[0], 10); i <= range[1]; i++){
        lineNumbers.push(i);
      }
    }
    else if(range.length == 1){
      lineNumbers.push(parseInt(range[0], 10));
    }
  }
  return lineNumbers;
}

function myCallback(response, timestamp){
  var $elem = $('.' + timestamp);
  var line  = $elem.attr('data-line');

  //the html payload is in the div property
  if(response && response.div){
    //add the stylesheet if it does not exist
    if(response.stylesheet && $('link[href="' + response.stylesheet + '"]').length === 0){
      var l = document.createElement("link"),
        head = document.getElementsByTagName("head")[0];

      l.type = "text/css";
      l.rel = "stylesheet";
      l.href = response.stylesheet;
      head.insertBefore(l, head.firstChild);
    }

    $elem.html("<div id='" + timestamp + "'>" + response.div + "</div>");

    if(line){
      var lineNumbers = getLineNumbers(line);
      $('#' + timestamp).find('.line').each(function(index){
        if(($.inArray(index + 1, lineNumbers)) == -1){
          $(this).remove();
        }
      });

      var lineNumber = 1;
      $('#' + timestamp).find('.line-number').each(function(index){
        if(($.inArray(index + 1, lineNumbers)) == -1){
          $(this).remove();
        }
        else{
          $(this).html(lineNumber++);
        }
      });
    }
    if($elem.attr('data-showFooter') && $elem.attr('data-showFooter') == "false"){
      $('#' + timestamp).find('.gist-meta').remove();
    }

    if($elem.attr('data-showLineNumbers') && $elem.attr('data-showLineNumbers') == "false"){
      $('#' + timestamp).find('.line-numbers').remove();
    }
    $('#' + timestamp).find('.gist-file').css('margin-bottom', '0px');
  }else{
    $elem.html('Failed loading gist ' + url);
  }

}