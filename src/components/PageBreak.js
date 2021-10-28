function PageBreak({ style }) {
  return (
    <div className="row">
      <div className="col-12" style={{
        height: '1px',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        boxShadow: '0 0 1px rgba(0, 0, 0, .1)',
        margin: '15px 0',
        ...style
      }}></div>
    </div>
  );
}

export default PageBreak;