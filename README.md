# dapiapp
--Description: This is an app that uses Dapí´s APIS to get Access to the data of multiple bank accounts

--Steps:

1* Getting APPI keys: Sign up into Dapi´s dashboard to login and create a new App (David´s Bank in this case)
Configurate the Ip´s allowed to send requests to Dapi´s APIS

2* Download Insomnia and use it at the beginning to understand how the APIS worked, sending some requests to prove how everything works
Connect Layer: I set it by coping the Html code into my "index.html" and the JavaScript code into my "script.js"
Configurate Dashboard Login in the code: I did this to familiarize myself with how APIS work and to start from the beginning
Configurate Create User in the code: I was still getting used to the APIS so I decided to do this so I could use the data received from the dashboard login (bearer code)
Configurate Exchange Token: now I got used to the APIS I started to work with the Exchange Token, using the data that I got from login into the bank (with the user I created on step 6), here I got the access token
Config Get Accounts: using the data that I got from login into the bank and the access token I did the request for this and here I got the Bank account
I started to work at the DOM to show the bank account data

3* Config Get Transactions: using the info that I got on steps 7 and 8
Config Get Balance: Even though it wasn't at the assignment, I did it for two reasons, the first one was that I run out of time and I wasn't gonna be able to finish the "create transaction" part, the second one is because as an app that it was supposed to show to the user his account, I thought that the balance was really important
I put some CSS styles, again this wasn't part of the assignment but I have enough time to improve how the styles looked (i put it on a balance, and I thought that it was better to secure a good looking app rather than an incomplete final task)
Upload everything to GitHub

4 Create a modal at the index.html (to show there the transfer) 

5* Config Create Beneficiaries: this has to be done with the information that you get from the login at the bank

6 Config Get Beneficiaries: I put a .map inside a "select" element to obtain the beneficiary that the user selected, then I created an input to receive the amount that is going to be transfered,
and a button that once the user click in it, it calls a function where, inside of it, the API "transfer flow" is called

7 Config Transfer Flow: Using the data obtained from the beneficiary, print the transfer´s information in the modal

8 Some CSS to make the app look a little bit better :)

--Issues :

1* There was an issue at trying to put Mexico as the main country, when I get to the products section, it was impossible to click on data and payment APIS

2* I stopped using insomnia when I got to "Get Accounts" due to it was asking me the user Input, the captcha. I got a code as "captcha" but it was impossible to get through

3* There were two problems here, the first one was that even though the fetch return said that I could search for a timeframe of 90 days, it was creating me an error if I did that, I was only able to look in timeframes of 30 days, I looked in all 2020 and 2021 and didn't found the transactions, then I move to the documentation to see how does the transaction had to look like, and there was a date of (2020-03-12), I tried it and there was nothing, to solve this problem, I copied the response example into a variable to have the information available (code-line 172)

5*I thought that i was going to create the beneficiaries at the dapis app, i created a few there but those ones didnt worked

--Ideas to improve :

The situation with the transactions, I couldn't find them (i got an answer for my request but it was always empty)

The authorization header, in the documentation, says "Set type to bearer token and the value to the accessToken obtained using the Exchange Token request.", but it was impossible to access with "bearer toker", I had to change it to "Authorization": "Bearer " + accessToken (this happened in "Get Accounts, Get transactions and Get Balance")



--PLEASE USE THE USER "David@outlook.com" AND THE PASSWORD "password1" TO LOGIN INTO THE BANK "Liv" TO ACCESS--
