import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { moneyFormatter } from '../../utils/string';

function SalariesTable({ salariesData = [], maxShow = 25, loadAll = true }) {
  const [currentSalaries, setCurrentSalaries] = useState([]);

  useEffect(() => {
    const data = (!loadAll && salariesData.slice(0, maxShow)) || salariesData;
    setCurrentSalaries(data);
  }, [salariesData, loadAll, maxShow])

  // Open up the current salary entries to the next 25 appended on
  const loadMoreSalaries = () => {
    const currentSalariesLength = currentSalaries.length;
    const endSalariesLength = currentSalariesLength + maxShow;
    setCurrentSalaries(salariesData.slice(0, endSalariesLength));
  };
  const loadAllSalaries = () => setCurrentSalaries(salariesData);

  // Determine whether we should show a 'Load More' option for expanding the user search
  const canLoadMoreSalaries = () => !loadAll &&
    (currentSalaries.length < salariesData.length);

  // Determine the number of salaries to show as remaining based on how many are left to see
  const getRemainingSalaries = () => 
    salariesData.length - currentSalaries.length < maxShow
      ? salariesData.length - currentSalaries.length
      : maxShow;

  return (
    <Table striped bordered hover size="sm" responsive="md" className="mx-auto w-75 text-start">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Salary ($)</th>
        </tr>
      </thead>
      <tbody>
        { currentSalaries.length
          ? (
            <>
              { currentSalaries.map((playerSalary, index) => {
                  const { name = '', salary = 0 } = playerSalary;
                  let [lastName, firstName] = name.split(',');
                  lastName = lastName?.trim();
                  firstName = firstName?.trim();
                  return (
                    <tr className="player-salary-row" key={`${name}-${salary}-${index}`}>
                      <td className="player-salary-column">{index + 1}</td>
                      <td className="player-salary-column">{firstName}</td>
                      <td className="player-salary-column">{lastName}</td>
                      <td className="player-salary-column">{moneyFormatter.format(salary)}</td>
                    </tr>
                  );
                })
              }
              { canLoadMoreSalaries() && (
                <tr>
                  <td colSpan="4">
                    <table style={{width: '100%'}}>
                      <tbody><tr>
                        <td onClick={loadMoreSalaries} style={{color: 'blue', cursor: 'pointer', textAlign: 'center', border: 'none'}}>
                          <i>Load More ({getRemainingSalaries()})</i>
                        </td>
                        <td onClick={loadAllSalaries} style={{color: 'blue', cursor: 'pointer', textAlign: 'center', border: 'none'}}>
                          <i>Load All ({salariesData.length})</i>
                        </td>
                      </tr></tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ) : (
            <tr style={{ textAlign: 'center' }}>
              <td colSpan={4}>There was no salary data reported!</td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
}

export default SalariesTable;