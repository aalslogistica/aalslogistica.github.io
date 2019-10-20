export default class SlideShow {

    constructor({parent, children, start, interval}) {
        this.parent = parent instanceof HTMLElement ? parent : document.querySelector(parent);
        this.children = children instanceof NodeList ? children : document.querySelectorAll(children);
        this.interval = interval || 3000;
        this.render(start);
    }

    render(i) {
        i = this.setIndex(i);
        const current = this.children[i];
        const prev = this.children[i - 1] || this.children[this.children.length - 1];
        const next = this.children[i + 1] || this.children[0];
        this.forEach(slide => {
            const state = 
                slide === current ? 'current' :
                slide === prev    ? 'prev' :
                slide === next    ? 'next' :
                                    'idle';
            this.setState(slide, state);
        });
    }

    setState(slide, state) {
        if (!(slide instanceof HTMLElement)) return console.log(`SlideShow.setState: ${slide} is not an HTMLElement!`, slide);
        ['idle', 'prev', 'current', 'next'].forEach(name => {
            if (name === state) slide.classList.add(name);
            else slide.classList.remove(name);
        });
    }

    setIndex(i) {
        this.index = 
            isNaN(i) || !isFinite(i) ? 0 :
            i >= this.children.length ? 0 :
            i < 0 ? this.children.length - 1 :
            i;
        return this.index;
    }

    setAttr(attr, callbacks) {
        if (!attr || !callbacks) return;
        const isSet = this.parent && this.parent.hasAttribute(attr);
        if (!isSet) return;
        const options = this.parent
            .getAttribute(attr)
            .split(' ')
            .filter(s => s.trim())
            .map(s => s.trim());
        if (callbacks instanceof Function) return callbacks.call(this, options);
        const beforeFn = callbacks['beforeall'];
        if (beforeFn instanceof Function) beforeFn.call(this);
        if (options.length) options.forEach(o => {
            const fn = callbacks[o];
            if (!(fn instanceof Function)) console.log(`slider[${attr}]:`, o, typeof fn, fn);
            else fn.call(this);
        });
        const afterFn = callbacks['afterall'];
        if (afterFn instanceof Function) afterFn.call(this);
    }

    goTo(index) {
        this.render(index);
    }

    goPrev() {
        this.render(this.index - 1);
    }

    goNext() {
        this.render(this.index + 1);
    }

    get isPlaying() {
        return !!this.timeoutId;
    }

    play() {
        this.timeoutId = setInterval(() => {this.goNext()}, this.interval);
    }

    pause() {
        if (this.timeoutId) clearInterval(this.timeoutId);
    }

    forEach(fn) {
        if (!fn instanceof Function) return;
        Array.prototype.forEach.call(this.children, fn);
    }

}