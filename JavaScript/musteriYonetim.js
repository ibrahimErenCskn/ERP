var firebaseConfig = {
    apiKey: "AIzaSyD3bC2FfWYn_oQ9vXJ2FrmwMpGPL12CK5A",
    authDomain: "test-fac3c.firebaseapp.com",
    projectId: "test-fac3c",
    storageBucket: "test-fac3c.appspot.com",
    messagingSenderId: "504622197254",
    appId: "1:504622197254:web:819038bd089e3d91883187",
    databaseURL: "https://test-fac3c-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

database.ref("Giris").once('value').then(function(snapshot) {
    var data = snapshot.val();
    var name = Object.values(data)[0]["name"];
    database.ref(name+"/musteriYonetim").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var finansBilgi = Object.values(data);
        console.log(finansBilgi)
    
        var table = document.getElementById("musteriYonetim");
        var tbody = table.tBodies[0];
    
        tbody.innerHTML = "";
    
        // İstediğiniz kadar satır eklemek için bir döngü kullanma
        for (var i = 0; i < finansBilgi.length; i++) {
            // Yeni bir satır oluşturma
            var newRow = tbody.insertRow();
    
            // Yeni hücreler oluşturma ve içeriklerini ayarlama
            var cell1 = newRow.insertCell();
            var cell2 = newRow.insertCell();
            var cell3 = newRow.insertCell();
            var cell4 = newRow.insertCell();
    
            cell1.innerHTML = finansBilgi[i]["ad"];
            cell2.innerHTML = finansBilgi[i]["soyad"];
            cell3.innerHTML = finansBilgi[i]["email"];
            cell4.innerHTML = finansBilgi[i]["telefon"];
        }
    })
})


document.querySelector("#send").addEventListener("click",()=>{
    var ad = document.getElementById("ad").value;
    var soyad = document.getElementById("soyad").value;
    var email = document.getElementById("email").value;
    var telefon = document.getElementById("telefon").value;
    database.ref("Giris").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var name = Object.values(data)[0]["name"];
        veri = {
            ad : ad,
            soyad : soyad,
            email : email,
            telefon : telefon
        }
        var firebaseRef = database.ref(name+'/musteriYonetim');
        firebaseRef.push(veri);
        database.ref(name+"/musteriYonetim").once('value').then(function(snapshot) {
            var data = snapshot.val();
            var finansBilgi = Object.values(data);
            console.log(finansBilgi)
        
            var table = document.getElementById("musteriYonetim");
            var tbody = table.tBodies[0];
        
            tbody.innerHTML = "";
        
            // İstediğiniz kadar satır eklemek için bir döngü kullanma
            for (var i = 0; i < finansBilgi.length; i++) {
                // Yeni bir satır oluşturma
                var newRow = tbody.insertRow();
        
                // Yeni hücreler oluşturma ve içeriklerini ayarlama
                var cell1 = newRow.insertCell();
                var cell2 = newRow.insertCell();
                var cell3 = newRow.insertCell();
                var cell4 = newRow.insertCell();
                
                cell1.innerHTML = finansBilgi[i]["ad"];
                cell2.innerHTML = finansBilgi[i]["soyad"];
                cell3.innerHTML = finansBilgi[i]["email"];
                cell4.innerHTML = finansBilgi[i]["telefon"];
            }
        })
    })
})
document.querySelector("#remove").addEventListener("click",()=>{
    var Sira = document.getElementById("removeid").value;
    database.ref("Giris").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var name = Object.values(data)[0]["name"];
        database.ref(name+"/musteriYonetim").once('value').then(function(snapshot) {
            var removedata = snapshot.val();
            var removeBilgi = Object.values(removedata);
            for (let i = 0; i < removeBilgi.length; i++) {
                if (removeBilgi[i]["ad"]==Sira) {
                    removeDataRef = database.ref(name+"/musteriYonetim/"+Object.keys(removedata)[i])
                        console.log(name+"/musteriYonetim/"+Object.keys(removedata)[i])
                        removeDataRef.remove()
                        location.href = location.href;
                        break
                }
            }
        })
    })
})