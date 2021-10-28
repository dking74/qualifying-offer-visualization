function StatisticText({ header, value, children }) {
  return (
    <div className='statistic-section-value'>
      <i><h6 className='header'>{header}</h6></i>
      { children
        ? children
        : <p style={{ fontSize: '14px' }}>{value}</p>
      }
    </div>
  );
}

export default StatisticText;