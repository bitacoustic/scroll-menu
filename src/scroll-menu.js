/*
 * scroll-menu.js
 *
 * Author: Eric C. Black (bitacoustic@gmail.com)
 * Github: https://github.com/bitacoustic/scroll-menu
 *
 * scroll-menu tracks which of a number of defined content blocks is in view
 * and give its associated menu label the class "active".
 *
 * Clicking a menu label brings its associated content block into view,
 * optionally with an animated delay.
 *
 * An offset can be defined where a section triggers its associated label as
 * active. By default, it becomes active when, scrolling down, the top of the
 * section hits the top of the viewport; or, scrolling up, the bottom of the
 * section goes into view.
 *
 * jQuery is a dependency. Tested with jQuery 3.1.1
 *
 * Assertion: each label matches up with exactly one container; div positions
 * and vertical sizes do not change dynamically.
 **/
function setScrollMenu(idBase, params) {
    var sections = [];
    $('[id^=' + idBase + '-section]').each(function () {
        var sectionKey = $(this).attr('id').split('-section-')[1],
            sectionOffsetTop = $(this).offset().top;
        sections.push({
            key: sectionKey,
            offsetTop: sectionOffsetTop
        });
    });
    setScrollMenuHelper(idBase, sections, params, true);
    $(window).scroll(function () {
        setScrollMenuHelper(idBase, sections, params);
    });
};

function setScrollMenuHelper(idBase, sections, params, setClick) {
    var triggerOffset = 0;
    if (params && params.hasOwnProperty("triggerOffset")) {
        triggerOffset = params.triggerOffset;
    }
    for (var i = 0; i < sections.length; i++) {
        var offsetTop = (i === 0) ? 0 : sections[i].offsetTop - triggerOffset;
        var offsetBottom = (i === sections.length - 1) ?
            $(document).height() : (sections[i + 1].offsetTop - triggerOffset);
        var sectionLabel = $('[id=' + idBase + '-label-' + sections[i].key + ']');
        if ($(window).scrollTop() >= offsetTop && $(window).scrollTop() < offsetBottom) {
            sectionLabel.addClass('active');
        } else {
            sectionLabel.removeClass('active');
        }
        if (setClick && setClick === true) {
            // (in ES6 'let i = 0' makes the i variable local to the loop,
            // alleviating the need for a separate callback function)
            createScrollMenuOnclick('#' + idBase + '-label-' + sections[i].key,
                '#' + idBase + '-section-' + sections[i].key, params);
        }
    }
};

function createScrollMenuOnclick(fromElem, toElem, params) {
    var animateDuration = 0;
    if (params && params.hasOwnProperty("animateDuration")) {
        animateDuration = params.animateDuration;
    }
    $(document).on('click', fromElem, function () {
        $('body', 'html').animate({
            scrollTop: $(toElem).offset().top
        }, animateDuration);
    });
};
