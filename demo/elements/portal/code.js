function translate() {
    if (!self.google) return;

    var text = txtFromText.getValue();

    google.language.detect(text, function(result) {
    if (!result.error && result.language) {
        google.language.translate(text, result.language, ddLang.getValue(), function(result) {
            if (result.translation) {
              txtToText.setValue(result.translation);
            }
        });
    }
  });
}
 
document.write = function(str){
    str = str.replace(/<scr.pt.*?src="(.*?)".*?>.*?<\/scr.pt>/g, function(m, src){
        apf.include(src, null, "banner");
        return "";
    });
}
 
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://www.google.com/jsapi?key=ABQIAAAAuvG0LHN7Q8s8C5HGKxmlbhT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQXy5tpLE2vU6SI5O348wkQ6Py4cw";
document.body.appendChild(script);
 
var googleTranslateTimer = setInterval(function(){
    if(!self.google) return;
 
    clearTimeout(googleTranslateTimer);
    google.load("language", "1");
}, 100);


