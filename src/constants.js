// Variables needed to properly parse html table
export const tableIdentifier = 'salaries-table';
export const tableRowIdentifier = `#${tableIdentifier} tbody tr`;
export const playerNameClassMapping = 'player-name';
export const playerSalaryClassMapping = 'player-salary';
export const playerYearClassMapping = 'player-year';
export const playerLevelClassMapping = 'player-level';
export const currentYearSearching = '2016';
export const levelOfPlay = 'MLB';

// Cache options
export const baseCacheOptions = {
  stdTtl: 1800,        // 30 minutes
  checkInterval: 60,   // 1 minute
  deleteOnExpire: true,
  maxNumItems: 50,
};
export const playerSalaryTtlSeconds = 900; // 15 minutes;

// Window breakpoints - bottom level
export const mobileBottomBreakpoint = 320;
export const ipadBottomBreakpoint = 481;
export const smallLaptopBottomBreakpoint = 769;
export const largeLaptopBottomBreakpoint = 1025;
export const extraLargeBottomBreakpoint = 1201;
