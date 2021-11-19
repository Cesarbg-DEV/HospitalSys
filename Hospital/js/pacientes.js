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

function eliminar(id){
    console.log(headers);

    axios.delete(url+ "/pacientes/" + id, headers)
    .then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
    location.reload();
}

function agregar(){
    var name = document.getElementById("nombre").value;
    var fecha = document.getElementById("fechadm").value; //2021-10-18 <--- Asi debe ser el formato 
    var al = document.getElementById("alta").value; // 2 caracteres, Si o No
    var idd = document.getElementById("idd").value; // 6 numeros 
    var diag = document.getElementById("diag").value; // Maximo 300 caracteres
    var data ={pat_name: name, adm_date: fecha, alta: al, id : idd, diagnostico :diag};
    axios.post(url+ "/pacientes/", data, headers)
    .then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
    location.reload();
}