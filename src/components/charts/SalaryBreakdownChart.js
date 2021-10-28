import { Bar } from 'react-chartjs-2';

function SalaryBreakdownChart({ salaryData }) {
  const moneyLabels = Object.keys(salaryData)
    .map(moneyBand => `< ${moneyBand} (mil)`); 
  const data = {
    labels: moneyLabels,
    title: 'testing',
    datasets: [{
      label: 'Number of Salaries in each Pay Band',
      backgroundColor: 'rgb(0, 0, 150)',
      borderColor: 'rgb(0, 0, 150)',
      data: Object.values(salaryData),
    }],
  };
  const options = {
    scales: {
      yAxes: {
        title: {
          display: true,
          text: 'Number of Players in Band',
          padding: 10
        }
      },
      xAxes: {
        title: {
          display: true,
          text: 'Pay Band in Millions ($)',
          padding: 10
        }
      },
    }
  };

  return (
    <Bar width={600} height={400} data={data} options={options} className="m-5"  />
  );
}

export default SalaryBreakdownChart;