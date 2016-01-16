# Javascript Cash Machine

This is a coding challenge I was issued.  I've included the challenge at the bottom of this document.  

## Goal

My goal was to program this in pure javascript, html and css - using no external libraries.  In doing so, I'm only supporting
recent browsers like IE11+, Firefox, Chrome and Safari.  I wanted to do this in javascript in the browser versus in something
like PHP or nodeJS because I think it's just a fun exercise.

## Official Challenge

The cash machine is pre-stocked with the following denominations:

- $100 - 10 Bills
- $50 - 10 Bills
- $20 - 10 Bills
- $10 - 10 Bills
- $5 - 10 Bills
- $1 - 10 Bills

Your application should take input from the standard input stream and support the following commands:

- R - Restocks the cash machine to the original pre-stock levels defined above 
- W<dollar amount>   - Withdraws that amount from the cash machine (e.g. "W $145") 
- I<denominations>   - Displays the number of bills in that denomination present in the cash machine (e.g. I $20 $10 $1) 
- Q - Quits the application

The withdrawals from the cash machine should dispense cash in the most efficient manner possible, with the least amount of bills.  After a withdrawal, the program should display success or failure and the remaining balance in the cash machine (sample output below).  For an inquiry, the program should display the number of bills in the denominations specified (sample output below).  After a restock, the program should display the balance in the cash machine (same as after a withdrawal).  If the input is not understood, "Invalid Command" should be displayed.  No additional messages, prompts or errors should be displayed.
