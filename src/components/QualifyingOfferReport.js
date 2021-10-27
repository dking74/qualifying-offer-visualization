import { useContext } from 'react';

import ChartTitle from './charts/ChartTitle';
import SalariesTable from './charts/SalariesTable';
import PageBreak from './PageBreak';

import SalaryContext from '../context/salary-context';

import SalaryContext from '../context/salary-context';

import { moneyFormatter } from '../utils/string';
import { findAverageSalary } from '../utils/salary';

function QualifyingOfferReport() {
  const salariesData = useContext(SalaryContext);
  
  const salaries = salariesData
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 125);

  const qualifyingOfferValue = findAverageSalary(salaries);
  const formattedQualifyingOffer = moneyFormatter.format(qualifyingOfferValue);

  return (
    <>
      <div className='mb-3'>
        <ChartTitle header={"Qualifying Offer Amount: "} />
        <p className='px-5 text-start'>{formattedQualifyingOffer}</p>
        <p className='px-5 w-75 text-start' style={{fontSize: '11px'}}>
          <i>
            * Note: A qualifying offer is a one-year contract whose monetary value is the average of the 125 
            highest salaries from the past season. The player is free to reject it and sign with any other team,
            but his new team will have to forfeit a draft pick.<br></br><br></br>
            In this specific case, the contract worth would be {formattedQualifyingOffer}. Please take a look
            below at the highest 125 salaries in the league that make up this number.
          </i>
        </p>
      </div>

      <PageBreak />

      <ChartTitle header={"Top 125 Salaries for Players"} />
      <SalariesTable maxShow={125} salariesData={salaries}/>
    </>
  );
}

export default QualifyingOfferReport;