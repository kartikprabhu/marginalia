'use strict';

(function(){

	function getElementsByText(scope, text) {
		// iterate descendants of scope
		for (var all = scope.childNodes, index = 0, element, list = []; (element = all[index]); ++index) {
			// conditionally return element containing visible, whitespace-insensitive, case-sensitive text (a match)
			if (element.nodeType == 1 && (element.innerText || element.textContent || '').replace(/\s+/g, ' ').indexOf(text) !== -1) {
				list = list.concat(getElementsByText(element, text));
			}
		}

		// return scope (no match)
		return list.length ? list : scope;
	}

	function toggle_marginalia(el, button){

		var attr = 'data-marginalia-active';

		var matches = document.querySelectorAll("[data-marginalia-active]");

		for(var i = 0, node; node = matches[i]; i++){
			if(node != el){
			node.removeAttribute(attr);
			var btn = node.querySelector(".marginalia-button");
			btn.innerHTML = "<span>Show</span>";
			btn.setAttribute('class', 'marginalia-button');
			if(node == el){alert("blergh");}
			}
		}

		if(el.hasAttribute(attr)){
			// if active make inactive
			el.removeAttribute(attr);
			button.innerHTML = "<span>Show</span>";
			button.setAttribute('class', 'marginalia-button');

		}else{
			// if inactive make active
			el.setAttribute(attr, '');
			button.innerHTML = "<span>Hide</span>";
			button.setAttribute('class', 'marginalia-button');
		}

	}

	function add_marginalia(element, note){

		var ol = element.querySelector('.marginalia-list') || false;

		if(!ol){

			ol = document.createElement('ol');
			ol.setAttribute('class', 'marginalia-list');

			var button = document.createElement('button');
			button.setAttribute('class', 'marginalia-button');
			button.innerHTML = "<span>Show</span>";
			button.addEventListener('click', function(){toggle_marginalia(element, button);}, false)

			element.appendChild( button );
			element.appendChild( ol );

		}
		var note_copy = note.cloneNode(true);
		note_copy.removeAttribute('id');
		ol.appendChild(note_copy);
	}


	function process_marginalia(el){

		var frag = el.getAttribute("data-fragmention")

		// if fragmention exists and is actual fragmention not fragment
		if(frag && frag.substring(0, 2) == "##"){

			// decode frag to string
			var match = decodeURIComponent(frag.substring(2)).replace(/\+/g, ' ').split('  ');
			frag = match[0];
			var fragIndex = parseFloat(match[1]) || 0;

			// search for element with that string
			var
			// get all elements containing text (or document)
			elements = getElementsByText(document, frag),
			// get total number of elements
			length   = elements.length,
			// get index of element
			modulus  = length && fragIndex % length,
			index    = length && modulus >= 0 ? modulus : length + modulus;

			// get element
			var element = length && elements[index];

			// do marginalia things if not whole document
			if(element && element != document){

				add_marginalia(element, el);

			}

		}

	}


	// get all responses and process them
	var responses = document.querySelector('#response-list').children;

	for(var i = 0; i < responses.length; i++){

		process_marginalia(responses[i]);

	}

})();
