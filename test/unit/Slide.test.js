import { assert } from 'chai';
import sinon from 'sinon';
import Rectangle from 'kittik-shape-rectangle';
import Slide from '../../src/Slide';

describe('Animation::Slide', () => {
  it('Should properly call the animate() method', done => {
    let animation = new Slide();
    let shape = new Rectangle();
    let mock = sinon.mock(animation);

    mock.expects('animateProperty').twice().returns(Promise.resolve());

    animation.animate(shape).then(() => {
      mock.verify();
      done();
    });
  });
});
