import Spinner from 'react-bootstrap/Spinner';

function ProgressBar() {
  return (
    <div className="progress-bar-container">
      <Spinner animation="border" role="status" size="lg" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default ProgressBar