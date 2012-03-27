var map;
        
function google_maps_initialize() {
    if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById("map_canvas"), { size: new GSize(400, 300) } );
        map.setCenter(new GLatLng(52.425035,4.924622), 14);
        var customUI = map.getDefaultUI();
        customUI.controls.scalecontrol = false;
        map.setUI(customUI);
        
        GEvent.addListener(map, "click", function(overlay, latlng) {
            if (latlng) {
                map_marker_lat.setValue(latlng.lat());
                map_marker_lng.setValue(latlng.lng());
            }
        });
        
        GEvent.addListener(map,"mousemove", function(latlng) {
            if (latlng) {
                map_position.setValue('(' + latlng.lat() + ' '+ latlng.lng() +')');
            }
        });
    }
}  

function google_maps_choose() {
    var value = map_dd1.getValue();
    var location = value.split("|");
    map.setCenter(new GLatLng(location[0], location[1]), 11);
}

function google_maps_add() {
    var point = new GLatLng(map_marker_lat.getValue(), map_marker_lng.getValue());
    map.addOverlay(new GMarker(point));
    map.openInfoWindow(point, document.createTextNode(map_cloud_caption.getValue() || 'Location'));
}

/*var googleTimer3 = setInterval(function(){
    if(!self.GMap2) return;

    clearTimeout(googleTimer3);
    google_maps_initialize();
}, 100);*/

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://maps.google.com/maps?file=api&v=2.x&key=ABQIAAAAuvG0LHN7Q8s8C5HGKxmlbhTWIP0AdN_is5rS2v9BfJMtILoqURRzDtvTKeWAO68QibM4gtmiohUv-w&async=2&callback=google_maps_initialize";
document.body.appendChild(script);