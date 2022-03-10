//YOUR FIREBASE LINKS
var firebaseConfig = {
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




user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      // take the value from the textinput 
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message=message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
//End code
                  }
            });
      });
}
getData();

function updateLike(message_id){
      console.log("clicked on like button -"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_like= Number(likes)+1


      firebase.database().ref(room_name).child(message_id).update({
            like : updated_like
      });

}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("kwitter_room.html");
}


