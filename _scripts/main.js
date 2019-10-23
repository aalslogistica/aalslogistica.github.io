import bindGoogleAnalyticsEvents from './main/bindGoogleAnalyticsEvents';
import initSliders from './main/initSliders';
import loadGoogleMaps from './main/loadGoogleMaps';
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
