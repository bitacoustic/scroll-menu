# scroll-menu
Easy menu system for a single-page site, with animated scrolling.

TODO: Add a more thorough description and instructions

## Example of relevant code

## HTML
Track which content block is in view and give its associated label the class "active". To mark the content blocks and labels, give them IDs like so:

If idBase is "lorem", function will look for:
  1) containers having ids "lorem-container-1", "lorem-container-2", etc.
  2) labels having ids "lorem-label-1", "lorem-label-2", etc.
where the numbers (or other unique identifying strings) create an association between the container and label.
 
```
<header id="label-container">
    <div id="lorem-label-1" class="lorem-label">Lorem 1</div>
    <div id="lorem-label-2" class="lorem-label">Lorem 2</div>
    <div id="lorem-label-3" class="lorem-label">Lorem 3</div>
    <div id="lorem-label-4" class="lorem-label">Lorem 4</div>
    <div id="lorem-label-5" class="lorem-label">Lorem 5</div>
</header>
<article>
    <div id="lorem-content-1" class="lorem">1</div>
    <div id="lorem-content-2" class="lorem">2</div>
    <div id="lorem-content-3" class="lorem">3</div>
    <div id="lorem-content-4" class="lorem">4</div>
    <div id="lorem-content-5" class="lorem">5</div>
</article>
```

## CSS
Style the menu item labels. The 'active' class is added when the respective container is in focus.

```
.lorem-label {
    color: black;
    margin: 25px;
    padding: 25px;
    background: #fff;
}
.lorem-label.active {
    color: red;
}
```

## JS
Set the base ID to look for as "lorem"; trigger a section change at the specified number of pixels from the top of the viewport, and, when a menu item label is clicked, go to the respective container in 400 milliseconds.

```
$(document).ready(function () {
    setScrollMenu("lorem", {
        animateDuration: 400,
        triggerOffset: $(window).height() / 2
    });
});
```