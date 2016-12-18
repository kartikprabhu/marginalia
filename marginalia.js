'use strict';

(function(){

	// mustard-cutting
	if (!document.querySelector || !document.querySelectorAll) {
		return;
	}

	var
	CONTAINER_EXTRA_CLASS = "",
	BTN_EXTRA_CLASS = "",
	BTN_HTML_SHOW = "<span>Show</span>",
	BTN_HTML_HIDE = "<span>Hide</span>";

	function insertAfter(referenceNode, newNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

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

	function toggle_marginalia(el, button) {

		var attr = 'data-marginalia-active';

		var matches = document.querySelectorAll("[data-marginalia-active]");

		for(var i = 0, node; node = matches[i]; i++) {
			if (node != el) {
				node.removeAttribute(attr);
				var btn = node.querySelector(".marginalia-button");
				btn.innerHTML = BTN_HTML_SHOW;
			}
		}

		if (el.hasAttribute(attr)) {
			// if active make inactive
			el.removeAttribute(attr);
			button.innerHTML = BTN_HTML_SHOW;

		}else{
			// if inactive make active
			el.setAttribute(attr, '');
			button.innerHTML = BTN_HTML_HIDE;
		}

	}

	function add_marginalia(element, note) {

		var ol = element.nextElementSibling || false;

		if (!ol || !ol.classList.contains("marginalia-list")) {

			ol = document.createElement(CONTAINER_NAME);
			ol.setAttribute('class', 'marginalia-list '+CONTAINER_EXTRA_CLASS);

			var button = document.createElement('button');
			button.setAttribute('class', 'marginalia-button '+BTN_EXTRA_CLASS);
			button.innerHTML = BTN_HTML_SHOW;

			button.addEventListener('click', function() {toggle_marginalia(element, button);}, false)

			element.appendChild( button );
			insertAfter(element, ol);

		}
		ol.appendChild(note);
	}


	function process_marginalia(el) {

		var frag = el.getAttribute("data-fragmention")

		// if fragmention exists
		if (frag) {

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
			if (element && element != document) {

				add_marginalia(element, el);

			}

		}

	}


	// get all responses and process them
	var container = document.querySelector('#response-list');
	//if container for responses is found then process
	if (container) {
		var CONTAINER_NAME = container.tagName;
		var responses = container.querySelectorAll('[data-fragmention]');
	
		for (var i = 0; i < responses.length; i++) {

			process_marginalia(responses[i]);

		}
	}
})();
