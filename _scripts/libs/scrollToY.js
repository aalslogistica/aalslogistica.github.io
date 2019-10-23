import requestAnimFrame from "../util/requestAnimFrame";

// easing equations from https://github.com/danro/easing-js/blob/master/easing.js
const easingEquations = {
    easeOutSine: pos => Math.sin(pos * (Math.PI / 2)),
    easeInOutSine: pos => (-0.5 * (Math.cos(Math.PI * pos) - 1)),
    easeInOutQuint: pos => (
        (pos /= 0.5) < 1
            ? 0.5 * Math.pow(pos, 5)
            : 0.5 * (Math.pow((pos - 2), 5) + 2)
    ),
};

const scrollToY = (tY, spd, ezfn, fn) => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollTargetY = tY || 0;
    const speed = spd || 2000;
    const time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    const easing = ezfn || 'easeOutSine';
    let currentTime = 0;

    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);
            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            fn instanceof Function && fn();
            window.scrollTo(0, scrollTargetY);
        }
    }

    tick();
};

export default scrollToY;
