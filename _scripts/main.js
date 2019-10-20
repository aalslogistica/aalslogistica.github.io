import SlideShow from './libs/slideshow';
import slidingBoxes from './libs/slidingBoxes';
import loadGoogleMaps from './libs/loadGoogleMaps';
import bindGoogleAnalyticsEvents from './libs/bindGoogleAnalyticsEvents';
import parallax from './libs/parallax';

document.body.addEventListener('touchstart', () => {});

const sliderAttributes = {
    'data-autoplay': {
        'beforeall': function () {
            this.play();
            this.parent.addEventListener('mouseover', () => this.pause());
            this.parent.addEventListener('mouseout', () => this.play());
        },
        'wait-img-load': function () {
            const image = this.children[0].querySelector('.slide-image');
            if (!image || !image.style.backgroundImage) return;
            const src = image.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
            if (!src) return;
            const img = new Image();
            img.onload = () => this.play();
            img.onerror = () => this.play();
            this.pause();
            img.src = src;
        },
    },
};

Array.prototype.map.call(
    document.querySelectorAll('.slideshow'),
    parent => {
        const slideshow = new SlideShow({
            parent,
            children: parent.getAttribute('data-children') || '.slide',
            start: parent.getAttribute('data-start') || 0,
            interval: parent.getAttribute('data-interval') || 3000
        });
        for (const key in sliderAttributes) {
            const value = sliderAttributes[key];
            slideshow.setAttr(key, value);
        }
        return slideshow;
    }
);

slidingBoxes('.sliding-box');

loadGoogleMaps();

parallax(
    '.parallax-container', [{
            element: '.parallax-content',
            amount: .5
        },
        {
            element: document.querySelector('.site-header'),
            amount: .75
        }
    ]
);

bindGoogleAnalyticsEvents();