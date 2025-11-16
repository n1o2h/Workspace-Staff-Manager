let employes = [
    {
        "nom":"Nohaila Ait Hammad",
        "role": "Devloppeur",
        "email":"aithammadnohaila@gmail.com",
        "photo":"../images/photo.jpg",
        "telephone":"+212633341108",
        "experiences":[]
    }
];
renderCardsEmplyers(employes);

function renderCardsEmplyers(employes){
    document.getElementById("list-employe").innerHTML +=renderListEmployers(employes);
}

function renderListEmployers(employes){
    cardListEmploye = "";
    employes.map(employe =>{
        cardListEmploye += renderCard(employe);
    });
    return cardListEmploye;
}

function renderCard(employe){
    return `
            <div class="card">
                ${renderDetailCard(employe)}
            </div>
    `;
}
function renderDetailCard(employe){
    return `
    <div class="card-body">
                    <div class="profile">
                        <img src=${employe.photo} alt="image profile">
                    </div>
                    <div class="content-profile">
                        <h4>${employe.nom}</h4>
                        <span>${employe.role}</span>
                    </div>
                    <div class="icons">
                        <i class="fa-solid fa-pen"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
    `
}
