const tf = require('@tensorflow/tfjs');
const _ = require('lodash');

class LinearRegression {
  constructor(features, labels, options) {
    this.features = features;
    this.labels = labels;
    this.options = Object.assign(
      { learningRate: 0.1, iterations: 1000 },
      options
    );
    this.m = 0;
    this.b = 0;
  }

  gradientDescent() {
    const currentGuessesForMPG = this.features.map(row => {
      return this.m * row[0] + this.b;
    });

    // slope of mean squared error (MSE) with respect to b
    const bSlope = _.sum(
      currentGuessesForMPG.map((guess, i) => {
        return guess - this.labels[i][0];
      })
    ) * 2 / this.features.length;

    // slope of MSE with respect to m
    const mSlope = _.sum(currentGuessesForMPG.map((guess, i) => {
      return -1 * this.features[i][0] * (this.labels[i][0] - guess);
    })) * 2 / this.features.length;

    this.b = this.b - bSlope * this.options.learningRate;
    this.m = this.m - mSlope * this.options.learningRate;
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
    }
  }

}

// LinearRegression instantiation example:
// new LinearRegression(features, labels, {
//   iterations: 99,
//   learningRate: 0.01
// });

module.exports = LinearRegression;
