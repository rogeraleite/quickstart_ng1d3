var app = angular.module('ngApp.cp-markus');

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
///////////////////////////////// BAR cycle plot ///////////////////////////////////
app.directive('robustcp', function ($parse) {
        return {
           restrict: 'E',
           replace: true,
           template: '<div id="robustcp"></div>',
           link: function (scope, element, attrs) {
                     var margin = { top: 20, right: 20, bottom: 30, left: 30 },
                              width = 810 - margin.left - margin.right,
                              height = 380 - margin.top - margin.bottom;
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
                                       { month: "Dec.", data_list: [] },
                                       { month: ">CenterDist<", data_list: [] },
                                        ];

                          var parseDate = d3.time.format("%m/%Y").parse;

                          var x = d3.scale.ordinal()
                                  .rangeRoundBands([0, width],.1)
                                  .domain([0,1,2,3,4,5,6,7,8,9,10,11,12]);

                          var intraMonthX = d3.scale.linear()
                                  .range([0, x.rangeBand()]);

                          var y = d3.scale.linear()
                                  .range([height, 0]);

                          var xAxis = d3.svg.axis()
                                  .scale(x)
                                  .orient("bottom")
                                  .tickSize(1,0)
                                  .tickFormat(function (d) { return data[d].month; });

                          var yAxis = d3.svg.axis()
                                  .scale(y)
                                  .orient("left")
                                  .tickSize(3, 0);

                          var svg = d3.select("body").append("svg")
                                  .attr("width", width + margin.left + margin.right)
                                  .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          var getSubIndexOfInData = function(obj, index){
                              var array = data[index].data_list;
                              for(var i=0; i<array.length;i++){
                                    if(obj === array[i]){
                                            return i;
                                    }//end if
                              }//end for
                          }//end function

                          var getWidth = function(space,num_samples){
                              return Math.floor(space/num_samples);
                          }

                          //HARDCODED FUNCTION
                          var getDistancesByMonth = function(month){
                            var distanceClass;
                            switch(month){
                                case 'Jan.': distanceClass = "month dist "+y(0)+" "+y(3.48387517398082)+" "+y(7.89322519966418)+" "+y(13.5019177684577)+" "+y(17.7138528042307)+" "+y(21.8280198373879)+" "+y(25.9065749837135)+" "+y(26.9204690961447)+" "+y(22.4511370468341)+" "+y(15.2092970093988)+" "+y(8.56464383216893)+" "+y(2.82276829442293);
                                break;
                                case 'Feb.': distanceClass = "month dist "+y(3.48387517398082)+" "+y(0)+" "+y(4.82348632369291)+" "+y(10.6872981327212)+" "+y(15.1412244025809)+" "+y(19.3029998647634)+" "+y(23.4915830840058)+" "+y(24.5431413075135)+" "+y(20.1346077899504)+" "+y(12.9244113807854)+" "+y(6.33746298294667)+" "+y(1.77080656236508);
                                break;
                                case 'Mar.': distanceClass = "month dist "+y(7.89322519966418)+" "+y(4.82348632369291)+" "+y(0)+" "+y(6.1286729161557)+" "+y(10.7838892507471)+" "+y(14.9268186947935)+" "+y(19.2733390853739)+" "+y(20.3910347979775)+" "+y(16.0201633673475)+" "+y(8.83919658240887)+" "+y(3.29222425344561)+" "+y(5.26586483834891);
                                break;
                                case 'Apr.': distanceClass = "month dist "+y(13.5019177684577)+" "+y(10.6872981327212)+" "+y(6.1286729161557)+" "+y(0)+" "+y(4.87493116136425)+" "+y(9.01176262944686)+" "+y(13.7226667531024)+" "+y(14.8263221354206)+" "+y(10.5353778802238)+" "+y(3.81473171026346)+" "+y(5.26017289150264)+" "+y(10.7547101295449);
                                break;
                                case 'May': distanceClass = "month dist "+y(17.7138528042307)+" "+y(15.1412244025809)+" "+y(10.7838892507471)+" "+y(4.87493116136425)+" "+y(0)+" "+y(4.22242448847457)+" "+y(9.2348290449942)+" "+y(10.2976512396407)+" "+y(6.22702347227683)+" "+y(3.15773262183089)+" "+y(9.30688410079803)+" "+y(15.0107475872128);
                                break;
                                case 'June': distanceClass = "month dist "+y(21.8280198373879)+" "+y(19.3029998647634)+" "+y(14.9268186947935)+" "+y(9.01176262944686)+" "+y(4.22242448847457)+" "+y(0)+" "+y(5.67079935852895)+" "+y(6.68674246750168)+" "+y(3.95375519105486)+" "+y(6.89315972699786)+" "+y(13.4553093232292)+" "+y(19.1487963903312);
                                break;
                                case 'July': distanceClass = "month dist "+y(25.9065749837135)+" "+y(23.4915830840058)+" "+y(19.2733390853739)+" "+y(13.7226667531024)+" "+y(9.2348290449942)+" "+y(5.67079935852895)+" "+y(0)+" "+y(1.76266196017666)+" "+y(4.1011356180016)+" "+y(11.2232370206677)+" "+y(17.7810540811531)+" "+y(23.260707997737);
                                break;
                                case 'Aug.': distanceClass = "month dist "+y(26.9204690961447)+" "+y(24.5431413075135)+" "+y(20.3910347979775)+" "+y(14.8263221354206)+" "+y(10.2976512396407)+" "+y(6.68674246750168)+" "+y(1.76266196017666)+" "+y(0)+" "+y(4.76043233174807)+" "+y(12.2561487571648)+" "+y(18.8160142619456)+" "+y(24.273261575289);
                                break;
                                case 'Sept.': distanceClass = "month dist "+y(22.4511370468341)+" "+y(20.1346077899504)+" "+y(16.0201633673475)+" "+y(10.5353778802238)+" "+y(6.22702347227683)+" "+y(3.95375519105486)+" "+y(4.1011356180016)+" "+y(4.76043233174807)+" "+y(0)+" "+y(7.70405131098796)+" "+y(14.2721826443422)+" "+y(19.7843994643483);
                                break;
                                case 'Oct.': distanceClass = "month dist "+y(15.2092970093988)+" "+y(12.9244113807854)+" "+y(8.83919658240887)+" "+y(3.81473171026346)+" "+y(3.15773262183089)+" "+y(6.89315972699786)+" "+y(11.2232370206677)+" "+y(12.2561487571648)+" "+y(7.70405131098796)+" "+y(0)+" "+y(6.78744606826248)+" "+y(12.5452780885783);
                                break;
                                case 'Nov.': distanceClass = "month dist "+y(8.56464383216893)+" "+y(6.33746298294667)+" "+y(3.29222425344561)+" "+y(5.26017289150264)+" "+y(9.30688410079803)+" "+y(13.4553093232292)+" "+y(17.7810540811531)+" "+y(18.8160142619456)+" "+y(14.2721826443422)+" "+y(6.78744606826248)+" "+y(0)+" "+y(5.88388721403476);
                                break;
                                case 'Dec.': distanceClass = "month dist "+y(2.82276829442293)+" "+y(1.77080656236508)+" "+y(5.26586483834891)+" "+y(10.7547101295449)+" "+y(15.0107475872128)+" "+y(19.1487963903312)+" "+y(23.260707997737)+" "+y(24.273261575289)+" "+y(19.7843994643483)+" "+y(12.5452780885783)+" "+y(5.88388721403476)+" "+y(0);
                                break;
                                case '>CenterDist<': distanceClass = "month dist "+y(13.6289368857216)+" "+y(11.2466453466856)+" "+y(6.92008737432678)+" "+y(2.14817694956052)+" "+y(4.319616041794)+" "+y(8.21798993350988)+" "+y(11.2700628555566)+" "+y(12.2442782155182)+" "+y(8.18123333625)+" "+y(1.76906897837519)+" "+y(5.20045297941441)+" "+y(11.0708103332506);
                                break;
                            }
                            return distanceClass;
                          }

                          d3.json("assets/data/d3exportdata.json", function(error, rawData) {
                          //d3.csv("assets/data/d3exportdata.csv", function(error, rawData) {
                                  rawData.forEach(function(d) {
                                    var new_d = {date:"", md_data_grpcenter:""};                                                        //***************DIMENSION SETUP
                                    new_d.date = parseDate(d.date);
                                    new_d.md_data_grpcenter = +d.md_data_grpcenter;                                                           //***************DIMENSION SETUP
                                    new_d.md_grp_center = +d.md_grp_center;
                                    new_d.outlierness = +d.mvar_outlierness;
                                    //TODO: here goes the new interaction data -> position of distance of each month
                                    data[new_d.date.getMonth()].data_list.push(new_d);
                                  });

                                  data.forEach(function(d) {//** creating mean dimension
                                        d.md_grp_center = d3.mean(d.data_list, function(d) { return d.md_grp_center; });                  //***************DIMENSION SETUP 1
                                  });

                                  intraMonthX.domain([ 0, d3.max(data, function(d) { return d.data_list.length; })]);
                                  //y.domain(d3.extent(rawData, function(d) { return d.meanhumi; }));                       //***************DIMENSION SETUP

                                  /*
                                  y.domain([0, d3.max(rawData, function(d){ return d.md_grp_center; })
                                               +
                                               d3.max(rawData, function(d){ return d.md_data_grpcenter; })]) ;                          //***************DIMENSION SETUP
                                  */
                                  y.domain([0, 32]) ;                          //***************DIMENSION SETUP

                                svg.append("g")
                                        .attr("class", "x axis")
                                        .attr("transform", "translate(0," + height + ")")
                                        .call(xAxis)
                                        .attr("class","month_axis");


                                svg.append("g")
                                        .attr("class", "y axis")
                                        .call(yAxis)
                                        .append("text")
                                        .attr("class", "title")
                                        .attr("y", -5)
                                        .style("text-anchor", "middle");
                                        //.text("Robust");

                                var months = svg.selectAll(".month")
                                        .data(data)
                                        .enter()
                                        .append("g")
                                        //TODO: add reference values in the class code below
                                        .attr("class", function(d){ 
                                            var result = getDistancesByMonth(d.month);
                                            return result;
                                        })
                                        .attr("transform", function(d, i) { return "translate(" + x(i) + ",0)"; });

                                //SETUP to subgroup of barchart
                                var num_groups = data[0].data_list.length;
                                var bar_width = getWidth(x.rangeBand(), num_groups);

                                var tip = d3.tip()
                                            .attr('class', 'd3-tip')
                                            .offset([-10, 0])
                                            .html(function(d) {
                                                  return "<strong>distance:</strong> <span style='color:white'>" +
                                                          d.attr_val.md_data_grpcenter.toFixed(2)  + "</span><br>" +
                                                          "<strong>date:</strong> <span style='color:white'>" + monthNames[d.attr_val.date.getMonth()]+ " "+d.attr_val.date.getFullYear();
                                            });

                                //STARTING subgroup of barchart
                                var bars = months.selectAll("months")
                                        .data(function(d, parent_idx) {
                                                  return d.data_list.map(function (attr_val) {
                                                            var result = { attr_val: attr_val, parent_idx: parent_idx, h_bar: 0 };
                                                            //console.log(result)
                                                           return result;
                                                      });
                                        })
                                        .enter()
                                                .append("rect")
                                                .attr("class",function(d){
                                                      return "elem-off"+" id"+d.attr_val.date.getMonth()+d.attr_val.date.getFullYear()+
                                                             " m_out"+d.attr_val.outlierness.toFixed(2);})
                                                .attr("x", function(d) {
                                                                          var pos_x = getSubIndexOfInData( d.attr_val, d.parent_idx );
                                                                          return pos_x*(bar_width); 
                                                                        })
                                                .attr("y", function(d) {
                                                                          var base_y = y(data[d.parent_idx].md_grp_center);//pega a pos do mes e normaliza de acordo com a dim y
                                                                          var h_bar = height - y(d.attr_val.md_data_grpcenter);//pega a altura da barra e normaliza com a dim y
                                                                          d.attr_val.h_bar = h_bar;
                                                                          var pos_y = base_y - h_bar;
                                                                          return pos_y ;
                                                                          })
                                                .attr("height", function(d) {
                                                                          //var h_bar = height - y(d.attr_val.md_data_grpcenter);
                                                                          //console.log("h: "+final_bh+"  sold: "+d.attr_val.items_sold);

                                                                          return d.attr_val.h_bar;
                                                                          })
                                                .attr("width", bar_width-2)
                                                .on('mouseover', tip.show)
                                                .on('mouseout', tip.hide)

                                                bars.call(tip);//apply tool tip

                                                //Groups` down line
                                                months.append("line")
                                                              .attr("class", "mean")
                                                              .attr("x1", 0)
                                                              .attr("y1", function(d) { return y(d.md_grp_center); })
                                                              .attr("x2", bar_width*num_groups)
                                                              .attr("y2", function(d) { return y(d.md_grp_center); })

                                                //keep updating graph              
                                                //setInterval(function() {
                                                //   console.log("teste");
                                                //}, 1000);

                        });
         }
      };
   })