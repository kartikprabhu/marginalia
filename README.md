# Marginalia

Marginalia (or annotations) are comments addressed to a particular part of a webpage (or blog post) instead of the entire page. This is a javascript to implement an indieweb-style marginalia system using [webmention](https://indiewebcamp.com/webmention) and [fragmention](http://www.kevinmarks.com/fragmentions.html).


## Usage Example

The marginalia script uses certain mark-up in the HTML to identify marginalia. The container for all comments should have an ```html id=response-list ``` while each marginalia-comment element should have a data attribute containing the fragmention as in the following example:

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

On execution, the marginalia.js _moves_ the marginalia-comments to the appropriate element inside an ordered list with ``` class="marginalia-list" ```

```html
<ol class="marginalia-list"><li data-fragmention="##Samsa+woke+from+troubled+dreams">This is a marginalia-comment.</li></ol>
```

It also adds a button to toggle marginalia visibility. The button is marked up as:

```html
<button class="marginalia-button"><span>Show</span></button>
```
when the marginalia is hidden and with text "Hide" when marginalia are visible. On click the button adds an attribute ``` data-marginalia-active ``` to the parent element.

All styling can be done using these classes as CSS hooks. See example post: [Marginalia](https://kartikprabhu.com/article/marginalia)




## Go forth

Now [use this yourself](https://github.com/kartikprabhu/marginalia) and [give us feedback](https://github.com/kartikprabhu/marginalia/issues).
