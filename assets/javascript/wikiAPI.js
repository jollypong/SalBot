//uses wiki api to pull search results from wikipedia
async function searchUp(textblock) {
    let idsArray = [];
    let idsString = "";
    let snippetsArray = [];
    const value = textblock;
    //#region  Fetch ids, snippets and titles
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${value}`)
        .then(response => response.json())
        .then(function (result) {
            for (let i in result.query.search) {
                idsArray.push(result.query.search[i].pageid);
                snippetsArray.push(result.query.search[i].snippet);
                idsString += idsArray[i] + "|";
            }
            idsString = idsString.substring(0, idsString.length - 1);
        })
        //#region fetch links and post to modal
        .then(function (a) {
            fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids=${idsString}`)
                .then(function (idresult) {
                    return idresult.json();
                }).then(idresult => idresult)
                .then(function (g) {
                    let pages = g.query.pages;
                    document.getElementById("output").innerHTML = "";
                    for (let i = 0; i < idsArray.length; i++) {
                        document.getElementById("output").innerHTML +=
                            `<a href=${pages[idsArray[i]].canonicalurl} target='_blank'>` + pages[idsArray[i]].title + "</a><br>" + snippetsArray[i] + "<br><br>";
                        $(".modal").addClass("is-active");
                    }
                })
            //#endregion
        })
    //#endregion
}


// #region Modal Functions
$(document).ready(function () {
    $("#searchButton").on("click", function () {
        let value = $("#input").val();
        searchUp(value);
    });

    $("#closeBtn").click(function () {
        $(".modal").removeClass("is-active");
    });

    $("#closetop").click(function () {
        $(".modal").removeClass("is-active");
    });
});
// #endregion
