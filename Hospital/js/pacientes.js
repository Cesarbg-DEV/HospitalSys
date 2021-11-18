window.onload = init;
var headers = {}
var url= "http://localhost:3000"


function init() {
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadPatients()
    }
    else {
        window.location.href = "index.html"
    }
}


function loadPatients() {
    axios.get(url + "/pacientes/"+localStorage.getItem("id"), headers).then(function(res){
        console.log(res);
        displayPatients(res.data.message);
    }).catch(function(err){
        console.log(err);
    });
}

function displayPatients(patients) {
    var body = document.querySelector("body");
    for(var i = 0; i < patients.length; i++) {
        body.innerHTML += `<h3> ${patients[i].pat_name} </h3>`;
    }
}
