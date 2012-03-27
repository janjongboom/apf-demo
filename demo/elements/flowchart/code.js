function rotateElement(turn) {
    if (!wfExample.selected)
        return alert("Select some element");
    
    var sel = wfExample.selected;
    var rotation = parseInt(sel.getAttribute("rotation") || 0);
    
    rotation += turn == 1 ? 90 : -90;
    rotation = rotation > 270 ? 0 : (rotation < 0 ? 270 : rotation);
    
    wfExample.rotate(sel, rotation);
}

function flipv() {
    if (!wfExample.selected)
        return alert("Select some element");
    
    var sel = wfExample.selected;
    wfExample.flipVertical(sel, sel.getAttribute("flipv") == "true" ? false : true);
}

function fliph() {
    if (!wfExample.selected)
        return alert("Select some element");
    
    var sel = wfExample.selected;
    wfExample.flipHorizontal(sel, sel.getAttribute("fliph") == "true" ? false : true);
}

function lockToggleSelected(){
    if (!wfExample.selected)
        return alert("Select some element");
    var sel = wfExample.selected;
    var lock = sel.getAttribute("lock") == "true" ? false : true;
    wfExample.setLock(sel, lock);
}