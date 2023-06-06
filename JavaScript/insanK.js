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
    database.ref(name+"/insanKaynaklari").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var finansBilgi = Object.values(data);
        console.log(finansBilgi)
    
        var table = document.getElementById("insanKaynaklari");
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
            cell3.innerHTML = finansBilgi[i]["departman"];
            cell4.innerHTML = finansBilgi[i]["maas"];
        }
    })
})

document.querySelector("#send").addEventListener("click",()=>{
    var ad = document.getElementById("ad").value;
    var soyad = document.getElementById("soyad").value;
    var departman = document.getElementById("departman").value;
    var maas = document.getElementById("maas").value;
    database.ref("Giris").once('value').then(function(snapshot) {
        var data = snapshot.val();
        var name = Object.values(data)[0]["name"];
        veri = {
            ad : ad,
            soyad : soyad,
            departman : departman,
            maas : maas
        }
        var firebaseRef = database.ref(name+'/insanKaynaklari');
        firebaseRef.push(veri);
        database.ref(name+"/insanKaynaklari").once('value').then(function(snapshot) {
            var data = snapshot.val();
            var finansBilgi = Object.values(data);
            console.log(finansBilgi)
        
            var table = document.getElementById("insanKaynaklari");
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
                cell3.innerHTML = finansBilgi[i]["departman"];
                cell4.innerHTML = finansBilgi[i]["maas"];
            }
        })
    })
})