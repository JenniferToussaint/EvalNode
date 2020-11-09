var nom = document.querySelector('#name');
var adresse = document.querySelector('#adresse');
var departement = document.querySelector('#departement');


var url = window.location;

var ecoleId = url.hash;

ecoleId = ecoleId.substring(1);

var xhttp = new XMLHttpRequest ();

xhttp.open('GET', '/ecole/' + ecoleId, true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var school = JSON.parse(this.responseText);
        console.log(school);

        nom.value = school.name;
        adresse.value = school.adresse;
        departement.value = school.departement
    }
};

function modifyEcole() {
    var tmp = {
        name : nom.value,
        adresse : adresse.value,
        departement : departement.value
    
    };
    xhttp.open('PUT', '/ecole/' + ecoleId, true);
    //Comme je vais envoyer des informations je dois comme pour le post précisé une entête
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) =>{
    e.preventDefault();
    modifyEcole();
    // Je me redirige vers la liste des films
    window.location.href = '/pages/ecoles.html';
});