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

// fonction qui select quel option est il
let selectrole = document.getElementById("selectRole");

function toggle(el) {
      var value = el.options[el.selectedIndex].value;
      return value;
}

// ajout du forulaire dynamic des experiencs

document.getElementById("ajouterExperience").addEventListener("click", () => {
      addExperience();
});

function addExperience() {
      const container = document.getElementById("experiencesListDynamicForm");

      container.insertAdjacentHTML("beforeend", `
      <div class="dynamicForm border rounded p-2 mb-3">

            <div class="mb-3">
                  <label class="form-label">Société</label>
                  <input type="text" class="form-control" name="societe[]" placeholder="Youcode">
                  <span class="error"></span>
            </div>

            <div class="mb-3">
                  <label class="form-label">Role</label>
                  <input type="text" class="form-control" name="Role[]" placeholder="IT">
                  <span class="error"></span>
            </div>

            <div class="mb-3">
                  <label class="form-label">De</label>
                  <input type="date" class="form-control" name="dateDebut[]">
                  <span class="error"></span>
            </div>

            <div class="mb-3">
                  <label class="form-label">A</label>
                  <input type="date" class="form-control" name="dateFin[]">
                  <span class="error"></span>
            </div>

            <div class="mb-3 d-flex gap-2">
                  <button type="button" class="btn btn-secondary w-100 ajouterExperienceInterne"> + Ajouter </button>
                  <button type="button" class="btn btn-danger w-100 supprimerExperience">Supprimer</button>
            </div>

      </div>
      `);
      attachRealTimeValidation();
}

// Gérer les boutons internes ajouter et supprimer
document.getElementById("experiencesListDynamicForm").addEventListener("click", (e) => {

      // Ajouter une nouvelle expérience
      if (e.target.classList.contains("ajouterExperienceInterne")) {
            addExperience();
      }

      // Supprimer ce bloc d'expérience
      if (e.target.classList.contains("supprimerExperience")) {
            e.target.closest(".dynamicForm").remove();
      }
});

function attachRealTimeValidation() {
      document.querySelectorAll(".dynamicForm input").forEach(input => {
            input.addEventListener("blur", () => {
                  validateField(input);
            });
      });
      }

      function validateField(input) {
      if (input.value.trim() === "") {
            onErrorInput(input, "Ce champ est obligatoire");
            return false;
      } else {
            onSuccessInput(input);
            return true;
      }
      }

// sauvgardement deu formulaire apres la verification reel de chaque champ en utilisant l'evenement blur

      document.forms["ajouterEmployer"].addEventListener("submit", (event) => {

      let form = event.target;

      if (validerForm()) {

            let employer = {
                  nom: form.nomComplet.value,
                  role: toggle(selectrole),
                  email: form.email.value,
                  photo: form.photo.value,
                  telephone: form.telephone.value,
                  experiences: []
            };

            // Récupérer les expériences dynamiques
            let societes = form["societe[]"];
            let roles = form["Role[]"];
            let datesDebut = form["dateDebut[]"];
            let datesFin = form["dateFin[]"];

            if (societes) {
                  for (let i = 0; i < societes.length; i++) {
                  employer.experiences.push({
                        societe: societes[i].value,
                        Role: roles[i].value,
                        dateDebut: datesDebut[i].value,
                        dateFin: datesFin[i].value
                  });
                  }
            }

            // Sauvegarder
            ajouterEmployerToLocalStorage(employer);

      } else {
            event.preventDefault();
      }
      });


function ajouterEmployerToLocalStorage(employer) {
      let employerList = getDataEmployersFromLocalStorageIfExist("employers");
      employerList.push(employer);
      saveDataEmployerToLocalStorage("employers", employerList);
      // data katb9a kol mra t3awd tloda o ywli overriding o ila mdrthach kykhs nrefrecher la page
      loadDataEmplyer();
}

// // prévisualisation de la photo
// document.getElementById("photo").addEventListener("blur", function(event){
//       // const image = this.files[0];
//       // const reader = new FileReader();
//       // reader.onload = () => {
//       //       const imgURL = reader.result;
//       //       const img = document.createElement("img");
//       //       img.classList.add("image-prof");
//       //       img.src = imgURL;
//       //       img.style.backgroundRepeat="no-repeat"
//       //       document.getElementById("imageArea").appendChild(img);
//       // }
//       // reader.readAsDataURL(image);
//       document.getElementById("imageArea").setAttribute("src", event.target.value);
// })

// Prévisualisation de la photo en temps réel
document.getElementById("photo").addEventListener("input", function(event) {
      const url = event.target.value.trim();
      const imageArea = document.getElementById("imageArea");
      if(url){
            imageArea.setAttribute("src", url);
      } else {
            // Image par défaut si le champ est vide
            imageArea.setAttribute("src", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");
      }
      });

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

function validerForm() {
      let form = document.forms["ajouterEmployer"];
      let estvalid = true;

      // ===== VALIDATION NOM ===== //
      if (!form.nomComplet.value.trim().match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/)) {
            onErrorInput(form.nomComplet, "Nom complet non valide");
            estvalid = false;
      } else {
            onSuccessInput(form.nomComplet);
      }

      // ===== VALIDATION EMAIL ===== //
      if (!form.email.value.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            onErrorInput(form.email, "Email non valide");
            estvalid = false;
      } else {
            onSuccessInput(form.email);
      }

      // ===== VALIDATION TELEPHONE ===== //
      if (!form.telephone.value.trim().match(/^(\+?\d{1,3}[- ]?)?\d{9,10}$/)) {
            onErrorInput(form.telephone, "Téléphone non valide");
            estvalid = false;
      } else {
            onSuccessInput(form.telephone);
      }

      // ===== VALIDATION ROLE ===== //
      if (!toggle(selectrole).match(/[a-zA-Z0-9]+/)) {
            estvalid = false;
      }

      // ===== VALIDATION PHOTO ===== //
      let photo = form.photo.value.trim();
      if (photo === "") {
            form.photo.value =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
      } else if (!photo.match(/^https?:\/\/.+/)) {
            onErrorInput(form.photo, "URL de photo invalide");
            estvalid = false;
      } else {
            onSuccessInput(form.photo);
      }


      //VALIDATION DES EXPERIENCES DYNAMIQUES

      let societes = form["societe[]"];
      let roles = form["Role[]"];
      let datesDebut = form["dateDebut[]"];
      let datesFin = form["dateFin[]"];

      // Aucun bloc d'expérience 
      if (!societes) return estvalid;

      // Si une seule expérience on la transformer en tableau pour uniformité
      if (!societes.length) {
            societes = [societes];
            roles = [roles];
            datesDebut = [datesDebut];
            datesFin = [datesFin];
      }

      for (let i = 0; i < societes.length; i++) {

            // === Société ===
            if (societes[i].value.trim() === "") {
                  onErrorInput(societes[i], "Société obligatoire");
                  estvalid = false;
            } else {
                  onSuccessInput(societes[i]);
            }

            // === Role ===
            if (roles[i].value.trim() === "") {
                  onErrorInput(roles[i], "Rôle obligatoire");
                  estvalid = false;
            } else {
                  onSuccessInput(roles[i]);
            }

            // === Dates ===
            if (datesDebut[i].value === "") {
                  onErrorInput(datesDebut[i], "Date début obligatoire");
                  estvalid = false;
            } else {
                  onSuccessInput(datesDebut[i]);
            }

            if (datesFin[i].value === "") {
                  onErrorInput(datesFin[i], "Date fin obligatoire");
                  estvalid = false;
            } else {
                  onSuccessInput(datesFin[i]);
            }

            // === Date cohérente ===
            if (datesDebut[i].value && datesFin[i].value) {
                  if (new Date(datesDebut[i].value) > new Date(datesFin[i].value)) {
                  onErrorInput(datesFin[i], "La date de fin doit être ≥ date début");
                  estvalid = false;
                  }
            }
      }

      return estvalid;
      }

// function resetForm(form){

//       form.nomComplet.value ="";
//       // console.log(form.nomCompl)
//       form.email.value ="";
//       // form.selectRole=""
//       form.telephone.value ="";
//       form.photo.value = "";
// }

function onSuccessInput(input){
      console.log(1)
      let parentInput = input.parentElement;
      let messageElm = parentInput.querySelector("span");
      messageElm.style.display ="none";
      messageElm.innerText ="";
}

function onErrorInput(input, message){
      console.log(2)
      let parentInput = input.parentElement;
      let messageElm = parentInput.querySelector("span");
      messageElm.style.display ="block";
      messageElm.innerText =message;
}

