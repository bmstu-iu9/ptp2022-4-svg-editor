'use strict';

workspace.onmousedown = function(event) {
	if (!handButton.checked) {
		return;
	}

	let workspaceLocation = workspace.getBoundingClientRect();
	let offsetX = event.clientX - workspaceLocation.left;
	let offsetY = event.clientY - workspaceLocation.top;

	workspace.style.cursor = 'pointer';
	workspace.style.position = "fixed";
	workspace.style.left = event.clientX - offsetX + 'px';
	workspace.style.top = event.clientY - offsetY + 'px';

	document.onmousemove = function(event) {
		workspace.style.left = event.clientX - offsetX + 'px';
		workspace.style.top = event.clientY - offsetY + 'px';
	}

	workspace.onmouseup = function(event) {
		document.onmousemove = null;
		workspace.onmouseup = null;
		workspace.style.cursor = 'default';
	}
}