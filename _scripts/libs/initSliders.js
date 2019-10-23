import SlideShow from "./SlideShow";

const sliderAttributes = {
  'data-autoplay': (self) => {
    self.play();
    self.parent.addEventListener('mouseover', () => self.pause());
    self.parent.addEventListener('mouseout', () => self.play());
  },
  'data-wait-img-load': (self) => {
    const image = self.children[0].querySelector('.slide-image');
    if (!image || !image.style.backgroundImage) {
      return;
    }
    const src = image.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
    if (!src) {
      return;
    }
    const img = new Image();
    img.onload = () => self.play();
    img.onerror = () => self.play();
    self.pause();
    img.src = src;
  },
};

const initSliders = () => {
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
        const fn = sliderAttributes[key];
        const { parent } = slideshow;
        if (parent.hasAttribute(key) && fn instanceof Function) {
          fn(slideshow);
        }
      }
      return slideshow;
    }
  );
};

export default initSliders;
