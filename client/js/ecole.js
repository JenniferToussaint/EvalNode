var xhttp = new XMLHttpRequest();

function addEcole(){

    var name = document.querySelector('#name');
    var adresse = document.querySelector('#adresse');
    var departement = document.querySelector('#departement');

    var tmp ={
        name: name.value,
        adresse: adresse.value,
        departement: departement.value
    };

    xhttp.open('POST', '/ecole', true);
    xhttp.setRequestHeader('Content-type', 'Application/json');
    xhttp.send(JSON.stringify(tmp)); // methode qui converti un objet en string
    addOneLine(tmp);
     document.forms['formSpe'].reset(); 
     window.location.href = '/pages/ecoles.html';
};

// Je créé un event listener au clic
var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => { 
    // je stop l'action par defaut du bouton
    e.preventDefault();

    addEcole(); 
});

function deleteEcole(id){

    xhttp.open('DELETE', '/ecole/' + id,true);
    xhttp.send();
    window.location.href = '/pages/ecoles.html'; // recharge la page
}


// Ajoute une ligne a mon tableau

function addOneLine(school) {
    var tab = document.querySelector('#ecole');
    var newLine = document.createElement('tr');
    for (const key in school){
        if(key != '_id' && key != '__v') {
            var tmp = document.createElement('td');
            tmp.innerText = school[key];
            newLine.appendChild(tmp);
        }
    }
    var tdLink = document.createElement('td');
    var link = document.createElement('a'); //Cree la balise
    link.href = '/pages/modifecole.html#' + school._id; // Le lien qu'on veut que cette ligne accède
    link.innerText = 'Modifications'; // Rajoute du texte dans le lien
    tdLink.appendChild(link); // ajoute le lien dans la celulle
    newLine.appendChild(tdLink);

    //Je créé le bouton suppression
    var tdSuppr = document.createElement('td');
    var btnSuppr = document.createElement('button');
    btnSuppr.innerText = 'Suppression';
    btnSuppr.classList.add('btn', 'btn-outline-danger');
    tdSuppr.appendChild(btnSuppr);
    newLine.appendChild(tdSuppr);

    btnSuppr.addEventListener('click', (e) => {
        deleteEcole(school._id);
    });

    tab.appendChild(newLine);
}

xhttp.open('GET', '/ecole', true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(this.responseText);
        data.forEach(elt => {
            addOneLine(elt);
        });
    }
};