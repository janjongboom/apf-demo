//Include Google analytics
var gaJsHost = (("https:" == document.location.protocol) 
    ? "https://ssl."
    : "http://www.");
apf.include(gaJsHost + "google-analytics.com/ga.js");

var googleTimer = setInterval(function(){
    if(!self._gat) return;

    clearTimeout(googleTimer);
    pageTracker = _gat._getTracker("UA-XXXXXXX-1");
    pageTracker._initData();
}, 100);

//Hash Change support
apf.onhashchange = function(e){
    if (!e.page) return;

    gotoPage(e.page);
}

function scrollToTop(onfinish){
    if (document.documentElement.scrollTop > 10){
        var lastScroll = document.documentElement.scrollTop;
        var control    = {stop: false};

    	apf.tween.single(document.documentElement, {
    	    type     : "scrollTop",
    	    from     : document.documentElement.scrollTop,
    	    to       : 0,
    	    steps    : 15,
    	    control  : control,
    	    anim     : apf.tween.EASEIN,
    	    onfinish : onfinish,
    	    onbeforeeach : function(){
    	        var curScroll = document.documentElement.scrollTop;
    	        if (curScroll != lastScroll) {
    	            control.stop = true;
    	            return false;
    	        }
    	    },
    	    oneach : function(){
    	        lastScroll = document.documentElement.scrollTop;
    	    }
    	});
    }
    else if (onfinish)
        onfinish();
}

function scrollDown(btn, type, x, y, width, height){
    var bar;
    if (last && last != btn) {
        //last.setValue(false);  //do we need this one?
        bar = self[last.bar];
        bar.hide();
    }
    last = btn;

    bar = self[btn.bar];
    if (x || y) {
        bar.oExt.style.position = "absolute";
        if (x) bar.oExt.style.left = x + "px";
        if (y) bar.oExt.style.top = y + "px";
    }
    if (width) bar.oExt.style.width = width + "px";
    if (height) bar.oExt.style.height = height + "px";
    bar.oExt.style.display = "block";
    bar.visible = true;

    /*if (jpf.control)
        jpf.control.stop = true;*/
    jpf.control = {};

    if (btn.value) {
        if (btn.bar == "barNews")
            mdlNews.reload();
        else if (btn.bar == "barWeb")
            mdlPages.reload();

        if (type == false)
            return bar.show();

        jpf.tween.single(bar, {
            type : type || 'scrollheight',
            from : 0,
            to : type == "fade" ? 1 : bar.height - 10,
            steps : 5,
            interval : 10,
            anim : jpf.tween.EASEIN,
            control : jpf.control
        });
    }
    else {
        //if (type == false)
            return bar.hide();

        jpf.tween.single(bar, {
            type : type || 'scrollheight',
            from : type == "fade" ? 1 : bar.height - 10,
            to : 0,
            steps : 5,
            interval : 10,
            control : jpf.control,
            onfinish:function(){
                bar.hide();
            }
        });

        last = null;
    }
}

function navigateTo(page){
    apf.history.setHash(page);
    gotoPage(page);
}

var pageHandlers = {}
function gotoPage(page){
    var temp  = page.trim().replace(/\.html$/, "").split("?"),
        parts = temp.shift().split(/[\/:]/),
        cgi   = temp.join("?"),
        main  = parts.shift();

    if (self.pageTracker)
        pageTracker._trackPageview(page);

    pgSite.set(page, function(){
        if (pageHandlers[page])
            pageHandlers[page](main, parts, crumbs);
        else
            scrollToTop();

    	apf.loadScreen.hide();
    });
}