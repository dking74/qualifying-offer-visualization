function ChartTitle({ header, style }) {
  return (
    <div style={{ 'textAlign': 'left'}}>
      <h3 className={'px-5 mb-2' } style={style}>{ header }</h3>
    </div>
  );
}

export default ChartTitle;