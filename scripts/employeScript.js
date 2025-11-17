loadDataEmplyer();

function loadDataEmplyer(){

    let employerList = getDataEmployersFromLocalStorageIfExist("employers");

    renderCardsEmplyers(employerList);
}

function getDataEmployersFromLocalStorageIfExist(keyData){
    
    let oldData = localStorage.getItem(keyData); //all time old data be null

    if(oldData == null || oldData == undefined)
        loadDataJson("../data/employe.json");

    oldData = localStorage.getItem(keyData);

    return JSON.parse(oldData);
}

async function loadDataJson(file){
    let responce = await fetch(file);

    let newData = await responce.json(); 

    let employerList = [];

    if(newData.length == undefined){
        // it is an object employer
        employerList.push(newData);

    }
    else{
        // new data is an array of object employer
        newData.forEach(employer =>{
            employerList.push(employer);
        });
    }
    saveDataEmployerToLocalStorage("employers", employerList);
}

function saveDataEmployerToLocalStorage(keyData, dataList){
    localStorage.setItem(
        keyData,
        JSON.stringify(dataList));
}

// renderCardsEmplyers(employes);

function renderCardsEmplyers(employerList){
    document.getElementById("list-employe").innerHTML = renderListEmployers(employerList);
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


console.log(document.forms["ajouterEmployer"]);
document.forms["ajouterEmployer"].addEventListener("submit", (event) =>{
    event.preventDefault();

    let form = event.target;

    let employer = {
        nom : form.nomComplet.value,
        // role:form.selectRole.value,
        email:form.email.value,
        photo:form.photo.value,
        telephone:form.telephone.value,
        experiences:[]
    };
console.log(form.name.length);
    for(let i=0;i<form.name.length;i++){
        employer.experiences.push(
            {
                societe: form.societe[i].value,
                role:form.Role[i].value,
                dateDebut:form.dateDebut[i].value,
                dateFin:form.dateFin[i].value
            }
        );
    }

    // ajouterEmployerToLocalStorage(employer);
    let employerList = getDataEmployersFromLocalStorageIfExist("emplyers");

    employerList.push(employer);
    saveDataEmployerToLocalStorage("employers",employerList);
    console.log(employer);
});

function ajouterEmployerToLocalStorage(employer){
    
}