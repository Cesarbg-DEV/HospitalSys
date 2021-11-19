window.onload = init;

function init() {

    if(!localStorage.getItem("token" && !localStorage.getItem("id"))){
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "signin.html"
        })
    
        document.querySelector('.btn-primary').addEventListener('click', login)
    }
    else {
        window.location.href = "pacientes.html";
    }
}


function login(){
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    var aid = document.getElementById('input-id').value;
    console.log(aid);
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/personal/login',
        data: {
            p_email: mail,
            p_password: password
        }
    }).then(function(res){
        console.log(res)
        if(res.data.code===200){
            localStorage.setItem("token", res.data.message);
            localStorage.setItem("id", aid);
            window.location.href = "pacientes.html";
        }
        else{
            alert("Usuario y/o contraseña incorrectos");
        }
 
    }).catch(function(err){
        console.log(err);
    })
}
