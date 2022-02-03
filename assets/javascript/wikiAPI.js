let buttonEl = document.querySelector("#search");
let inputEl = document.querySelector("#input");

async function searchUp(textblock) {
    let idsArray = [];
    let idsString = "";
    let snippetsArray = [];
    const value = textblock;

    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${value}`)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            for(let i in result.query.search){
                idsArray.push(result.query.search[i].pageid);
                snippetsArray.push(result.query.search[i].snippet);
                idsString += idsArray[i] + "|";
            }
            idsString = idsString.substring(0, idsString.length - 1);
        }).then(function (a) {
            fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids=${idsString}`)
                .then(function (idresult) {
                    return idresult.json();
                }).then(function (idresult) {
                    return idresult
                }).then(function (g) {
                    document.getElementById("output").innerHTML = "";
                    for (let i = 0; i < idsArray.length; i++) {
                        document.getElementById("output").innerHTML +=
                            `<a href=${g.query.pages[idsArray[i]].canonicalurl} target='_blank'>` + g.query.pages[idsArray[i]].title + "</a><br>" + snippetsArray[i] + "<br>";
                            $(".modal").attr("aria-hidden", "true");
                        $('.modal-backdrop').remove();
                    }
                })
        })
}


$("#searchButton").on("click", function () {
    let value = $("#input").val();
    searchUp(value);
})