function removeNode(node) {
	node.parentNode.removeChild(node);
}

function removeNodeByDataTestAttr(index) {
	var node = document.querySelector(`[data-test="propertyCard-${index}"]`);
	removeNode(node);
}

function colourNodeByDataTestAttr(index, tenure) {
	var node = document.querySelector(`[data-test="propertyCard-${index}"]`);
	node.style['color'] = '#ff0000';
	node.querySelector('[data-test="property-description"]').childNodes.item(0).textContent = tenure;
}

function removeLeaseholdProperties() {
	const propertyLinks = document.getElementsByClassName("propertyCard-link property-card-updates");

	var badNodeIndices = [];

	if (propertyLinks) {
		for (let index = 0; index < propertyLinks.length; index++) {
			var content = propertyLinks.item(index);
			var link = "https://www.rightmove.co.uk" + content.getAttribute("href");

			fetch(link)
				.then(function(response) {
					return response.text()
				})
				.then(function(html) {
					var parser = new DOMParser();
					var doc = parser.parseFromString(html, "text/html");

					var dd = doc.getElementsByClassName('_1hV1kqpVceE9m-QrX_hWDN _2SpNNVW0fTYoFvPDmhKSt8 ')
					for (let i = 0; i < dd.length; i++) {
						var text = dd.item(i).textContent;
						if (text == 'Leasehold') {
							if (!badNodeIndices.includes(index)) {
								badNodeIndices.push(index);
								colourNodeByDataTestAttr(index, "LEASEHOLD");
							}
						} else if (text == "Ask agent") {
							if (!badNodeIndices.includes(index)) {
								badNodeIndices.push(index);
								colourNodeByDataTestAttr(index, "ASK AGENT");
							}
						}
					}
					var button = doc.querySelector('[aria-label="tenure LEASEHOLD, this link scrolls down to leasehold information section"]');
					if (button) {
						if (!badNodeIndices.includes(index)) {
							badNodeIndices.push(index);
							colourNodeByDataTestAttr(index);
						}
					}
				})
				.catch(function(err) {
					console.log('Failed to fetch page: ', err);
				});
		}
		console.log(badNodeIndices);
		badNodeIndices.forEach((i) => {
			console.log(i);
			removeNodeByDataTestAttr(i);
		})
	}
}

removeLeaseholdProperties();
