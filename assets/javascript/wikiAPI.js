function fetchWiki() {
    const wikiURL = "https://www.mediawiki.org/w/api.php"
    const wikiParams = `?action=query`
    +`&prop=extracts`   //an 'extract' is the type of property being requested
    +`&exsentences=2`   //request the first 2 sentences from the wikipedia page
    +`&exlimit=1`   //..
    +`&titles=` + ``    //tells the link which specific wikipedia page to get an extract from(changes based on the 'ele' param)
    +`&explaintext=1`   //tells the API to provide the content in plain text(instead of html code or other formats that can't be read by text-to-speak)
    +`&format=json` //requests the data in JSON format
    +`&formatversion=2` //makes the JSOn properties easier to navigate using dot notation
    +`&origin=*`;   //omitting this param causes a CORS error

    const wikiLink = wikiURL + wikiParams;
    

    $.ajax({
        url: wikiLink,
        method: "GET"
    }).then(function(wikiResponse) {
        console.log("wiki response");
        console.log(wikiLink);
        console.log(wikiResponse);
    }) 
}

fetchWiki();