require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

let { features, labels, testFeatures, testLabels } = loadCSV('./cars.csv', {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['horsepower', 'weight', 'displacement'],
  labelColumns: ['mpg']
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 3,
  batchSize: 10       // set batchSize to 1 for stochastic gradient descent (SDG)
});

regression.train();

const r2 = regression.test(testFeatures, testLabels);

plot({
  x: regression.mseHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Mean Squared Error (MSE)'
});

console.log('R2 is:', r2);

regression.predict([
  [120, 2, 380]
]).print();

regression.predict([
  [300, 2, 400],
  [130, 1.8, 200],
  [500, 1.4, 300]
]).print();
