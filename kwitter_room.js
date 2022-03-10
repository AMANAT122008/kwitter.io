//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyCgVPOS7ZOoPDxI9HIyyURND1mn4V2pxuU",
      authDomain: "kwitter-9c5d4.firebaseapp.com",
      databaseURL: "https://kwitter-9c5d4-default-rtdb.firebaseio.com",
      projectId: "kwitter-9c5d4",
      storageBucket: "kwitter-9c5d4.appspot.com",
      messagingSenderId: "637461675733",
      appId: "1:637461675733:web:1f424a72417c7b52f1ec5c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();


UserName = localStorage.getItem("name");
document.getElementById("welcomeName").innerHTML = "Welcome " + UserName;


function addRoom() {
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "adding room name"
      });

      localStorage.setItem("room_name", roomName);

      window.location = "kwitter_room.html";
}



function redirectToRoomName(Name){
localStorage.setItem("room_name",Name)
window.location="kwitter_page.html"
}