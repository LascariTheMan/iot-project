let findBtn = document.getElementById('findBtn');

findBtn.onclick = plotCupOnMap;


function plotCupOnMap() {
    //get cup coords from sigfox
    let coords = [56.164, 10.197];
    draw(coords);
}

