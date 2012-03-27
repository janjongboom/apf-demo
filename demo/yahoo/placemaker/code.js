var map2;
        
function google_maps_initialize2() {
    if (GBrowserIsCompatible()) {
        map2 = new GMap2(document.getElementById("map_canvas2"), { size: new GSize(400, 300) } );
        map2.setCenter(new GLatLng(52.425035,4.924622), 14);
        var customUI = map2.getDefaultUI();
        customUI.controls.scalecontrol = false;
        map2.setUI(customUI);
    }
}  

function google_maps_choose2() {
    if (map2 && map2.setCenter) {
        var selRow = dg_placemaker.selected;
        var la = apf.getXmlValue(selRow, "centroid/latitude/text()") || 0;
        var lo = apf.getXmlValue(selRow, "centroid/longitude/text()") || 0;
        map2.setCenter(new GLatLng(la, lo), 11);
    }
}
            
function afterPlacemaker(data, state, extra) {
    if (state == apf.SUCCESS) {
        var items = apf.getXml(data).getElementsByTagName("place");
        
        var strXml = ["<data>"],
            i      = 0,
            l      = items.length;
        for(; i < l; i++)
            strXml.push(items[i].xml.replace(/xmlns=["]http:\/\/wherein.yahooapis.com\/v1\/schema["]/g, ""));
        strXml.push('</data>');

        dg_placemaker.getModel().load(strXml.join(""));
    }
    else {
        alert("Connection problems. Please try again");
    }
}

var googleTimer4 = setInterval(function(){
    if (!self.GMap2) return;

    clearTimeout(googleTimer4);
    
    apf.placemaker.init(
        "O2NGxHbV34GJcwos_DRFt8wuS1yNgJq_YrubQ1lRZfhpzVFp4sNma.IltD85fg--",
        "Example: Hi I am Lucas, I live in Poland.",
        "en-uk"
    );
    
    comm7.placemaker();
}, 100);

if (!self.GMap2) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps?file=api&v=2.x&key=ABQIAAAAuvG0LHN7Q8s8C5HGKxmlbhTWIP0AdN_is5rS2v9BfJMtILoqURRzDtvTKeWAO68QibM4gtmiohUv-w&async=2&callback=google_maps_initialize2";
    document.body.appendChild(script);
}
