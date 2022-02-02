let buttonEl = document.querySelector("#search");
let inputEl = document.querySelector("#input");

async function searchUp(textblock) {
    let ids = "";
    let links = [];
    let results = [];
    const value = textblock;
    // const value = await generateSearchTerm(textblock);
    console.log("value: "+value);


    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${value}`)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            results = result.query.search;
            for (let i = 0; i < results.length; i++) {
                if (results[i + 1] != null) {
                    ids += results[i].pageid + "|";
                } else {
                    ids += results[i].pageid;
                }
            }
        }).then(function (a) {
            fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids=${ids}`)
                .then(function (idresult) {
                    return idresult.json();
                }).then(function (idresult) {
                    for (i in idresult.query.pages) {
                        links.push(idresult.query.pages[i].fullurl)
                    }
                }).then(function (g) {
                    document.getElementById("output").innerHTML = "";
                    for (let i = 0; i < results.length; i++) {
                        document.getElementById("output").innerHTML +=
                        `<a href=${links[i]} target='_blank'>` + results[i].title + "</a><br>" + results[i].snippet+ "<br>";
                    } 
                    $(".modal").attr("aria-hidden","true");
                    $('.modal-backdrop').remove();  
                })
        })
}


$("#searchButton").click(function(e) {
    e.preventDefault();
    $(".modal").addClass("is-active");  
});
