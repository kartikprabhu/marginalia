# Marginalia

Marginalia (or annotations) are comments addressed to a particular part of a webpage (or blog post) instead of the entire page. This is a javascript to implement an indieweb-style marginalia system using [fragmention](http://www.kevinmarks.com/fragmentions.html). See example post using this code: [Marginalia](https://kartikprabhu.com/article/marginalia)

## Customisation

The script has a few variables in the beginning that you can set to customise some of the HTML added by marginalia.js. These are:

```CONTAINER_EXTRA_CLASS``` is a space-separated string of classes you want to add to the container of the marginalia. defaults to ```""``` empty string.

```BTN_EXTRA_CLASS``` is a space-separated string of classes you want to add to the button toggling the marginlaia. defaults to ```""``` empty string.

```BTN_HTML_SHOW``` is the HTML inside the button element when marginalia is hidden. defaults to ```"<span>Show</span>"```.

```BTN_HTML_HIDE``` is the HTML inside the button element when marginalia is visible. defaults to ```"<span>Hide</span>"```.


## Usage Example

The marginalia script uses certain mark-up in the HTML to identify marginalia. The container for all comments should have an ```id=response-list ``` while each marginalia-comment element should have a data attribute containing the fragmention. The next example uses the custom variables ```CONTAINER_EXTRA_CLASS = "my-container"``` and ```BTN_EXTRA_CLASS = "my-button"```:

```html
<article>
	<p>One morning, when Gregor Samsa woke from troubled dreams, he found
himself transformed in his bed into a horrible vermin.  He lay on
his armour-like back, and if he lifted his head a little he could
see his brown belly, slightly domed and divided by arches into stiff
sections.  The bedding was hardly able to cover it and seemed ready
to slide off any moment.  His many legs, pitifully thin compared
with the size of the rest of him, waved about helplessly as he
looked.</p>

	<p>"What's happened to me?" he thought.  It wasn't a dream.  His room,
a proper human room although a little too small, lay peacefully
between its four familiar walls.  A collection of textile samples
lay spread out on the table - Samsa was a travelling salesman - and
above it there hung a picture that he had recently cut out of an
illustrated magazine and housed in a nice, gilded frame.  It showed
a lady fitted out with a fur hat and fur boa who sat upright,
raising a heavy fur muff that covered the whole of her lower arm
towards the viewer.</p>

	<ol id="response-list">
		<li>This is a normal comment.</li>
		<li data-fragmention="##Samsa+woke+from+troubled+dreams">This is a marginalia-comment.</li>
	</ol>
</article>
```

On execution, the marginalia.js _moves_ the marginalia-comments _right after_ the appropriate element inside a container of the same tag name (in this case ```ol```) with ``` class="marginalia-list" ```

```html
<ol class="marginalia-list my-container">
	<li data-fragmention="##Samsa+woke+from+troubled+dreams">This is a marginalia-comment.</li>
</ol>
```

It also adds a button to toggle marginalia visibility _inside_ the referenced element. The button is marked up as:

```html
<button class="marginalia-button my-button"><span>Show</span></button>
```
when the marginalia is hidden and with text "Hide" when marginalia are visible. So the relevant paragraph looks like this:

```html
	<p>One morning, when Gregor Samsa woke from troubled dreams, he found
himself transformed in his bed into a horrible vermin.  He lay on
his armour-like back, and if he lifted his head a little he could
see his brown belly, slightly domed and divided by arches into stiff
sections.  The bedding was hardly able to cover it and seemed ready
to slide off any moment.  His many legs, pitifully thin compared
with the size of the rest of him, waved about helplessly as he
looked.<button class="marginalia-button my-button"><span>Show</span></button></p>
<ol class="marginalia-list my-container">
	<li data-fragmention="##Samsa+woke+from+troubled+dreams">This is a marginalia-comment.</li>
</ol>
```

On click the button adds an attribute ``` data-marginalia-active ``` to the parent element like so ```<p data-marginalia-active="">One morning, when Gregor Samsa...</p>```

All styling can be done using these classes as CSS hooks.




## Go forth

Now [use this yourself](https://github.com/kartikprabhu/marginalia) and [give feedback](https://github.com/kartikprabhu/marginalia/issues).
