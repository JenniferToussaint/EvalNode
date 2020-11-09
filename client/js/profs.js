var xhttp = new XMLHttpRequest();

function addProf(){

    var name = document.querySelector('#name');
    var prenom = document.querySelector('#prenom');
    var datedenaissance = document.querySelector('#datedenaissance');
    var adresse = document.querySelector('#adresse');


    var tmp ={
        name: name.value,
        prenom: prenom.value,
        datedenaissance: datedenaissance.value,
        adresse: adresse.value,
    
    }
    xhttp.open('POST', '/profs', true);
    xhttp.setRequestHeader('Content-type', 'Application/json');
    xhttp.send(JSON.stringify(tmp)); // methode qui converti un objet en string
    addOneLine(tmp);
     document.forms['formSpe'].reset(); 

};

// Je créé un event listener au clic
var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => { 
    // je stop l'action par defaut du bouton
    e.preventDefault();

    addProf(); 
});

// Ajoute une ligne a mon tableau

function addOneLine(teacher) {
    var tab = document.querySelector('#profs');
    var newLine = document.createElement('tr');
    for (const key in teacher){
        if(key != '_id' && key != '__v') {
            var tmp = document.createElement('td');
            tmp.innerText = teacher[key];
            newLine.appendChild(tmp);
        }
    }
    var tdLink = document.createElement('td');
    var link = document.createElement('a'); //Cree la balise
    link.href = '/pages/modifprofs.html#' + teacher._id; // Le lien qu'on veut que cette ligne accède
    link.innerText = 'Modifications'; // Rajoute du texte dans le lien
    tdLink.appendChild(link); // ajoute le lien dans la celulle
    newLine.appendChild(tdLink);

    tab.appendChild(newLine);
}

xhttp.open('GET', '/profs', true);
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