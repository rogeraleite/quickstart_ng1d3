var app = angular.module('ngApp.project');

app.directive('dccharts', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="dccharts"></div>', //w=1000px
           link: function($scope, element, attrs){

           		$("svg").remove();
           		var s = $scope;
          
		        var yearRingChart, spendHistChart, spenderRowChart;
		          
			    var spendData = [
			      {name: 'Mr A', spent: 40, year: 2011},
			      {name: 'Mr B', spent: 10, year: 2011},
			      {name: 'Mr C', spent: 40, year: 2011},
			      {name: 'Mr A', spent: 70, year: 2012},
			      {name: 'Mr B', spent: 20, year: 2012},
			      {name: 'Mr B', spent: 50, year: 2013},
			      {name: 'Mr C', spent: 30, year: 2013}
			    ];

			    var margin = { top: 20, right: 5, bottom: 5, left: 50 },
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                var ndx = crossfilter(spendData);

                var yearDim  = ndx.dimension(function(d) {return +d.year;});
		        var spendDim = ndx.dimension(function(d) {return Math.floor(d.spent/10);});
		        var nameDim  = ndx.dimension(function(d) {return d.name;});

		        var spendPerYear = yearDim.group().reduceSum(function(d) {return +d.spent;});
		        var spendPerName = nameDim.group().reduceSum(function(d) {return +d.spent;});
		        var spendHist    = spendDim.group().reduceCount();

		        yearRingChart   = dc.pieChart("#chart-ring-year"),
		        spendHistChart  = dc.barChart("#chart-hist-spend"),
		        spenderRowChart = dc.rowChart("#chart-row-spenders");

		        yearRingChart.dimension(yearDim)
		                          .group(spendPerYear)
		                          .innerRadius(50);

		        spendHistChart.dimension(spendDim)
		                           .group(spendHist)
		                           .x(d3.scale.linear().domain([0,10]))
		                           .elasticY(true);

		        spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
		        spendHistChart.yAxis().ticks(2);
  
		        spenderRowChart.dimension(nameDim)
		                            .group(spendPerName)
		                            .elasticX(true);

		        dc.renderAll();
			}
       }//end return
})