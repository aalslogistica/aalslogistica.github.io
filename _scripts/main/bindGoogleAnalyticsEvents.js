function bindGoogleAnalyticsEvents() {
    window.gtag = window.gtag || console.log;
    if (!window.gtag || !(window.gtag instanceof Function)) return;
    const shareButtons = document.querySelectorAll('[data-ga-event]');
    Array.prototype.forEach.call(shareButtons, btn => {
        const eventType = btn.getAttribute('data-ga-event');
        btn.addEventListener(eventType, function() {
            window.gtag('event', eventType , {
                event_category: this.getAttribute('data-ga-category') || 'Sem categoria',
                event_label: this.getAttribute('data-ga-label') || this.title,
                value: this.getAttribute('data-ga-value') || ''
            });
        });
    });
}

export default bindGoogleAnalyticsEvents;