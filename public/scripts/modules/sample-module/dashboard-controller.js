/*jshint -W117 */
/*jshint -W106 */
/*jshint -W116 */
/*jshint -W102 */
/*jshint -W015 */
/*jshint -W109 */
/*jshint -W098 */
define(['angular',
    './../../modules/sample-module/sample-module'
], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardCtrl', ['$scope', 'dataService', function($scope, dataService) {
        // PUBLIC METHODS AND VARS (in $scope)
        // ======================
        var combobox = document.querySelector('vaadin-combo-box');
        var section = document.getElementById('section');
        var card1 = $('.card_body');

        $scope.closeDiv = function() {
            card1.removeClass('active');
            svgTemplate.style.opacity = 1;
        };

        $scope.closeModal = function(){
            var cardBiz = $('#bizInfoCard');
            cardBiz.hide();
        };

        $scope.comboBoxItems = [
            {'name': 'OIL AND GAS - SUBSEA AND OFFSHORE EXTRACTION','label':'OIL AND GAS - SUBSEA AND OFFSHORE EXTRACTION'},
            {'name': 'OIL AND GAS - DRILLING','label':'OIL AND GAS - DRILLING'},
            {'name': 'OIL AND GAS - PRODUCTION','label':'OIL AND GAS - PRODUCTION'},
            {'name': 'OIL AND GAS - TRANSPORTATION AND STORAGE','label':'OIL AND GAS - TRANSPORTATION AND STORAGE'},
            {'name': 'OIL AND GAS - DISTRIBUTION','label':'OIL AND GAS - DISTRIBUTION'},
            {'name': 'MINING - EXPLORATION','label':'MINING - EXPLORATION'},
            {'name': 'MINING - DEVELOPMENT','label':'MINING - DEVELOPMENT'},
            {'name': 'MINING - EXTRACTION','label':'MINING - EXTRACTION'},
            {'name': 'MINING - MINERAL PROCESSING','label':'MINING - MINERAL PROCESSING'},
            {'name': 'MINING - SMELTING AND LEACHING','label':'MINING - SMELTING AND LEACHING'},
            {'name': 'MINING - REFINING','label':'MINING - REFINING'},
            {'name': 'RAIL - ABOVE RAIL','label':'RAIL - ABOVE RAIL'},
            {'name': 'RAIL - BELOW RAIL','label':'RAIL - BELOW RAIL'},
            {'name': 'RAIL - TERMINALS','label':'RAIL - TERMINALS'},
            {'name': 'RAIL - PORTS','label':'RAIL - PORTS'},
            {'name': 'MARINE - SHORE ENTERPRISES','label':'MARINE - SHORE ENTERPRISES'},
            {'name': 'MARINE - OFFSHORE OPERATIONS','label':'MARINE - OFFSHORE OPERATIONS'},
            {'name': 'MARINE - SHIP BUILDERS','label':'MARINE - SHIP BUILDERS'},
            {'name': 'POWER - FUEL SUPPLY','label':'POWER - FUEL SUPPLY'},
            {'name': 'POWER - GENERATION','label':'POWER - GENERATION'},
            {'name': 'POWER - TRANSMISSION','label':'POWER - TRANSMISSION'},
            {'name': 'POWER - DISTRIBUTION','label':'POWER - DISTRIBUTION'},
            {'name': 'POWER - DEMAND & USAGE','label':'POWER - DEMAND & USAGE'},
            {'name': 'WATER - PRODUCTION','label':'WATER - PRODUCTION'},
            {'name': 'WATER - COLLECTION AND STORAGE','label':'WATER - COLLECTION AND STORAGE'},
            {'name': 'WATER - PROCESS AND MANUFACTURING','label':'WATER - PROCESS AND MANUFACTURING'},
            {'name': 'WATER - DISTRIBUTION','label':'WATER - DISTRIBUTION'},
            {'name': 'WATER - RETAIL','label':'WATER - RETAIL'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - CITIES - PLANNING','label':'COMMERCIAL AND INDUSTRIAL - CITIES - PLANNING'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - CITIES - MANAGEMENT','label':'COMMERCIAL AND INDUSTRIAL - CITIES - MANAGEMENT'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - CITIES - INFRASTRUCTURE','label':'COMMERCIAL AND INDUSTRIAL - CITIES - INFRASTRUCTURE'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - CITIES - CONSTRUCTION','label':'COMMERCIAL AND INDUSTRIAL - CITIES - CONSTRUCTION'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - PRODUCTION','label':'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - PRODUCTION'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - PROCESSING','label':'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - PROCESSING'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - DISTRIBUTION','label':'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - DISTRIBUTION'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - CONSUMPTION','label':'COMMERCIAL AND INDUSTRIAL - COMMERCIAL INDUSTRIALS - CONSUMPTION'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - RETAIL - PRODUCTION','label':'COMMERCIAL AND INDUSTRIAL - RETAIL - PRODUCTION'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - RETAIL - PROCESSING','label':'COMMERCIAL AND INDUSTRIAL - RETAIL - PROCESSING'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - RETAIL - DISTRIBUTION','label':'COMMERCIAL AND INDUSTRIAL - RETAIL - DISTRIBUTION'},
            {'name': 'COMMERCIAL AND INDUSTRIAL - RETAIL - CONSUMPTION','label':'COMMERCIAL AND INDUSTRIAL - RETAIL - CONSUMPTION'},
            {'name': 'HEALTHCARE - MONITORING AND PREVENTION','label':'HEALTHCARE - MONITORING AND PREVENTION'},
            {'name': 'HEALTHCARE - DIAGNOSING','label':'HEALTHCARE - DIAGNOSING'},
            {'name': 'HEALTHCARE - TREATMENT','label':'HEALTHCARE - TREATMENT'},
            {'name': 'HEALTHCARE - RECOVERY AND REHABILITATION','label':'HEALTHCARE - RECOVERY AND REHABILITATION'},
            {'name': 'HEALTHCARE - MONITORING AND MANAGING','label':'HEALTHCARE - MONITORING AND MANAGING'},
            {'name': 'HEALTHCARE - RESEARCH','label':'HEALTHCARE - RESEARCH'},
            {'name': 'ROAD - MOBILE PLANT','label':'ROAD - MOBILE PLANT'},
            {'name': 'ROAD - FIXED PLANT','label':'ROAD - FIXED PLANT'},
            {'name': 'INFORMATION TECHNOLOGY - RESEARCH','label':'INFORMATION TECHNOLOGY - RESEARCH'}
        ];
        /*
         *  ORIGINAL
         */
        var m = [20, 120, 20, 120],
            w = 700 - m[1] - m[3],
            h = 800 - m[0] - m[2],
            i = 0,
            root,
            nodes;

        var tree = d3.layout.cluster().size([800, 600]).separation(function(a, b) {
            return ((a.parent == root) && (b.parent == root)) ? 3 : 1;
            // return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

        var diagonal = d3.svg.diagonal().projection(function(d) {
            return [d.y, d.x];
        });
        // var radialDiagonal = d3.svg.diagonal.radial()
        //     .projection(function(d) {
        //         return [d.y, d.x / 360 * Math.PI];
        //     });

        // target our SVG element
        var svgTemplate = document.getElementById('svgTemplate');
        //  keeping it simple here with only a transform translate, which simply pushes the whole g group over and down by x (0) y (45) amount.
        var vis = d3.select(svgTemplate).append('svg:g')
                    .attr('id', 'startNode');

        TweenMax.to('#startNode', 1, {
            attr: {
                'transform': 'translate(' + -100 + ',' + 20 + ')'
            },
            repeat: 0,
            delay: 0,
            ease: Power3.easeNone
        });
        // Define 'div' for tooltips
        var div = d3.select("#bizInfoCard").style("display", 'none');// set the opacity to nil
        //fetch data and initiate toggle/update

        function styleFirstNode(){
            // make some adjustments to our starting node.
            d3.select('#GEStore-g').append('svg')
                .attr('id', 'building')
                .attr('height', 0)
                .attr('width', 0)
                .attr('viewBox', '0 0 24 24')
                .attr('fill', '#fff')
                .attr('x', -20)
                .attr('y', -30)
                .on("click", toggle);

            d3.select('#building').append('path').attr('d', 'M0 0h24v24H0z').attr('fill', 'none');
            d3.select('#building').append('path').attr('d', 'M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z');
            d3.select('#GEStore-text').style('opacity', 0).attr('x', 0).attr('y', 15);
            d3.select('#GEStore-g circle:nth-child(1)').style('opacity', 0);
            d3.select('#GEStore-g').append('circle').attr('class', 'startNode2').attr('r', 20).style('stroke-opacity', 1).attr('fill', 'none');
            d3.select('#GEStore-g').append('circle').attr('class', 'startNode2').attr('r', 20).style('stroke-opacity', 1).attr('fill', 'none');
            d3.select('#GEStore-g').append('text').attr('id', 'click-here').attr('class', 'click-here').text('start your journey here.').attr('x', 0).attr('y', 0).style('opacity', 0).on("click", toggle);
        }

        dataService.read(function(data){

            root = data;
            root.x0 = h / 2;
            root.y0 = 0;

            function toggleAll(d) {
                if (d.children) {
                    d.children.forEach(toggleAll);
                    toggle(d);
                }
            }

            // Initialize the display to show a second tier nodes.
            root.children.forEach(toggleAll);

            var byIndustry = root.children[0];

            combobox.addEventListener('selected-item-changed', function(event) {
                var label = event.detail.value.name;
            });
            //init our tree
            toggle(root);
            update(root);
            //function when first node clicked
            $scope.startNodeClicked = false;

            styleFirstNode();
            // Tween starting node
            TweenMax.to('#startNode', 2.5, {
                attr: {
                    'transform': 'translate(' + 250 + ',' + 45 + ')'
                },
                repeat: 0,
                delay: 1,
                ease: Elastic.easeOut.config(1.5, 0.9), y: 0
            });
            TweenMax.to('#building', 1, {
                attr: {
                    'height': 48,
                    'width': 48
                },
                repeat: 0,
                delay: 1,
                ease: Linear.easeNone
            });
            // Tween text for starting node
            TweenMax.to('#click-here', 1, {
                attr: {
                    'opacity': 1,
                    'x': 33,
                    'y': 10
                },
                delay: 1,
                opacity: 1,
                repeat: 0,
                ease: Power1.easeInOut
            });
            TweenMax.to('#GEStore-text', 1, {
                attr: {
                    'x': 35,
                    'y': -20
                },
                delay: 1,
                opacity: 1,
                repeat: 0,
                yoyo: true,
                ease: Power1.easeInOut
            });
            // Tween starting node circles
            TweenMax.to('#GEStore-g circle:nth-child(1)', 2, {
                attr: {
                    r: 95,
                    'stroke-width': 1.4,
                    'stroke-opacity': 1
                },
                opacity: 1,
                repeat: -1,
                delay: 1,
                ease: Power1.easeInOut
            });
            TweenMax.to('#GEStore-g circle.startNode2', 2, {
                attr: {
                    r: 85,
                    'stroke-width': 1.4,
                    'stroke-opacity': 1,
                    'stroke': "#fff"
                },
                opacity: 0,
                repeat: -1,
                ease: Circ.easeOut
            });
        });
        // update function
        function update(source) {

            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            nodes = tree.nodes(root).reverse();

            function getDepth(d) {
                var depth;
                if (!d.children) {
                    d.y = d.depth * 240;
                    depth = d.y;
                } else {
                    d.y = d.depth * 200;
                    depth = d.y;
                }
                return depth;
            }
            // distance between the nodes
            nodes.forEach(function(d) {
                getDepth(d);
                d.selected = false;
            });
            // Update the nodes…
            var i = 0;
            var node = vis.selectAll('g.node').data(nodes, function(d) {
                return d.id || (d.id = ++i);
            });
            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append('svg:g')
                .attr('class', 'node text--center')
                .attr('id', function(e){
                    var str = e.name.toString().replace(/\s+/g, ''); 
                    return str + '-g';
                })
                .attr('transform', function() {
                    return 'translate(' + source.y0 + ',' + source.x0 + ')';
                });
            //append circle
            nodeEnter.append('svg:circle')
                .attr('id', function(e) {
                    return e.name;
                })
                .attr('class', function (e){
                    if (!e.name.includes('Store')){
                        return 'ghostCircle';
                    } else {
                        return 'startNode';
                    }
                })
                .on("click", toggle);
            // append smaller circle
            nodeEnter.append('svg:circle')
                .attr('class',function(d){
                    return d._children ? 'nodeCircle' : 'nodeCircle-last';
                })
                .attr("r", 8)
                .on('click', displayCard);
            //append text
            nodeEnter.append('svg:text')
                .attr('id', function(e){
                    var str = e.name.toString().replace(/\s+/g, ''); 
                    return str + '-text';
                })
                .attr('class', 'node--text caps')
                .attr('x', function(d) {
                    if (d.name.includes('GE Store')){
                        return 15;
                    } else {
                        return 18;
                    }
                    // return d.children || d._children ? 18 : 18;
                })
                .attr('dy', '.35em')
                .attr('text-anchor', function(d) {
                    // if (d.name.includes('GE Store')){
                    //     return 'end';
                    // } else {
                    //     return 'start';
                    // }
                    return 'start';
                    // return d.children || d._children ? 'start' : 'start';
                })
                .style('fill', function(e){
                    return e.children || e._children ? '#fff' : 'rgb(255,249,141)';
                })
                .attr('font-family', 'FontAwesome')
                .attr('font-size', function(d) {
                    return d.size + 'em';
                })
                .style('fill-opacity', 1e-6)
                .on('click', displayCard);
            
            //set icon + name on text
            node.select('text')
                .style('font-family', 'GE Inspira ' + '!important')
                .text(function(d) {
                    if (d.name.includes('Industry')) {
                        return '\uf275 ' + d.name;
                    } else if (d.name.includes('Business')) {
                        return '\uf0f2 ' + d.name;
                    } else if (d.name.includes('Manager')) {
                        return '\uf084 ' + d.name;
                    } else if (d.name.includes('Store')) {
                        return 'the GE Store';
                    } else if (d.children) {
                        return d.name + ' \uf056';
                    } else if (d._children) {
                        return d.name + ' \uf0a9';
                    } else {
                        return d.name + ' \uf14c';
                    }
                }).on('mouseover', function(e) {
                    d3.select(this).style('fill', 'rgb(9,134,164)');
                    if (e.type && !$scope.cardDisplayed && !e.name.includes('GE')){
                        if (!e.name.includes('Business')){
                            div.transition()
                            .duration(200)
                            .style('opacity', 0.9)
                            .style('display', 'block');
                            $scope.parentDetails = {
                                parentName: e.name,
                                context: e.name,
                                statement: e.statement,
                                contacts: e.contacts
                            };
                        }
                    } else {
                        return;
                    }
                    $scope.$apply();
                }).on('mouseout', function(e) {
                    div.transition().duration(1500).style('opacity', 0);
                    div.transition().delay(2250).style('display', 'none');
                    d3.select(this).style('fill', function(e){
                        return e.children || e._children ? '#fff' : 'rgb(255,249,141)';
                    });
                });
            
            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + d.y + ',' + d.x + ')';
                });
            nodeUpdate.select('circle')
                .attr('r', function (d){
                    return 20;
                });
            nodeUpdate.select('text')
                .style('fill-opacity', 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr('transform', function() {
                    return 'translate(' + source.y + ',' + source.x + ')';
                })
                .remove();

            nodeExit.select('circle')
                .attr('r', 1e-6);

            nodeExit.select('text')
                .style('fill-opacity', 1e-6);

            // Update the links…
            var link = vis.selectAll('path.link')
                .data(tree.links(nodes), function(d) {
                    return d.target.id;
                });

            // Enter any new links at the parent's previous position.
            link.enter().insert('svg:path', 'g')
                .attr('class', 'link')
                .attr('d', function() {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });



            // Transition links to their new position.
            link.transition().duration(duration).attr('d', diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit()
                .transition()
                .duration(duration)
                .attr('d', function() {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
        // collapse function
        function collapse(d) {
          if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
          }
        }
        // toggle children function
        function toggle(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          // If the node has a parent, then collapse its child nodes
          // except for this clicked node.
          if (d.parent) {
            d.parent.children.forEach(function(element) {
              if (d !== element) {
                collapse(element);
              }
            });
          }
          update(d);
        }
        // Display Card function
        function displayCard(e) {
            $scope.infoDetails = null;
            $scope.itemContact = null;
            
            toggle(e);
            update(e);

            if (!e.type) {
                div.transition().duration(0).style('display', 'none');
                $scope.cardDisplayed = true;
                card1.addClass('active');


                // e.statement = e.statement.toString().replace(/\./g, '\n');

                $scope.cardDetails = {
                    parentName: e.parent.name,
                    context: e.name,
                    statement: e.statement,
                    offerings: e.offerings,
                    contacts: e.contacts,
                    videoUrl: e.videoUrl,
                    ppUrl: e.ppUrl,
                    ooUlr: e.ooUlr
                };
                // cardImage.src = e.image ? e.parent.image : 'images/geog_people.jpg';
                if (e.image) {
                    $scope.crdImage = e.image;
                } else {
                    $scope.crdImage = e.parent.image ? e.parent.image : 'images/getty_684078540713046502.jpg';
                }
                // $scope.crdImage = e.image || e.parent.image ? e.parent.image : 'images/geog_people.jpg';
                svgTemplate.style.opacity = 0.2;
                $('.card_body.active .card-layout').scrollTop( 0 );
                // var thiscardHeight = $('.card_body.active .card-layout').height();
                $('.scroller').hover(function (e){
                    $('.card_body.active .card-layout').scrollTop( 800 );
                });
                $scope.$apply();
            } else if (e.type) {
                $scope.cardDisplayed = false;
                card1.removeClass('active');
                svgTemplate.style.opacity = 1;
                // card.style.display = 'none';
            }
        }
        // Get Items function
        $scope.getItems = function(item) {
            $scope.infoDetails = item.items;
            $scope.itemContact = item.contact;
        };
    }]);
});