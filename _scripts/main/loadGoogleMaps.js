function loadGoogleMaps() {
    const mapFrames = document.querySelectorAll('iframe[data-map-src]');
    Array.prototype.forEach.call(mapFrames, renderMap);
    function renderMap(frame) {
        const src = frame.getAttribute('data-map-src');
        const height = frame.getAttribute('data-map-height');
        if (!src) return;
        frame.src = src;
        if (height) frame.height = height;
    }
}

export default loadGoogleMaps;