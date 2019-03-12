# ML Kits

Starter projects for learning about Machine Learning.

## Downloading

There are two ways to download this repository - either as a zip or by using git.

### Zip Download

To download this project as a zip file, find the green 'Clone or Download' button on the top right hand side. Click that button, then download this project as a zip file.

Once downloaded extract the zip file to your local computer.

### Git Download

To download this project using git, run the following command at your terminal:

```
git clone https://github.com/StephenGrider/MLKits.git
```

## Fundamental Operations of Machine Learning (and keys to learning ML):
### Features vs Labels
### Feature Normalization/Standardization
### Feature Selection
### Test vs Training Sets
### Common Data Structures (arrays of arrays)

## Two common types of algorithms:

### Classification
The value of our labels belong to a discrete dataset.

Examples:
1) Based on how many hours a student studied for an exam, did they PASS or FAIL? --> PASS/FAIL
2) Based on the content of this email, is it SPAM or NOT SPAM? --> SPAM/NOT SPAM
3) Based on where a basketball player shot from, did he SCORE or NOT SCORE? --> SCORE/NOT SCORE
(Each case has two discrete possibilities)

### Regression
The value of our labels belong to a continuous set.

Examples:
1) Based on the year, make, and model of a car, what is its value? --> $0 - $50k
2) Based on an individual's daily caloric intake and minutes spent exercising, what is their weight? --> 80 - 400lb

Note: Any time we are working with a dollar amount, it is very likely going to be regression.

## TensorFlow Key Terminology

### Tensor
A JavaScript object that wraps a collection of numbers (e.g. [200, 450, 16, .5]). These numbers will be in some type of structure of arrays.

### Dimension
Dimensions essentially like dimensions around arrays normally work in JavaScript.

### Shape
The term "shape" represents how many records are in each dimension, i.e. the equivalent of calling .length on each level in a tensor, working from outside to in (see below)
ex 1:
[3, 4, 6].length
Shape = [3]

ex 2:
[
  [5, 10, 17],
  [2, 8, 23].length
].length
Shape = [2,3]

ex 3:
[
  [
    [5, 10, 17].length
  ].length
].length
Shape = [1, 1, 3]

Note: with 2 dimensional tensors, Shape always represents [# of rows, # of columns]

### Broadcasting ("Smearing")
Performing tensorflow operations on elements that have different shapes (from right to left). Note: shapes must have a value greater than or equal to one.
