var xhttp = new XMLHttpRequest();

function addEleve(){

    var name = document.querySelector('#name');
    var prenom = document.querySelector('#prenom');
    var datedenaissance = document.querySelector('#datedenaissance');
    var niveau = document.querySelector('#niveau');
    var adresse = document.querySelector('#adresse');


    var tmp ={
        name: name.value,
        prenom: prenom.value,
        datedenaissance: datedenaissance.value,
        niveau: niveau.value,
        adresse: adresse.value,
    
    }
    xhttp.open('POST', '/eleves', true);
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

    addEleve(); 
});

// Ajoute une ligne a mon tableau

function addOneLine(student) {
    var tab = document.querySelector('#eleves');
    var newLine = document.createElement('tr');
    for (const key in student){
        if(key != '_id' && key != '__v') {
            var tmp = document.createElement('td');
            tmp.innerText = student[key];
            newLine.appendChild(tmp);
        }
    }

    var tdLink = document.createElement('td');
    var link = document.createElement('a'); //Cree la balise
    link.href = '/pages/modifeleves.html#' + student._id; // Le lien qu'on veut que cette ligne accède
    link.innerText = 'Modifications'; // Rajoute du texte dans le lien
    tdLink.appendChild(link); // ajoute le lien dans la celulle
    newLine.appendChild(tdLink);

    tab.appendChild(newLine);
}

xhttp.open('GET', '/eleves', true);
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