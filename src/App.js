import { useCallback, useContext, useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CacheContext from './context/cache-context';
import getSalaryData from './services/getSalaryData';

import ProgressBar from './components/ProgressBar';
import ChartTabs from './components/Tabs';
import WindowContext from './context/window-context';
import { getScreenSize, setResizeEvent } from './utils/window';
import SalaryContext from './context/salary-context';

function App() {
  const cache = useContext(CacheContext);

  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [salaryData, setSalaryData] = useState([]);
  const [timeout, setDataTimeout] = useState(false);

  const updateSalaryData = useCallback(() => {
    console.log('*** Getting player salary data ***');
    const salaryDataInCache = cache.get('salary-data');
    if (!salaryDataInCache) {
      console.log('*** Cache miss -- getting new salary data ***');
      getSalaryData()
        .then(data => {
          console.log('*** Received remote data! ***');
          setSalaryData(data);
          cache.set('salary-data', data);
        })
        .catch(error => {
          console.error(`*** Error getting player salary information ${error.message}`);
        });
    } else {
      console.log('*** Cache hit -- setting salary data ***');
      setSalaryData(salaryDataInCache);
    }
  }, [cache]);

  // Try and find player salary data in cache. If not available,
  // find the data from the remote resource. If it is available,
  // set the data on the page from the data in cache.
  useEffect(() => {
    updateSalaryData();
  }, [updateSalaryData]);

  // Update the screen size and allow the whole app to utilize
  useEffect(() => setResizeEvent((event) => {
    setScreenSize(event.target.innerWidth);
  }), [screenSize]);

  // Lifecycle hook mechanism to check after 10 seconds
  // if there is still no data. In this case, no data was
  // able to be retrieved properly.
  const timeoutCallback = useCallback(() => {
    const timer = setTimeout(() => {
      const isDataAvailable = salaryData?.length > 0;
      if (!isDataAvailable)
        console.log('*** Unable to get data after 10 seconds ***');
      setDataTimeout(!isDataAvailable);
    }, 10000);
    return () => clearTimeout(timer);
  }, [setDataTimeout, salaryData]);
  useEffect(timeoutCallback, [timeoutCallback]);

  return (
    <WindowContext.Provider value={screenSize}>
      <SalaryContext.Provider value={salaryData}>
        { salaryData?.length
          ? <div className="App">
              <ChartTabs />
            </div>
          : !timeout
            ? <ProgressBar />
            : <p className='p-5 pt-3'>
                An error occurred retrieving salary information. Please
                try again later.
              </p>
        }
      </SalaryContext.Provider>
    </WindowContext.Provider>
  );
}

export default App;
