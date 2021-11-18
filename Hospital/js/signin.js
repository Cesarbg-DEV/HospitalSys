window.onload = init;

function init() {
    if(!localStorage.getItem("token" && !localStorage.getItem("id"))){
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html"
        })
    
        document.querySelector('.btn-primary').addEventListener('click', signin)
    }
    else {
        window.location.href = "pacientes.html";
    }
}


function signin(){
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/personal/signin',
        data: {
            p_name: name, 
            p_email: mail,
            p_password: password, 
        }
        
    }).then(function(res){
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "login.html"
    }).catch(function(err){
        console.log(err);
    })
}
 