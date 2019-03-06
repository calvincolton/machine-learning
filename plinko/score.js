const outputs = [];
const predictionPoint = 300;
// const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a ball drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  // console.log(outputs);
}

function runAnalysis() {
  const testSetSize = 20;
  const [testSet, trainingSet] = splitDataset(minMax(outputs, 3), testSetSize);
  let numberCorrect = 0;

  _.range(1, 15).forEach(k => {
    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === testPoint[3])
      .size()
      .divide(testSetSize)
      .value();
    // the above, as a for loop:
    // for (let i = 0; i < testSet.length; i++) {
    //   const bucket = knn(trainingSet, testSet[i][0]);
    //   console.log(bucket, testSet[i][3]);
    //   if (bucket === testSet[i][3]) {
    //     numberCorrect++;
    //   }
    // }
    console.log('For k of', k, 'accuracy is:', accuracy);
  });
}

const knn = (data, point, k) => {
  // point has 3 values!!!
  return _.chain(data)
    .map(row => {
      // const features = _.initial(row);
      // const label = _.last(row);
      return [
        distance(_.initial(row), point),
        _.last(row)
      ];
    })
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
  // just for distance:
  // return Math.abs(pointA - pointB);

  // example of pointA = [300, .5, 16]
  return _.chain(pointA)
    .zip(pointB)
    .map(([a, b]) => (a - b) ** 2)
    .sum()
    .value() ** 0.5;
};

const splitDataset = (data, testCount) => {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
};

const minMax = (data, featureCount) => {
  const clonedData = _.cloneDeep(data);
  for (let i = 0; i < featureCount; i++) {
    const column = clonedData.map(row => row[i]);
    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
};
