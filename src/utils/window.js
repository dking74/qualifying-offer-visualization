import {
  mobileBottomBreakpoint,
  ipadBottomBreakpoint,
  smallLaptopBottomBreakpoint,
  largeLaptopBottomBreakpoint,
  extraLargeBottomBreakpoint
} from '../constants';


export const setResizeEvent = (callback) =>
  window.addEventListener('resize', callback);

export const removeResizeEvent = (callback) =>
  window.removeEventListener('resize', callback);

export const getScreenSize = () => window.innerWidth;

/** Check for mobile screen  */
export const isMobileScreen = () => {
  const screenSize = getScreenSize();
  return (screenSize >= mobileBottomBreakpoint && screenSize < ipadBottomBreakpoint);
};
export const isMobile = (screenSize) =>
  (screenSize >= mobileBottomBreakpoint && screenSize < ipadBottomBreakpoint);

/** Check for iPad screen  */
export const isIpadScreen = () => {
  const screenSize = getScreenSize();
  return (screenSize >= ipadBottomBreakpoint && screenSize < smallLaptopBottomBreakpoint);
};
export const isIpad = (screenSize) =>
  (screenSize >= ipadBottomBreakpoint && screenSize < smallLaptopBottomBreakpoint);

/** Check for small laptop screen  */
export const isSmallLaptopScreen = () => {
  const screenSize = getScreenSize();
  return (screenSize >= smallLaptopBottomBreakpoint && screenSize < largeLaptopBottomBreakpoint);
};
export const isSmallLaptop = (screenSize) =>
  (screenSize >= smallLaptopBottomBreakpoint && screenSize < largeLaptopBottomBreakpoint);

/** Check for large laptop screen  */
export const isLargeLaptopScreen = () => {
  const screenSize = getScreenSize();
  return (screenSize >= largeLaptopBottomBreakpoint && screenSize < extraLargeBottomBreakpoint);
};
export const isLargeLaptop = (screenSize) =>
  (screenSize >= largeLaptopBottomBreakpoint && screenSize < extraLargeBottomBreakpoint);

/** Check for large laptop screen  */
export const isExtraLargeScreen = () => {
  const screenSize = getScreenSize();
  return (screenSize >= extraLargeBottomBreakpoint);
};
export const isExtraLarge = (screenSize) => screenSize >= extraLargeBottomBreakpoint;

/** Check if screen is less than medium-sized */
export const isLessThanMediumScreen = () => {
  const screenSize = getScreenSize();
  return screenSize < smallLaptopBottomBreakpoint;
};
export const isLessThanMedium = (screenSize) => screenSize < smallLaptopBottomBreakpoint;

/** Check if screen is less than medium-sized */
export const isLessThanSmallScreen = () => {
  const screenSize = getScreenSize();
  return screenSize < ipadBottomBreakpoint;
};
export const isLessThanSmall = (screenSize) => screenSize < ipadBottomBreakpoint;