apf.placemaker = {
    appID   : null,
    text    : null,
    locale  : null,
    url     : 'http://wherein.yahooapis.com/v1/document', //http://query.yahooapis.com/v1/public/yql
    format  : 'xml',
    env     : 'http://datatables.org/alltables.env',
    docType : 'text/plain',

    init  : function(appId, text, locale) {
        this.appId  = appId;
        this.text   = text;
        this.locale = locale;
    },

    getFullQuery: function() {
        var query = 'select * from geo.placemaker where documentContent="'
            + encodeURIComponent(this.text)
            + '" and documentType="' + this.docType + '"'
            + (this.locale !== '' ? ' and inputLanguage="' + this.locale + '"' : '')
            + ' and appid="' + this.appID + '"';

        return this.url+'?q='
            + encodeURIComponent(query)+'&#38;format=json'
            + '&#38;env=' + this.env;
    },

    getQuery: function() {
        return 'select * from geo.placemaker where documentContent="'
            + encodeURIComponent(this.text)
            + '" and documentType="' + this.docType + '"'
            + (this.locale !== '' ? ' and inputLanguage="' + this.locale + '"' : '')
            + ' and appid="' + this.appID + '"';
    },

    getFormat: function() {
        return this.format;
    },

    setFormat: function(format) {
        this.format = format;
    },

    getEnv: function() {
        return this.env;
    },

    getUrl: function() {
        return this.url;
    },

    setText: function(text) {
        this.text = text;
    },

    getText: function() {
        return this.text;
    },

    setLocale: function(locale) {
        this.locale = locale;
    }
};
