/**
 * @param {number[]} plants
 * @param {number} capacityA
 * @param {number} capacityB
 * @return {number}
 */
 var minimumRefill = function (plants, capacityA, capacityB) {
  let posA = 0,
    posB = plants.length - 1,
    volA = capacityA,
    volB = capacityB,
    count = 0;
  while (posA < posB) {
    if (volA < plants[posA]) {
      count++;
      volA = capacityA - plants[posA];
    } else {
      volA -= plants[posA];
    }
    posA++;
    if (volB < plants[posB]) {
      count++;
      volB = capacityB - plants[posB];
    } else {
      volB -= plants[posB];
    }
    posB--;
  }
  //
  if (posA === posB) {
    if (volA >= volB && volA < plants[posA]) {
      count++;
    }
    if (volA < volB && volB < plants[posB]) {
      count++;
    }
  }
  return count;
};