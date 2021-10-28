import fetchData from './fetchData';
import { parseHtmlToPlayerRows } from '../utils/html';

const getSalaryData = async () => {
  return fetchData('/https://questionnaire-148920.appspot.com/swe/data.html', {
      'Content-Type': 'text/html'
    })
    .then(res => res.text())
    .then(result => parseHtmlToPlayerRows(result));
};

export default getSalaryData;