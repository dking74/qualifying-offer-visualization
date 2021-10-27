import { load } from 'cheerio';

import {
  tableRowIdentifier,
  playerNameClassMapping,
  playerSalaryClassMapping,
  playerLevelClassMapping,
  playerYearClassMapping,
  currentYearSearching,
  levelOfPlay,
} from '../constants';
import { convertMoneyToNumber, isValidMoneyString } from './string';

const _verifyChildEntryRow = (child) => (
  child?.type === 'tag' &&
  child?.name === 'td' &&
  child?.children.length > 0 &&
  child?.children[0]?.data && (
    child?.attribs?.class === playerNameClassMapping || 
    // Filter children if salary class AND not valid money string
    (
      child?.attribs?.class === playerSalaryClassMapping &&
      isValidMoneyString(child?.children[0]?.data)
    ) ||
    // Filter children that do not have current year as proper year
    (
      child?.attribs?.class === playerYearClassMapping &&
      child?.children[0]?.data === currentYearSearching
    ) ||
    // Filter children that do not have the level of play as MLB
    (
      child?.attribs?.class === playerLevelClassMapping &&
      child?.children[0]?.data === levelOfPlay
    )
  )
);

/**
 * Parse html retrieved from resource that includes a table of rows
 * containing player/salary mappings.
 * 
 * @param {string} html The html to parse for player salary information
 * @returns {Array<{name: string, salary: number}>} An array of all player/salary mappings
 */
export const parseHtmlToPlayerRows = (html) => {
  const $ = load(html);
  const playerRows = $(tableRowIdentifier)
    .map((_, el, __) => {
      const validEntries = el.children.filter(child => _verifyChildEntryRow(child));
      // If we don't have valid entries, we know that children did not pass the test.
      if (validEntries.length !== 4) return null;

      return validEntries
        .reduce((prev, curr) => {
          (curr?.attribs?.class === playerNameClassMapping && curr?.children[0]?.data) &&
            (prev['name'] = curr?.children[0]?.data);
          (curr?.attribs?.class === playerSalaryClassMapping && curr?.children[0]?.data) &&
            (prev['salary'] = convertMoneyToNumber(curr?.children[0]?.data));

          return prev;
        }, { name: '', salary: 0 });
    })
    .toArray()
    .filter(row => row !== null);
  return playerRows;
};