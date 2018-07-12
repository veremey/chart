
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
			var i;

			for (i = 0; i < DATA_COUNT; ++i) {
				data.push({
					"data": [
						{
							x: utils.rand(MIN_XY, MAX_XY),
							y: utils.rand(MIN_XY, MAX_XY),
							v: utils.rand(0, 1000),
						}
					],
					"title" : changes[i].url,
					"label": changes[i].title
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
					//TODO: fix this color to JSON + add yellow
					backgroundColor: '#18a0d4',
					borderColor: '#18a0d4',
					borderWidth: function(context) {
						return Math.min(Math.max(1, context.datasetIndex + 1), 8);
					},

					hoverBackgroundColor: 'transparent',

					// hoverBorderColor: function(context) {
					// 	return utils.color(context.datasetIndex);
					// },

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
		};

		var chart = new Chart('chart-0', {
			type: 'bubble',
			data: data,
			options: options
		});


		var chrt = document.getElementById('chart-0');
		chrt.onclick = function(evt){
		    var activePoint = chart.getElementAtEvent(evt);
		    console.log('activePoint', activePoint);
		    // var url = ... make link with data from activePoint

				var activePoint = chart.getElementAtEvent(evt);
				if(activePoint[0]){
					var URL = activePoint[0]._chart.tooltip._data.datasets;

			   var slice = chart.getElementAtEvent(evt);
			   if (!slice.length) return; // return if not clicked on slice
			   var label = slice[0]._chart.tooltip._data.datasets[0].label;

			  // for (var i = labels.length - 1; i >= 0; i--) {
			  //  switch (label) {
			  //    	case labels[i]+'' :
			  //    		alert(labels[i]+'.com');
			  //    }

			  // } //switch

			   	// console.log(labels);

			    switch (label) {
			      // add case for each label/slice
			      case 'first title':
			         alert('clicked on first title');
			         window.open('www.first title.com/');
			         break;

			      case 'second title':
			         alert('clicked on second title');
			         window.open('www.secondtitle.com/');
			         break;

			      case 'third title':
			         alert('clicked on third title');
			         window.open('www.third title.com/');
			         break;

			      case 'four title':
			         alert('clicked on four title');
			         window.open('www.fourtitle.com/');
			         break;

			    }


		     // console.log(slice);
		     // console.log(URL);

				}

		};

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
