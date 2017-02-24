# scroll-menu
Easy menu system for a single-page site, with animated scrolling.

There are other similar libraries available; I wasn't able to use external libraries on a particular client project so I wrote my own.

## Purpose

scroll-menu tracks which of a number of defined content blocks is in view and give its associated menu label the class "active".

Clicking a menu label brings its associated content block into view, optionally with an animated delay.

An offset can be defined where a section triggers its associated label as active. By default, it becomes active when, scrolling down, the top of the section hits the top of the viewport; or, scrolling up, the bottom of the section goes into view.

jQuery is a dependency. Tested with jQuery 3.1.1

## Example of relevant code

### HTML
To define the sections and labels, give them IDs like so:

If the id base is "lorem", scroll-menu will look for:

1. sections having ids "lorem-section-1", "lorem-section-2", etc.
2. labels having ids "lorem-label-1", "lorem-label-2", etc.

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
    <section id="lorem-section-1" class="lorem">1</section>
    <section id="lorem-section-2" class="lorem">2</section>
    <section id="lorem-section-3" class="lorem">3</section>
    <section id="lorem-section-4" class="lorem">4</section>
    <section id="lorem-section-5" class="lorem">5</section>
</article>
```

### CSS
Style the menu item labels. The "active" class is added when the respective section is in focus.

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

### JS
Set the base ID to look for as "lorem"; trigger a section change at the specified number of pixels from the top of the viewport, and, when a menu item label is clicked, go to the respective section in 400 milliseconds.

```
$(document).ready(function () {
    setScrollMenu("lorem", {
        animateDuration: 400,
        triggerOffset: $(window).height() / 2
    });
});
```