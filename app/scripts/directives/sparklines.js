var app = angular.module('ngApp.project');

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

///////////////////////////////// LINE chart ///////////////////////////////////
app.directive('cardiolcSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="cardiolcSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;

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

                                                                                                                    //***************DIMENSION SETUP

                                 svg.append("path")
                                         .attr("class", "line")
                                         .attr("d", line_definition(rawData)); //line is the function to be used

                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>Cardio:</strong> <span style='color:white'>" + d.cardio.toFixed(2)  + "</span><br>" +
                                                         "<strong>date:</strong> <span style='color:white'>" + monthNames[d.date.getMonth()]+ " "+d.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var circles = svg.selectAll("circle")
                                                .data(rawData)
                                                .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() +
                                                      " u_out"+d.cardio_outlierness + 
                                                      " m_out"+d.mvar_outlierness;
                                                   })
                                                .attr("cx", function (d, i) { return x(d.date); })
                                                .attr("cy", function (d) { return y(d.cardio); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                circles.call(tip);//apply tool tip
                        });
         }
      };
   })
.directive('meanso2lcSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="meanso2lcSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;

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
                                .y(function(d) { return y(d.meanso2) }); //**defining y                              //***************DIMENSION SETUP 1

                        var svg = d3.select("body").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                        //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                rawData.forEach(function(d) {
                                  d.date = parseDate(d.date);
                                  d.meanso2 = +d.meanso2;
                                  d.outlierness = +d.outlierness;                                                         //***************DIMENSION SETUP
                                });

                                x.domain(d3.extent(rawData, function(d) { return d.date; }));
                                //y.domain(d3.extent(rawData, function(d) { return d.meanso2; }));                       //***************DIMENSION SETUP

                                y.domain([d3.min(rawData, function(d){ return d.meanso2; }),
                                                  d3.max(rawData, function(d){ return d.meanso2; })])

                                 svg.append("path")
                                         .attr("class", "line")
                                         .attr("d", line_definition(rawData)); //line is the function to be used

                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>meanso2:</strong> <span style='color:white'>" + d.meanso2.toFixed(2)  + "</span><br>" +
                                                         "<strong>date:</strong> <span style='color:white'>" + monthNames[d.date.getMonth()]+ " "+d.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var circles = svg.selectAll("circle")
                                                .data(rawData)
                                                .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() + 
                                                      " u_out"+d.meanso2_outlierness + 
                                                      " m_out"+d.mvar_outlierness;
                                                   })
                                                .attr("cx", function (d, i) { return x(d.date); })
                                                .attr("cy", function (d) { return y(d.meanso2); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                circles.call(tip);//apply tool tip
                        });
         }
      };
   })
.directive('meanno2lcSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="meanno2lcSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;

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
                                .y(function(d) { return y(d.meanno2) }); //**defining y                              //***************DIMENSION SETUP 1

                        var svg = d3.select("body").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                        //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                rawData.forEach(function(d) {
                                  d.date = parseDate(d.date);
                                  d.meanno2 = +d.meanno2;
                                  d.outlierness = +d.outlierness;                                                           //***************DIMENSION SETUP
                                });

                                x.domain(d3.extent(rawData, function(d) { return d.date; }));
                                //y.domain(d3.extent(rawData, function(d) { return d.meanno2; }));                       //***************DIMENSION SETUP

                                y.domain([d3.min(rawData, function(d){ return d.meanno2; }),
                                                  d3.max(rawData, function(d){ return d.meanno2; })])

                                 svg.append("path")
                                         .attr("class", "line")
                                         .attr("d", line_definition(rawData)); //line is the function to be used

                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>meanno2:</strong> <span style='color:white'>" + d.meanno2.toFixed(2)  + "</span><br>" +
                                                         "<strong>date:</strong> <span style='color:white'>" + monthNames[d.date.getMonth()]+ " "+d.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var circles = svg.selectAll("circle")
                                                .data(rawData)
                                                .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() +
                                                     " u_out"+d.meanno2_outlierness + 
                                                     " m_out"+d.mvar_outlierness;
                                                   })
                                                .attr("cx", function (d, i) { return x(d.date); })
                                                .attr("cy", function (d) { return y(d.meanno2); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                circles.call(tip);//apply tool tip
                        });
         }
      };
   })
.directive('meanpm10lcSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="meanpm10lcSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;

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
                                .y(function(d) { return y(d.meanpm10) }); //**defining y                              //***************DIMENSION SETUP 1

                        var svg = d3.select("body").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                        //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                rawData.forEach(function(d) {
                                  d.date = parseDate(d.date);
                                  d.meanpm10 = +d.meanpm10;
                                  d.outlierness = +d.outlierness;                                                                //***************DIMENSION SETUP
                                });

                                x.domain(d3.extent(rawData, function(d) { return d.date; }));
                                //y.domain(d3.extent(rawData, function(d) { return d.meanpm10; }));                       //***************DIMENSION SETUP

                                y.domain([d3.min(rawData, function(d){ return d.meanpm10; }),
                                                  d3.max(rawData, function(d){ return d.meanpm10; })])                                                                                   //***************DIMENSION SETUP

                                 svg.append("path")
                                         .attr("class", "line")
                                         .attr("d", line_definition(rawData)); //line is the function to be used

                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>meanpm10:</strong> <span style='color:white'>" + d.meanpm10.toFixed(2)  + "</span><br>" +
                                                         "<strong>date:</strong> <span style='color:white'>" + monthNames[d.date.getMonth()]+ " "+d.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var circles = svg.selectAll("circle")
                                                .data(rawData)
                                                .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() +
                                                     " u_out"+d.meanpm10_outlierness + 
                                                     " m_out"+d.mvar_outlierness;
                                                   })
                                                .attr("cx", function (d, i) { return x(d.date); })
                                                .attr("cy", function (d) { return y(d.meanpm10); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                circles.call(tip);//apply tool tip
                        });
         }
      };
   })
.directive('meantemplcSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="meantemplcSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;

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
                                .y(function(d) { return y(d.meantemp) }); //**defining y                              //***************DIMENSION SETUP 1

                        var svg = d3.select("body").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                        //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                rawData.forEach(function(d) {
                                  d.date = parseDate(d.date);
                                  d.meantemp = +d.meantemp;
                                  d.outlierness = +d.outlierness;                                                              //***************DIMENSION SETUP
                                });

                                x.domain(d3.extent(rawData, function(d) { return d.date; }));
                                //y.domain(d3.extent(rawData, function(d) { return d.meantemp; }));                       //***************DIMENSION SETUP

                                y.domain([d3.min(rawData, function(d){ return d.meantemp; }),
                                                  d3.max(rawData, function(d){ return d.meantemp; })])

                                 svg.append("path")
                                         .attr("class", "line")
                                         .attr("d", line_definition(rawData)); //line is the function to be used

                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>meantemp:</strong> <span style='color:white'>" + d.meantemp.toFixed(2)  + "</span><br>" +
                                                         "<strong>date:</strong> <span style='color:white'>" + monthNames[d.date.getMonth()]+ " "+d.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var circles = svg.selectAll("circle")
                                                .data(rawData)
                                                .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() + 
                                                     " u_out"+d.meantemp_outlierness + 
                                                     " m_out"+d.mvar_outlierness;
                                                   })
                                                .attr("cx", function (d, i) { return x(d.date); })
                                                .attr("cy", function (d) { return y(d.meantemp); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                circles.call(tip);//apply tool tip
                        });
         }
      };
   })
.directive('meanhumilcSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="meanhumilcSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;

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
                                .y(function(d) { return y(d.meanhumi) }); //**defining y                              //***************DIMENSION SETUP 1

                        var svg = d3.select("body").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                        //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                rawData.forEach(function(d) {
                                  d.date = parseDate(d.date);
                                  d.meanhumi = +d.meanhumi;
                                  d.outlierness = +d.outlierness;                                                          //***************DIMENSION SETUP
                                });

                                x.domain(d3.extent(rawData, function(d) { return d.date; }));
                                //y.domain(d3.extent(rawData, function(d) { return d.meanhumi; }));                       //***************DIMENSION SETUP

                                y.domain([d3.min(rawData, function(d){ return d.meanhumi; }),
                                                  d3.max(rawData, function(d){ return d.meanhumi; })])

                                 svg.append("path")
                                         .attr("class", "line")
                                         .attr("d", line_definition(rawData)); //line is the function to be used

                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>meanhumi:</strong> <span style='color:white'>" + d.meanhumi.toFixed(2)  + "</span><br>" +
                                                         "<strong>date:</strong> <span style='color:white'>" + monthNames[d.date.getMonth()]+ " "+d.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var circles = svg.selectAll("circle")
                                                .data(rawData)
                                                .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() +
                                                     " u_out"+d.meanhumi_outlierness + 
                                                     " m_out"+d.mvar_outlierness;
                                                   })
                                                //.append("circle")
                                                //.attr("class",function(d){return "elem-off id"+d.date.getMonth()+d.date.getFullYear() + " out"+d.outlierness;})
                                                .attr("cx", function (d, i) { return x(d.date); })
                                                .attr("cy", function (d) { return y(d.meanhumi); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                circles.call(tip);//apply tool tip
                        });
         }
      };
   })
///////////////////////////////// LINE cycle plot ///////////////////////////////////
.directive('cardiocpSpark', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="cardiocpSpark"></div>',
         link: function (scope, element, attrs) {
                   var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                            height = 80 - margin.top - margin.bottom;
                        var data = [ { month: "Jan.", data_list: [] },
                                             { month: "Feb.", data_list: [] },
                                             { month: "Mar.", data_list: [] },
                                             { month: "Apr.", data_list: [] },
                                             { month: "May", data_list: [] },
                                             { month: "June", data_list: [] },
                                             { month: "July", data_list: [] },
                                             { month: "Aug.", data_list: [] },
                                             { month: "Sept.", data_list: [] },
                                             { month: "Oct.", data_list: [] },
                                             { month: "Nov.", data_list: [] },
                                             { month: "Dec.", data_list: [] } ];

                        var parseDate = d3.time.format("%m/%Y").parse;
                        var x = d3.scale.ordinal()
                                .rangeRoundBands([0, width],.1)
                                .domain([0,1,2,3,4,5,6,7,8,9,10,11]);

                        var intraMonthX = d3.scale.linear()
                                .range([0, x.rangeBand()]);

                        var y = d3.scale.linear()
                                .range([height, 0]);

                        var xAxis = d3.svg.axis()
                                .scale(x)
                                .orient("bottom")
                                .tickSize(3,0)
                                .tickFormat(function (d) { return data[d].month; });

                        var yAxis = d3.svg.axis()
                                .scale(y)
                                .orient("left")
                                .tickSize(3, 0);

                        var line_definition = d3.svg.line()
                                .x(function(d, i) { return intraMonthX(i); })     //**defining x
                                .y(function(d) { return y(d.cardio) }); //**defining y                              //***************DIMENSION SETUP 1


                        var svg = d3.select("body").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                        d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                        //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                rawData.forEach(function(d) {
                                  var new_d = {date:"", cardio:""};
                                  new_d.date = parseDate(d.date);
                                  new_d.cardio = +d.cardio;                                  
                                  new_d.univariate_outlierness = +d.cardio_outlierness;                                                           //***************DIMENSION SETUP
                                  new_d.multivariate_outlierness = +d.mvar_outlierness;
                                  data[new_d.date.getMonth()].data_list.push(new_d);                                //***************DIMENSION SETUP
                                });

                                data.forEach(function(d) {//** creating mean dimension
                                  d.mean = d3.mean(d.data_list, function(d) { return d.cardio; });                  //***************DIMENSION SETUP 1
                                });

                                intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                //y.domain(d3.extent(rawData, function(d) { return d.cardio; }));                       //***************DIMENSION SETUP

                                y.domain([d3.min(rawData, function(d){ return d.cardio; }),
                                                  d3.max(rawData, function(d){ return d.cardio; })])

                                var months = svg.selectAll(".month")
                                        .data(data)
                                        .enter()
                                        .append("g")
                                        .attr("class", "month")
                                        .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                months.append("line")
                                        .attr("class", "mean")
                                        .attr("x1", 0)
                                        .attr("y1", function(d) { return y(d.mean); })
                                        .attr("x2", x.rangeBand())
                                        .attr("y2", function(d) { return y(d.mean); })

                                 months.append("path")
                                         .datum( function(d) {// console.log(d.data_list);
                                                                               return d.data_list; } )
                                         .attr("class", "line")
                                         .attr("d", line_definition); //line is the function to be used


                              /////////////// CICLES IN PATH
                                //tooltip rule
                                var tip = d3.tip()
                                                  .attr('class', 'd3-tip')
                                                  .offset([-10, 0])
                                                  .html(function(d) {
                                                        return "<strong>Cardio:</strong> <span style='color:white'>" + d.attr_val.cardio.toFixed(2)  + "</span><br>" + "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();
                                                  })
                                //STARTING subgroup of barchart
                                var bars = months.selectAll("months")
                                        .data(function(d, parent_idx) {
                                                  return d.data_list.map(function (attr_val) {
                                                            var result = { attr_val: attr_val, parent_idx: parent_idx };
                                                            //console.log(result)
                                                           return result;
                                                      });
                                        })
                                        .enter()
                                                .append("circle")
                                                .attr("class",function(d){return "elem-off"+" id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                      " m_out"+d.attr_val.multivariate_outlierness.toFixed(2) +
                                                      " u_out"+d.attr_val.univariate_outlierness.toFixed(2);
                                                  })
                                                .attr("cx", function (d, i) { return intraMonthX(i); })
                                                .attr("cy", function (d) { return y(d.attr_val.cardio); })
                                                .attr("r", 2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide);

                                                bars.call(tip);//apply tool tip
                        });
         }
      };
   })
.directive('meanso2cpSpark', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="meanso2cpSpark"></div>',
           link: function (scope, element, attrs) {
                     var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                              height = 80 - margin.top - margin.bottom;
                          var data = [ { month: "Jan.", data_list: [] },
                                               { month: "Feb.", data_list: [] },
                                               { month: "Mar.", data_list: [] },
                                               { month: "Apr.", data_list: [] },
                                               { month: "May", data_list: [] },
                                               { month: "June", data_list: [] },
                                               { month: "July", data_list: [] },
                                               { month: "Aug.", data_list: [] },
                                               { month: "Sept.", data_list: [] },
                                               { month: "Oct.", data_list: [] },
                                               { month: "Nov.", data_list: [] },
                                               { month: "Dec.", data_list: [] } ];

                          var parseDate = d3.time.format("%m/%Y").parse;
                          var x = d3.scale.ordinal()
                                  .rangeRoundBands([0, width],.1)
                                  .domain([0,1,2,3,4,5,6,7,8,9,10,11]);

                          var intraMonthX = d3.scale.linear()
                                  .range([0, x.rangeBand()]);

                          var y = d3.scale.linear()
                                  .range([height, 0]);

                          var xAxis = d3.svg.axis()
                                  .scale(x)
                                  .orient("bottom")
                                  .tickSize(3,0)
                                  .tickFormat(function (d) { return data[d].month; });

                          var yAxis = d3.svg.axis()
                                  .scale(y)
                                  .orient("left")
                                  .tickSize(3, 0);

                          var line_definition = d3.svg.line()
                                  .x(function(d, i) { return intraMonthX(i); })     //**defining x
                                  .y(function(d) { return y(d.meanso2) }); //**defining y                              //***************DIMENSION SETUP 1


                          var svg = d3.select("body").append("svg")
                                  .attr("width", width + margin.left + margin.right)
                                  .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                          //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                  rawData.forEach(function(d) {
                                    var new_d = {date:"", meanso2:""};                                                        //***************DIMENSION SETUP
                                    new_d.date = parseDate(d.date);
                                    new_d.meanso2 = +d.meanso2;
                                    new_d.univariate_outlierness = +d.meanso2_outlierness;   
                                    new_d.multivariate_outlierness = +d.mvar_outlierness;
                                    data[new_d.date.getMonth()].data_list.push(new_d);
                                  });

                                  data.forEach(function(d) {//** creating mean dimension
                                    d.mean = d3.mean(d.data_list, function(d) { return d.meanso2; });                  //***************DIMENSION SETUP 1
                                  });

                                  intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                  //y.domain(d3.extent(rawData, function(d) { return d.meanso2; }));                       //***************DIMENSION SETUP

                                  y.domain([d3.min(rawData, function(d){ return d.meanso2; }),                            //***************DIMENSION SETUP
                                                    d3.max(rawData, function(d){ return d.meanso2; })])                           //***************DIMENSION SETUP

                                  var months = svg.selectAll(".month")
                                          .data(data)
                                          .enter()
                                          .append("g")
                                          .attr("class", "month")
                                          .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                  months.append("line")
                                          .attr("class", "mean")
                                          .attr("x1", 0)
                                          .attr("y1", function(d) { return y(d.mean); })
                                          .attr("x2", x.rangeBand())
                                          .attr("y2", function(d) { return y(d.mean); })

                                   months.append("path")
                                           .datum( function(d) {// console.log(d.data_list);
                                                                                 return d.data_list; } )
                                           .attr("class", "line")
                                           .attr("d", line_definition); //line is the function to be used


                                /////////////// CICLES IN PATH
                                  //tooltip rule
                                  var tip = d3.tip()
                                                    .attr('class', 'd3-tip')
                                                    .offset([-10, 0])
                                                    .html(function(d) {
                                                          return "<strong>meanso2:</strong> <span style='color:white'>" +
                                                                      d.attr_val.meanso2.toFixed(2)  + "</span><br>" + "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();                                               //***************DIMENSION SETUP
                                                    })
                                  //STARTING subgroup of barchart
                                  var bars = months.selectAll("months")
                                          .data(function(d, parent_idx) {
                                                    return d.data_list.map(function (attr_val) {
                                                              var result = { attr_val: attr_val, parent_idx: parent_idx };
                                                              //console.log(result)
                                                             return result;
                                                        });
                                          })
                                          .enter()
                                                  .append("circle")
                                                  .attr("class",function(d){return "elem-off"+" id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                        " m_out"+d.attr_val.multivariate_outlierness.toFixed(2) +
                                                        " u_out"+d.attr_val.univariate_outlierness.toFixed(2);
                                                  })
                                                  .attr("cx", function (d, i) { return intraMonthX(i); })
                                                  .attr("cy", function (d) { return y(d.attr_val.meanso2); })                                           //***************DIMENSION SETUP
                                                  .attr("r", 2)
                                                  .on('mouseover', tip.show)
                                                  .on('mouseout', tip.hide);

                                                  bars.call(tip);//apply tool tip
                          });
           }
        };
   })
.directive('meanno2cpSpark', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="meanno2cpSpark"></div>',
           link: function (scope, element, attrs) {
                     var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                              height = 80 - margin.top - margin.bottom;
                          var data = [ { month: "Jan.", data_list: [] },
                                               { month: "Feb.", data_list: [] },
                                               { month: "Mar.", data_list: [] },
                                               { month: "Apr.", data_list: [] },
                                               { month: "May", data_list: [] },
                                               { month: "June", data_list: [] },
                                               { month: "July", data_list: [] },
                                               { month: "Aug.", data_list: [] },
                                               { month: "Sept.", data_list: [] },
                                               { month: "Oct.", data_list: [] },
                                               { month: "Nov.", data_list: [] },
                                               { month: "Dec.", data_list: [] } ];

                          var parseDate = d3.time.format("%m/%Y").parse;
                          var x = d3.scale.ordinal()
                                  .rangeRoundBands([0, width],.1)
                                  .domain([0,1,2,3,4,5,6,7,8,9,10,11]);

                          var intraMonthX = d3.scale.linear()
                                  .range([0, x.rangeBand()]);

                          var y = d3.scale.linear()
                                  .range([height, 0]);

                          var xAxis = d3.svg.axis()
                                  .scale(x)
                                  .orient("bottom")
                                  .tickSize(3,0)
                                  .tickFormat(function (d) { return data[d].month; });

                          var yAxis = d3.svg.axis()
                                  .scale(y)
                                  .orient("left")
                                  .tickSize(3, 0);

                          var line_definition = d3.svg.line()
                                  .x(function(d, i) { return intraMonthX(i); })     //**defining x
                                  .y(function(d) { return y(d.meanno2) }); //**defining y                              //***************DIMENSION SETUP 1


                          var svg = d3.select("body").append("svg")
                                  .attr("width", width + margin.left + margin.right)
                                  .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                          //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                  rawData.forEach(function(d) {
                                    var new_d = {date:"", meanno2:""};                                                        //***************DIMENSION SETUP
                                    new_d.date = parseDate(d.date);
                                    new_d.meanno2 = +d.meanno2;
                                    new_d.univariate_outlierness = +d.meanno2_outlierness;                                                        //***************DIMENSION SETUP
                                    new_d.multivariate_outlierness = +d.mvar_outlierness;                                                        //***************DIMENSION SETUP
                                    data[new_d.date.getMonth()].data_list.push(new_d);
                                  });

                                  data.forEach(function(d) {//** creating mean dimension
                                    d.mean = d3.mean(d.data_list, function(d) { return d.meanno2; });                  //***************DIMENSION SETUP 1
                                  });

                                  intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                  //y.domain(d3.extent(rawData, function(d) { return d.meanno2; }));                       //***************DIMENSION SETUP

                                  y.domain([d3.min(rawData, function(d){ return d.meanno2; }),                            //***************DIMENSION SETUP
                                                    d3.max(rawData, function(d){ return d.meanno2; })])                           //***************DIMENSION SETUP

                                  var months = svg.selectAll(".month")
                                          .data(data)
                                          .enter()
                                          .append("g")
                                          .attr("class", "month")
                                          .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                  months.append("line")
                                          .attr("class", "mean")
                                          .attr("x1", 0)
                                          .attr("y1", function(d) { return y(d.mean); })
                                          .attr("x2", x.rangeBand())
                                          .attr("y2", function(d) { return y(d.mean); })

                                   months.append("path")
                                           .datum( function(d) {// console.log(d.data_list);
                                                                                 return d.data_list; } )
                                           .attr("class", "line")
                                           .attr("d", line_definition); //line is the function to be used


                                /////////////// CICLES IN PATH
                                  //tooltip rule
                                  var tip = d3.tip()
                                                    .attr('class', 'd3-tip')
                                                    .offset([-10, 0])
                                                    .html(function(d) {
                                                          return "<strong>meanno2:</strong> <span style='color:white'>" +
                                                                      d.attr_val.meanno2.toFixed(2)  + "</span><br>" + "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();                                               //***************DIMENSION SETUP
                                                    })
                                  //STARTING subgroup of barchart
                                  var bars = months.selectAll("months")
                                          .data(function(d, parent_idx) {
                                                    return d.data_list.map(function (attr_val) {
                                                              var result = { attr_val: attr_val, parent_idx: parent_idx };
                                                              //console.log(result)
                                                             return result;
                                                        });
                                          })
                                          .enter()
                                                  .append("circle")
                                                  .attr("class",function(d){return "elem-off"+" id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                        " m_out"+d.attr_val.multivariate_outlierness.toFixed(2) +
                                                        " u_out"+d.attr_val.univariate_outlierness.toFixed(2);
                                                  })
                                                  .attr("cx", function (d, i) { return intraMonthX(i); })
                                                  .attr("cy", function (d) { return y(d.attr_val.meanno2); })                                           //***************DIMENSION SETUP
                                                  .attr("r", 2)
                                                  .on('mouseover', tip.show)
                                                  .on('mouseout', tip.hide);

                                                  bars.call(tip);//apply tool tip
                          });
           }
        };
   })
.directive('meanpm10cpSpark', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="meanpm10cpSpark"></div>',
           link: function (scope, element, attrs) {
                     var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                              height = 80 - margin.top - margin.bottom;
                          var data = [ { month: "Jan.", data_list: [] },
                                               { month: "Feb.", data_list: [] },
                                               { month: "Mar.", data_list: [] },
                                               { month: "Apr.", data_list: [] },
                                               { month: "May", data_list: [] },
                                               { month: "June", data_list: [] },
                                               { month: "July", data_list: [] },
                                               { month: "Aug.", data_list: [] },
                                               { month: "Sept.", data_list: [] },
                                               { month: "Oct.", data_list: [] },
                                               { month: "Nov.", data_list: [] },
                                               { month: "Dec.", data_list: [] } ];

                          var parseDate = d3.time.format("%m/%Y").parse;
                          var x = d3.scale.ordinal()
                                  .rangeRoundBands([0, width],.1)
                                  .domain([0,1,2,3,4,5,6,7,8,9,10,11]);

                          var intraMonthX = d3.scale.linear()
                                  .range([0, x.rangeBand()]);

                          var y = d3.scale.linear()
                                  .range([height, 0]);

                          var xAxis = d3.svg.axis()
                                  .scale(x)
                                  .orient("bottom")
                                  .tickSize(3,0)
                                  .tickFormat(function (d) { return data[d].month; });

                          var yAxis = d3.svg.axis()
                                  .scale(y)
                                  .orient("left")
                                  .tickSize(3, 0);

                          var line_definition = d3.svg.line()
                                  .x(function(d, i) { return intraMonthX(i); })     //**defining x
                                  .y(function(d) { return y(d.meanpm10) }); //**defining y                              //***************DIMENSION SETUP 1


                          var svg = d3.select("body").append("svg")
                                  .attr("width", width + margin.left + margin.right)
                                  .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                          //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                  rawData.forEach(function(d) {
                                    var new_d = {date:"", meanpm10:""};                                                        //***************DIMENSION SETUP
                                    new_d.date = parseDate(d.date);
                                    new_d.meanpm10 = +d.meanpm10;
                                    new_d.univariate_outlierness = +d.meanpm10_outlierness;    
                                    new_d.multivariate_outlierness = +d.mvar_outlierness;                                                           //***************DIMENSION SETUP
                                    data[new_d.date.getMonth()].data_list.push(new_d);
                                  });

                                  data.forEach(function(d) {//** creating mean dimension
                                    d.mean = d3.mean(d.data_list, function(d) { return d.meanpm10; });                  //***************DIMENSION SETUP 1
                                  });

                                  intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                  //y.domain(d3.extent(rawData, function(d) { return d.meanpm10; }));                       //***************DIMENSION SETUP

                                  y.domain([d3.min(rawData, function(d){ return d.meanpm10; }),                            //***************DIMENSION SETUP
                                                    d3.max(rawData, function(d){ return d.meanpm10; })])                           //***************DIMENSION SETUP

                                  var months = svg.selectAll(".month")
                                          .data(data)
                                          .enter()
                                          .append("g")
                                          .attr("class", "month")
                                          .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                  months.append("line")
                                          .attr("class", "mean")
                                          .attr("x1", 0)
                                          .attr("y1", function(d) { return y(d.mean); })
                                          .attr("x2", x.rangeBand())
                                          .attr("y2", function(d) { return y(d.mean); })

                                   months.append("path")
                                           .datum( function(d) {// console.log(d.data_list);
                                                                                 return d.data_list; } )
                                           .attr("class", "line")
                                           .attr("d", line_definition); //line is the function to be used


                                /////////////// CICLES IN PATH
                                  //tooltip rule
                                  var tip = d3.tip()
                                                    .attr('class', 'd3-tip')
                                                    .offset([-10, 0])
                                                    .html(function(d) {
                                                          return "<strong>meanpm10:</strong> <span style='color:white'>" +
                                                                      d.attr_val.meanpm10.toFixed(2)  + "</span><br>" + "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();                                               //***************DIMENSION SETUP
                                                    })
                                  //STARTING subgroup of barchart
                                  var bars = months.selectAll("months")
                                          .data(function(d, parent_idx) {
                                                    return d.data_list.map(function (attr_val) {
                                                              var result = { attr_val: attr_val, parent_idx: parent_idx };
                                                              //console.log(result)
                                                             return result;
                                                        });
                                          })
                                          .enter()
                                                  .append("circle")
                                                  .attr("class",function(d){return "elem-off"+" id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                        " m_out"+d.attr_val.multivariate_outlierness.toFixed(2) +
                                                        " u_out"+d.attr_val.univariate_outlierness.toFixed(2);
                                                  })
                                                  .attr("cx", function (d, i) { return intraMonthX(i); })
                                                  .attr("cy", function (d) { return y(d.attr_val.meanpm10); })                                           //***************DIMENSION SETUP
                                                  .attr("r", 2)
                                                  .on('mouseover', tip.show)
                                                  .on('mouseout', tip.hide);

                                                  bars.call(tip);//apply tool tip
                          });
           }
        };
   })
.directive('meantempcpSpark', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="meantempcpSpark"></div>',
           link: function (scope, element, attrs) {
                     var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                              height = 80 - margin.top - margin.bottom;
                          var data = [ { month: "Jan.", data_list: [] },
                                               { month: "Feb.", data_list: [] },
                                               { month: "Mar.", data_list: [] },
                                               { month: "Apr.", data_list: [] },
                                               { month: "May", data_list: [] },
                                               { month: "June", data_list: [] },
                                               { month: "July", data_list: [] },
                                               { month: "Aug.", data_list: [] },
                                               { month: "Sept.", data_list: [] },
                                               { month: "Oct.", data_list: [] },
                                               { month: "Nov.", data_list: [] },
                                               { month: "Dec.", data_list: [] } ];

                          var parseDate = d3.time.format("%m/%Y").parse;
                          var x = d3.scale.ordinal()
                                  .rangeRoundBands([0, width],.1)
                                  .domain([0,1,2,3,4,5,6,7,8,9,10,11]);

                          var intraMonthX = d3.scale.linear()
                                  .range([0, x.rangeBand()]);

                          var y = d3.scale.linear()
                                  .range([height, 0]);

                          var xAxis = d3.svg.axis()
                                  .scale(x)
                                  .orient("bottom")
                                  .tickSize(3,0)
                                  .tickFormat(function (d) { return data[d].month; });

                          var yAxis = d3.svg.axis()
                                  .scale(y)
                                  .orient("left")
                                  .tickSize(3, 0);

                          var line_definition = d3.svg.line()
                                  .x(function(d, i) { return intraMonthX(i); })     //**defining x
                                  .y(function(d) { return y(d.meantemp) }); //**defining y                              //***************DIMENSION SETUP 1


                          var svg = d3.select("body").append("svg")
                                  .attr("width", width + margin.left + margin.right)
                                  .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                          //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                  rawData.forEach(function(d) {
                                    var new_d = {date:"", meantemp:""};                                                        //***************DIMENSION SETUP
                                    new_d.date = parseDate(d.date);
                                    new_d.meantemp = +d.meantemp;
                                    new_d.univariate_outlierness = +d.meantemp_outlierness; 
                                    new_d.multivariate_outlierness = +d.mvar_outlierness;                                            //***************DIMENSION SETUP
                                    data[new_d.date.getMonth()].data_list.push(new_d);
                                  });

                                  data.forEach(function(d) {//** creating mean dimension
                                    d.mean = d3.mean(d.data_list, function(d) { return d.meantemp; });                  //***************DIMENSION SETUP 1
                                  });

                                  intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                  //y.domain(d3.extent(rawData, function(d) { return d.meantemp; }));                       //***************DIMENSION SETUP

                                  y.domain([d3.min(rawData, function(d){ return d.meantemp; }),                            //***************DIMENSION SETUP
                                                    d3.max(rawData, function(d){ return d.meantemp; })])                           //***************DIMENSION SETUP

                                  var months = svg.selectAll(".month")
                                          .data(data)
                                          .enter()
                                          .append("g")
                                          .attr("class", "month")
                                          .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                  months.append("line")
                                          .attr("class", "mean")
                                          .attr("x1", 0)
                                          .attr("y1", function(d) { return y(d.mean); })
                                          .attr("x2", x.rangeBand())
                                          .attr("y2", function(d) { return y(d.mean); })

                                   months.append("path")
                                           .datum( function(d) {// console.log(d.data_list);
                                                                                 return d.data_list; } )
                                           .attr("class", "line")
                                           .attr("d", line_definition); //line is the function to be used


                                /////////////// CICLES IN PATH
                                  //tooltip rule
                                  var tip = d3.tip()
                                                    .attr('class', 'd3-tip')
                                                    .offset([-10, 0])
                                                    .html(function(d) {
                                                          return "<strong>meantemp:</strong> <span style='color:white'>" +
                                                                      d.attr_val.meantemp.toFixed(2)  + "</span><br>" + "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();                                               //***************DIMENSION SETUP
                                                    })
                                  //STARTING subgroup of barchart
                                  var bars = months.selectAll("months")
                                          .data(function(d, parent_idx) {
                                                    return d.data_list.map(function (attr_val) {
                                                              var result = { attr_val: attr_val, parent_idx: parent_idx };
                                                              //console.log(result)
                                                             return result;
                                                        });
                                          })
                                          .enter()
                                                  .append("circle")
                                                  .attr("class",function(d){return "elem-off"+" id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                        " m_out"+d.attr_val.multivariate_outlierness.toFixed(2) +
                                                        " u_out"+d.attr_val.univariate_outlierness.toFixed(2);
                                                  })
                                                  .attr("cx", function (d, i) { return intraMonthX(i); })
                                                  .attr("cy", function (d) { return y(d.attr_val.meantemp); })                                           //***************DIMENSION SETUP
                                                  .attr("r", 2)
                                                  .on('mouseover', tip.show)
                                                  .on('mouseout', tip.hide);

                                                  bars.call(tip);//apply tool tip
                          });
           }
        };
   })
.directive('meanhumicpSpark', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="meanhumicpSpark"></div>',
           link: function (scope, element, attrs) {
                     var margin = { top: 5, right: 5, bottom: 5, left: 5 },
                            width = 380 - margin.left - margin.right,
                              height = 80 - margin.top - margin.bottom;
                          var data = [ { month: "Jan.", data_list: [] },
                                               { month: "Feb.", data_list: [] },
                                               { month: "Mar.", data_list: [] },
                                               { month: "Apr.", data_list: [] },
                                               { month: "May", data_list: [] },
                                               { month: "June", data_list: [] },
                                               { month: "July", data_list: [] },
                                               { month: "Aug.", data_list: [] },
                                               { month: "Sept.", data_list: [] },
                                               { month: "Oct.", data_list: [] },
                                               { month: "Nov.", data_list: [] },
                                               { month: "Dec.", data_list: [] } ];

                          var parseDate = d3.time.format("%m/%Y").parse;
                          var x = d3.scale.ordinal()
                                  .rangeRoundBands([0, width],.1)
                                  .domain([0,1,2,3,4,5,6,7,8,9,10,11]);

                          var intraMonthX = d3.scale.linear()
                                  .range([0, x.rangeBand()]);

                          var y = d3.scale.linear()
                                  .range([height, 0]);

                          var xAxis = d3.svg.axis()
                                  .scale(x)
                                  .orient("bottom")
                                  .tickSize(3,0)
                                  .tickFormat(function (d) { return data[d].month; });

                          var yAxis = d3.svg.axis()
                                  .scale(y)
                                  .orient("left")
                                  .tickSize(3, 0);

                          var line_definition = d3.svg.line()
                                  .x(function(d, i) { return intraMonthX(i); })     //**defining x
                                  .y(function(d) { return y(d.meanhumi) }); //**defining y                              //***************DIMENSION SETUP 1


                          var svg = d3.select("body").append("svg")
                                  .attr("width", width + margin.left + margin.right)
                                  .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                          //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                  rawData.forEach(function(d) {
                                    var new_d = {date:"", meanhumi:""};                                                        //***************DIMENSION SETUP
                                    new_d.date = parseDate(d.date);
                                    new_d.meanhumi = +d.meanhumi;                                                           //***************DIMENSION SETUP
                                    new_d.univariate_outlierness = +d.meanhumi_outlierness;
                                    new_d.multivariate_outlierness = +d.mvar_outlierness;
                                    data[new_d.date.getMonth()].data_list.push(new_d);
                                  });

                                  data.forEach(function(d) {//** creating mean dimension
                                    d.mean = d3.mean(d.data_list, function(d) { return d.meanhumi; });                  //***************DIMENSION SETUP 1
                                  });

                                  intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                  //y.domain(d3.extent(rawData, function(d) { return d.meanhumi; }));                       //***************DIMENSION SETUP

                                  y.domain([d3.min(rawData, function(d){ return d.meanhumi; }),                            //***************DIMENSION SETUP
                                                    d3.max(rawData, function(d){ return d.meanhumi; })])                           //***************DIMENSION SETUP

                                  var months = svg.selectAll(".month")
                                          .data(data)
                                          .enter()
                                          .append("g")
                                          .attr("class", "month")
                                          .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                  months.append("line")
                                          .attr("class", "mean")
                                          .attr("x1", 0)
                                          .attr("y1", function(d) { return y(d.mean); })
                                          .attr("x2", x.rangeBand())
                                          .attr("y2", function(d) { return y(d.mean); })

                                   months.append("path")
                                           .datum( function(d) {// console.log(d.data_list);
                                                                                 return d.data_list; } )
                                           .attr("class", "line")
                                           .attr("d", line_definition); //line is the function to be used

                                /////////////// CICLES IN PATH
                                  //tooltip rule
                                  var tip = d3.tip()
                                                    .attr('class', 'd3-tip')
                                                    .offset([-10, 0])
                                                    .html(function(d) {
                                                          return "<strong>meanhumi:</strong> <span style='color:white'>" +
                                                                      d.attr_val.meanhumi.toFixed(2)  + "</span><br>" + "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();                                               //***************DIMENSION SETUP
                                                    })
                                  //STARTING subgroup of barchart
                                  var bars = months.selectAll("months")
                                          .data(function(d, parent_idx) {
                                                    return d.data_list.map(function (attr_val) {
                                                              var result = { attr_val: attr_val, parent_idx: parent_idx };
                                                              //console.log(result)
                                                             return result;
                                                        });
                                          })
                                          .enter()
                                                  .append("circle")
                                                  .attr("class",function(d){return "elem-off"+
                                                    " id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                    " m_out"+d.attr_val.multivariate_outlierness.toFixed(2) +
                                                    " u_out"+d.attr_val.univariate_outlierness.toFixed(2);
                                                  })
                                                  .attr("cx", function (d, i) { return intraMonthX(i); })
                                                  .attr("cy", function (d) { return y(d.attr_val.meanhumi); })                                           //***************DIMENSION SETUP
                                                  .attr("r", 2)
                                                  .on('mouseover', tip.show)
                                                  .on('mouseout', tip.hide);

                                                  bars.call(tip);//apply tool tip
                          });
           }
        };
   })