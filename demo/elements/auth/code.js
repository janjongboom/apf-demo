apf.auth.onloginsuccess = function(data) {
    winAuthInfo.show();
    winAuthMain.hide();
}
apf.auth.onlogoutsuccess = function(data) {
    winAuthInfo.hide();
    winAuthMain.show();
}