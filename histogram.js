var request = new XMLHttpRequest();
request.open("GET", "data.json", false);
request.send(null);
var obj = JSON.parse(request.responseText);
console.log(obj);

var data = [
  {
    x: [],
    y: [],
    type: 'bar'
  }
];

for (var e in obj){
	data[0].x.push(e);
	data[0].y.push(obj[e]);
}

Plotly.newPlot('myDiv', data);