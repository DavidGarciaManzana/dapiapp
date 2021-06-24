# dapiapp
--Description:
This is an app that uses Dapí´s APIS to get Access to the data of multiple bank accounts

--Steps:
1. *1** Getting APPI keys: Sign up into Dapi´s dashboard to login and create a new App (David´s Bank in this case)
2. Configurate the Ip´s allowed to send requests to Dapi´s APIS
3. *2** Download Insomnia and use it at the beginning to understan how the APIS worked, sending some requests to prove how everything works
4. Connect Layer : I set it by coping the Html code into my "index.html" and the JavaScript code into my "script.js"
5. Configurate Dashboard Login in the code: I did this to familiarize with how APIS work and to start from the beginning
6. Configurate Create User in the code: I was still getting used to the APIS so i decided to do this so i could use the data received from dashboard login (bearer code)
7. Configurate Exchange Token: now i got used to the APIS i started to work with the Exchange Token, using the data that i got from login into the bank (with the user i created on step 6), here i got the _access token_
8. Config Get Accounts: using the data that i got from login into the bank and the access token i did the request for this and here i got the _Bank account_
9. I started to work at the DOM to show the bank account data
10. *3** Config Get Transactions: using the info that i got on steps 7 and 8
11. Config Get Balance : Even though it wasn't at the assignament, i did it for two reasons, the first one was that i run out of time and i wasn gonna be able to finish the "create transaction" part, the second one is because as an app that it was supposed to show to the user his account, i thought that the balance was really important
12. I put some CSS styles, again this wasnt part of the assignament but i have enough time to improve how the styles looked (i put it on a balance and i though that it was better to seccure a good looking app rather than an imcomplete final task)
13. Upluad everything to GitHub

--Issues :

*1** There was an issue at trying to put Mexico as the main country, when i get to the products section, it was impossible to clic on data and payment APIS

*2** I stopped using insomnia when i got to  "Get Accounts" due to it was asking me the user Input, the captcha. i got a code as "captcha" but it was impossible to get through  

*3** There was two problems here, the first one was that even thought the fetch return said that i could search for a timefrime of 90 days, it was creating me an error if i did that, i was only able to look in timeframes of 30 days,
i looked in all 2020 and 2021 and didnt found the transactions, then i move to the documentation to see how does the transaction had to look like, and there was a date of (2020-03-12), i tried it and there was nothing, to solve this problem,
i copied the _response example_ into a variable to have the information available (code-line 172)

--Ideas to improve :

1. The situation with the transactions, i couldnt find them (i got an answer for my request but it was always empty)
2. The autorization header, in the documentation says "Set type to bearer token and the value to the accessToken obtained using the Exchange Token request.", but it was impossible to access with "bearer toker", i had to change it to "Authorization": _"Bearer "_ + accessToken

--Code:
Breve description of the code
line - description

18 - the sdk of the connect layer

40 - function dashboard login 

55 - it calls function "create user"

60 - it calls "dashboard login"

63 - function create user

85 - function exchange token

    28 - It calls function exchange token

97 - it calls  "get Accounts"

105 - function "get Accounts"

120 - it uses a map to go to all the accounts and show the info in the innerHTML (theres just 1 account here)

140 - appends the info into the constant "infoInDom (line 121) "

144 - it calls "getBalance" (line 275)

146 - the configuration of the botton which show the transactions  (with an addeventlisener who calls the function "showTransaction")

153 - function "showTransaction" (here i copy the transactions from the documentation)

219 - the css for animate the card (it has a back and a front side and spins)

223 - i put an if to show "no transactions" (in case its impossible to get the info from the fetch)

231 - map that puts the right image to the transaction, i set 4 cases, for 3 specific details and the 4rth one for a different one

248 - i used an inner.html to set the info in the back part of the card

257 - configuration for the buttons that spins back the card that calls the function "backToAccount"

269 - function backToAccount

275 - function getBalance




