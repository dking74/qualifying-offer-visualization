import groupBy from "lodash.groupby";

/**
 * Group all salary data by the millionth value. Everyone
 * making under 1 million be assigned to array entry 0
 * 
 * @param {Array<{name: string, salary: number}>} salaryData 
 * @returns {{ [key: string]: <Array<{name: string, salary: number }}>>}
 *      The grouped data organized by salary
 */
export const getGroupedSalaryData = (salaryData) => {
  return groupBy(
    salaryData,
    (playerSalary) => Math.floor(playerSalary.salary / 1000000)
  );
}

/**
 * Find the average salary from salary data
 * 
 * @param {Array<{name: string, salary: number}>} salaryData 
 * @returns {number} The average value
 */
export const findAverageSalary = (salaryData) => {
  if (!salaryData.length) return 0;

  const sum = salaryData.reduce((acc, curr) => {
    return acc + curr.salary;
  }, 0);
  return parseFloat(sum / salaryData.length);
}

/**
 * Find the number of players with salaries higher than average
 * 
 * @param {Array<{name: string, salary: number}>} salaryData 
 * @param {number} averageSalary 
 * 
 * @returns {number} The number of players
 */
export const findNumPlayersAboveAverageSalary = (salaryData, averageSalary) =>
  salaryData.filter(playerSalary => playerSalary.salary >= averageSalary).length;

/**
 * Find the number of players with salaries lower than average
 * 
 * @param {Array<{name: string, salary: number}>} salaryData 
 * @param {number} averageSalary 
 * 
 * @returns {number} The number of players
 */
export const findNumPlayersBelowAverageSalary = (salaryData, averageSalary) =>
  salaryData.filter(playerSalary => playerSalary.salary < averageSalary).length;

/**
 * Find the median salary from salary data
 * 
 * @param {Array<{name: string, salary: number}>} salaryData 
 * @returns {number} The median value
 */
export const findMedianSalary = (salaryData) => {
  if (!salaryData.length) return 0;

  const medianIndex = Math.floor(salaryData.length / 2);
  // Even number of entries need to find average between two middle
  if (salaryData.length % 2) {
    const upperBound = medianIndex;
    const lowerBound = upperBound - 1;
    const averageValue = (salaryData[upperBound]?.salary + salaryData[lowerBound]?.salary) / 2;
    return parseFloat(averageValue);
  }
  
  return parseFloat(salaryData[medianIndex]?.salary);
};

/**
 * Find the standard deviation
 * 
 * @see https://stackoverflow.com/questions/7343890/standard-deviation-javascript
 * 
 * @param {Array<{name: string, salary: number}>} salaryData 
 * @returns {number} The standard deviation of the salary data
 */
export const findStandardDeviation = (salaryData) => {
  const n = salaryData.length;
  if (!n) return 0;

  const mean = findAverageSalary(salaryData);
  return Math.sqrt(salaryData.map(x => Math.pow(x?.salary - mean, 2)).reduce((a, b) => a + b) / n)
};
