import Animation from 'kittik-animation-basic';

const AVAILABLE_DIRECTIONS = ['in', 'inUp', 'inDown', 'inLeft', 'inRight', 'out', 'outUp', 'outDown', 'outLeft', 'outRight'];

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
  setDirection(direction = 'inLeft') {
    if (AVAILABLE_DIRECTIONS.indexOf(direction) === -1) throw new Error(`Unknown direction: ${direction}`);
    return this.set('direction', direction);
  }

  /**
   * Main method that calls when shape need to be animated.
   *
   * @override
   * @param {Shape} shape
   * @param {Cursor} cursor
   */
  animate(shape, cursor) {
    let startX = shape.getX();
    let startY = shape.getY();
    let endX = shape.getX();
    let endY = shape.getY();

    switch (this.getDirection()) {
      case 'in':
        startX = Math.round(Math.random() * process.stdout.columns);
        startY = Math.round(Math.random() * process.stdout.rows);
        endX = shape.getX();
        endY = shape.getY();
        break;
      case 'inUp':
        startX = shape.getX();
        startY = -shape.getHeight();
        endX = shape.getX();
        endY = shape.getY();
        break;
      case 'inDown':
        startX = shape.getX();
        startY = process.stdout.rows;
        endX = shape.getX();
        endY = shape.getY();
        break;
      case 'inLeft':
        startX = -shape.getWidth();
        startY = shape.getY();
        endX = shape.getX();
        endY = shape.getY();
        break;
      case 'inRight':
        startX = process.stdout.columns;
        startY = shape.getY();
        endX = shape.getX();
        endY = shape.getY();
        break;
      case 'out':
        startX = shape.getX();
        startY = shape.getY();
        endX = process.stdout.columns + shape.getWidth();
        endY = process.stdout.rows + shape.getHeight();
        break;
      case 'outUp':
        startX = shape.getX();
        startY = shape.getY();
        endX = shape.getX();
        endY = -shape.getHeight();
        break;
      case 'outDown':
        startX = shape.getX();
        startY = shape.getY();
        endX = shape.getX();
        endY = process.stdout.rows + shape.getHeight();
        break;
      case 'outLeft':
        startX = shape.getX();
        startY = shape.getY();
        endX = -shape.getWidth();
        endY = shape.getY();
        break;
      case 'outRight':
        startX = shape.getX();
        startY = shape.getY();
        endX = process.stdout.columns + shape.getWidth();
        endY = shape.getY();
        break;
      default:
        startX = shape.getX();
        startY = shape.getY();
        endX = shape.getX();
        endY = shape.getY();
        break;
    }

    return new Promise(resolve => {
      return Promise.all([
        this.animateProperty({shape: shape, property: 'x', startValue: startX, endValue: endX}),
        this.animateProperty({shape: shape, property: 'y', startValue: startY, endValue: endY})
      ]).then(shape => resolve(shape));
    });
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
