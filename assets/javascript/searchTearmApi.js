let generateSearchTerm = async (textBlock) => {
    let promptExample = `\ntextBlock: Salbot: "javascript is an important tool for developers."\n The tech term for this sentence other then \n is: javascript` +
        `\ntextBlock: Salbot: "an api is a use to pull information from a website."\n The tech term for this sentence other then \n is: api` +
        `\ntextBlock: Salbot: "a website is a place where you can store information."\n The tech term for this sentence other then \n is: website`;
    //after v1/ add j1-large or j1-jumbo. jumbo is more accurate and should be used for presentation
    const response = await fetch("https://api.ai21.com/studio/v1/j1-jumbo/complete", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Bu8F3MpNFHWo3rug7xDI8laDnR7CjGzT'
        },
        body: JSON.stringify({
            prompt: promptExample + `\ntextBlock: ${textBlock} \nsearchTerm: `,
            numResults: 1,
            maxTokens: 1,
            topKReturn: 1,
            temperature: 0.7
        }),
        method: 'POST'
    })
    const searchterm = await response.json();
    return searchterm
}
//example code remove after wikipedia api is up
let wikiapi = async () => {
    const result = await generateSearchTerm(`Salbot: "what is the best game of 2020?"`);
    console.log(result);
}
wikiapi();