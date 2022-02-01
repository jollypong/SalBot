//conversation prompt. This will always be the same
let prompt = `Salbot is your tutor. He has knowledge of javascript, html, css and can answer your questions in a clear and concise manner.` +
    `\nThe following is a conversation between you and Salbot. The conversation will follow the following format` +
    `\nSalbot: "Hello welcome to my tutoring session."` +
    `\nYou: "Thank you."` +
    `\nSalbot: "We can start if youre ready"` +
    `\nYou: "Yes I am ready"`;

let conversationHistory = localStorage.getItem('conversationHistory') || 
    [`\nSalbot: "Hey, I heard you were struggling with javascript in class today. Did you have any questions?"`];



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
            $('#chatBox').append(`<div class="salbotChatContent">${aiResponse.completions[0].data.text}</div>`);
            conversationHistory[conversationHistory.length -1] += ` ${aiResponse.completions[0].data.text}`;
            
        })
}

$('#chatBtn').on('click', () => {
    let chatInput = $('#chatinput > button').val();
    conversationHistory.push(`\nYou: "${$('#chatInput').val()}"`);
    $('#chatBox').append(`<div class="userChatContent">${conversationHistory[conversationHistory.length -1]}</div>`);
    $('#chatInput').val('');
    conversationHistory.push(`\nSalbot: "`);
    console.log(conversationHistory);
    requestChatResponse(prompt, conversationHistory);


});

let initSalbot = () => {
    for(let index in conversationHistory) {
        // if index char  is s or S
        if(conversationHistory[index].charAt(1) === 's' || conversationHistory[index].charAt(1) === 'S') {
         
            $('#chatBox').append(`<div class="salbotChatContent">${conversationHistory[index]}</div>`);
        } else {
            $('#chatBox').append(`<div class="userChatContent">${conversationHistory[index]}</div>`);
        }
    }
}
initSalbot();

