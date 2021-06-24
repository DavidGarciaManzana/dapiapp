const appSecret = "97afb12b085476e3529ed756d8eab74c73c40ef98b7f1e573ebf3d952a7471fd"
const appKey = "55465c883f5c105e586f3f47fab8405e2555613fab96805506b6d8904272a4c9"
let bearerCode = ""
let accessCode = ""
let connectionId = ""
let accessToken = ""
let userSecret = ""
let bankAccount = ""
let ba = null;
let loginData = ""
let idButton = ""
let transactions = ""
let fromDate = "2020-03-01"
let toDate = "2020-03-30"
let balance = ""


let handler = Dapi.create({
    environment: Dapi.environments.sandbox,
    appKey: appKey,
    countries: ['AE'],
    isExperimental: true,
    onSuccess: (successData) => {
        accessCode = successData.accessCode
        connectionId = successData.connectionID
        userSecret = successData.userSecret
        loginData = successData
        exchangeToken()
    },
    onSuccessfulLogin: function (bankAccount) {
        ba = bankAccount;
    },
    onFailure: (errorData) => console.log(errorData),
});
setTimeout(() => {
    handler.open();
}, 5000)


let dashboardLogin = () => {
    fetch("https://api.dapi.co/v2/clients/ClientLogin/password", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "Davidgarciama@outlook.com",
            "password": "Isometrico3000"
        })
    }).then((resp) => {
            return resp.json()
    }).then((answer) => {
        bearerCode = answer.jwt
        // Activate the following line if you want to create a new user
        // createUser()
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - dashboardLogin');
    }))
}
dashboardLogin()


let createUser = () => {
    fetch("https://api.dapi.co/v2/apps/sandbox/CreateUser", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + bearerCode,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "appKey": "55465c883f5c105e586f3f47fab8405e2555613fab96805506b6d8904272a4c9",
            "username": "David@outlook.com",
            "password": "password1",
            "bankID": "DAPIBANK_AE_LIV"
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - createUser');
    }))
}


const exchangeToken = () => {
    fetch("https://api.dapi.co/v2/auth/ExchangeToken", {
        method: "POST",
        body: JSON.stringify({
            "appSecret": appSecret,
            "accessCode": accessCode,
            "connectionID": connectionId
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
        accessToken = answer.accessToken
        getAccounts()
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - exchangeToken');
    }))

}


const getAccounts = () => {
    fetch("https://api.dapi.co/v2/data/accounts/get", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "appSecret": appSecret,
            "userSecret": userSecret
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
        bankAccount = answer
        bankAccount.accounts.map((account) => {
            const infoInDom = document.createElement("div");
            infoInDom.setAttribute("id", "info");
            infoInDom.innerHTML = `        
                <div class="card">
                  <div class="card-side front">
                    <p class="title-transactions">Account</p>
                    <div class="all-in-front">
                        <p>Currency Name:</p>
                        <p class="currency">${account.currency.name}</p>
                        <p>Type: ${account.type}</p>
                        <p>Account Number: ${account.number}</p>
                    </div>
                    <button class="transactionsButton" id="${account.id}">See transactions</button>
                  </div>
                  <div class="card-side back">
                    <div class="back-side"></div>
                  </div>
                </div>        
                `;
            document.body.appendChild(infoInDom);
            document.getElementById("info").style.display = "block";
            let allInFront = infoInDom.querySelector(".all-in-front")
            let accountId = account.id
            getBalance(allInFront, accountId)
        })
        let buttons = document.querySelectorAll(".transactionsButton")
        buttons.forEach(button => {
            button.addEventListener("click", showTransaction, false)
        })}).catch((function (error) {
            console.log('Error, its impossible to communicate with the server - getAccounts');
        }))
}
const showTransaction = (event) => {
    document.getElementById("preloader").style.display = "block"
    idButton = event.target.id
    fetch("https://api.dapi.co/v2/data/transactions/get", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "appSecret": appSecret,
            "userSecret": userSecret,
            "accountID": idButton,
            "fromDate": fromDate,
            "toDate": toDate
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
        answer = {
            "operationID": "e1303f1a-5146-4a91-99a6-1762726cea30",
            "success": true,
            "status": "done",
            "transactions": [
                {
                    "afterAmount": null,
                    "beforeAmount": null,
                    "amount": 44.1,
                    "currency": {
                        "code": "AED",
                        "name": "UNITED ARAB EMIRATES DIRHAM"
                    },
                    "date": "2020-03-12T19:04:11.000Z",
                    "description": "POTATO STATION",
                    "details": "Food",
                    "type": "debit"
                },
                {
                    "afterAmount": null,
                    "beforeAmount": null,
                    "amount": 67.2,
                    "currency": {
                        "code": "AED",
                        "name": "UNITED ARAB EMIRATES DIRHAM"
                    },
                    "date": "2020-03-15T19:02:47.000Z",
                    "description": "GAS STATION",
                    "details": "Gas",
                    "type": "debit"
                },
                {
                    "afterAmount": null,
                    "beforeAmount": null,
                    "amount": 88.5,
                    "currency": {
                        "code": "AED",
                        "name": "UNITED ARAB EMIRATES DIRHAM"
                    },
                    "date": "2020-03-20T19:02:47.000Z",
                    "description": "STORE",
                    "details": "Clothes",
                    "type": "debit"
                }
            ]
        }
        transactions = answer.transactions
        let spinCard = event.target.closest("div.card")
        spinCard.setAttribute("class", "card rotate")
        let backDiv = spinCard.querySelector(".card-side.back").querySelector("div.back-side")
        backDiv.innerHTML = ""
        if (transactions.length === 0) {
            backDiv.innerHTML = `<div>Not existent transactions</div>`
        } else {
            let titleTransctions = document.createElement("div")
            titleTransctions.innerText = "Transactions"
            titleTransctions.setAttribute("class", "title-transactions")
            backDiv.appendChild(titleTransctions)

            transactions.map((transaction) => {
                let newDiv = document.createElement("div")
                newDiv.setAttribute("class", "individual")
                let imageSrc = ""
                switch (transaction.details) {
                    case "Food":
                        imageSrc = "img/Food.svg"
                        break
                    case "Gas":
                        imageSrc = "img/Gas.svg"
                        break
                    case "Clothes":
                        imageSrc = "img/Clothes.svg"
                        break
                    default:
                        imageSrc = "img/Generic.svg"
                }
                newDiv.innerHTML = `
                <div class="images"><img src="${imageSrc}" alt="Transaction"></div>
                <div class="details">${transaction.details}</div>
                <div class="amount">-${transaction.amount}</div>
                <div class="ccode">${transaction.currency.code}</div>
                `
                backDiv.appendChild(newDiv)
            })
        }
        let buttonBack = document.createElement("button")
        buttonBack.setAttribute("class", "button-back")
        buttonBack.innerHTML = `Back To Account`
        backDiv.appendChild(buttonBack)
        buttonBack.addEventListener("click", backToAccount, false)
        document.getElementById("preloader").style.display = "none"
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - getTransactions');
        document.getElementById("preloader").style.display = "none"
    }))
}

const backToAccount = (event) => {
    let spinCard = event.target.closest("div.card")
    spinCard.setAttribute("class", "card");
}


const getBalance = (HTMLElement, accountId) => {
    fetch("https://api.dapi.co/v2/data/balance/get", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "appSecret": appSecret,
            "userSecret": userSecret,
            "accountID": accountId
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
        balance = answer.balance
        let showBalance = document.createElement("div")
        showBalance.innerHTML = `
           <img class="logo" src="img/Logo.svg" alt="logo">
           <div class="balance">
               <div class="here">Balance:</div>
               <h1 class="h1">${balance.amount} ${balance.currency.code}</h1> 
           </div>  
           `
        HTMLElement.prepend(showBalance)
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - balance');
    }))
}


