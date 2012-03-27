var page = 1;
            
function getImages(dir) {
    page += dir == -1 ? (page == 1 ? 0 : dir) : (page == 3 ? 0 : dir);
    apf.console.info(page);
    flick_prev.setAttribute("disabled", page == 1 ? true : false);
    flick_next.setAttribute("disabled", page == 3 ? true : false);
    
    comm4.flickr({api_key : 'f9a9ff6ddca6805d45b01a3c186b2176', per_page : 9, page : page})
}

function loadPhotos(data, state, extra) {
    if (state == apf.SUCCESS) {
       list_flickr.getModel().load(data);
    }
    else {
        alert("Connection problems. Please try again");
    }
}

function getImageUrl(xmlNode){
    return 'http://farm' 
        + xmlNode.getAttribute("farm")
        + '.static.flickr.com/'
        + xmlNode.getAttribute("server") 
        + '/'
        + xmlNode.getAttribute("id")
        + '_'
        + xmlNode.getAttribute("secret")
        + '.jpg';
}

comm4.flickr({api_key : 'f9a9ff6ddca6805d45b01a3c186b2176', per_page : 9, page : 1})