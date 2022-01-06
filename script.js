function signup() {
  // Recuperation des données
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 3);

  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "Le nom doit avoir au moins 5 caractères";
    document.getElementById("firstNameError").style.color = "red";
  }

  var lastName = document.getElementById("lastName").value;

  var verifLastName = verifLength(lastName, 5);

  if (verifLastName) {  
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Le prénom doit avoir au moins 5 caractères";
    document.getElementById("lastNameError").style.color = "red";
  }

  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "E-mail invalide";
    document.getElementById("emailError").style.color = "red";
  }
  var emailExist = userExist(email);
  if (!emailExist) {
    document.getElementById("emailExistError").innerHTML = "";
  } else {
    document.getElementById("emailExistError").innerHTML =
      "L'E-mail existe déjà";
    document.getElementById("emailExistError").style.color = "red";
  }

  var password = document.getElementById("password").value;
  if (
    password.match(/[0-9]/g) &&
    password.match(/[A-Z]/g) &&
    password.match(/[a-z]/g) &&
    password.match(/[^a-zA-Z\d]/g) &&
    password.length >= 10
  ) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML =
      "Le mot de passe est invalide";
    document.getElementById("passwordError").style.color = "red";
  }

  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd == password) {
    document.getElementById("confirmPasswordError").innerHTML = "";
  } else {
    document.getElementById("confirmPasswordError").innerHTML =
      "Confirmation invalide";
    document.getElementById("confirmPasswordError").style.color = "red";
  }
  var tel = document.getElementById("tel").value;
  if (tel.length == 8 && isNaN(tel) == false) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML = "Téléphone invalide";
    document.getElementById("telError").style.color = "red";
  }
  var ville = document.getElementById("ville").value;
  var sexe = document.getElementById("sexe").value;

  // emplacement avec fakepath
  var productImage = document.getElementById("imagee").value;
  // appel de la fonction replaceCh pour ajuster l'emplacement
  var imagee = replaceCh(productImage);
  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    password.match(/[0-9]/g) &&
    password.match(/[A-Z]/g) &&
    password.match(/[a-z]/g) &&
    password.match(/[^a-zA-Z\d]/g) &&
    password.length >= 10 &&
    confirmPwd == password &&
    tel.length == 8 &&
    isNaN(tel) == false &&
    !emailExist
  ) {
    // Regroupement des valeurs

    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPwd: confirmPwd,
      imagee: imagee,
      tel: tel,
      sexe: sexe,
      ville: ville,
      role: "client",
    };

    // Récupération des anciennes valeurs dans LS
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    // Ajout de l'objet user dans le tableau usersTab
    usersTab.push(user);
    // Sauvegarde du tableau usersTab (mis à jour)
    localStorage.setItem("users", JSON.stringify(usersTab));
    localStorage.setItem("idUser", idUser + 1);
    location.reload();
  }
}

function verifLength(ch, nb) {
  return ch.length >= nb;
}

function validateEmail(email) {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}

function validateOnlyTextField(element) {
  var str = element.value;
  if (!/^[a-zA-Z, ]+$/.test(str)) {
    // console.log('String contain number characters');
    str = str.substr(0, str.length - 100);
    element.value = str;
  }
}

function userExist(email) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var exist = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      exist = true;
    }
  }

  return exist;
}
// insert admin

function insertAdmins() {
  var admin1 = {
    id: 1,
    firstName: "admin1",
    lastName: "admin1",
    email: "admin1@gmail.com",
    password: "Ahlem1995@",
    tel: "53567186",
    role: "admin",
    ville: "Mednine",
    imagee: imagee,
    ville: "Mednine",
    sexe: "Femme",
  };

  var admin2 = {
    id: 2,
    firstName: "admin2",
    lastName: "admin2",
    email: "admin2@gmail.com",
    password: "123admin",
    tel: "53567186",
    role: "admin",
  };

  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users.push(admin1);
  users.push(admin2);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("adminsAdded", true);
}
// function login
function login() {
  // alert("test");
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var findedUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      findedUser = users[i];
    }
  }

  console.log("findedUser", findedUser);

  if (findedUser) {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));

    // User exist in LS
    if (findedUser.role == "client") {
      location.replace("index.html");
    } else {
      location.replace("index.html");
    }
  } else {
    // User not exist
    document.getElementById("error").innerHTML = "Veuillez réessayer!";
    document.getElementById("error").style.color = "red";
  }
}
// fonction logout
function logOut() {
  localStorage.removeItem("connectedUser");
  location.reload();
}
// ajouter annonce
function AddArticle() {
  // nom article
  // Get value from input
  var nameArticle = document.getElementById("nameArticle").value;
  // verif if productname > 6
  var verifnameArticle = verifLength(nameArticle, 6);

  if (verifnameArticle) {
    document.getElementById("nameArticleError").innerHTML = "";
  } else {
    document.getElementById("nameArticleError").innerHTML =
      "Le nom doit avoir au moins 6 caractères";
    document.getElementById("nameArticleError").style.color = "red";
  }

  // description article
  var descriptionArticle = document.getElementById("descriptionArticle").value;
  var verifdescriptionArticle = verifLength(descriptionArticle, 6);

  if (verifdescriptionArticle) {
    document.getElementById("descriptionArticleError").innerHTML = "";
  } else {
    document.getElementById("descriptionArticleError").innerHTML =
      "la description doit avoir au moins 6 caractères";
    document.getElementById("descriptionArticleError").style.color = "red";
  }

  // ville
  var ville = document.getElementById("ville").value;

  // prix
  var prix = document.getElementById("prix").value;
  var verifPrix = prix > 0;
  if (verifPrix) {
    document.getElementById("prixError").innerHTML = "";
  } else {
    document.getElementById("prixError").innerHTML =
      "Le prix doit être supérieur à 0";
    document.getElementById("prixError").style.color = "red";
  }

  // category
  var category = document.getElementById("category").value;

  var dateDebut = document.getElementById("dateDebut").value;

  var dateFin = document.getElementById("dateFin").value;
  var etat = document.getElementById("etat").value;

  // emplacement avec fakepath
  var productImage = document.getElementById("image").value;
  // appel de la fonction replaceCh pour ajuster l'emplacement
  var image = replaceCh(productImage);

  if (verifnameArticle && verifPrix) {
    var idArticle = JSON.parse(localStorage.getItem("idArticle") || "1");
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    var article = {
      idUser: connectedUser.id,
      id: idArticle,
      nameArticle: nameArticle,
      descriptionArticle: descriptionArticle,
      ville: ville,
      prix: prix,
      category: category,

      etat: etat,
      dateDebut: dateDebut,
      dateFin: dateFin,

      image: image,
    };
    var articles = JSON.parse(localStorage.getItem("articles") || "[]");
    articles.push(article);
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("idArticle", idArticle + 1);
    location.reload();
  }
}
// function lien de image 
function replaceCh(ch) {
  var newCh = ch.replace(/\\/g, "/");
  var res = newCh.replace(
    "fakepath",
    "Users/DELL/Music/cozastore-master/images"
  );

  return res;
}
// function recherch user par id
function searchById(id, clé) {
  var Tab = JSON.parse(localStorage.getItem(clé) || "[]");

  for (let i = 0; i < Tab.length; i++) {
    if (Tab[i].id == id) {
      return Tab[i];
    }
  }
}
// product search

// gallery client /admin
function displayShopArticles() {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  var shopArticles = ``;
  for (let i = 0; i < articles.length; i++) {
    shopArticles += `
     <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"  >
     <!-- Block2 -->
     <div class="block2">
       <div class="block2-pic hov-img0" style="min-height: 280px;">
         <img src="${articles[i].image}" alt="IMG-PRODUCT">
     
         <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" 
         onclick="goToReservation(${articles[i].id})">
           Reserve
         </a>
       </div>
     
       <div class="block2-txt flex-w flex-t p-t-14">
         <div class="block2-txt-child1 flex-col-l ">
           <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
           ${articles[i].nameArticle}
           </a>
     
           <h4 class="stext-105 cl3">
           <i class="fa fa-map-marker" aria-hidden="true"></i>

           ${articles[i].ville}  <span> |  ${articles[i].category}</span>
           </h4>
         
         </div>
     
         
     
     
       </div>
     </div>
     </div>
     
     `;
  }
  document.getElementById("shopArticles").innerHTML = shopArticles;
}
// function gallery visteur
function displayShopArticlesVisiteur() {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  var shopArticlesV = ``;
  for (let i = 0; i < articles.length; i++) {
    shopArticlesV += `
    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"  >
    <!-- Block2 -->
    <div class="block2">
      <div class="block2-pic hov-img0" style="min-height: 280px;">
         <img src="${articles[i].image}" alt="IMG-PRODUCT">
     
         <a href="" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 
         p-lr-15 trans-04 js-addwish-b2"
       >
           voir Detail
         </a>
       </div>
     
       <div class="block2-txt flex-w flex-t p-t-14">
         <div class="block2-txt-child1 flex-col-l ">
           <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
           ${articles[i].nameArticle}
           </a>
     
           <h4 class="stext-105 cl3">
           <i class="fa fa-map-marker" aria-hidden="true"></i> ${articles[i].ville}  <span> |  ${articles[i].prix} Dt | ${articles[i].etat} </span>
           </h4>
         
         </div>
     
       
     
     
       </div>
     </div>
     </div>
     </div>
     `;
  }
  document.getElementById("shopArticlesV").innerHTML = shopArticlesV;
}
// function de reservation
function goToReservation(id) {
  localStorage.setItem("idPrToReserve", id);
  location.replace("product-detail.html");
}
// function detail annonce
function displayArticleDetails() {
  var idArticle = localStorage.getItem("idPrToReserve");
  var article = searchById(idArticle, "articles");
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == article.idUser) {
      user = users[i];
      console.log(user);
    }
  }
  console.log(users);
  //console.log(article);
  var idArticleDetail = `
  <div class="row">
  <div class="col-md-6 col-lg-7 p-b-30">
    <div class="p-l-25 p-r-30 p-lr-0-lg">
      <div class="wrap-slick3 flex-sb flex-w">
        <div class="wrap-slick3-dots"></div>
        <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>
  
        <div class="slick3 gallery-lb">
          <div class="item-slick3" data-thumb="">
            <div class="wrap-pic-w pos-relative">
              <img src="${article.image}" alt="IMG-PRODUCT" style="width:380px ;">
  
            </div>
          </div>
  
      
        </div>
      </div>
    </div>
  </div>
    
  <div class="col-md-6 col-lg-5 p-b-30">
    <div class="p-r-50 p-t-5 p-lr-0-lg">
      <h4 class="mtext-105 cl2 js-name-detail p-b-14" >
      ${article.nameArticle}
      </h4>
      <h4 class="mtext-105 cl2 js-name-detail p-b-14" >
      ${article.etat}
      </h4>
    

      <span class="mtext-106 cl2 d-block"> 
      ${article.dateDebut} --> ${article.dateFin}
      </span>
      <p class="stext-102 cl3 p-t-23"> Ville:
      ${article.ville}
      </p>
        
      <p class="stext-102 cl3 p-t-23"> Description :
      ${article.descriptionArticle}
      </p>
    
      <p class="stext-102 cl3 p-t-23"> Prix :
      ${article.prix} Dt
      </p>
      <hr>
      <div class="row">
      <div class="col-2">
      <img src="${user.imagee}" alt="IMG-PRODUCT" style="width : 50px;border-radius: 50%;"></div>
      <div class="col-8">
      <span class="mtext-106 cl2 d-block"> 
      ${user.firstName} ${user.lastName}
      </span>
      <span class="mtext-106 cl2 d-block"> 
      ${user.tel} 
      </span></div></div>
      <hr>
  
      <span id="EtatError"></span></p>

        <div class="flex-w flex-r-m p-b-10">
          <div class="size-204 flex-w flex-m respon6-next">
            
          <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"  style="margin-top: 1cm;background-color:gold;" onclick="validateReservation()">
          Reserve
          </button>
        
  
          
        </div>	
      </div>
  
    
    </div>
  </div>
  </div>`;

  document.getElementById("idArticleDetail").innerHTML = idArticleDetail;
}
// functon validate reservation
function validateReservation() {
  // Récupération de la quantité à partir de l'input
  // Récupération de l'id du produit à reserver
  var idArticle = localStorage.getItem("idPrToReserve");
  // Recherche du produit à travers son id
  var article = searchById(idArticle, "articles");

  // Test de la disponibilité du stock
  if (article.etat == "Indisponible") {
    //Stock Indisponible ou invalide : affichage du msg d'erreur
    document.getElementById("EtatError").innerHTML =
      "Cette annonce est indiponible";
    document.getElementById("EtatError").style.color = "red";
  } else {
    // Stock disponible
    document.getElementById("EtatError").innerHTML = "";
    // Récuperation des anciennes commandes dans LS
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    // Récupération de l'id de la commande (order)
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
    // Récupération des informations du l'utilisateur connecté
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    // Regroupement des informations de la commande dans un objet order
    var order = {
      id: idOrder,
      idArticle: idArticle,
      idUser: connectedUser.id,
    };

    // Ajour de l'objet order dans le tableau orders
    orders.push(order);
    // Sauvegarde du tableau orders dans LS
    localStorage.setItem("orders", JSON.stringify(orders));
    // Incrémentation de l'idOrder et sauvegarde pour la prochaine commande
    localStorage.setItem("idOrder", idOrder + 1);
    // location.reload();

    //  2ème étape : Mise à jour du stock du produit

    // Recupération des tous les produits dans LS
    var articles = JSON.parse(localStorage.getItem("articles") || "[]");
    // Parcours du tableau products + recherche du produit à modifier + modification du stock

    // Sauvegarde du tableau products mis à jour
    localStorage.setItem("articles", JSON.stringify(articles));
    location.reload();
  }
}
// function basket
function basket() {
  // Recupération des informations de l'utilisateur connecté
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  // Récupération de toutes les commandes de tous les utilisateurs
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  // Déclaration d'un tableau vide pour affecter les commandes de l'utlisateur connecté
  var myOrders = [];

  // Parcours du tableau des commandes et recherche des commandes de l'utlisateur connecté
  // Filtrage
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser == connectedUser.id) {
      myOrders.push(orders[i]);
    }
  }

  // Part 1
  var cart = `
  <table class="table">
  <thead>
      <tr>
          <th scope="col" style="font-size: 17px;">Image</th>
          <th scope="col" style="font-size: 17px;">annonce</th>
          <th scope="col" style="font-size: 17px;">ville</th>
          <th scope="col" style="font-size: 17px;">Date</th>
          <th scope="col" style="font-size: 17px;">Actions</th>

      </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < myOrders.length; i++) {
    // Recherche du produit à travers son id pour pouvoir afficher son nom et son prix
    var article = searchById(myOrders[i].idArticle, "articles");
    console.log(article);

    // Part 2
    cart += `   <tr>
   <td>
       <div class="media">
           <div class="d-flex">
               <img src="img/cart.jpg" alt="">
           </div>
           <div class="media-body">
               <p> <img src="${article.image}" alt="IMG-PRODUCT" style="width : 50px;"></div>
               </p>
           </div>
       </div>
   </td>
   <td>
       <h4 style="font-size: 17px;">${article.nameArticle}</h4>
   </td>
   <td>
   <h4 style="font-size: 17px;">${article.ville} </h4>
   </td>
   <td>
       <h4 style="font-size: 17px;">${article.dateDebut} ->  ${article.dateDebut}</h4>
   </td>
   <td>

   <button type="button" class="btn btn-danger" onclick="deleteOrder(${myOrders[i].id})">Delete</button>
   </td>
</tr>
`;
  }

  // part 3
  cart += ` 
  </tbody>
</table>`;

  document.getElementById("cart").innerHTML = cart;
}
// function delete annonce
function deleteOrder(id) {
  var order = searchById(id, "orders");

  // Mise à ajour du stock
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == order.idArticle) {
      // Mise à jour
      articles[i].stock = Number(articles[i].stock) + Number(order.qty);
    }
  }
  localStorage.setItem("articles", JSON.stringify(articles));
  // Suppression de la commande
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var pos;
  // Recherche de la position de la commande à supprimer
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id == order.id) {
      pos = i;
    }
  }
  deleteObject(pos, "orders");
  location.reload();
}
// function somme de annonce reserve
function ordersNb() {
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var nb = 0;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser == connectedUser.id) {
      nb++;
    }
  }

  document.getElementById("ordersNb").innerHTML = " (" + nb + ")";
}

//  function contact
function contactUser() {
  // Recuperation des données
  var emailContact = document.getElementById("emailContact").value;
  var verifEmailContact = validateEmail(emailContact);
  if (verifEmailContact) {
    document.getElementById("emailContactError").innerHTML = "";
  } else {
    document.getElementById("emailContactError").innerHTML = "E-mail invalide";
    document.getElementById("emailContactError").style.color = "red";
  }

  var messageContact = document.getElementById("messageContact").value;
  var verifMessageContact = messageContact !== 0;
  if (verifMessageContact) {
    document.getElementById("messageContactError").innerHTML = "";
  } else {
    document.getElementById("messageContactError").innerHTML =
      "Message invalide";
    document.getElementById("messageContactError").style.color = "red";
  }

  if (verifEmailContact && verifMessageContact) {
    // Regroupement des valeurs

    var idContact = JSON.parse(localStorage.getItem("idContact") || "1");

    var contact = {
      id: idContact,
      emailContact: emailContact,
      messageContact: messageContact,
    };

    // Récupération des anciennes valeurs dans LS
    var contactTab = JSON.parse(localStorage.getItem("contacts") || "[]");
    // Ajout de l'objet user dans le tableau usersTab
    contactTab.push(contact);
    // Sauvegarde du tableau usersTab (mis à jour)
    localStorage.setItem("contacts", JSON.stringify(contactTab));
    localStorage.setItem("idContact", idContact + 1);
    location.reload();
  }
}

// Dynamic header Français
function setHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    if (connectedUser.role == "client") {
      var header = `
          
          <li class="active-menu"><a href="index.html">Acceuil</a></li>
          <li><a href="product.html">Nos annonces</a></li>
          <li><a href="articles.html">Ajouter une annonce</a></li>
          <li><a href="about.html">A propos</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="profilUserConnected.html">
          <img src="${connectedUser.imagee}" alt="IMG-PRODUCT"
           style="width :45px;border-radius: 50%;">
           <li><a href="indexAR.html"><div class="lang_box ">
           <a href="index.html" title="Français" class="nav-link" data-toggle="dropdown" aria-expanded="true">
           <img src="images/flag-france.png" alt="flag" class="mr-2 "><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
           </a>
           <div class="dropdown-menu ">
           <a href="indexAR.html" class="dropdown-item" title="العربية">
           <img src="images/tunisie.jpg" class="mr-2" alt="flag"  style="width:18px">
           </a>
              <a href="indexAN.html" class="dropdown-item">
              <img src="images/flag-uk.png" class="mr-2" alt="flag" title="Anglais">
              </a>
           </div>
        </div></a></li>




   
          
          `;

      document.getElementById("linksId").innerHTML = header;
    } else {
      var header = `
          
           <li class="active-menu"><a href="index.html">Acceuil</a></li>
           <li><a href="product.html">Nos annonces</a></li>
           <li><a href="articles.html">Ajouter une annonce</a></li>
           <li><a href="C:/Users/DELL/Music/cozastore-master/ruang-admin-admin-11/dashbordAdmin.html">Tableau de bord</a></li>
           <li><a href="profilUserConnected.html"><img src="${connectedUser.imagee}" alt="IMG-PRODUCT" style="width : 45px;border-radius: 50%;">
           </a></li>
           <li><a href="indexAR.html"><div class="lang_box ">
           <a href="index.html" title="Français" class="nav-link" data-toggle="dropdown" aria-expanded="true">
           <img src="images/flag-france.png" alt="flag" class="mr-2 "><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
           </a>
           <div class="dropdown-menu ">
           <a href="indexAR.html" class="dropdown-item" title="العربية">
           <img src="images/tunisie.jpg" class="mr-2" alt="flag"  style="width:18px">
           </a>
              <a href="indexAN.html" class="dropdown-item">
              <img src="images/flag-uk.png" class="mr-2" alt="flag" title="Anglais">
              </a>
           </div>
        </div></a></li>
           
           `;
      document.getElementById("linksId").innerHTML = header;
    }
  } else {
    var header = `
      
      <li class="active-menu"><a href="index.html">Home</a></li>
      <li><a href="product2.html">Nos annonces</a></li>
      <li><a href="" data-toggle="modal" data-target="#myModal">Ajouter une annonce</a></li>
      <li><a href="about.html">A propos</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="" data-toggle="modal" data-target="#myModal">Connexion</a></li>   
      <li><a href="indexAR.html"><div class="lang_box ">
      <a href="index.html" title="Français" class="nav-link" data-toggle="dropdown" aria-expanded="true">
      <img src="images/flag-france.png" alt="flag" class="mr-2 "><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
      </a>
      <div class="dropdown-menu ">
      <a href="indexAR.html" class="dropdown-item" title="العربية">
      <img src="images/tunisie.jpg" class="mr-2" alt="flag"  style="width:18px">
      </a>
         <a href="indexAN.html" class="dropdown-item">
         <img src="images/flag-uk.png" class="mr-2" alt="flag" title="Anglais">
         </a>
      </div>
   </div></a></li>   
      `;
    document.getElementById("linksId").innerHTML = header;
  }
}
// header anglais
function setHeaderAN() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    if (connectedUser.role == "client") {
      var header = `
          
          <li class="active-menu"><a href="index.html">Home</a></li>
          <li><a href="product.html">Our listings</a></li>
          <li><a href="articles.html">Add a listing</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="profilUserConnected.html">
          <img src="${connectedUser.imagee}" alt="IMG-PRODUCT"
           style="width :45px;border-radius: 50%;">
           <li><a href="indexAN.html"><div class="lang_box ">
        <a href="indexAN.html" title="Anglais" class="nav-link" data-toggle="dropdown" aria-expanded="true">
        <img src="images/flag-uk.png" alt="flag" class="mr-2 "><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
        </a>
        <div class="dropdown-menu ">
           <a href="indexAR.html" class="dropdown-item" title="العربية">
           <img src="images/tunisie.jpg" class="mr-2" alt="flag"  style="width:18px">
           </a>
           <a href="index.html" class="dropdown-item" title="Français">
           <img src="images/flag-france.png" class="mr-2" alt="flag">
           </a>
        </div>
     </div></a></li>
          


       

          `;

      document.getElementById("linksIdAN").innerHTML = header;
    } else {
      var header = `
          
           <li class="active-menu"><a href="index.html">Home</a></li>
           <li><a href="product.html">Our listings</a></li>
           <li><a href="articles.html">Add a listing</a></li>
           <li><a href="C:/Users/DELL/Music/cozastore-master/ruang-admin-admin-11/dashbordAdmin.html">Dashboard</a></li>
           <li><a href="profilUserConnected.html"><img src="${connectedUser.imagee}" alt="IMG-PRODUCT" style="width : 45px;border-radius: 50%;">
           </a></li>
           <li><a href="indexAN.html"><div class="lang_box ">
           <a href="indexAN.html" title="Anglais" class="nav-link" data-toggle="dropdown" aria-expanded="true">
           <img src="images/flag-uk.png" alt="flag" class="mr-2 "><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
           </a>
           <div class="dropdown-menu ">
              <a href="indexAR.html" class="dropdown-item" title="العربية">
              <img src="images/tunisie.jpg" class="mr-2" alt="flag"  style="width:18px">
              </a>
              <a href="index.html" class="dropdown-item" title="Français">
              <img src="images/flag-france.png" class="mr-2" alt="flag">
              </a>
           </div>
        </div></a></li>
      
           
           `;
      document.getElementById("linksIdAN").innerHTML = header;
    }
  } else {
    var header = `
      
      <li class="active-menu"><a href="index.html">Home</a></li>
      <li><a href="product2.html">Our listings</a></li>
      <li><a href="" data-toggle="modal" data-target="#myModal">Add a listing</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="" data-toggle="modal" data-target="#myModal">Log in</a></li> 
      <li><a href="indexAN.html"><div class="lang_box ">
      <a href="indexAN.html" title="Anglais" class="nav-link" data-toggle="dropdown" aria-expanded="true">
      <img src="images/flag-uk.png" alt="flag" class="mr-2 "><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
      </a>
      <div class="dropdown-menu ">
         <a href="indexAR.html" class="dropdown-item" title="العربية">
         <img src="images/tunisie.jpg" class="mr-2" alt="flag"  style="width:18px">
         </a>
         <a href="index.html" class="dropdown-item" title="Français">
         <img src="images/flag-france.png" class="mr-2" alt="flag">
         </a>
      </div>
   </div></a></li>
 
      `;
    document.getElementById("linksIdAN").innerHTML = header;
  }
}
// header arabe
function setHeaderAR() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    if (connectedUser.role == "client") {
      var header = `
          
      <li><a href="indexAR.html"><div class="lang_box ">
      <a href="indexAR.html" title="العربية" class="nav-link" data-toggle="dropdown" aria-expanded="true">
      <img src="images/tunisie.jpg" alt="flag" class="mr-2 " style="width:18px"><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
      </a>
      <div class="dropdown-menu ">
         <a href="index.html" class="dropdown-item" title="Français">
         <img src="images/flag-france.png" class="mr-2" alt="flag">
         </a>
         <a href="indexAN.html" class="dropdown-item" title="Anglais">
         <img src="images/flag-uk.png" class="mr-2" alt="flag">
         </a>
      </div>
   </div></a></li>
   <li><a href="profilUserConnected.html">

   <img src="${connectedUser.imagee}" alt="IMG-PRODUCT"
   style="width :45px;border-radius: 50%;"></li>
   <li><a href="contact.html" style="font-size: 20px;">اتصل بنا</a></li>
   <li><a href="about.html" style="font-size: 20px;">معلومات عنا</a></li>
   <li><a href="articles.html" style="font-size: 20px;">قم بإضافة أدوات</a></li>
   <li><a href="product.html" style="font-size: 20px;">قوائمنا</a></li>

          <li class="active-menu"><a href="index.html" style="font-size: 20px;">الصفحة الرئيسية</a></li>
        
        
          
          `;

      document.getElementById("linksIdAR").innerHTML = header;
    } else {
      var header = `
          
     
      <li><a href="indexAR.html"><div class="lang_box ">
      <a href="indexAR.html" title="العربية" class="nav-link" data-toggle="dropdown" aria-expanded="true">
      <img src="images/tunisie.jpg" alt="flag" class="mr-2 " style="width:18px"><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
      </a>
      <div class="dropdown-menu ">
         <a href="index.html" class="dropdown-item" title="Français">
         <img src="images/flag-france.png" class="mr-2" alt="flag">
         </a>
         <a href="indexAN.html" class="dropdown-item" title="Anglais">
         <img src="images/flag-uk.png" class="mr-2" alt="flag">
         </a>
      </div>
   </div></a></li>
   <li><a href="profilUserConnected.html"><img src="${connectedUser.imagee}" alt="IMG-PRODUCT" style="width : 45px;border-radius: 50%;">
   </a></li>
   <li><a href="C:/Users/DELL/Music/cozastore-master/ruang-admin-admin-11/dashbordAdmin.html">Dashboard</a></li>
   <li><a href="articles.html">قم بإضافة أدوات</a></li>
   <li><a href="product.html">قوائمنا</a></li>

      <li class="active-menu"><a href="index.html">الصفحة الرئيسية</a></li>
          
    
           
           `;
      document.getElementById("linksIdAR").innerHTML = header;
    }
  } else {
    var header = `
  

    <li><a href="indexAR.html"><div class="lang_box ">
      <a href="indexAR.html" title="العربية" class="nav-link" data-toggle="dropdown" aria-expanded="true">
      <img src="images/tunisie.jpg" alt="flag" class="mr-2 " style="width:18px"><i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
      </a>
      <div class="dropdown-menu ">
         <a href="index.html" class="dropdown-item" title="Français">
         <img src="images/flag-france.png" class="mr-2" alt="flag">
         </a>
         <a href="indexAN.html" class="dropdown-item" title="Anglais">
         <img src="images/flag-uk.png" class="mr-2" alt="flag">
         </a>
      </div>
   </div></a></li>
   <li><a href="" data-toggle="modal" data-target="#myModal">تسجيل
   </a></li> 
 
   <li><a href="contact.html">اتصل بنا</a></li>  
   <li><a href="about.html">معلومات عنا</a></li>
   <li><a href="" data-toggle="modal" data-target="#myModal">قم بإضافة أدوات</a></li>

      <li class="active-menu"><a href="index.html">الصفحة الرئيسية</a></li>
      <li><a href="product2.html">قوائمنا</a></li>
    
 
      `;
    document.getElementById("linksIdAR").innerHTML = header;
  }
}

// profil client 
function displayProfilUser() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  console.log(connectedUser);
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var user;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == connectedUser.id) {
      user = users[i];
      console.log(user);

      var profilUser = `
<div class="row" style="margin-left:4cm">
				<div class="order-md-2 col-md-7 col-lg-8 p-b-30">
					<div class="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
						<h3 class="mtext-111 cl2 p-b-16">
            ${connectedUser.firstName}             ${connectedUser.lastName}


						</h3>

						<h5 class="stext-113 cl6 p-b-26">
           Email :  ${connectedUser.email}


						</h5>

						<div class="bor16 p-l-29 p-b-9 m-t-22">
							<p class="stext-114 cl6 p-r-40 p-b-11">
              Tel :  ${connectedUser.tel} <br>
              Ville :  ${connectedUser.ville} <br>
              Sexe :  ${connectedUser.sexe}

							</p>
         

						

							</p>

							<span class="stext-111 cl8">
                 
        <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"  style="margin-top: 2cm;background-color:gold" 
        onclick="editUserProfil(${user.id})">
        Edit
        </button>

							</span>
						</div>
					</div>
				</div>

				<div class="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
					<div class="how-bor2">
						<div class="hov-img0">
							<img src="${connectedUser.imagee}" alt="IMG">
						</div>
					</div>
				</div>
			</div>
    


`;
    }
  }

  document.getElementById("profilUser").innerHTML = profilUser;
}
// menu francais client
function menuHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    if (connectedUser.role == "client" || connectedUser.role == "admin") {
      var menu = `
            
            <ul class="sidebar-link w-full">

            <div class="flex-w flex-sb p-t-36 gallery-lb">
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-12" >
                <a class="item-gallery bg-img1" href="" data-lightbox="gallery" 
                style="background-image: url('${connectedUser.imagee}');border-radius: 50%;"></a>
              </div>
  
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-6" style="margin-right:2cm;">
                <a><h4 style="margin-top: 0.5cm;">${connectedUser.firstName}</h4>
                  <h5>${connectedUser.lastName}</h5>
  
              </div></div>
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="index.html" class="stext-102 cl2 hov-cl1 trans-04">Home</a></li>
  
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="profilUserConnected.html" class="stext-102 cl2 hov-cl1 trans-04" >Mon profil</a></li>
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="panier.html" class="stext-102 cl2 hov-cl1 trans-04" >Panier</a></li>
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="ArticlesPublierUser.html" class="stext-102 cl2 hov-cl1 trans-04" >Mes annonces publier</a></li>
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="#" class="stext-102 cl2 hov-cl1 trans-04" onclick="logOut()">Deconnexion</a></li>
          </ul>

          <div class="sidebar-gallery w-full p-tb-30">
            <span class="mtext-101 cl5">
             Image
            </span>
  
            <div class="flex-w flex-sb p-t-36 gallery-lb">
              <!-- item gallery sidebar -->
             
  
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-10">
                <a class="item-gallery bg-img1" href="images/gallery-01.jpg" data-lightbox="gallery" 
                style="background-image: url('images/gallery-01.jpg');"></a>
              </div>
  
              <!-- item gallery sidebar -->
              
  
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-10">
                <a class="item-gallery bg-img1" href="gallery-03.jpg" data-lightbox="gallery" 
                style="background-image: url('images/gallery-03.jpg');"></a>
              </div>
  
              <!-- item gallery sidebar -->
             
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-10">
                <a class="item-gallery bg-img1" href="images/gallery-04.jpg" data-lightbox="gallery" 
                style="background-image: url('images/gallery-04.jpg');"></a>
              </div>
  
            
  
            </div>
          </div>
            
            `;
    }
    document.getElementById("menu").innerHTML = menu;
  }
}
// function menu header arabe
function menuHeaderAR() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    if (connectedUser.role == "client" || connectedUser.role == "admin") {
      var menu = `
            
            <ul class="sidebar-link w-full">

            <div class="flex-w flex-sb p-t-36 gallery-lb">
              <!-- item gallery sidebar -->

              <div class="wrap-item-gallery m-b-6" style="margin-right:2cm;">
              <a><h4 style="margin-top: 0.5cm;">${connectedUser.firstName}</h4>
                <h5>${connectedUser.lastName}</h5>

            </div>

              <div class="wrap-item-gallery m-b-12" >
                <a class="item-gallery bg-img1" href="" data-lightbox="gallery" 
                style="background-image: url('${connectedUser.imagee}');border-radius: 50%;"></a>
              </div>
  
              <!-- item gallery sidebar -->
            </div>
  
            <li class="p-b-13" style="margin-left: 3cm;margin-top: 1cm;"><a href="index.html" class="stext-102 cl2 hov-cl1 trans-04" style="font-size: 20px;">الصفحة الرئيسية</a></li>
  
  
            <li class="p-b-13" style="margin-left: 4.3cm;"><a href="profilUserConnected.html" class="stext-102 cl2 hov-cl1 trans-04"  style="font-size: 20px;">صفحتي</a></li>
  
            <li class="p-b-13" style="margin-left: 5cm;"><a href="panier.html" class="stext-102 cl2 hov-cl1 trans-04" style="font-size: 20px;">سلة</a></li>
            <li class="p-b-13" style="margin-left: 3cm;"><a href="ArticlesPublierUser.html" class="stext-102 cl2 hov-cl1 trans-04"  style="font-size: 20px;">أدواتي المنشورة</a></li>
  
            <li class="p-b-13" style="margin-left:4.5cm;"><a href="#" class="stext-102 cl2 hov-cl1 trans-04" onclick="logOut()"  style="font-size: 20px;">خروج</a></li>
          </ul>

   
  
  
            
  
            </div>
          </div>
            
            `;
    }
    document.getElementById("menu").innerHTML = menu;
  }
}
// function menu arabe client
function menuHeaderAN() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    if (connectedUser.role == "client" || connectedUser.role == "admin") {
      var menu = `
            
            <ul class="sidebar-link w-full">

            <div class="flex-w flex-sb p-t-36 gallery-lb">
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-12" >
                <a class="item-gallery bg-img1" href="" data-lightbox="gallery" 
                style="background-image: url('${connectedUser.imagee}');border-radius: 50%;"></a>
              </div>
  
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-6" style="margin-right:2cm;">
                <a><h4 style="margin-top: 0.5cm;">${connectedUser.firstName}</h4>
                  <h5>${connectedUser.lastName}</h5>
  
              </div></div>
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="index.html" class="stext-102 cl2 hov-cl1 trans-04">Home</a></li>
  
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="profilUserConnected.html" class="stext-102 cl2 hov-cl1 trans-04" >My profil</a></li>
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="panier.html" class="stext-102 cl2 hov-cl1 trans-04" >Basket</a></li>
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="ArticlesPublierUser.html" class="stext-102 cl2 hov-cl1 trans-04" >My ads publish</a></li>
  
            <li class="p-b-13" style="margin-left: 0.5cm;"><a href="#" class="stext-102 cl2 hov-cl1 trans-04" onclick="logOut()">LogOut</a></li>
          </ul>

          <div class="sidebar-gallery w-full p-tb-30">
            <span class="mtext-101 cl5">
              Gallerie
            </span>
  
            <div class="flex-w flex-sb p-t-36 gallery-lb">
              <!-- item gallery sidebar -->
             
  
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-10">
                <a class="item-gallery bg-img1" href="images/gallery-02.jpg" data-lightbox="gallery" 
                style="background-image: url('images/gallery-01.jpg');"></a>
              </div>
  
              <!-- item gallery sidebar -->
              
  
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-10">
                <a class="item-gallery bg-img1" href="gallery-03.jpg" data-lightbox="gallery" 
                style="background-image: url('images/gallery-03.jpg');"></a>
              </div>
  
              <!-- item gallery sidebar -->
             
              <!-- item gallery sidebar -->
              <div class="wrap-item-gallery m-b-10">
                <a class="item-gallery bg-img1" href="images/gallery-04.jpg" data-lightbox="gallery" 
                style="background-image: url('images/gallery-04.jpg');"></a>
              </div>
  
            
  
            </div>
          </div>
            
            `;
    }
    document.getElementById("menu").innerHTML = menu;
  }
}

// search
function searchPr(event) {
  // Recupération du code de la boutton
  var key = event.keyCode;
  // si le code = 13 càd code bouton entrée
  if (key == 13) {
    // récupération de la valeur de la catégorie à rechercher
    var nameArticle = document.getElementById("search_input").value;
    // stockage de la categorie à rechercher
    localStorage.setItem("categoryToSearch", nameArticle);

    location.replace("product1.html");
  }
}

function searchPr1(event) {
  // Recupération du code de la boutton
  var key = event.keyCode;
  // si le code = 13 càd code bouton entrée
  if (key == 13) {
    // récupération de la valeur de la catégorie à rechercher
    var nameArticle = document.getElementById("search_input1").value;
    // stockage de la categorie à rechercher
    localStorage.setItem("categoryToSearch", nameArticle);

    location.replace("product1.html");
  }
}

// search by category
// serach par ville categorie date
function getSelectValue() {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  var category = document.getElementById("category").value;
  var ville = document.getElementById("ville").value;
  var date = document.getElementById("date").value;

  console.log(ville);

  // Récupération de la categorie à partir de LS
  // Récupération des produits
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];
  // saerch par date

  console.log;

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (
      articles[i].category == category &&
      articles[i].ville == ville &&
      date > articles[i].dateDebut &&
      date < articles[i].dateFin
    ) {
      resultTab.push(articles[i]);
    }
  }

  console.log(resultTab);
  var shopArticles = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticles += `
      
      <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
      <div class="block2">
        <div class="block2-pic hov-img0">
          <img src="${resultTab[i].image}" alt="IMG-PRODUCT"  style="width: 300px;height:300px;border-color:black">
      
          <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" 
          onclick="goToReservation(${resultTab[i].id})">
            Reserve
          </a>
        </div>
      
        <div class="block2-txt flex-w flex-t p-t-14">
          <div class="block2-txt-child1 flex-col-l ">
            <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
            ${resultTab[i].nameArticle}
            </a>
      
            <h4 class="stext-105 cl3">
            <i class="fa fa-map-marker" aria-hidden="true"></i>

            ${resultTab[i].ville}  <span> |   ${resultTab[i].category}  </span>
            </h4>
          
          </div>
      
          <div class="block2-txt-child2 flex-r p-t-3">
            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
              <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
              <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
            </a>
      
          </div>
      
      
        </div>
      </div>
      </div>
      </div>
      `;
  }
  document.getElementById("shopArticles").innerHTML = shopArticles;
}
// search categorie
function getSelectValueCategorie() {
  var category = document.getElementById("category").value;

  console.log(category);

  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  // Récupération de la categorie à partir de LS
  // Récupération des produits
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].category == category) {
      resultTab.push(articles[i]);
    }
  }
  console.log(resultTab);
  var shopArticles = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticles += `
          <div class="col-sm-6 col-md-4 col-lg-3 p-b-35>
    <div class="block2">
      <div class="block2-pic hov-img0">
        <img src="${resultTab[i].image}" alt="IMG-PRODUCT" 
         style="width: 300px;height:300px;border-color:black">
    
        <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" 
        onclick="goToReservation(${resultTab[i].id})">
          Reserve
        </a>
      </div>
    
      <div class="block2-txt flex-w flex-t p-t-14">
        <div class="block2-txt-child1 flex-col-l ">
          <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
          ${resultTab[i].nameArticle}
          </a>
    
          <h4 class="stext-105 cl3">
          <i class="fa fa-map-marker" aria-hidden="true"></i>

          ${resultTab[i].ville}  <span> | ${resultTab[i].category}  </span>
          </h4>
        
        </div>
    
        <div class="block2-txt-child2 flex-r p-t-3">
          <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
            <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
          </a>
    
        </div>
    
    
     
    </div>
    </div>
    
          `;
  }
  //  envoie du code html du js vers html
  document.getElementById("shopArticles").innerHTML = shopArticles;
}
// search ville
function getSelectValueVille() {
  var category = document.getElementById("category").value;
  var ville = document.getElementById("ville").value;

  console.log(category);

  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  // Récupération de la categorie à partir de LS
  // Récupération des produits
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].category == category && articles[i].ville == ville) {
      resultTab.push(articles[i]);
    }
  }
  console.log(resultTab);
  var shopArticles = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticles += `
            <div class="col-sm-6 col-md-4 col-lg-3 p-b-35>
      <div class="block2">
        <div class="block2-pic hov-img0">
          <img src="${resultTab[i].image}" alt="IMG-PRODUCT" 
           style="width: 300px;height:300px;border-color:black">
      
          <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" 
          onclick="goToReservation(${resultTab[i].id})">
            Reserve
          </a>
        </div>
      
        <div class="block2-txt flex-w flex-t p-t-14">
          <div class="block2-txt-child1 flex-col-l ">
            <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
            ${resultTab[i].nameArticle}
            </a>
      
            <h4 class="stext-105 cl3">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
  
            ${resultTab[i].ville}  <span> | ${resultTab[i].category}  </span>
            </h4>
          
          </div>
      
          <div class="block2-txt-child2 flex-r p-t-3">
            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
              <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
              <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
            </a>
      
          </div>
      
      
       
      </div>
      </div>
      
            `;
  }
  //  envoie du code html du js vers html
  document.getElementById("shopArticles").innerHTML = shopArticles;
}
// visiteur
function getSelectValueVisiteur() {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  var category = document.getElementById("category").value;
  var ville = document.getElementById("ville").value;
  var date = document.getElementById("date").value;

  console.log(ville);

  // Récupération de la categorie à partir de LS
  // Récupération des produits
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];
  // search par date

  console.log;

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (
      articles[i].category == category &&
      articles[i].ville == ville &&
      date > articles[i].dateDebut &&
      date < articles[i].dateFin
    ) {
      resultTab.push(articles[i]);
    }
  }

  console.log(resultTab);
  var shopArticlesV = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticlesV += `
              
              <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
              <div class="block2">
                <div class="block2-pic hov-img0">
                  <img src="${resultTab[i].image}" alt="IMG-PRODUCT"  style="width: 300px;height:300px;border-color:black">
              
                  <a href="" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 
                  p-lr-15 trans-04 js-addwish-b2"
                >voir Detail
                </a>
                </div>
              
                <div class="block2-txt flex-w flex-t p-t-14">
                  <div class="block2-txt-child1 flex-col-l ">
                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${resultTab[i].nameArticle}
                    </a>
              
                    <h4 class="stext-105 cl3">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
        
                    ${resultTab[i].ville}  <span> |   ${resultTab[i].category}  </span>
                    </h4>
                  
                  </div>
              
                  <div class="block2-txt-child2 flex-r p-t-3">
                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                      <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                      <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                    </a>
              
                  </div>
              
              
                </div>
              </div>
              </div>
              </div>
              `;
  }
  //  envoie du code html du js vers html
  document.getElementById("shopArticlesV").innerHTML = shopArticlesV;
}

function getSelectValueCategorieVisiteur() {
  var category = document.getElementById("category").value;

  console.log(category);

  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  // Récupération de la categorie à partir de LS
  // Récupération des produits
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].category == category) {
      resultTab.push(articles[i]);
    }
  }
  console.log(resultTab);
  var shopArticlesV = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticlesV += `
                  <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                  <div class="block2">
                    <div class="block2-pic hov-img0">
                      <img src="${resultTab[i].image}" alt="IMG-PRODUCT"  style="width: 300px;height:300px;border-color:black">
                  
                      <a href="" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 
                      p-lr-15 trans-04 js-addwish-b2"
                    >voir Detail
                    </a>
                    </div>
                  
                    <div class="block2-txt flex-w flex-t p-t-14">
                      <div class="block2-txt-child1 flex-col-l ">
                        <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        ${resultTab[i].nameArticle}
                        </a>
                  
                        <h4 class="stext-105 cl3">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
            
                        ${resultTab[i].ville}  <span> |   ${resultTab[i].category}  </span>
                        </h4>
                      
                      </div>
                  
                      <div class="block2-txt-child2 flex-r p-t-3">
                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                          <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                          <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                        </a>
                  
                      </div>
                  
                  
                    </div>
                  </div>
                  </div>
                  </div>
            
                  `;
  }
  //  envoie du code html du js vers html
  document.getElementById("shopArticlesV").innerHTML = shopArticlesV;
}

function getSelectVilleVisiteur() {
  var category = document.getElementById("category").value;
  var ville = document.getElementById("ville").value;

  console.log(category);

  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  // Récupération de la categorie à partir de LS
  // Récupération des produits
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].category == category && articles[i].ville == ville) {
      resultTab.push(articles[i]);
    }
  }
  console.log(resultTab);
  var shopArticlesV = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticlesV += `
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
              <div class="block2">
                <div class="block2-pic hov-img0">
                  <img src="${resultTab[i].image}" alt="IMG-PRODUCT"  style="width: 300px;height:300px;border-color:black">
              
                  <a href="" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 
                  p-lr-15 trans-04 js-addwish-b2"
                >voir Detail
                </a>
                </div>
              
                <div class="block2-txt flex-w flex-t p-t-14">
                  <div class="block2-txt-child1 flex-col-l ">
                    <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${resultTab[i].nameArticle}
                    </a>
              
                    <h4 class="stext-105 cl3">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
        
                    ${resultTab[i].ville}  <span> |   ${resultTab[i].category}  </span>
                    </h4>
                  
                  </div>
              
                  <div class="block2-txt-child2 flex-r p-t-3">
                    <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                      <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                      <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                    </a>
              
                  </div>
              
              
                </div>
              </div>
              </div>
              </div>
              
                    `;
  }
  //  envoie du code html du js vers html
  document.getElementById("shopArticlesV").innerHTML = shopArticlesV;
}
// function annonce publie
function displayArticlesPubliee() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  var articles = JSON.parse(localStorage.getItem("articles") || "[]");
  var articlesTableDetail = `
        
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Prix</th>
                <th scope="col">Etat</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
      
            </tr>
        </thead>
        <tbody>`;

  for (let i = 0; i < articles.length; i++) {
    if (articles[i].idUser == connectedUser.id) {
      articlesTableDetail += `
            <tr>
            <td> <img src="${articles[i].image}" alt="IMG-PRODUCT" style="width : 50px;border-radius: 50%;"></div>
            </td>
            <td>
                <h5>${articles[i].nameArticle}</h5>
            </td>
            <td>
                <h5>${articles[i].prix} Dt</h5>
            </td>
            <td>
            <h5>${articles[i].etat} </h5>
        </td>
            <td>
                <h5>${articles[i].dateDebut} -> ${articles[i].dateFin}</h5>
            </td>
       
            <td>
            <button type="button" class="btn btn-success" onclick="editArticle(${articles[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteArticle(${i},'articles')">Delete</button>
            </td>

              </tr>
          
              `;
    }
  }

  articlesTableDetail =
    articlesTableDetail +
    `
          </tbody>
    </table>`;

  document.getElementById("articlesTableDetail").innerHTML =
    articlesTableDetail;
}
// function gallery
function displayShopGallery() {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  var gallery = ``;
  for (let i = 0; i < articles.length; i++) {
    gallery += `
          <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
          <!-- Block2 -->
          <div class="block2">
            <div class="block2-pic hov-img0">
              <img src="${articles[i].image}" alt="IMG-PRODUCT">

              <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" onclick="goToReservation(${articles[i].id})">
                Quick View
              </a>
            </div>

            <div class="block2-txt flex-w flex-t p-t-14">
              <div class="block2-txt-child1 flex-col-l ">
                <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                ${articles[i].nameArticle}
                </a>

                <span class="stext-105 cl3">
                <i class="fa fa-map-marker" aria-hidden="true"></i>

                ${articles[i].ville}  <span> | ${articles[i].category} Dt </span>
                </span>
              </div>

              <div class="block2-txt-child2 flex-r p-t-3">
                <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                  <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                  <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                </a>
              </div>
            </div>
          </div>
        </div>

           
           `;
  }
  document.getElementById("gallery").innerHTML = gallery;
}
// function edit user
function editUserProfil(id) {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  var user = searchById(id, "users");

  var editUser = `
        <div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style="margin-left: 6cm;">
    <div>
      <h4 class="mtext-105 cl2 txt-center p-b-30">
      <div class="bor8 m-b-20 how-pos4-parent">
  
                <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"  onkeyup="validateOnlyTextField(this)" id="firstName"  type="text" name="firstName" placeholder="Name">
                              <span id="firstNameError" style="margin-left: 1.6cm;"></span>
  
                          </div>
                          <div class="bor8 m-b-20 how-pos4-parent">
                <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" onkeyup="validateOnlyTextField(this)"  id="lastName" type="text" name="lastName" placeholder="prénom">
                <span id="lastNameError" style="margin-left: 1.6cm;"></span>
              </div>
           
                          <div class="bor8 m-b-20 how-pos4-parent">
                <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" id="password" name="password" placeholder="mot de passe">
                <span id="passwordError" style="margin-left: 1.6cm;"></span>
              </div>
                          <div class="bor8 m-b-20 how-pos4-parent">
                <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" id="confirmPwd" name="confirmPwd" placeholder="confirm mot de passe">
                <span id="confirmPasswordError" style="margin-left: 1.6cm;"></span>
              </div>
                          <div class="bor8 m-b-20 how-pos4-parent">
                <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="tel" id="tel" name="tel" placeholder="telephone">
                <span id="telError" style="margin-left: 1.6cm;"></span>
              </div>
              <div class="form-group col-md-12" style="margin-left: cm;margin-top: 0.5cm;">
              					<label class="btn hvr">
              						<i class="fa fa-image"></i> Choose your product image
              						<input type="file" style="display: none;" name="image" id="imagee" style="border-radius: 50px;">
              						</label>
               					</div>
          
              <button class="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" onclick="validateEditUserProfil(${connectedUser.id})"  style="background-color:gold" >
              Valider
            </button>
  
        
        `;

  document.getElementById("editUser").innerHTML = editUser;
}
// function validate user
function validateEditUserProfil(id) {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  // Recupération des nouvelles valeurs

  var newPassword = document.getElementById("password").value;
  var verifPassword = verifLength(newPassword, 8);

  if (verifPassword) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("passwordError").style.color = "red";
  }
  var newTel = document.getElementById("tel").value;
  if (newTel.length == 8 && isNaN(newTel) == false) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML = "Invalid tel";
    document.getElementById("telError").style.color = "red";
  }

  var newfirstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(newfirstName, 3);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First name must have at least 3 characters";
    document.getElementById("firstNameError").style.color = "red";
  }

  var newlastName = document.getElementById("lastName").value;

  var verifLastName = verifLength(newlastName, 5);

  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last name must have at least 5 characters";
    document.getElementById("lastNameError").style.color = "red";
  }

  var newconfirmPwd = document.getElementById("confirmPwd").value;

  if (newconfirmPwd == newPassword) {
    document.getElementById("confirmPasswordError").innerHTML = "";
  } else {
    document.getElementById("confirmPasswordError").innerHTML =
      "Invalid confirmation";
    document.getElementById("confirmPasswordError").style.color = "red";
  }
  var newimagee = document.getElementById("imagee").value;
  //   // appel de la fonction replaceCh pour ajuster l'emplacement
  var newimagee = replaceCh(newimagee);

  if (verifPassword && newTel.length == 8 && isNaN(newTel) == false) {
    // Récupération des utilisateurs dans LS
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Parcours tab, recherche user à modifier et modifications du password et tel
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users[i].password = newPassword;
        users[i].tel = newTel;
        users[i].firstName = newfirstName;
        users[i].lastName = newlastName;
        users[i].confirmPwd = newconfirmPwd;
        users[i].imagee = newimagee;
        var editUserr = users[i];
      }
    }
    // Sauvegarde du mise à jour
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("connectedUser", JSON.stringify(editUserr));

    // refresh de la page
    location.reload();
  }
}
// search par nom
function searchProductByName() {
  // Récupération de la categorie à partir de LS
  var nameArticle = localStorage.getItem("categoryToSearch");

  // Récupération des produits
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");
  // Déclaration d'un tableau pour stocker les produits qui ont la même categorie
  var resultTab = [];

  // parcours du tableau et filtrage des produits dans le tableau resultTab
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].nameArticle == nameArticle) {
      resultTab.push(articles[i]);
    }
  }
  console.log(resultTab);
  var shopArticles2 = ``;
  // Affichage du résultat de la recherche
  for (let i = 0; i < resultTab.length; i++) {
    shopArticles2 += `
    
    <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
    <div class="block2">
      <div class="block2-pic hov-img0">
        <img src="${resultTab[i].image}" alt="IMG-PRODUCT"  style="width: 300px;height:300px;border-color:black">
    
        <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" 
        onclick="goToReservation(${resultTab[i].id})">
          Reserve
        </a>
      </div>
    
      <div class="block2-txt flex-w flex-t p-t-14">
        <div class="block2-txt-child1 flex-col-l ">
          <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
          ${resultTab[i].nameArticle}
          </a>
    
          <h4 class="stext-105 cl3">
          <i class="fa fa-map-marker" aria-hidden="true"></i>

          ${resultTab[i].ville}  <span> ${resultTab[i].prix}  </span>
          </h4>
        
        </div>
    
        <div class="block2-txt-child2 flex-r p-t-3">
          <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
            <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
          </a>
    
        </div>
    
    
      </div>
    </div>
    </div>
    
    `;
  }
  console.log(resultTab);
  //  envoie du code html du js vers html
  document.getElementById("shopArticles2").innerHTML = shopArticles2;
}

// ******************Admin*************************

// ************* tab clients*************
function displayUsers() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var usersTable = `
    <table class="table align-items-center table-flush">
    <thead class="thead-light">                       
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Telephone</th>
                            <th scope="col">Rôle</th>
                            <th scope="col">Actions</th>

                          </tr>
                        </thead>
                        <tbody>`;

  for (let i = 0; i < users.length; i++) {
    usersTable =
      usersTable +
      `
        <tr>


        <tr>
        <td><a href="#">${users[i].id}</a></td>
        <td>${users[i].firstName}</td>
        <td>${users[i].lastName}</td>
        <td>${users[i].email}</td>
        <td>${users[i].tel}</td>
        <td>${users[i].role}</td>
        <td><button class="badge badge-success" onclick="editUser(${users[i].id})"  style=" width: 75px;height: 20px; border:white">Modifier</button>
        <button class="badge badge-success" onclick="deleteObject(${i},'users')" 
        style="background-color: #fc544b ; width: 75px;height: 20px; border:#fc544b">Supprimer</button>
   </td>
        </tr>
    
        `;
  }

  usersTable =
    usersTable +
    `
    </tbody>
    </table>`;

  document.getElementById("usersTable").innerHTML = usersTable;
}

function editUser(id) {
  // alert("test");
  var user = searchById(id, "users");
  console.log(user);
  var editUser = `
    <div class="col-md-12 form-group">
    <input type="password" class="form-control" id="password" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${user.password}>
    <span id="passwordError"></span>
    </div>
    <div class="col-md-12 form-group">
    <input type="tel" class="form-control" id="tel" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${user.tel}>
    <span id="telError"></span>

    </div>
    <div class="col-md-12 form-group">
    <button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${user.id})">Validate</button>
    </div>

    `;

  document.getElementById("editUser").innerHTML = editUser;
}

function validateEditUser(id) {
  // Recupération des nouvelles valeurs
  var newPassword = document.getElementById("password").value;
  var verifPassword = verifLength(newPassword, 8);

  if (verifPassword) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("passwordError").style.color = "red";
  }
  var newTel = document.getElementById("tel").value;
  if (newTel.length == 8 && isNaN(newTel) == false) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML = "Invalid tel";
    document.getElementById("telError").style.color = "red";
  }

  if (verifPassword && newTel.length == 8 && isNaN(newTel) == false) {
    // Récupération des utilisateurs dans LS
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Parcours tab, recherche user à modifier et modifications du password et tel
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users[i].password = newPassword;
        users[i].tel = newTel;
      }
    }
    // Sauvegarde du mise à jour
    localStorage.setItem("users", JSON.stringify(users));
    // refresh de la page
    location.reload();
  }
}

function deleteUser(position) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users.splice(position, 1);

  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function deleteObject(position, clé) {
  var Tab = JSON.parse(localStorage.getItem(clé) || "[]");

  Tab.splice(position, 1);

  localStorage.setItem(clé, JSON.stringify(Tab));

  location.reload();
}

// Articles *****************
function displayArticles() {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");
  var articleTable = `
    <table class="table align-items-center table-flush">
    <thead class="thead-light">                       
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Image</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Ville</th>
                            <th scope="col">Category</th>
                            <th scope="col">Etat</th>
                            <th scope="col">Actions</th>

                          </tr>
                        </thead>
                        <tbody>`;

  for (let i = 0; i < articles.length; i++) {
    articleTable =
      articleTable +
      `
        <tr>
        <td><a href="#">${articles[i].id}</a></td>
        <td> <img src="${articles[i].image}" alt="IMG-PRODUCT" style="width : 40px;"></div>
        </td>
        <td>${articles[i].nameArticle}</td>
        <td>${articles[i].ville}</td>
        <td>${articles[i].category}</td>
        <td>${articles[i].etat}</td>
        <td>
        <button class="badge badge-success" onclick="deleteArticle(${i},'articles')" 
        style="background-color: #fc544b ; width: 75px;height: 20px; border:#fc544b">Supprimer</button>
   </td>
        </tr>
    
        `;
  }

  articleTable =
    articleTable +
    `
    </tbody>
    </table>`;

  document.getElementById("articleTable").innerHTML = articleTable;
}

function editArticle(id) {
  // alert("test");
  var article = searchById(id, "articles");
  console.log(article);
  var editArticle = `

  <div class="bor8 m-b-20 how-pos4-parent" style="width: 500px;margin-left: 9cm;">
  <select name=""  id="etat" style="border-color: gainsboro;width:500px;height: 50px;">
							  <option value="Disponible">Disponible</option>
							  <option value="Indisponible">Indisponible</option>
					  </select></div>

						<div class="bor8 m-b-20 how-pos4-parent" style="width: 500px;margin-left: 9cm;">
							<input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" id="dateDebut" type="date" name="date" placeholder="date">
						</div>
						<div class="bor8 m-b-20 how-pos4-parent" style="width: 500px;margin-left: 9cm;">
							<input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" id="dateFin" type="date" name="date" placeholder="date">
						</div>

    <div class="col-md-12 form-group" style="margin-left: 13.5cm;margin-right:8.7cm; width:70px">
    <button type="button" class="btn btn-success" onclick="validateEditArticle(${article.id})" style="width:150px">Edit</button>
    </div>
</div>
    `;

  document.getElementById("editArticle").innerHTML = editArticle;
}
function validateEditArticle(id) {
  var etat = document.getElementById("etat").value;
  var dateDebut = document.getElementById("dateDebut").value;
  var dateFin = document.getElementById("dateFin").value;

  // Récupération des utilisateurs dans LS
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");
  // Parcours tab, recherche user à modifier et modifications du password et tel
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) {
      articles[i].etat = etat;
      articles[i].dateDebut = dateDebut;
      articles[i].dateFin = dateFin;
    }
  }
  // Sauvegarde du mise à jour
  localStorage.setItem("articles", JSON.stringify(articles));
  // refresh de la page
  location.reload();
}

function deleteArticle(position) {
  var articles = JSON.parse(localStorage.getItem("articles") || "[]");

  articles.splice(position, 1);

  localStorage.setItem("articles", JSON.stringify(articles));

  location.reload();
}
// contact
function displayContact() {
  var contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  var contactsTable = ``;

  for (let i = 0; i < contacts.length; i++) {
    contactsTable =
      contactsTable +
      `
    <div class="col-lg-6">
    <!-- Modal basic -->
    <div class="card mb-4" style="width: 500px;height: 200px;">
      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold " style="color:black">E-mail : ${contacts[i].emailContact}</h6>
      </div>
      <div class="card-body">
        <p>${contacts[i].messageContact}</p>
        <button class="badge badge-success" 
        onclick="deleteObject(${i},'contacts')" 
        style="background-color: gold ; width: 100px;height: 30px; 
        border:gold">Supprimer</button>
      </div>
    </div>
    </div>
    `;
  }

  document.getElementById("contactsTable").innerHTML = contactsTable;
}

