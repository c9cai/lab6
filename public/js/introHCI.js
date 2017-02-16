'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}



/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	e.preventDefault();
	var projectID = $(this).closest('.project').attr('id');
	var idNumber = projectID.substr('project'.length);
	console.log("User clicked on project " + idNumber);
	$.get("/project/" + idNumber, addProject);
	console.log("project/" + idNumber);
}

function addProject(result) {
	console.log (result);
	var projectHTML = '<a href="#" class="thumbnail">' +
	'<img src="' + result['image'] + '" class="detailsImage">' +
	'<p><small>' + result['title'] + '</small></p>' +
	'<p><small>' + result['date'] + '</small></p></a>';
    $('#project' + result['id'] + ' .details').html(projectHTML + result['summary']);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", changeColor);
}

function changeColor(result) {
	var colors = result['colors']['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}