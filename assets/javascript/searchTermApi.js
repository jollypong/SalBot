let generateSearchTerm = async (textBlock) => {
    console.log(textBlock);
    let promptExample = `\ntextBlock: Salbot: "javascript is an important tool for developers."... The tech term for this sentence is: javascript` +
        `\ntextBlock: Salbot: "an api is a use to pull information from a website."... The tech term for this sentence is: api` +
        `\ntextBlock: Salbot: "a website is a place where you can store information."... The tech term for this sentence is: website`;
    //after v1/ add j1-large or j1-jumbo. jumbo is more accurate and should be used for presentation
    const response = await fetch("https://api.ai21.com/studio/v1/j1-large/complete", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Bu8F3MpNFHWo3rug7xDI8laDnR7CjGzT'
        },
        body: JSON.stringify({
            prompt: promptExample + `\ntextBlock: ${textBlock}... The tech term for this sentence is : `,
            numResults: 1,
            maxTokens: 1,
            topKReturn: 1,
            temperature: 0.7
        }),
        method: 'POST'
    })
    const searchterm = await response.json();
    console.log(searchterm);
    return searchterm.completions[0].data.text.slice(1);
}
