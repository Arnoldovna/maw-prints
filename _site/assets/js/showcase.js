// const category = document.getElementsByClassName('showcase')[0];
const categories = document.querySelectorAll(".showcase__category");
[...categories].forEach((category, i) => {

    function collapseSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        var sectionHeight = element.scrollHeight;
        console.log('sectionHeight collapse', sectionHeight);

        // temporarily disable all css transitions
        var elementTransition = element.style.transition;
        element.style.transition = '';

        // on the next frame (as soon as the previous style change has taken effect),
        // explicitly set the element's height to its current pixel height, so we 
        // aren't transitioning out of 'auto'
        requestAnimationFrame(function () {
            element.style.height = sectionHeight + 'px';
            element.style.transition = elementTransition;

            // on the next frame (as soon as the previous style change has taken effect),
            // have the element transition to height: 0
            requestAnimationFrame(function () {
                element.style.height = 0 + 'px';
            });
        });
    }

    function expandSection(element) {
        // get the height of the element's inner content, regardless of its actual size

        var sectionHeight = element.scrollHeight;
        console.log('sectionHeight', sectionHeight);
        // have the element transition to the height of its inner content
        element.style.height = sectionHeight + 'px';

        // when the next css transition finishes (which should be the one we just triggered)
        element.addEventListener('transitionend', function (e) {
            // remove this event listener so it only gets triggered once
            element.removeEventListener('transitionend', arguments.callee);
        });
    }

    category.addEventListener('click', function (e) {
        var section = document.getElementsByClassName('showcase__expandable')[i];

        var isclosed = section.getAttribute('data-closed') === 'true';

        if (isclosed) {
            expandSection(section);
            section.setAttribute('data-closed', 'false');
        } else {
            collapseSection(section);
            section.setAttribute('data-closed', 'true');
        }
    });

    window.addEventListener('resize', function (e) {
        var content = document.getElementsByClassName('showcase__expandable')[i];

        collapseSection(content);
        content.setAttribute('data-closed', 'true');
    });

});