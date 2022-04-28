import React from 'react';
import * as d3 from "https://cdn.skypack.dev/d3@7";

export class GaugeChart extends React.Component {
    constructor(props) {
        super(props);

        this.myReference = React.createRef();
    }

    componentDidMount() {
        this.update();
    }

    update() {

        var el = d3.select(this.myReference.current);

        
        var value = this.props.value;
        var cfg = this.props.cfg;

        // data which need to be fetched
        var name = cfg.label;
        var gaugeMaxValue = cfg.gaugeMaxValue;
        var units = cfg.units;
        // donn?es ? calculer
        var percentValue = value / gaugeMaxValue;
        ////////////////////////
        var barWidth, chart, chartInset, degToRad, repaintGauge,
            height, margin, padRad, percToDeg, percToRad,
            percent, radius, svg, totalPercent, width;
        
        percent = percentValue;
        padRad = 0.025;
        chartInset = 10;
        // Orientation of gauge:
        totalPercent = .75;
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20
        };
       
        width = 360;
        height = width;
        radius = Math.min(width, height) / 2;
        barWidth = 40 * width / 300;
        //Utility methods
        percToDeg = function(perc) {
            return perc * 360;
        };
        percToRad = function(perc) {
            return degToRad(percToDeg(perc));
        };
        degToRad = function(deg) {
            return deg * Math.PI / 180;
        };
        // Create SVG element
        svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
        // Add layer for the panel
        chart = svg.append('g').attr('transform', "translate(" + (width + margin.left) / 2 + ", " + (height + margin.top) / 2 + ")");
        chart.append('path').attr('class', "arc chart-first");
        chart.append('path').attr('class', "arc chart-second");
        chart.append('path').attr('class', "arc chart-third");
        const arc3 = d3.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
        const arc2 = d3.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
        const arc1 = d3.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
        repaintGauge = function() {
            let perc = 0.5;
            var next_start = totalPercent;
            let arcStartRad = percToRad(next_start);
            let arcEndRad = arcStartRad + percToRad(perc / 3);
            next_start += perc / 3;
            arc1.startAngle(arcStartRad).endAngle(arcEndRad);
            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 3);
            next_start += perc / 3;
            arc2.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
            arcStartRad = percToRad(next_start);
            arcEndRad = arcStartRad + percToRad(perc / 3);
            arc3.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
            chart.select(".chart-first").attr('d', arc1);
            chart.select(".chart-second").attr('d', arc2);
            chart.select(".chart-third").attr('d', arc3);
        };
        /////////
        var dataset = [{
            metric: name,
            value: value
        }];
        var texts = svg.selectAll("text").data(dataset).enter();
        texts.append("text").text(function() {
            return dataset[0].metric;
        }).attr('id', "Name").attr('transform', "translate(" + (width + margin.left) / 6 + ", " + (height + margin.top) / 1.5 + ")").attr("font-size", 25).style("fill", "#000000");
        var trX = 170 - 210 * Math.cos(percToRad(percent / 2));
        var trY = 220 - 210 * Math.sin(percToRad(percent / 2));
        // (180, 195) are the coordinates of the center of the gauge.
        var displayValue = function() {
            texts.append("text").text(function() {
                return dataset[0].value + units;
            }).attr('id', "Value").attr('transform', "translate(" + trX + ", " + trY + ")").attr("font-size", 12).style("fill", '#000000');
        };
        texts.append("text").text(function() {
            return 0;
        }).attr('id', 'scale0').attr('transform', "translate(" + (width + margin.left) / 100 + ", " + (height + margin.top) / 2 + ")").attr("font-size", 12).style("fill", "#000000");
        texts.append("text").text(function() {
            return gaugeMaxValue / 2 + units;
        }).attr('id', 'scale10').attr('transform', "translate(" + (width + margin.left) / 2.15 + ", " + (height + margin.top) / 30 + ")").attr("font-size", 12).style("fill", "#000000");
        texts.append("text").text(function() {
            return gaugeMaxValue + units;
        }).attr('id', 'scale20').attr('transform', "translate(" + (width + margin.left) / 1.03 + ", " + (height + margin.top) / 2 + ")").attr("font-size", 12).style("fill", "#000000");
        var Needle = function() {
            //Helper function that returns the `d` value for moving the needle
            var recalcPointerPos = function(perc) {
                var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
                thetaRad = percToRad(perc / 2);
                centerX = 0;
                centerY = 0;
                topX = centerX - this.len * Math.cos(thetaRad);
                topY = centerY - this.len * Math.sin(thetaRad);
                leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
                leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
                rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
                rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
                return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
            };

            function Needle(el) {
                this.el = el;
                this.len = width / 2.5;
                this.radius = this.len / 8;
            }
            Needle.prototype.render = function() {
                this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
                return this.el.append('path').attr('class', 'needle').attr('id', 'client-needle').attr('d', recalcPointerPos.call(this, 0));
            };
            Needle.prototype.moveTo = function(perc) {
                var self,
                    oldValue = this.perc || 0;
                this.perc = perc;
                self = this;
                // Reset pointer position
                d3.select('.needle').transition().duration(100).tween('reset-progress', function() {
                    return function(percentOfPercent) {
                        var progress = (1 - percentOfPercent) * oldValue;
                        repaintGauge(progress);
                        return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
                    };
                });
                d3.select('.needle').transition().delay(300).duration(1500).tween('progress', function() {
                    return function(percentOfPercent) {
                        var progress = percentOfPercent * perc;
                        repaintGauge(progress);
                        return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
                    };
                });
            };
            return Needle;
        }();
        var needle = new Needle(chart);
        needle.render();
        needle.moveTo(percent);
        setTimeout(displayValue, 1350);

    }

    render() {
        return ( <div ref = {this.myReference}></div> );
    }
}