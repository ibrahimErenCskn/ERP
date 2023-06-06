document.querySelector("#send").addEventListener("click",()=>{

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    console.log(name,email,subject,message)
    Email.send({
        SecureToken : "2b469a45-ce7a-4913-a267-e954d685ea1a",
        To : 'smtpcevapver@gmail.com',
        From : 'smtpcevapver@gmail.com',
        Subject : subject,
        Body : "<b>Mesajı: </b>"+message+"<br>"+"<b>Mail: </b>"+email+"<br> "+"<b>İsim: </b>"+name,
    }).then(
      message => alert(message)
    );
})

//mail:smtpcevapver@gmail.com
//Şifre:Zortboz1992