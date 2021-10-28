# qualifying-offer-visualization
## Introduction
This repository contains the frontend code built upon the React library that allows for a visual representaion of the salaries of  MLB players'.

## Data Presented
This website exists in an effort to showcase data pertaining to MLB players' salaries. At a baseline, introductory leve, the site is able to exhibit the following data in a slick, easy-to-use design:
- Qualifying Offer Report (Tab1)
  - A calulated, top-level value computed from the top 125 salaries of players that represents the `qualifying offer` an MLB club can make to an impending free agent. Additionally, a **NOTE** is given explaining what the number represents.
  - A table containing the top 125 players with the highest salaries in order
- Salary Breakdown Report (Tab2)
  - Salary report statistics - The following statistics are showing in list form:
    - The number of salaries reported on
    - The average salary realized
    - The number of players with a salary higher than the average
    - The number of players with a salary lower than the average
    - The median salary realized
    - The standard deviation of the dataset
    - An explanation of the data
  - A graph built on Chart.js showing the distribution of the number of players within each bank of making $1million.
  - A table with access to all player salary information that is paginated

## Data Validation
The largest piece of validation that is done is when the HTML is parsed and abstracted into an array that the web application can consume. The following validations are done at the point of reading data from remote website:
- The 'year' column is filtered for only the year 2016
- The 'level' column is filtered for only the level 'MLB'
- The 'money' column is filtered to make sure that it is set and that it has a proper regex for a money string

If any row violates any of the above, it is dismissed from the calculations. If all of the checks pass the row containing just the name and salary is formed into object that is injected in the playerSalary array.

## Additional Features
- Caching
  - A custom-built caching solution was created 
  - Signficantly speeds up the data retrieval of player salary information
  - Is invalidated after 15 minutes, so not a large amount of time for stale data
  - Uses sessionStorage API to be persistent across page refreshes so that data can be retrieved after a reload
- Page Loader
  - Small feature, but powerful way to show page is being loaded and processing is being accomplished in background
  - Will automatically vanish in 10 seconds if data is not retrieved in that time
- Mobile-Friendly Design
  - The webpage uses CSS breakpoints and grid properties to be able to dynamically adjust output user interface for best experience across platforms
  - Resize trackers to be able to examine when page is resized and to act accordingly (custom-hooks)
- Pagination Control of Tables:
  - The tables were created that allows users to load 25 player entries at a time instead of showing them it all at once. They also have the option to see everything, if they wish.
- Non-Customer Facing implementation notes:
  - Context objects are used throughout for simpler and more concise code design
    - WindowContext: Allows for the current screen size to constantly be adjusted and available within all components so that the design can be uniquely changed
    - CacheContext: Allows for all components to be able to retrieve values from cache and update cache accordingly
    - SalaryContext: Allows for salary to be retrieved within one component and shared amongst all others to eliminate passing of props
  - Clearly defined utility files containing specific functions that can be reused and consumed inside components

## Published Urls
- **[Qualifying Frontend](https://qualifying-offer-visualization.herokuapp.com)**: This the URL that the website for qualifying offer data is actually located. If you wish to interact with the website, go to that URL.
- **[Proxy](https://html-proxy.herokuapp.com/)**: This was a piece that was added in order to properly be able to retrieve website data. Because of CORS restrictions, unless the website html allows for requests from heroku host, a single website cannot make a fetch call to another website. This proxy exists to be able provide a server -> client side connection for pulling the website data while setting up the hosts that can query on the resource. Please see below in [Giving thanks!](#giving-thanks!).

Both published URLs are serviced and deployed through Heroku.

## Giving thanks!
Thank you to the contributors of [cors-anywhere](https://github.com/Rob--W/cors-anywhere) for supplying a proxy solution to be able to pull data from an html website. Before finding this solution and deploying, I was facing cors errors when trying to fetch data from resources. This codebase allowed me to deploy a reverse-proxy and allow for me to get these resources needed.

