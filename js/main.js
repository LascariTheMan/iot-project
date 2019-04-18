let findBtn = document.getElementById('findBtn');

findBtn.onclick = plotCupOnMap;


function plotCupOnMap() {
    //get cup coords from sigfox
    let coords = [55.3673, 10.4308];
    draw(coords);
}

