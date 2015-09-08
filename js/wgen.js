// WikiText Generator 
// Author: Samuele Papa
// Version: 1.0 
/*
The MIT License (MIT)

Copyright (c) 2015 Samuele Papa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*
*
*	Changelog
*	1.0:
*		-First release.
*
*/

//// Writing style
//      ClassName
//      varName
//      function_name


	
var WGen = (function (global) {
    
    "use strict";
    
    var sourceText, output, words, chars, maxtype = 'chars', maximum = 1000, current;
	
	//initialize variables
	function init(max, typ) {
		sourceText = output = "";
		current = 0;
        maxtype = typ;
        chars = 1000;
        maximum = max;
	}
	//Collect data from Wikipedia and 
	function gather_page(callback) {
		
		var rndnum = Math.floor(Math.random() * 999999).toString();
		
		MediaWikiJS('https://en.wikipedia.org',
			{
				action: 'query',
				generator: 'random',
				prop: 'extracts',
				grnnamespace : '0',
				exchars: '' + chars,
				format: 'json',
				requestid: rndnum
			},
			function (data) {
                output = parse_results(data, callback);
                if (typeof (callback) === "function") {
					callback({output: output, progress: Math.floor(current / maximum * 100) / 100});
                }
			});
	}
	function parse_results(obj, callback) {
		//Temp storage of text
		var text = "";
		//To get to the text without knowing the id of the page
		for (var a in obj.query.pages){
            //Get text and remove HTML tags, links and "..."
			text = obj.query.pages[a].extract.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, " ").replace(/\.\.\./gi,'').replace('|https?://www\.[a-z\.0-9]+|i', '');
		}
		//Add the text gathered to the other already existent
		sourceText+= text.replace(/  +/g, ' ');
			
		if (maxtype == 'words'){
			words = sourceText.split(' ').slice(0,maximum);
			words = shuffle(words);
			current = words.length;
		}else if (maxtype == 'chars'){
			words = sourceText.substring(0,maximum).split(' ');
			words = shuffle(words);
			current = sourceText.length
		}
		
		if(current<maximum){
			gather_page(callback)
		}
		
		return words.join(' ');
	}
	// credit:http://bost.ocks.org/mike/shuffle/
	function shuffle(array,kernel) {//kernel che be used to implement new methods of randomization
 			var m = array.length, t, i;
 			while (m) {
   				i = Math.floor(Math.random() * m--);
   				t = array[m];
   				array[m] = array[i];
   				array[i] = t;
 			}
 			return array;
	}
	//public functions
	return {
		gatherpage:gather_page,
		init:init
	};
})(window);