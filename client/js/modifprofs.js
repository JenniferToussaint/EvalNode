var nom = document.querySelector('#name');
var prenom = document.querySelector('#prenom');
var datedenaissance = document.querySelector('#datedenaissance');
var adresse = document.querySelector('#adresse');

var url = window.location;

var profsId = url.hash;

profsId = profsId.substring(1);

var xhttp = new XMLHttpRequest ();


xhttp.open('GET', '/profs/' + profsId, true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var teacher = JSON.parse(this.responseText);
        nom.value = teacher.name;
        prenom.value = teacher.prenom;
        datedenaissance.value = teacher.datedenaissance;
        adresse.value = teacher.adresse;
    }
};

function modifyProf() {
    var tmp = {
        name : nom.value,
        prenom : prenom.value,
        datedenaissance : datedenaissance.value,
        adresse : adresse.value
    
    };
    xhttp.open('PUT', '/profs/' + profsId, true);
    //Comme je vais envoyer des informations je dois comme pour le post précisé une entête
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(tmp));
}

var btn = document.querySelector('#modif');
btn.addEventListener('click', (e) =>{
    e.preventDefault();
    modifyProf();
    // Je me redirige vers la liste des films
    window.location.href = '/pages/profs.html';
});