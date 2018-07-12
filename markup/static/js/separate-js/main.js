'use strict';

var DATA_COUNT = 16;
var MIN_XY = 0;
var MAX_XY = 100;
// var utils = Samples.utils;

// utils.srand(110);

/*
    This file can be used as entry point for webpack!
 */
// $(document).ready(function () {
// 	var $windowWidth = $(window).width();
// 	var $windowHeight = $(window).height();


// 	console.log($windowWidth);

// --------------- AJAX ---------
// var xmlhttp = new XMLHttpRequest();
// var chartData = {};
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     chartData = JSON.parse(this.responseText);
//   }
// };

// xmlhttp.open("GET", "./options.json", false);
// xmlhttp.send();
// console.log(chartData);



var chartData = {
  "datasets": [
    {
      "label": "John12",
      "data": [
        {
          "x": "6",
          "y": "22",
           "r": "40"
      }],
      "backgroundColor": "#18a0d4",
      "hoverBackgroundColor": "#00f",
      "title": "www.google.com"
    },
    {
      "label": "Paul",
        "data": [
          {
            "x": "26",
            "y": "22",
             "r": "40"
        }
      ],
      "backgroundColor":"#fcff26",
      "hoverBackgroundColor": "#fcff26"
    },
    {
      "label": "George",
        "data": [
          {
            "x": "2",
            "y": "6",
            "r": "40"
          }
        ],
        "backgroundColor":"#fcff26",
        "hoverBackgroundColor": "#fcff26"
    },
    {
      "label": "Ringo",
        "data": [
          {
            "x": "5",
            "y": "3",
            "r": "40"
          }
        ],
        "backgroundColor":"#18a0d4",
        "hoverBackgroundColor": "#18a0d4"
    }
  ]
};



var options = {
  type: 'bubble',
  data: chartData,
  options: {
  	aspectRatio: 1,
  	legend: false,
    responsive: true,
    // scales: {
    //     yAxes: [{
    //         display : false
    //     }],
    //     xAxes: [{
    //         display : false
    //     }]
    // },
    tooltips: {
    	displayColors: false
    }
  }
}



var chrt = document.getElementById('chart-0');
// chrt.style.width = $windowWidth + 'px';
// chrt.style.height = $windowHeight + 'px';

var ctx = chrt.getContext('2d');
var myChart = new Chart(ctx, options);


chrt.onclick = function(evt){
  var activePoint = myChart.getElementAtEvent(evt);
  console.log('activePoint', activePoint);
  // var url = ... make link with data from activePoint

	var activePoint = myChart.getElementAtEvent(evt);
	if(activePoint[0]){
		var URL = activePoint[0]._chart.tooltip._data.datasets;

   var slice = myChart.getElementAtEvent(evt);
   if (!slice.length) return; // return if not clicked on slice
   var label = slice[0]._chart.tooltip._data.datasets[0].label;

  switch (label) {
    // add case for each label/slice
    case 'John12':
       alert('clicked on slice 5');
       window.open('www.example.com/foo');
       break;
    case 'Värde 6':
       alert('clicked on slice 6');
       window.open('www.example.com/bar');
       break;
  }

   // console.log(slice);
   // console.log(URL);

	}

};



// });
