let buttonEl = document.querySelector("#search");
let inputEl = document.querySelector("#input");

async function searchUp(textblock) {
    let ids = "";
    let links = [];
    let results = [];
    // $("#output").dialog( "open" );
    // $("#myModal").modal();
    const value = await generateSearchTerm(textblock);

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
                    console.log(idresult.query.pages);
                    for (i in idresult.query.pages) {
                        links.push(idresult.query.pages[i].fullurl)
                    }
                }).then(function (g) {
                    document.getElementsByClassName("modal-body").innerHTML = "";
                    for (let i = 0; i < results.length; i++) {
                        document.getElementsByClassName("modal-body").innerHTML +=
                            "<a href=`" + links[i] + "` target='_blank'>" + results[i].title + "</a><br>" + results[i].snippet + "<br>";
                    }
                    
                })
        })
}


console.log($("#messages").children("div"));

//  $( "#output" ).dialog({ autoOpen: true});

$("#chatBtn").on("click", async function () {
    await new Promise((resolve) =>
        setTimeout(resolve, 2000))
        $("#messages").children().on("click", function () {
            let textContent = $(this).text();
            searchUp(textContent);
            
        })
})

// $(document).ready(function(){
//     $("#myModal").modal();
//  });