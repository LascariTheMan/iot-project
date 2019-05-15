let findBtn = document.getElementById('findBtn');

findBtn.onclick = plotCupOnMap;


client = new Paho.MQTT.Client("m24.cloudmqtt.com", 34379, 'web_" + parseInt(Math.random() * 100, 10))');

client.onConnectionLost = onConnectionLost;

var options = {
    useSSL: true,
    userName: "mhyidsth",
    password: "sQBr9o6btgzV",
    onSuccess: onConnect,
    onFailure: doFail
};

client.connect(options);


function onConnect() {
    console.log('Connected succesfully to cloudmqtt!')
}

function doFail(e) {
    console.log(e)
};

function onConnectionLost() {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
      };
};


function plotCupOnMap() {
    message = new Paho.MQTT.Message("helllo nieeeeels");
    message.destinationName = "/cup";
    client.send(message);
    console.log(message);

    //get cup coords from sigfox
    let coords = [55.3673, 10.4308];
    draw(coords);
};

