const tf = require('@tensorflow/tfjs');
const _ = require('lodash');

class LinearRegression {
  constructor(features, labels, options) {
    this.labels = tf.tensor(labels);
    this.features = tf.tensor(features);
    this.features = tf.ones([this.features.shape[0], 1]).concat(this.features, 1);
    // this.features now looks like this:
    // [x1, 1]
    // [x2, 1]
    // [x3, 1]
    // [x4, 1]
    // [x5, 1]
    // [x6, 1]

    this.options = Object.assign(
      { learningRate: 0.1, iterations: 1000 },
      options
    );

    this.weights = tf.zeros([2, 1]);
    // this.m = 0;
    // this.b = 0;
  }

  gradientDescent() {
    const currentGuesses = this.features.matMul(this.weights);
    const differences = currentGuesses.sub(this.labels);

    const slopes = this.features
      .transpose()
      .matMul(differences)
      .div(this.features.shape[0]);

    this.weights = this.weights.sub(slopes.mul(this.options.learningRate));
  }

  // gradientDescent() {
  //   const currentGuessesForMPG = this.features.map(row => {
  //     return this.m * row[0] + this.b;
  //   });
  //
  //   // slope of mean squared error (MSE) with respect to b
  //   const bSlope = _.sum(
  //     currentGuessesForMPG.map((guess, i) => {
  //       return guess - this.labels[i][0];
  //     })
  //   ) * 2 / this.features.length;
  //
  //   // slope of MSE with respect to m
  //   const mSlope = _.sum(currentGuessesForMPG.map((guess, i) => {
  //     return -1 * this.features[i][0] * (this.labels[i][0] - guess);
  //   })) * 2 / this.features.length;
  //
  //   this.b = this.b - bSlope * this.options.learningRate;
  //   this.m = this.m - mSlope * this.options.learningRate;
  // }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
    }
  }

}

module.exports = LinearRegression;
