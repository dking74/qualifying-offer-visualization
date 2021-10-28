import { useContext } from 'react';

import ChartTitle from './charts/ChartTitle';
import SalariesTable from './charts/SalariesTable';
import SalaryBreakdownChart from './charts/SalaryBreakdownChart';

import StatisticText from './StatisticText';
import PageBreak from './PageBreak';

import SalaryContext from '../context/salary-context';
import { 
 findAverageSalary,
 findMedianSalary,
 findNumPlayersAboveAverageSalary,
 findNumPlayersBelowAverageSalary,
 findStandardDeviation,
 getGroupedSalaryData
} from '../utils/salary';
import { moneyFormatter } from '../utils/string';


function SalaryBreakdownReport() {
  const salariesData = useContext(SalaryContext);

  const salaries = salariesData.sort((a, b) => b.salary - a.salary);
  const groupedSalaries = getGroupedSalaryData(salaries);
  const groupedSalaryNumbers = Object.keys(groupedSalaries)
    .reduce((prev, salaryKey) => {
      prev[salaryKey] = groupedSalaries[salaryKey].length;
      return prev;
    }, {});
  const formatDecimalValue = (value) => moneyFormatter.format(value.toFixed(2));
  const averageSalary = findAverageSalary(salaries);
  const numPlayersAboveAverage = findNumPlayersAboveAverageSalary(salaries, averageSalary);
  const numPlayersBelowAverage = findNumPlayersBelowAverageSalary(salaries, averageSalary);
  const medianSalary = findMedianSalary(salaries);
  const standardDeviation = findStandardDeviation(salaries).toFixed(2);

  return (
    <>
      <section className="mb-3">
        <ChartTitle header={"Salary Reporting Statistics"}/><br></br>
        <StatisticText header={"Total Number of Salaries Reported"} value={salaries.length}/>
        <StatisticText header={"Average Salary"} value={formatDecimalValue(averageSalary)}/>
        <StatisticText header={"Num. Players Above Average Salary"} value={numPlayersAboveAverage}/>
        <StatisticText header={"Num. Players Below Average Salary"} value={numPlayersBelowAverage}/>
        <StatisticText header={"Median Salary"} value={formatDecimalValue(medianSalary)}/>
        <StatisticText header={"Standard Deviation"} value={standardDeviation}/>
        <StatisticText header={"Implications of Statistics"}>
          <p className='text-start w-75' style={{fontSize: '11px'}}>
            <i>
              While the average salary is quite high, it can be realized that in 2016
              the league was top-heavy in terms of individuals who had the highest salaries
              were far ahead of the mean and rose the mean correspondingly. The median salary
              and players above/below the average salary showcase just how wide this gap is. The
              standard deviation is also quite high, which indicates the wide variety of values that
              are indicated for players salaries. 
            </i>
          </p>
        </StatisticText>
      </section>

      <PageBreak />

      <ChartTitle header={"Number of Players in Each Pay Band for 2016"}/>
      <SalaryBreakdownChart salaryData={groupedSalaryNumbers}/>

      <PageBreak />

      <ChartTitle header={"All MLB player salaries in 2016"}/>
      <SalariesTable loadAll={false} salariesData={salaries} maxShow={25}/>
    </>
  );
}

export default SalaryBreakdownReport;