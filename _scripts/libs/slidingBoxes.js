function slidingBoxes(boxes) {

    if (typeof boxes === 'string') boxes = document.querySelectorAll(boxes);
    if (!boxes.length) return;

    window.addEventListener('scroll', setSlidingClasses);
    window.addEventListener('resize', setSlidingClasses);
    window.addEventListener('load', setSlidingClasses);

    function setSlidingClasses() {
        Array.prototype.forEach.call(
            boxes,
            item => {
                const vBegin = item.offsetTop - window.innerHeight * .8;
                const vEnd = item.offsetTop + item.offsetHeight * .8;
                if (pageYOffset < vBegin) {
                    item.classList.add('below-screen');
                    item.classList.remove('above-screen');
                } else if (pageYOffset > vEnd) {
                    item.classList.remove('below-screen');
                    item.classList.add('above-screen');
                } else {
                    item.classList.remove('below-screen');
                    item.classList.remove('above-screen');
                };
            }
        );
    }

}

export default slidingBoxes;