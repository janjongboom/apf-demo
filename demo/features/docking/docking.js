function switchLayout(){
	if(!lstLayouts.selected || apf.layout.isLoadedXml(lstLayouts.selected)) 
	    return;

	apf.layout.saveXml();
	apf.layout.loadXml(lstLayouts.selected);
}

function copyLayout(){
	if(!lstLayouts.selected) return;
	
	var newLayout = apf.layout.getXml(winMain.$int);
	newLayout.setAttribute("name", "New");
	apf.xmldb.appendChild(lstLayouts.selected.parentNode, newLayout);
	lstLayouts.select(newLayout, null, null, null, null, true);
	apf.layout.loadXml(newLayout);
	lstLayouts.startRename();
}

function showWindowChoice(){
	var xmlNode = apf.layout.getXml(winMain.$int);
	lstWindows.load(xmlNode);
	editWindows.show();
}

function addWindow(){
	var list = lstWindows.getSelection();
	if(!list.length) return alert("You did not select a window to add");

	for(var i=0;i<list.length;i++){
		self[list[i].getAttribute("name")].show();
	}
	
	return true;
}

if (lstLayouts.selected)
    switchLayout();
