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
let senderId = ""
let beneficiaries = ""


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
        senderId = bankAccount.accounts[0].id
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
                    <button class="transactions-button" id="${account.id}">See transactions</button>
                    <button class="iniciate-transaction-button" id="iniciate">Iniciate Transaction</button>
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
        let buttons = document.querySelectorAll(".transactions-button")
        buttons.forEach(button => {
            button.addEventListener("click", showTransaction, false)
        })
        let buttons2 = document.querySelectorAll(".iniciate-transaction-button")
        buttons2.forEach(buttonn => {
            buttonn.addEventListener("click", iniciateNewTransfer, false)
        })
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - getAccounts');
    }))
}
const iniciateNewTransfer = (event) => {
    let modal = document.querySelector("#open-modal")
    modal.className = "modal-window open"
    let beneficiaries = getBeneficiaries()
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

const initiateTransfer = () => {
    let amount = document.getElementById("transfer-amount")
    if (amount.value == "") {
        alert("Please insert a valid amount")
        return false
    }

    let beneficiary = beneficiaries.filter(beneficiary => beneficiary.id === document.getElementById("beneficiary-data").value)[0]
    fetch("https://api.dapi.co/v2/payment/transfer/autoflow", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "appSecret": appSecret,
            "userSecret": userSecret,
            "amount": parseInt(amount.value),
            "senderID": senderId,
            "userInputs": [
                {
                    "answer": "123456",
                    "id": "otp",
                    "index": 0,
                    "query": "Please enter a Smart Pass Token from your ENBD mobile application"
                }
            ],
            "beneficiary": {
                "name": "Jonh Doe",
                "address": {
                    "line1": "Baker Street",
                    "line2": "Abu Dhabi",
                    "line3": "United Arab Emirates"
                },
                "country": "AE",
                "branchAddress": "Deira",
                "branchName": "Main Branch",
                "swiftCode": "FGBMAEAA",
                "iban": beneficiary.iban,
                "accountNumber": beneficiary.accountNumber,
                "bankName": "ENBD"
            }
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
        if (answer.success == true && typeof answer.reference != "undefined") {
            document.getElementById("modal-content").innerHTML = `<h3 class="h3">Succesfull transfer</h3><div class="reference">Reference: ${answer.reference}</div>`
            document.getElementById("modal-title").innerHTML = `<div class="transfer-status">Transfer Status</div>`
        } else {
            document.getElementById("modal-content").innerHTML = `<div>Transfer Failed</div>`
            document.getElementById("modal-title").innerHTML = `<div class="transfer-status">Transfer Status</div>`
        }
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - Initiate transfer');
    }))
}


const getBeneficiaries = () => {
    fetch("https://api.dapi.co/v2/payment/beneficiaries/get", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "appSecret": appSecret,
            "userSecret": userSecret
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
        let options = ""
        answer.beneficiaries.map((beneficiary) => {
            options += `<option value="${beneficiary.id}">${beneficiary.name}</option>`
        })
        document.getElementById("modal-content").innerHTML = `
            <label for="beneficiary-data" class="contact-label">Contact: </label>
            <select name="options" id="beneficiary-data" class="select-beneficiary">
               ${options} 
            </select>
            <label for="transfer-amount">Amount: </label>
            <input type="number" id="transfer-amount" placeholder="AED">
            <button id="button-transfer">Transfer</button>
            `
        beneficiaries = answer.beneficiaries

        document.getElementById("button-transfer").addEventListener("click", initiateTransfer, false)
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - Get Beneficiaries');
    }))
}

const createBeneficiaries = () => {
    fetch("https://api.dapi.co/v2/payment/beneficiaries/create", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "appSecret": appSecret,
            "userSecret": userSecret,
            "type": "local",
            "swiftCode": "321",
            "sortCode": "123",
            "bankName": "Liv Sandbox",
            "name": "RealSuperman",
            "iban": "DAPIBANKAELIV1624307853549914811241",
            "accountNumber": "1624307853549914811241",
            "country": "AE",
            "branchName": "aaa",
            "branchAddress": "bbb",
            "address": {
                "line1": "ccc",
                "line2": "ddd",
                "line3": "eee"
            }
        })
    }).then((resp) => {
        return resp.json()
    }).then((answer) => {
    }).catch((function (error) {
        console.log('Error, its impossible to communicate with the server - Create Beneficiarie');
    }))
}
document.querySelector(".modal-close").addEventListener("click", function () {
    document.querySelector(".modal-window").className = "modal-window"
}, false)
