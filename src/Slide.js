import Animation from 'kittik-animation-basic';

const AVAILABLE_DIRECTIONS = ['inUp', 'inDown', 'inLeft', 'inRight', 'outUp', 'outDown', 'outLeft', 'outRight'];

/**
 * Slide animation that animates sliding of the shapes.
 *
 * @since 1.0.0
 */
export default class Slide extends Animation {
  constructor(options = {}) {
    super(options);

    this.setDirection(options.direction);
  }

  /**
   * Get direction of the animation.
   *
   * @returns {String}
   */
  getDirection() {
    return this.get('direction');
  }

  /**
   * Set new direction of the animation.
   *
   * @param {String} direction
   * @returns {Animation}
   */
  setDirection(direction = 'inRight') {
    if (AVAILABLE_DIRECTIONS.indexOf(direction) === -1) throw new Error(`Unknown direction: ${direction}`);
    return this.set('direction', direction);
  }

  /**
   * Get shape instance and calculate startX, startY, endX and endY coordinates based on direction.
   *
   * @param {Shape} shape
   * @private
   */
  _parseCoordinates(shape) {
    const directions = {
      inUp: () => [shape.getX(), -shape.getHeight(), shape.getX(), shape.getY()],
      inDown: () => [shape.getX(), process.stdout.rows + shape.getHeight(), shape.getX(), shape.getY()],
      inLeft: () => [-shape.getWidth(), shape.getY(), shape.getX(), shape.getY()],
      inRight: () => [process.stdout.columns + shape.getWidth(), shape.getY(), shape.getX(), shape.getY()],
      outUp: () => [shape.getX(), shape.getY(), shape.getX(), -shape.getHeight()],
      outDown: () => [shape.getX(), shape.getY(), shape.getX(), process.stdout.rows + shape.getHeight()],
      outLeft: () => [shape.getX(), shape.getY(), -shape.getWidth(), shape.getY()],
      outRight: () => [shape.getX(), shape.getY(), process.stdout.columns + 1, shape.getY()]
    };

    const [startX, startY, endX, endY] = directions[this.getDirection()]();
    return {startX, startY, endX, endY};
  }

  /**
   * Main method that calls when shape need to be animated.
   *
   * @override
   * @param {Shape} shape
   * @param {Cursor} cursor
   */
  animate(shape, cursor) {
    const {startX, startY, endX, endY} = this._parseCoordinates(shape);

    return Promise.all([
      this.animateProperty({shape: shape, property: 'x', startValue: startX, endValue: endX}),
      this.animateProperty({shape: shape, property: 'y', startValue: startY, endValue: endY})
    ]).then(() => shape);
  }

  /**
   * Serializes animation to Object representation.
   *
   * @returns {Object}
   */
  toObject() {
    const obj = super.toObject();

    Object.assign(obj.options, {
      direction: this.get('direction')
    });

    return obj;
  }
}
