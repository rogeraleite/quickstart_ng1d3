var app = angular.module('ngApp.project');

///////////////////////////////// LINE chart ///////////////////////////////////
app.directive('linechart', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="linechart"></div>',
         link: function (scope, element, attrs) {
                
                //$(".container").eq(1).css("height","50px");
                $("svg").remove();
                 $(".container").eq(1).css("height","50px");

                var margin = { top: 20, right: 5, bottom: 5, left: 50 },
                    width = 800 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                var parseDate = d3.time.format("%m/%Y").parse;
                var x = d3.time.scale().range([0, width]);

                var y = d3.scale.linear()
                        .range([height, 0]);

                var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                        .tickSize(3,0);

                var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickSize(3, 0);

                var line_definition = d3.svg.line()
                        .x(function(d, i) { return x(d.date) })     //**defining x
                        .y(function(d) { return y(d.cardio) }); //**defining y                              //***************DIMENSION SETUP 1

                var svg = d3.select("body").append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {                       
                        rawData.forEach(function(d) {
                          d.date = parseDate(d.date);
                          d.cardio = +d.cardio;
                          d.outlierness = +d.outlierness;                                                          //***************DIMENSION SETUP
                        });

                        x.domain(d3.extent(rawData, function(d) { return d.date; }));
                        //y.domain(d3.extent(rawData, function(d) { return d.cardio; }));                       //***************DIMENSION SETUP

                        y.domain([d3.min(rawData, function(d){ return d.cardio; }),
                                          d3.max(rawData, function(d){ return d.cardio; })])

                        //AXIS
                        svg.append('g')
                              .attr('class', 'axis axis--x')
                              .attr('transform', 'translate(0,' + height + ')')
                              .call(d3.svg.axis()
                                      .scale(x)
                                      .orient("bottom"));

                        svg.append('g')
                              .attr('class', 'axis axis--y')
                              .call(d3.svg.axis()
                                      .scale(y)
                                      .orient("left"))
                              .append('text')
                              .attr('class', 'axis-title')
                              .attr('transform', 'rotate(-90)')
                              .attr('y', 6)
                              .attr('dy', '-1em')
                              .style('text-anchor', 'end')
                              .text('Cardio');
                                                                                                            //***************DIMENSION SETUP
                        svg.append("path")
                                 .attr("class", "line")
                                 .attr("d", line_definition(rawData))
                                 .attr("fill", "none")
                                 .attr('stroke', 'steelblue'); //line is the function to be used
                  
                });
         }
      };
   })