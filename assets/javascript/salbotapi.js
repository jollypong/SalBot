let prompt =    `Salbot is your tutor. He has knowledge of javascript, html, css and can answer your questions in a clear and concise manner.` +
                `The following is a conversation between you and Salbot.`;
let conversationHistory = `Salbot: "Hey, I heard you were struggling with javascript in class today. Did you have any questions?"` +
                            `You: "Yea sal, I was wondering if you could explain api's again to me?"` +
                            `Salbot: "`;

let requestChatResponse = (prompt, conversationHistory) => {
    fetch("https://api.ai21.com/studio/v1/j1-large/complete", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer Bu8F3MpNFHWo3rug7xDI8laDnR7CjGzT'
        },
        body: JSON.stringify({
            prompt: prompt + conversationHistory,
            numResults: 1,
            maxTokens: 40,
            stopSequences: [`"`],
            topKReturn: 0,
            temperature: 0.7
        }),
        method: 'POST'
    })
        .then(response => response.json())
        .then(aiResponse => {
            console.log(aiResponse);
            $('body').text(aiResponse.completions[0].data.text);
        })
}
