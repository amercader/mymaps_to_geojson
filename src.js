// _pageData is where all the magic happens. It is of course undocumented
// and bound to change or disappear at any time
_layers = JSON.parse(_pageData)[1][6];
_features = [];

_layers.forEach(l => (

    _features.push(...l[12][0][13][0].map(x => {

        f = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [x[1][0][0][1], x[1][0][0][0]]
            },
            "properties": {}
        };
        // Label
        f["properties"][x[5][0][0]] = x[5][0][1][0];

        // If more than one layer, store it as a property
        if (_layers.length > 1 && l[2]) {
            f["properties"]["layer"] = l[2];
        };

        // Rest of properties
        x[5][3].forEach(p => {
            f["properties"][p[0]] = p[1][0];
        });
        return f;
    }))
));

out = {
    "type": "FeatureCollection",
    "features": _features
};

outText = JSON.stringify(out);

window.prompt(
    "GeoJSON file created (" + _features.length + " features)\n\n" +
    "Copy to clipboard with Ctrl+C / Cmd+C\n\n",
    outText
);