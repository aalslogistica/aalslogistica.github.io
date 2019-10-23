const states = {
    IDLE: 'idle',
    PREV: 'prev',
    CURRENT: 'current',
    NEXT: 'next',
};

export default class SlideShow {
    constructor({ parent, children, start, interval }) {
        this.parent = (
            parent instanceof HTMLElement
                ? parent
                : document.querySelector(parent)
        );
        this.children = (
            children instanceof NodeList
                ? children
                : document.querySelectorAll(children)
        );
        this.interval = interval || 3000;
        this.render(start);
    }

    render(i) {
        i = this.setIndex(i);
        const current = this.children[i];
        const prev = this.children[i - 1] || this.children[this.children.length - 1];
        const next = this.children[i + 1] || this.children[0];
        this.forEach(slide => {
            if (slide === current) {
                this.setState(slide, states.CURRENT);
            } else if (slide === prev) {
                this.setState(slide, states.PREV); 
            } else if (slide === next) {
                this.setState(slide, states.NEXT);
            } else {
                this.setState(slide, states.IDLE);
            }
        });
    }

    setState(slide, state) {
        if (!(slide instanceof HTMLElement)) {
            console.log(`SlideShow.setState: ${slide} is not an HTMLElement!`, slide);
            return;
        }
        [
            states.IDLE,
            states.PREV,
            states.CURRENT,
            states.NEXT,
        ].forEach(name => {
            if (name === state) {
                slide.classList.add(name);
            } else {
                slide.classList.remove(name);
            }
        });
    }

    setIndex(i) {
        const targetIndex = parseInt(i) || 0;
        if (targetIndex >= this.children.length) {
            this.index = 0;
        } else if (targetIndex < 0) {
            this.index = this.children.length - 1;
        } else {
            this.index = targetIndex;
        }
        return this.index;
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
        this.timeoutId = setInterval(() => { this.goNext() }, this.interval);
    }

    pause() {
        if (this.timeoutId) clearInterval(this.timeoutId);
    }

    forEach(fn) {
        if (!(fn instanceof Function)) return;
        Array.prototype.forEach.call(this.children, fn);
    }

}