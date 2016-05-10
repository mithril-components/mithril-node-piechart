#!/usr/bin/env node
'use strict'

// Load required modules
const m = require('mithril');


// Return a JSON containing all data to build the pie chart.
const controller = (data) => {
    let totalParts = 0;
    // Compute the sum of every parts of the pie.
    for (let i = 0, len = data.parts.length; i < len; ++i)
        totalParts += data.parts[i].value;

    return ({
        width:            100,
        height:           100,
        edgeWidth:        data.edgeWidth ? data.edgeWidth : 15,
        delimiterColor:   data.delimiterColor ? data.delimiterColor : '#fff',
        delimiterOpacity: data.delimiterOpacity ? data.delimiterOpacity : '0.3',
        delimiterWidth:   data.delimiterWidth ? data.delimiterWidth : 1,
        parts:            data.parts,
        totalParts:       totalParts
    });
}

// Return a pie chart.
const view = (ctrl) => {
    let startRadius = -Math.PI / 2;
    const centerX =   ctrl.width / 2;
    const centerY =   ctrl.width / 2;
    const pieRadius = Math.min.apply(null, [centerX, centerY]) - ctrl.edgeWidth;

    return m('div.piechart', [
        m('svg.col-xs-6', {
            viewBox:       '0 0 ' + ctrl.width + ' ' + ctrl.height,
            xmlns:         'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        }, [
            m('g', { opacity: 0.9 }, [
                // Compute paths to draw the pie chart part and its edge.
                ctrl.parts.map((part, index) => {

                    // Manage a full circle (SVG path can't draw a full circle...)
                    if (part.value <= 0) {
                        return;
                    }
                    else if (part.value / ctrl.totalParts === 1) {
                        return m('circle', {
                            cx:       centerX,
                            cy:       centerY,
                            r:        centerX,
                            fill:     part.color
                        });
                    }

                    const segmentAngle = (part.value / ctrl.totalParts) * (Math.PI * 2);
                    const endRadius = startRadius + segmentAngle;
                    const largeArc = ((endRadius - startRadius) % (Math.PI * 2)) > Math.PI ? 1 : 0;
                    const startX = centerX + Math.cos(startRadius) * pieRadius;
                    const startY = centerY + Math.sin(startRadius) * pieRadius;
                    const endX = centerX + Math.cos(endRadius) * pieRadius;
                    const endY = centerY + Math.sin(endRadius) * pieRadius;

                    const cmd = [
                        'M', startX, startY,
                        'A', pieRadius, pieRadius, 0, largeArc, 1, endX, endY,
                        'L', centerX, centerY,
                        'Z'
                    ];

                    const startX2 = centerX + Math.cos(startRadius) * (pieRadius + ctrl.edgeWidth);
                    const startY2 = centerY + Math.sin(startRadius) * (pieRadius + ctrl.edgeWidth);
                    const endX2 = centerX + Math.cos(endRadius) * (pieRadius + ctrl.edgeWidth);
                    const endY2 = centerY + Math.sin(endRadius) * (pieRadius + ctrl.edgeWidth);
                    
                    const cmd2 = [
                        'M', startX2, startY2,
                        'A', pieRadius + ctrl.edgeWidth, pieRadius + ctrl.edgeWidth, 0, largeArc, 1, endX2, endY2,
                        'L', centerX, centerY,
                        'Z'
                    ];

                    startRadius += segmentAngle;

                    return m('g', { 'data-order': index }, [
                        // Path to draw the pie chart part.
                        m('path', {
                            d: cmd.join(' '),
                            'stroke-width': ctrl.delimiterWidth,
                            stroke: ctrl.delimiterColor,
                            'stroke-miterlimit': 2,
                            fill: part.color
                        }),
                        // Path to draw the pie chart part edge.
                        m('path', {
                            d: cmd2.join(' '),
                            'stroke-width': ctrl.delimiterWidth,
                            stroke: ctrl.delimiterColor,
                            'stroke-miterlimit': 2,
                            fill: part.color,
                            opacity: ctrl.delimiterOpacity    
                        })
                    ]);
                })
            ])
        ]),
        // Display pie chart legends in another html tag.
        m('ul.col-xs-6.piechart-legend', [
            ctrl.parts.map((part, index) => {
                return m('li.list-unstyled', [
                    m('span', { style: 'background-color:' + part.color }),
                    part.title
                ])
            })
        ])
    ]);
}

// Export all previous functions.
module.exports = {
    controller,
    view
}