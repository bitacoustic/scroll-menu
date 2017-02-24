/*
 * Track which content block is in view and give its associated label
 * the class "active". To mark the content blocks and labels, give them
 * ids like so:
 *
 * If idBase is "lorem", function will look for:
 *   1) containers having ids "lorem-container-1", "lorem-container-2", etc.
 *   2) labels having ids "lorem-label-1", "lorem-label-2", etc.
 * where the numbers (or other unique identifying strings) create an
 * association between the container and label.
 *
 * Assertion: each label matches up with exactly one container; div positions
 * and vertical sizes do not change dynamically.
 **/
function setScrollMenu(idBase, params = null) {
    var containers = [],
        triggerOffset = 0;
    if (params) {
        if (params.hasOwnProperty("triggerOffset")) {
            triggerOffset = params.triggerOffset;
            //            console.log(triggerOffset);
        }
        if (params.hasOwnProperty("animateDuration")) {
            animateDuration = params.animateDuration;
            //            console.log(animateDuration);
        }
    }
    $('div[id^=' + idBase + '-content]').each(function () {
        var containerKey = $(this).attr('id').split('-content-')[1],
            containerOffsetTop = $(this).offset().top;
        //console.log(containerKey, containerOffsetTop);
        containers.push({
            key: containerKey,
            offsetTop: containerOffsetTop
        });
    });
    //console.log(containers);
    setScrollMenuHelper(idBase, containers, animateDuration, triggerOffset, true);
    $(window).scroll(function () {
        setScrollMenuHelper(idBase, containers, animateDuration, triggerOffset);
    });
};

function setScrollMenuHelper(idBase, containers, animateDuration, triggerOffset, setHref = false) {
    for (var i = 0; i < containers.length; i++) {
        var offsetTop = (i === 0) ? 0 : containers[i].offsetTop - triggerOffset;
        var offsetBottom = (i === containers.length - 1) ?
            $(document).height() : (containers[i + 1].offsetTop - triggerOffset);
        //console.log(offsetTop, offsetBottom);
        var containerLabel = $('div[id=' + idBase + '-label-' + containers[i].key + ']');
        if ($(window).scrollTop() >= offsetTop && $(window).scrollTop() < offsetBottom) {
            //console.log(containers[i].key, "is in view");
            containerLabel.addClass('active');
        } else {
            containerLabel.removeClass('active');
        }
        if (setHref === true) {
            //            console.log(containers, i, containers[i].key);
            // in ES6 'let i = 0' makes the i variable local to the loop, alleviating the need for a separate callback function
            createScrollMenuOnclick('#' + idBase + '-label-' + containers[i].key, '#' + idBase + '-content-' + containers[i].key, animateDuration);
        }
    }
};

function createScrollMenuOnclick(fromDiv, toDiv, animateDuration) {
    $(document).on('click', fromDiv, function () {
        //        console.log("clicked on " + fromDiv + ", going to " + toDiv + " in " + animateDuration + " ms");
        $('body', 'html').animate({
            scrollTop: $(toDiv).offset().top
        }, animateDuration);
    });
};