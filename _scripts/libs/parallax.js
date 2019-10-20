import {
    requestAnimFrame
} from '../libs/util';

function parallax(container, contents) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return;
    const maxScrollOffset = container.offsetTop + container.offsetHeight;

    contents = contents.filter(content => {
        if (typeof content.element === 'string') content.element = container.querySelector(content.element);
        if (!content.element || !content.amount) return false;
        return true;
    });
    if (!contents.length) return;

    window.addEventListener('gesturechange', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll);

    function handleScroll() {
        if (scrollY > maxScrollOffset) return false;
        requestAnimFrame(() => {
            contents.forEach(c => {
                c.element.style.webkitTransform = `translateY(${scrollY * c.amount}px)`;
                c.element.style.transform = `translateY(${scrollY * c.amount}px)`;
            });
        });
    }
}

export default parallax;