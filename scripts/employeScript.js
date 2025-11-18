loadDataEmplyer();

function loadDataEmplyer() {
  let employerList = getDataEmployersFromLocalStorageIfExist("employers");
  console.log(employerList);
  renderCardsEmplyers(employerList);
}

function getDataEmployersFromLocalStorageIfExist(keyData) {
  let oldData = localStorage.getItem(keyData); //all time old data be null

  if (oldData == null || oldData == undefined)
    loadDataJson("../data/employe.json");

  oldData = localStorage.getItem(keyData);

  return JSON.parse(oldData);
}

async function loadDataJson(file) {
  let responce = await fetch(file);

  let newData = await responce.json();

  let employerList = [];

  if (newData.length == undefined) {
    // it is an object employer
    employerList.push(newData);
  } else {
    // new data is an array of object employer
    newData.forEach((employer) => {
      employerList.push(employer);
    });
  }
  saveDataEmployerToLocalStorage("employers", employerList);
}

function saveDataEmployerToLocalStorage(keyData, dataList) {
  localStorage.setItem(keyData, JSON.stringify(dataList));
}

// renderCardsEmplyers(employes);

function renderCardsEmplyers(employerList) {
  document.getElementById("list-employe").innerHTML =
    renderListEmployers(employerList);
}

function renderListEmployers(employes) {
  cardListEmploye = "";
  employes.map((employe) => {
    cardListEmploye += renderCard(employe);
  });
  return cardListEmploye;
}

function renderCard(employe) {
  return `
            <div class="card">
                ${renderDetailCard(employe)}
            </div>
    `;
}
function renderDetailCard(employe) {
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
    `;
}
// ajout du dynamic form for experiences
let countExperience = 0;

document.getElementById("ajouterExperience").addEventListener("click", () => {
  countExperience++;
  console.log(countExperience);
  document.getElementById("experiencesListDynamicForm").innerHTML += `
    <div class="dynamicForm">
        <div class="mb-3">
            <label for="societe" class="form-label">Societé</label>
            <input type="text" class="form-control" id="societe" placeholder="Youcode">
        </div>
        <div class="mb-3">
            <label for="Role" class="form-label">Role</label>
            <input type="text" class="form-control" id="Role" placeholder="IT">
        </div>
        <div class="mb-3">
            <label for="dateDebut" class="form-label">De</label>
            <input type="date" class="form-control" id="dateDebut" placeholder="">
        </div>
        <div class="mb-3">
            <label for="dateFin" class="form-label">A</label>
            <input type="date" class="form-control" id="dateFin" placeholder="">
        </div>
    </div> `;
});

let selectrole = document.getElementById("selectRole");

// fonction qui select quel option est il

function toggle(el) {
  var value = el.options[el.selectedIndex].value;
  console.log(value);
  return value;
}

// suavgarder les information du form et l'ajout d'employe d'apres le formulaire

document.forms["ajouterEmployer"].addEventListener("submit", (event) => {
  event.preventDefault();
  let form = event.target;
  console.log(form.selectRole);

  let employer = {
    nom: form.nomComplet.value,
    role: toggle(selectrole),
    email: form.email.value,
    photo: form.photo.value,
    telephone: form.telephone.value,
    experiences: [],
  };

  console.log(employer.experiences);

  for (let i = 0; i < form.name.length; i++) {
    employer.experiences.push({
      societe: form.societe[i].value,
      role: form.Role[i].value,
      dateDebut: form.dateDebut[i].value,
      dateFin: form.dateFin[i].value,
    });
  }

  ajouterEmployerToLocalStorage(employer);
});

function ajouterEmployerToLocalStorage(employer) {
  let employerList = getDataEmployersFromLocalStorageIfExist("employers");
  console.log(employerList);

  employerList.push(employer);
  saveDataEmployerToLocalStorage("employers", employerList);
  // data katb9a kol mra t3awd tloda o ywli overriding o ila mdrthach kykhs nrefrecher la page
  loadDataEmplyer();
}
