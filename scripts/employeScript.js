loadDataEmplyer();

function loadDataEmplyer() {
      let employerList = getDataEmployersFromLocalStorageIfExist("employers");
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
;

document.getElementById("ajouterExperience").addEventListener("click", () => {

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
}

// suavgarder les information du form et l'ajout d'employe d'apres le formulaire
document.forms["ajouterEmployer"].addEventListener("submit", (event) => {
      event.preventDefault();

      let form = event.target;
      if(validerForm()){
      let employer = {
      nom: form.nomComplet.value,
      role: toggle(selectrole),
      email: form.email.value,
      photo: form.photo.value,
      telephone: form.telephone.value,
      experiences: [],
      };
      ajouterEmployerToLocalStorage(employer);

      }
      else{
            console.log("form not valid");
      }

      


// document.getElementById("ajouter").addEventListener("click",  ()=>{
//       if(validerForm())
//       ajouterEmployerToLocalStorage(employer);
// });

});


function ajouterEmployerToLocalStorage(employer) {
      let employerList = getDataEmployersFromLocalStorageIfExist("employers");
      employerList.push(employer);
      saveDataEmployerToLocalStorage("employers", employerList);
      // data katb9a kol mra t3awd tloda o ywli overriding o ila mdrthach kykhs nrefrecher la page
      loadDataEmplyer();
}

// prévisualisation de la photo
document.getElementById("photo").addEventListener("change", function(){
      const image = this.files[0];
      console.log(image);
      const reader = new FileReader();
      reader.onload = () => {
            const imgURL = reader.result;
            const img = document.createElement("img");
            img.classList.add("image-prof");
            img.src = imgURL;
            img.style.backgroundRepeat="no-repeat"
            document.getElementById("imageArea").appendChild(img);
      }
      reader.readAsDataURL(image);
})

// filtrage des listes par nom ou par role

function employerFiltreParNomOuRole(){
      let employerList = getDataEmployersFromLocalStorageIfExist("employers");
      document.getElementById("searchRoleNom").addEventListener("input", e => {
      const value = e.target.value.toLowerCase()
      let employersFilt = [];
      employerList.forEach(emp => {
            if (emp.nom.toLowerCase().includes(value) || emp.role.toLowerCase().includes(value)){
                  employersFilt.push(emp)
            }else{
                  let card = document.createElement("div");
                  card.innerText = `<div class="AucunEmployerExistCard">
                                    <i class="fa-regular fa-user"></i>
                                    <h4>Aucun employe exist</h4>
                                    </div>`
                  document.getElementById("list-employe").appendChild(card);
            }
            if(employersFilt != [])
                  renderCardsEmplyers(employersFilt);
      })
      })
}
employerFiltreParNomOuRole()

function validerForm(){
      let form = document.forms["ajouterEmployer"];
      // if name is empty
      let estvalid =false;

      if(form.nomComplet.value.trim() === ""){

            onErrorInput(form.nomComplet, "Nom complet est vide")
            estvalid=false;

      }else if(!form.nomComplet.value.trim().match(/^[a-z]+([ \-']?[a-z]+[ \-']?[a-z]+[ \-']?)[a-z]+$/)){
            onErrorInput(form.nomComplet, "Nom complet est non valid")
            estvalid=false;
      }else if(form.nomComplet.value.trim().match(/^[a-z]+([ \-']?[a-z]+[ \-']?[a-z]+[ \-']?)[a-z]+$/)){
            onSuccessInput(form.nomComplet);
            estvalid = true;
      }

      // email est vide
      if(form.email.value.trim() === ""){
            onErrorInput(form.email, "Email est vide")
            estvalid=false;
      }else if(!form.email.value.trim().match(/[\w.-]+@[\w-]+\.\w{3,6}/)){
            onErrorInput(form.email, "Email est non valid")
            estvalid=false;
      }
      if(form.email.value.trim().match(/[\w.-]+@[\w-]+\.\w{3,6}/)){
            onSuccessInput(form.email);
            estvalid = true;
      }

      // telephone est vide
      if(form.telephone.value.trim() === ""){
            onErrorInput(form.telephone, "Telephone est vide")
            estvalid=false;
      }else if(!form.telephone.value.trim().match(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm)){
            onErrorInput(form.telephone, "Telephone est non valid")
            estvalid=false;
      }
      /**
       * valid formats
            (123) 456-7890
            (123)456-7890
            123-456-7890
            1234567890
            +31636363634
            +3(123) 123-12-12
            +3(123)123-12-12
            +3(123)1231212
            +3(123) 12312123
            +3(123) 123 12 12
            075-63546725
            +7910 120 54 54
            910 120 54 54
            8 999 999 99 99
       */
      if(form.telephone.value.trim().match(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm)){
            onSuccessInput(form.telephone);
            // estvalid = true;
      }

      // photo url est vide
      if(form.photo.value.trim() === ""){
            // onErrorInput(form.photo, "Photo est vide")
            form.photo.value = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
            estvalid=true;

      }else if(!form.photo.value.trim().match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)){
            onErrorInput(form.photo, "photo est non valid")
            estvalid=false;
      }else if(form.photo.value.trim().match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)){
            onSuccessInput(form.photo);
            estvalid = true;
      }




return estvalid;

}

function onSuccessInput(input){
      console.log(2);
      let parentInput = input.parentElement;
      let messageElm = parentInput.querySelector("span");
      messageElm.style.display ="none";
      messageElm.innerText ="";
}
function onErrorInput(input, message){
      console.log(1);
      let parentInput = input.parentElement;
      let messageElm = parentInput.querySelector("span");
      messageElm.style.display ="block";
      messageElm.innerText =message;
}


