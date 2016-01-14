import Animation from 'kittik-animation-basic';

/**
 * Slide animation that animates sliding of the shapes.
 *
 * @since 1.0.0
 */
export default class Slide extends Animation {
  /**
   * Main method that calls when shape need to be animated.
   *
   * @override
   * @param {Shape} shape
   * @param {Cursor} cursor
   */
  animate(shape, cursor) {
    return new Promise(resolve => {
      return Promise.all([
        this.animateProperty({shape: shape, property: 'x', startValue: 1, endValue: shape.getX()}),
        this.animateProperty({shape: shape, property: 'y', startValue: 1, endValue: shape.getY()})
      ]).then(shape => resolve(shape));
    });
  }
}
