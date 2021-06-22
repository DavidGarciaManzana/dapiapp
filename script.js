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
let valores = ""


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
    })
        .then((resp) => {
            return resp.json()
        })
        .then((answer) => {
            bearerCode = answer.jwt
            console.log("bearer code= " + bearerCode)
            // Activate the following line if you want to create a new user
            // createUser()
        })
        .catch((function (error) {
            console.log(error)
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
            "username": "Superman",
            "password": "passsword2",
            "bankID": "DAPIBANK_AE_LIV"
        })
    }).then((resp) => {
        console.log(resp)
        return resp.json()
    }).then((answer) => {
        console.log(answer)
    }).catch((function (error) {
        console.log(error)
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
        // console.log(resp)
        return resp.json()
    }).then((answer) => {
        accessToken = answer.accessToken
        console.log("Access Token: " + accessToken)
        getAccounts()
    }).catch((function (error) {
        console.log(error)
        console.log('Error, its impossible to communicate with the server - exchangeToken');
    }))

}


const getAccounts = () => {
    // console.log("acces token justo al iniciar getAccounts " + accessToken)
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

    })
        .then((resp) => {
            return resp.json()
        })
        .then((answer) => {
            bankAccount = answer
            //todo no puedo poner ambas cosas en el console.log porque aparece [Object object]
            console.log("Bank Accounts: ")
            console.log(bankAccount)


            bankAccount.accounts.map((account) => {
                const infoInDom = document.createElement("div");
                infoInDom.setAttribute("id", "info");
                infoInDom.innerHTML =
                    `        
                        <div class="card">
                          <div class="card-side front">
                            <div>
                                <p>Currency Code: ${account.currency.code} </p>
                                <p>Currency Name: ${account.currency.name}</p>
                                <p>iban code: ${account.iban}</p>
                                <p>id: ${account.id}</p>
                                <p>Number: ${account.number}</p>
                                <p>Name: ${account.name}</p>
                                <p>Type: ${account.type}</p>
                                <button class="transactionsButton" id="${account.id}">See transactions</button>
                            </div>
                           </div>
                          <div class="card-side back">
                            <div>Back Side</div>
                          </div>
                        </div>

                        
<!--                        1 boton que tenga el id de la cuenta como id,-->
<!--                        2 al darle clic a este boton usar el addeventlistener para mostrar las transacciones,
                            usando el id que tiene el boton para mostrar las transacciones,
                            3 usar como fechas los ultimos 30 dias, 
                            4 agregarle que cuando le de clic al boton, la clase .rotate se agrege al div que tiene clase card
                            que es el primer div en el inner.html-->
                    `
                ;
                document.body.appendChild(infoInDom);
                document.getElementById("info").style.display = "block";

            })
            let buttons = document.querySelectorAll(".transactionsButton")

            buttons.forEach(button => {
                button.addEventListener("click", showTransaction, false)
            })

        })
        .catch((function (error) {
            console.log(error)
            console.log('Error, its impossible to communicate with the server - getAccounts');
        }))


}

const showTransaction = (event) => {
    document.getElementById("preloader").style.display = "block"
    let idButton = event.target.id


    setTimeout(() => {
        console.log(idButton)
        document.getElementById("preloader").style.display = "none"
    }, 2000)

    //todo mover este setTimeout al ultimo then del fetch despues de haber mostrado las transacciones (la linea 201
    // quita el loader
}

// const showTransaction = function (event) {
//     let idButton = event.target.id
//     console.log("se ejecuto la funcion")
//     console.log(idButton)
// }


