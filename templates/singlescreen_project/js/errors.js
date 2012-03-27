//Error handling for the production environment
if (location.protocol != "file:" && apf.host.indexOf("development") == -1
  && apf.host.indexOf("localhost") == -1) {
    apf.onerror = function(e){
        window.onerror(e.error.message, "", 0);
        return false;
    }

    window.onerror = function(message, file, line){
        //Handle the error in a proper way here

        return true;
    }
}