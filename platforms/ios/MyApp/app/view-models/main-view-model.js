var config = require("../shared/config");

var Observable = require("data/observable").Observable;
var viewModel = new Observable();
var firebase = require("nativescript-plugin-firebase");

function initFirebase(){
    alert("initFirebase")

    firebase.init({
        url: config.apiUrl
    }).then(
        function (instance) {
          alert("OK")
          console.log("firebase.init done");
          eventListener();
        },
        function (error) {
          alert("NG")
          console.log("firebase.init error: " + error);
        }
    );
}

function eventListener(){
    var onValueEvent = function(result) {
        console.log("Value: " + JSON.stringify(result.value));
        viewModel.set("data1", JSON.stringify(result.value));
    };

  // listen to changes in the /users path
  firebase.addValueEventListener(onValueEvent, "users");
}

function registerFirebase() {
    alert("registerFirebase")
    var onValueEvent = function(result) {
        alert("CHANGE:  " + JSON.stringify(result.value));
    };

  // listen to changes in the /users path
  firebase.addValueEventListener(onValueEvent, "users/" + viewModel.my_id);
}

function createViewModel() {
    viewModel.init = function(){
        initFirebase();
    }

    viewModel.register = function(){
        registerFirebase();
    }

    viewModel.update = function(){
        var name = this.name
        var id = this.id
        firebase.setValue("users/" + id, {"name": name, "phone": "phone"})
    }

    return viewModel;
}

exports.createViewModel = createViewModel;