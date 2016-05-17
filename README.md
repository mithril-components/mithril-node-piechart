mithril_node_piechart
=====================
A simple SVG pie chart component for Mithril JS and NodeJS.

Usage
=====

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

Options
=======

The controller takes a JSON containing data to create a pie chart.<br>
You should specify options like in usage example above.

* **parts**: JSON defining each parts of the pie chart.
    * **title**: Pie chart part title.
    * **value**: Pie chart part value.
    * **color**: Pie chart part color.
* edgeWidth: Pie chart edge width. (Default: `15`)
* delimiterColor: Pie chart parts delimiter color. (Default: `#fff`)
* delimiterOpacity: Pie chart parts delimiter opacity. (Default: `0.3`)
* delimiterWidth: Pie chart parts delimiter width. (Default: `1`)


Test
====
Setup [mithril-component-tools](https://github.com/mithril-components/mitthril-components-tools) first. Then:

    mct test piechart.js
