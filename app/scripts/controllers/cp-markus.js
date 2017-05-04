 'use strict';

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

angular.module('ngApp.cp-markus',[])
 // // Module configuration.
 //  .config(function ($stateProvider) {
 //    // Module routing.
 //    $stateProvider
 //      .state('cp-markus', {
 //        url         : '/cp-markus',
 //        controller  : 'CPMarkusController',
 //        authenticate: true,
 //        templateUrl : 'pages/cp-markus/cp-markus.html'
 //      });
 //  })

.controller('CPMarkusController', function($scope, $http) {
    
    var s = $scope;
    s.color_array = ["#969696","#A6BDDB","#3690C0","#045A8D"];

        
    //positioning rebels SVG that insisted on being out of the DOM scope
    $(document).ready(function(){
        var color_array = ["#969696","#A6BDDB","#3690C0","#045A8D"];
        var new_color_array = ["#969696", //normal 
                               "#FE861B", //multivariate outliers
                               "#03BDE6", //univariate outliers
                               "#FC208F"];// multi AND uni outliers
        var single_color = "#de2d26";
        var slider_start = 0.75;
        var linked_slider = true;
        var borders = [0.95,0.975,0.999];
        setTimeout(function() {

          var init = function(){
                 //SIZE setup
                 $(".container").eq(1).css("margin","30");
                 $(".container").eq(1).css("width","1700px");
                 $(".container").eq(1).css("height","800px");
                 
                 $(".panel.panel-default").css("margin-top",0);//fix
                 $(".panel.panel-default").css("padding",0);//fix
                 $(".panel-body").css("padding",0);//fix
                 $(".col-md-3").css("padding-lef",6);//fix
                 $(".col-md-3").css("padding-right",3);//fix
                 $(".col-md-6").css("padding-left",4);//fix
                 $(".col-md-6").css("padding-right",4);//fix
                 $(".control-panel").css("padding-bottom",20);
                 $(".control-panel").css("padding-top",6);

                 //PANELS & SVG setup
                 $('#robustcp')[0].appendChild($('svg')[0]);

                 $('#cardiocp')[0].appendChild($('svg')[1]);
                 $('#meanso2cp')[0].appendChild($('svg')[2]);
                 $('#meanno2cp')[0].appendChild($('svg')[3]);
                 $('#meanpm10cp')[0].appendChild($('svg')[4]);
                 $('#meantempcp')[0].appendChild($('svg')[5]);
                 $('#meanhumicp')[0].appendChild($('svg')[6]);

                 $('#cardiolc')[0].appendChild($('svg')[7]);
                 $('#meanso2lc')[0].appendChild($('svg')[8]);
                 $('#meanno2lc')[0].appendChild($('svg')[9]);
                 $('#meanpm10lc')[0].appendChild($('svg')[10]);
                 $('#meantemplc')[0].appendChild($('svg')[11]);
                 $('#meanhumilc')[0].appendChild($('svg')[12]);

                 $('#cardiocpSpark')[0].appendChild($('svg')[13]);
                 $('#meanso2cpSpark')[0].appendChild($('svg')[14]);
                 $('#meanno2cpSpark')[0].appendChild($('svg')[15]);
                 $('#meanpm10cpSpark')[0].appendChild($('svg')[16]);
                 $('#meantempcpSpark')[0].appendChild($('svg')[17]);
                 $('#meanhumicpSpark')[0].appendChild($('svg')[18]);

                 $('#cardiolcSpark')[0].appendChild($('svg')[19]);
                 $('#meanso2lcSpark')[0].appendChild($('svg')[20]);
                 $('#meanno2lcSpark')[0].appendChild($('svg')[21]);
                 $('#meanpm10lcSpark')[0].appendChild($('svg')[22]);
                 $('#meantemplcSpark')[0].appendChild($('svg')[23]);
                 $('#meanhumilcSpark')[0].appendChild($('svg')[24]);

                     // With JQuery
                 $("#slider12a").slider({ id:"slider-multi", min: 0.5, max: 1.00, value: slider_start, step: 0.01});
                 $("#slider12b").slider({ id:"slider-uni", min: 0.5, max: 1.00, value: slider_start, step: 0.01});

                 $(".slider-track").eq(0).attr("id","slider-multi");
                 $(".slider-track").eq(1).attr("id","slider-uni");




                 addBehaviorToID();
                 updateBorderPanel();
            }

              //DEPRECATED
             var getOutliernessByClass = function(str){
                  var splited = str.split(" ");
                  var outlierness;

                  for(var i=0; i<splited.length; i++){
                       if(splited[i].match("^m_out")){
                          outlierness = splited[i];
                          break;
                       }
                  }

                  outlierness = +outlierness.substring(3);
                  return outlierness;
             }
             var classConstructor = function(class_str, code, entry_str){
                  var splited = class_str.split(" ");
                  var m_out="", u_out="";

                  for(var i=0; i<splited.length; i++){
                       if(splited[i].match("^m_out")){
                          m_out = splited[i];
                       }
                       else if(splited[i].match("^u_out")){
                          u_out = splited[i];
                       }
                  }//end for

                  return (entry_str+" "+code+" "+m_out+" "+u_out);
             }
             //DEPRECATED
             var highlightSimilarByHover = function(el,id2,code2){
                 el.hover(function(){
                       if(el.is('.elem-off')){
                            $(id2).each( function(){

                                  var is_element_input = $(this).is("circle"); //true or false

                                   if(is_element_input){
                                      // var color = $("rect"+id2).attr("fill");
                                      // $(this).attr("fill",color);
                                      if($(this).attr("fill") === new_color_array[0]){
                                        var r = $(this).attr("r")*2;
                                        $(this).attr("r",r);
                                      }
                                  }

                                  var old_class = $(this).attr("class");
                                  var new_class = classConstructor(old_class, code2, "elem-on")
                                  
                                  $(this).attr("class", new_class);
                           })
                       }
                      else if(el.is(".elem-on")){
                            $(id2).each( function(){

                                   var is_element_input = $(this).is("circle"); //true or false

                                   if(is_element_input){
                                      // var color = $("rect"+id2).attr("fill");
                                      // $(this).attr("fill",color);
                                      if($(this).attr("fill") === new_color_array[0]){
                                        var r = $(this).attr("r")/2;
                                        $(this).attr("r",r);
                                      }
                                  }

                                  var old_class = $(this).attr("class");
                                  var new_class = classConstructor(old_class, code2, "elem-off")

                                  $(this).attr("class", new_class);
                            })
                      }
                  })
             }
             var highlightSimilarByClick = function(el, id2, code2){
                  el.click(function(){
                       if(el.is('.elem-off')){
                            $(id2).each( function(){

                                  var is_element_input = $(this).is("circle"); //true or false

                                   if(is_element_input){
                                      // var color = $("rect"+id2).attr("fill");
                                      // $(this).attr("fill",color);
                                      if($(this).attr("fill") === new_color_array[0]){
                                        var r = $(this).attr("r")*2;
                                        $(this).attr("r",r);
                                      }
                                  }

                                  var old_class = $(this).attr("class");
                                  var new_class = classConstructor(old_class, code2, "elem-on")
                                  
                                  $(this).attr("class", new_class);
                           })
                       }
                      else if(el.is(".elem-on")){
                            $(id2).each( function(){

                                   var is_element_input = $(this).is("circle"); //true or false

                                   if(is_element_input){
                                      // var color = $("rect"+id2).attr("fill");
                                      // $(this).attr("fill",color);
                                      if($(this).attr("fill") === new_color_array[0]){
                                        var r = $(this).attr("r")/2;
                                        $(this).attr("r",r);
                                      }
                                  }

                                  var old_class = $(this).attr("class");
                                  var new_class = classConstructor(old_class, code2, "elem-off");
                                  
                                  $(this).attr("class", new_class);
                            })
                      }
                  })
             }
             //SELECTION BEHAVIOR
             var addBehaviorToID = function(){
                    var m,y, id,code;
                     for(m=0;m<12;m++){
                          for(y=2000;y<2008;y++){

                              code = "id"+m+y;
                              id = "."+code;

                              $(id).each(function(){
                                    var el = $(this);

                                    var id2 = id;
                                    var code2 = code;

                                    highlightSimilarByHover(el, id2, code2);
                                    highlightSimilarByClick(el, id2, code2);

                              })//end each

                          }//end for
                     }//end for
                   }//end function

            //SWITCH
            $("[name='my-checkbox']").bootstrapSwitch();

            $('#checkbox-lc').on('switchChange.bootstrapSwitch', function (event, state) {
                      if(state){
                             $(".line-plot").show();
                      }
                      else{
                             $(".line-plot").hide();
                      }
            });
            $('#checkbox-cp').on('switchChange.bootstrapSwitch', function (event, state) {
                      if(state){
                             $(".cycle-plot").show();
                      }
                      else{
                             $(".cycle-plot").hide();
                      }
            });
            $('#checkbox-sp').on('switchChange.bootstrapSwitch', function (event, state) {
                      if(state){
                             $(".detailed-plot").show();
                             $(".sparkline-plot").hide();
                      }
                      else{
                             $(".detailed-plot").hide();
                             $(".sparkline-plot").show();
                      }
            });
            $('#checkbox-linked').on('switchChange.bootstrapSwitch', function (event, state) {
                             linked_slider = state;
            });

            //DEPRICATED
            var updateElementColors = function(){
                  if($('#checkbox-cor').bootstrapSwitch('state')){
                             $("rect").each(function(){
                                    var c = $(this).attr("class");
                                    var o = getOutliernessByClass(c);
                                    var color;
                                    if(o < borders[0] ){ color = color_array[0];}
                                    else if(o < borders[1]){ color = color_array[1];}
                                    else if(o < borders[2]){ color = color_array[2];}
                                    else { color = color_array[3];}
                                    $(this).attr("fill", color);
                             });
                             $("circle").each(function(){
                                    var c = $(this).attr("class");
                                    var o = getOutliernessByClass(c);
                                    var color;
                                    if(o < borders[0] ){ color = color_array[0];}
                                    else if(o < borders[1]){ color = color_array[1];}
                                    else if(o < borders[2]){ color = color_array[2];}
                                    else { color = color_array[3];}
                                    $(this).attr("fill", color);
                             });

                      }
                      else{
                             $("rect").attr("fill",color_array[0]);
                             $("circle").attr("fill",color_array[0]);
                      }
            }
            var getMultivariateOutliernessByClass = function(str){
                  var splited = str.split(" ");
                  var outlierness = "";

                  for(var i=0; i<splited.length; i++){
                       if(splited[i].match("^m_out")){
                          outlierness = splited[i];
                          break;
                       }
                  }
                  if(outlierness!==""){
                     outlierness = +outlierness.substring(5);
                  }
                  return outlierness;
            }
            var getUnivariateOutliernessByClass = function(str){
                  var splited = str.split(" ");
                  var outlierness = "";

                  for(var i=0; i<splited.length; i++){
                       if(splited[i].match("^u_out")){
                          outlierness = splited[i];
                          break;
                       }
                  }

                  if(outlierness!==""){
                     outlierness = +outlierness.substring(5);
                  }
                  return outlierness;
            }
            var updateRectElementColor = function(){
                var slider = $('#slider12a'); 
                if($('#checkbox-cor-slider').bootstrapSwitch('state')){

                        var new_value = parseFloat(slider.attr("value"));

                        $("rect").each(function(){
                             var c = $(this).attr("class");
                             var o = getMultivariateOutliernessByClass(c);
                             var color;
                             if(o <= new_value ){ color = new_color_array[0];}
                             else { color = new_color_array[1];}
                             $(this).attr("fill", color);
                         });
                                
                         if(linked_slider){
                             $('#slider12b').slider('setValue', new_value);
                          }

                  }
                  else{
                       $("rect").attr("fill", new_color_array[0]);
                  }
            }
            var updateCircleElementColor = function(){
                  var slider_multi = $('#slider12a');
                  var slider_uni = $('#slider12b');
                  var new_value_multi = parseFloat(slider_multi.attr("value"));
                  var new_value_uni = parseFloat(slider_uni.attr("value"));      

                  if($('#checkbox-cor-slider').bootstrapSwitch('state')){                                            

                         $("circle").each(function(){
                             var c = $(this).attr("class");
                             var m_out = getMultivariateOutliernessByClass(c);
                             var u_out = getUnivariateOutliernessByClass(c);
                             
                             if(m_out!=="" && u_out!==""){
                                 var u_out_gap = (1-new_value_uni)/2;
                                 var new_u_out_topborder = 1-u_out_gap;
                                 var new_u_out_bottomborder = u_out_gap;  

                                 var color;

                                 var is_u_outlier = ((new_u_out_bottomborder > u_out) ||  (u_out > new_u_out_topborder));
                                 var is_m_outlier = (new_value_multi < m_out);

                                 if(is_u_outlier &&  is_m_outlier){ 
                                    color = new_color_array[3];
                                 }
                                 else if(is_u_outlier){ color = new_color_array[2];}
                                 else if(is_m_outlier){ color = new_color_array[1];}
                                 else { color = new_color_array[0];}                               
                            }
                            else{
                                 color = new_color_array[0];
                            }
                            $(this).attr("fill", color);
                            if(color !== new_color_array[0]){
                              $(this).attr("r",3.5);
                            }
                            else{
                              $(this).attr("r",2);
                            }
                          });          

                          if(linked_slider){
                             $('#slider12a').slider('setValue', new_value_uni);
                          }               
                   }
                   else{
                          $("circle").attr("fill",new_color_array[0]);
                   }
            }

            $('#slider12a').slider()
                     .on({
                      slide: function(ev){
                          updateRectElementColor();

                          var slider_multi = $('#slider12a');
                          var slider_uni = $('#slider12b');

                          var new_value_multi = parseFloat(slider_multi.attr("value"));
                          var new_value_uni = parseFloat(slider_uni.attr("value"));
                          
                          $("#out_mult").text(new_value_multi);
                          
                          slider_uni.trigger('slide');
                        }
                     });
            $('#slider12b').slider()
                     .on({
                      slide: function(ev){
                          updateCircleElementColor();

                          var slider_multi = $('#slider12a');
                          var slider_uni = $('#slider12b');

                          var new_value_multi = parseFloat(slider_multi.attr("value"));
                          var new_value_uni = parseFloat(slider_uni.attr("value"));

                          $("#out_uni").text(new_value_uni);
                          $("#out_mult").text(new_value_multi);

                        }
                     });

            //TODO
            var updateElementColorsSlider = function(){
                      updateRectElementColor();
                      updateCircleElementColor();
            }
            $('#checkbox-cor').on('switchChange.bootstrapSwitch', function (event, state) {
                              updateElementColors();
                              if(state){
                                  $("#border-panel").show();
                              }
                              else {
                                  $("#border-panel").hide();
                              }
            });
            $('#checkbox-cor').bootstrapSwitch('state',false);
            $('#checkbox-cor-slider').on('switchChange.bootstrapSwitch', function (event, state) {
                              linked_slider = true;
                              updateElementColorsSlider();
                              
                              if(state){
                                  $("#slider-panel").show();
                              }
                              else {
                                  $("#slider-panel").hide();
                                  $("circle",".detailed-plot").attr("r",2);
                                  $("circle",".sparkline-plot").attr("r",1);
                              }
            });

            $('#slider12a').trigger('slide');


            $('#checkbox-ms').on('switchChange.bootstrapSwitch', function (event, state) {
                      if(state){
                             $(".cycle-plot").show();
                      }
                      else{
                             $(".cycle-plot").hide();
                      }
                      //TODO
            });

            $('#bt-reset').click(function(){
                $(".elem-on").each(function(){
                      var is_element_input = $(this).is("circle"); //true or false
                      var previous_classes = $(this).attr("class");

                      if(is_element_input){
                          $(this).attr("fill",color_array[0]);
                          var r = $(this).attr("r");
                          $(this).attr("r",r/2);
                      }

                      var id = previous_classes.substring(8);
                      $(this).attr("class", "elem-off "+id);
                })
            })

            var updateBorderPanel = function(){
                  $("#b-low").css("background",color_array[1]);
                  $("#b-low").css("color","white");
                  $("#b-low").text(borders[0]+" < low < "+borders[1]);
                  $("#b-med").css("background",color_array[2]);
                  $("#b-med").css("color","white");
                  $("#b-med").text(borders[1]+" < med < "+borders[2]);
                  $("input#b-med").on('change', function(){
                          this.min = borders[0],
                          this.max = borders[2];
                  });
                  $("#b-high").css("background",color_array[3]);
                  $("#b-high").css("color","white");
                  $("#b-high").text(borders[2]+" < high");
                  $("input#b-high").on('change', function(){
                          this.min = borders[1];
                  });
            }

            $('#bt-apply-border').click(function(){
                  borders = [$("input#b-low").val(),$("input#b-med").val(),$("input#b-high").val()];
                  updateElementColors();
                  updateBorderPanel();
            })

            init();
        }, 100);

        setTimeout(function() {
           var setup = function(){
                 //EXTRA setup
                 $("rect").attr("fill",color_array[0]);
                 $(".panel-heading",".sparkline-plot").css("padding",8.7);

                 $("circle",".detailed-plot").attr("r",2);
                 $("circle",".detailed-plot").attr("fill",color_array[0]);
                 $("circle",".sparkline-plot").attr("r",1);
                 $("circle",".sparkline-plot").attr("fill",color_array[0]);

                 $(".detailed-plot").hide();
                 $(".sparkline-plot").show();
                 $(".outlier-detect-panel").hide();
                 
            }
            setup();
        }, 400);

        setTimeout(function() {
           var getMonthGroupsArrayPos = function(str){
                  var splited = str.split(" ");
                  var pos_list = [];

                  //STARTING IN 2 BECAUSE FIRST 2 CLASS ARE NOT RELATED TO MONTHS POS
                  for(var i=2; i<14; i++){
                       pos_list.push(splited[i]);
                  }

                  //console.log(pos_list)
                  return pos_list;
             }

           var monthElemBehavior = function(){
                $("#robustcp .month_axis text").each( function (){
                    $(this).click(function(){
                      var m_names = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
                                      "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec.",">CenterDist<"];
                      //console.log($(this).text());
                      var index = m_names.indexOf($(this).text());

                      //GET MONTH VALUES IN THE CLASS OF THE TARGET
                      var class_ = $("#robustcp g .month").eq(index).attr("class");
                      var pos_array = getMonthGroupsArrayPos(class_);

                      //CLEAR ALL AND HIGHLIGHT CLICKED MONTH
                      $("#robustcp .month_axis text").css("font-weight","Normal");
                      $("#robustcp .month_axis text").eq(index).css("font-weight","Bold");

                      //FOR EACH MONTH
                      for(var i=0; i<12; i++){
                          $("#robustcp g .month").eq(i)
                                                 .find("rect")
                                                 .each(function(){
                                                    var h = $(this).attr("height");
                                                    $(this).attr("y",pos_array[i]-h);
                                                  })
                          $("#robustcp g .month").eq(i)
                                                 .find("line")
                                                 .each(function(){
                                                    $(this).attr("y1",pos_array[i]);
                                                    $(this).attr("y2",pos_array[i]);
                                                  })
                      }//end for

                      console.log($(this).text()+" "+index);
                    });
                });


            }

            $("#robustcp line.mean").eq(12).hide();
            monthElemBehavior();
        }, 500);
    });

})

