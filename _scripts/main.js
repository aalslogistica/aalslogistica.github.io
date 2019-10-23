import bindGoogleAnalyticsEvents from './libs/bindGoogleAnalyticsEvents';
import initSliders from './libs/initSliders';
import loadGoogleMaps from './libs/loadGoogleMaps';
import parallax from './libs/parallax';
import slidingBoxes from './libs/slidingBoxes';

document.body.addEventListener('touchstart', () => { });

initSliders();

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
