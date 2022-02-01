let generateSearchTerm = (textBlock) => {
    let promptExample = `\ntextBlock: Salbot: "javascript is an important tool for developers."\nsearchTerm: javascript`+
                        `\ntextBlock: Salbot: "an api is a use to pull information from a website."\nsearchTerm: api` +
                        `\ntextBlock: Salbot: "a website is a place where you can store information."\nsearchTerm: website` +
    fetch("https://api.ai21.com/studio/v1/j1-large/complete", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Bu8F3MpNFHWo3rug7xDI8laDnR7CjGzT'
        },
        body: JSON.stringify({
            prompt: prompt + conversationHistory,
            numResults: 1,
            maxTokens: 100,
            stopSequences: [`"`],
            topKReturn: 0,
            temperature: 0.7
        }),
        method: 'POST'
    })
        .then(response => response.json())
        .then(aiResponse => {
            console.log(aiResponse);
            $('#messages').append(`<div class="salbotChatContent">${aiResponse.completions[0].data.text}</div>`);
            conversationHistory[conversationHistory.length -1] += ` ${aiResponse.completions[0].data.text}"`;
            
        })
}