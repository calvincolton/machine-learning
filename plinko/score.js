const outputs = [];
const predictionPoint = 300;
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a ball drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  // console.log(outputs);
}

function runAnalysis() {
  console.log(`Your ball will probably fall into bucket ${bucket}`);
}

const knn = (data, point) => {
  return _.chain(data)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0, k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value();
};

const distance = (pointA, pointB) => {
  return Math.abs(pointA - pointB);
};

const splitDataset = (data, testCount) => {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
};
