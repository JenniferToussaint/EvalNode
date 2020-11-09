var nom = document.querySelector('#name');
var prenom = document.querySelector('#prenom');
var datedenaissance = document.querySelector('#datedenaissance');
var niveau = document.querySelector('#niveau');
var adresse = document.querySelector('#adresse');

var url = window.location;

var elevesId = url.hash;

elevesId = elevesId.substring(1);

var xhttp = new XMLHttpRequest ();


xhttp.open('GET', '/eleves/' + elevesId, true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var student = JSON.parse(this.responseText);
        nom.value = student.name;
        prenom.value = student.prenom;
        niveau.value = student.niveau;
        datedenaissance.value = student.datedenaissance;
        adresse.value = student.adresse;
    }
};

function modifyEleve() {
    var tmp = {
        name : nom.value,
        prenom : prenom.value,
        niveau : niveau.value,
        datedenaissance : datedenaissance.value,
        adresse : adresse.value
    
    };
    xhttp.open('PUT', '/eleves/' + elevesId, true);
    //Comme je vais envoyer des informations je dois comme pour le post précisé une entête
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) =>{
    e.preventDefault();
    modifyEleve();
    // Je me redirige vers la liste des films
    window.location.href = '/pages/eleves.html';
});