
var DATA_COUNT = changes.length;
var MIN_XY = -150;
var MAX_XY = 100;

var utils = Samples.utils;

utils.srand(110);



function colorize(opaque, context) {
	var value = context.dataset.data[context.dataIndex];
	var x = value.x / 100;
	var y = value.y / 100;
	var r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
	var g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
	var b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
	var a = opaque ? 1 : 0.5 * value.v / 1000;

	return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function generateData() {
	var data = [];
	var color;

	var i;

	for (i = 0; i < DATA_COUNT; ++i) {
		if(changes[i].color == '0'){
			color = "#f70606";
		} else if(changes[i].color == '0') {
			color = "#06f74d";
		} else {
			color = changes[i].color;
		} ;

		data.push({
			"data": [
				{
					x: utils.rand(MIN_XY, MAX_XY),
					y: utils.rand(MIN_XY, MAX_XY),
					v: utils.rand(0, 1000),
				}
			],
			"url" : changes[i].url,
			"label": changes[i].title,
			"backgroundColor": color,
			"borderColor": color,
			"hoverBorderColor" : color
				}
			);
	}

	return data;
}

var data = {
	"datasets": generateData()
};

var options = {
	aspectRatio: 1,
	legend: false,
	elements: {
		point: {
			borderWidth: function(context) {
				return Math.min(Math.max(1, context.datasetIndex + 1), 8);
			},

			hoverBackgroundColor: 'transparent',

			hoverBorderWidth: function(context) {
				var value = context.dataset.data[context.dataIndex];
				return Math.round(8 * value.v / 1000);
			},

			radius: function(context) {
				var value = context.dataset.data[context.dataIndex];
				var size = context.chart.width;
				var base = Math.random() * (0.7 - 0.1) + 0.1;
				// var base = Math.abs(200) / 1000;
				return (size / 24) * base;
			}
		}
	},
	tooltips: {
		displayColors: false,
		callbacks: {
			label: function(tooltipItem, data) {
				var i = tooltipItem.datasetIndex;
				var value = changes[i].title;
				return ' '+ value;
			},
			labelColor: function(tooltipItem, chart) {
				var i = tooltipItem.datasetIndex;
				var color;
				if( changes[i].color ) {
					color = 'blue';
				} else {
					color = 'yellow';
				}
				return {
					borderColor: color,
					backgroundColor: color
				}
			}
		}, // end callbacks:
  }, //end tooltips
  scales: {
      yAxes: [{
          display : false
      }],
      xAxes: [{
          display : false
      }]
  },
};

var chart = new Chart('chart-0', {
	type: 'bubble',
	data: data,
	options: options
});



// eslint-disable-next-line no-unused-vars
function randomize() {
	chart.data.datasets.forEach(function(dataset) {
		dataset.data = generateData();
	});
	chart.update();
}

// eslint-disable-next-line no-unused-vars
function addDataset() {
	chart.data.datasets.push({
		data: generateData()
	});
	chart.update();
}

// eslint-disable-next-line no-unused-vars
function removeDataset() {
	chart.data.datasets.shift();
	chart.update();
}



// ---------------------------
// ------    WARNING   -------
// ---------------------------

var chrt = document.getElementById('chart-0');
chrt.onclick = function(evt){
	var activePoint = chart.getElementAtEvent(evt);
	console.log('activePoint', activePoint);

	var activePoint = chart.getElementAtEvent(evt);
	if(activePoint[0]){
		var slice = chart.getElementAtEvent(evt);

		var $index = +( slice[0]._datasetIndex );
		var $url = slice[0]._chart.tooltip._data.datasets[$index].url;

		console.log($index);
		if (!slice.length) return; // return if not clicked on slice

		//****************
		//****************
		//****************

    switch ($url) {
      // add case for each label/slice
      case 'https://www.google.com/':
         // alert('clicked on first title');
         window.open($url, "_blank");
         break;

      case 'second.com':
         window.open($url, "_blank");
         break;

      case 'third.com':
         window.open($url, "_blank");
         break;

      case 'four.com':
         window.open($url, "_blank");
         break;

    }


	}

};




// ---------------------------
// ------    WARNING   -------
// ---------------------------
