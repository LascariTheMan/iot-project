let lostBtn = document.getElementById('lostBtn');
let foundBtn = document.getElementById('foundBtn');
let lowerTemp = document.getElementById('lowerTemp');
let upperTemp = document.getElementById('upperTemp');

lowerTemp.value = -100;
lowerTemp.onchange = updateTemp;
upperTemp.value = 100;
upperTemp.onchange = updateTemp;

lostBtn.onclick = plotCupOnMap;
foundBtn.onclick = foundCup;


client = new Paho.MQTT.Client("m24.cloudmqtt.com", 34379, "web_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = onConnectionLost;

var options = {
    useSSL: true,
    userName: "mhyidsth",
    password: "sQBr9o6btgzV",
    onSuccess: onConnect,
    onFailure: onFailure
};

client.connect(options);


function onConnect() {
    console.log('Connected succesfully to cloudmqtt!');
}

function onFailure(e) {
    console.log("onFalure: " + e);
}

function onConnectionLost() {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

function plotCupOnMap() {
    message = new Paho.MQTT.Message("lost");
    message.destinationName = "/cup";
    client.send(message);
    console.log(message);

    //get cup coords from sigfox
    let coords = [55.3673, 10.4308];
    draw(coords);
}

function foundCup() {
    message = new Paho.MQTT.Message("found");
    message.destinationName = "/cup";
    client.send(message);
    console.log(message);

    removeMarker();
}

function updateTemp() {
    message = new Paho.MQTT.Message("temp " + lowerTemp.value + ";" + upperTemp.value);
    message.destinationName = "/cup";
    client.send(message);
    console.log(message);
    console.log("Updated temperature bounds to [" + lowerTemp.value + "; " + upperTemp.value + "]");
}
