#!/usr/bin/env node
'use strict'

// Load required modules
const fs     	  = require('fs');
const render 	  = require('mithril-node-render')
const piechart    = require('./piechart');



// JSON containing data to create a basic SVG pie chart.
const data = {
    parts:
    [
        { title: "Part A",    value : 180,  color: "#02B3E7" },
        { title: "Part B",    value:  60,   color: "#CFD3D6" },
        { title: "Part C",    value : 50,   color: "#736D79" },
        { title: "Part D",    value:  30,   color: "#776068" },
        { title: "Part E",    value : 20,   color: "#EB0D42" },
        { title: "Part F",    value : 20,   color: "#FFEC62" },
        { title: "Part G",    value : 7,    color: "#04374E" }
    ]
};

const ctrl = piechart.controller(data);
const view = piechart.view(ctrl);

/* Generate the HTML */
const innerHtml = render(view);

console.log(innerHtml);
