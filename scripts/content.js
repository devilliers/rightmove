const propertyLinks = document.getElementsByClassName("propertyCard-link property-card-updates");
const searchResultsList = document.getElementsByClassName("l-searchResults").item(0).childNodes.item(0);

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
					if (text == 'Leasehold' || text == 'Ask agent') {
						var nodeToRemove = searchResultsList.childNodes.item(index);
						console.log(nodeToRemove.textContent);
						nodeToRemove.parentNode.removeChild(nodeToRemove);
					}
				}

			})
			.catch(function(err) {
				console.log('Failed to fetch page: ', err);
			});
	}
}
