//conversation prompt. This will always be the same
//#region variables
let prompt = `SalBot is your tutor. He has knowledge of javascript, html, css and can answer your questions in a clear and concise manner.` +
    `\nThe following is a conversation between you and SalBot. The conversation will follow the following format` +
    `\nSalBot: "Hello welcome to my tutoring session."` +
    `\nYou: "Thank you."` +
    `\nSalBot: "We can start if youre ready"` +
    `\nYou: "Yes I am ready"`;


let conversationHistory = JSON.parse(localStorage.getItem('conversationHistory')) ||
    [`\nSalBot: "Hey, I heard you were struggling with javascript in class today. Did you have any questions?"`];
//#endregion

//after v1/ add j1-large or j1-jumbo. jumbo is more accurate and should be used for presentation
let requestChatResponse = (prompt, conversationHistory) => {
    //#region calls salbot and lets him talk in chat
    fetch("https://api.ai21.com/studio/v1/j1-jumbo/complete", {
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
            $('#messages').append(`<div class="salbotChatContent">SalBot: "${aiResponse.completions[0].data.text.slice(0)}"</div>`);
            conversationHistory[conversationHistory.length - 1] += ` ${aiResponse.completions[0].data.text}"`;
            localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
            $('#message-container').scrollTop($('#message-container').height());

        })
        //#endregion
}


$('#chatBtn').on('click', (e) => {
    //#region gets user message and calls salbot
    e.preventDefault();
    console.log('test')
    let chatInput = $('#chatinput > button').val();
    conversationHistory.push(`\nYou: "${$('#chatInput').val()}"`);
    $('#messages').append(`<div class="userChatContent">${conversationHistory[conversationHistory.length - 1]}</div>`);
    $('#message-container').scrollTop($('#message-container').height());
    $('#chatInput').val('');
    conversationHistory.push(`\nSalBot: "`);
    requestChatResponse(prompt, conversationHistory);
    //saves conversation
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    //#endregion
});


//clear chat history event listener 
$("#clearButton").on("click", function () {
    localStorage.clear();
    location.reload();
});



let initSalbot = () => {
    //#region prints conversation history
    for (let index in conversationHistory) {
        // if index char  is s or S
        if (conversationHistory[index].charAt(1) === 's' || conversationHistory[index].charAt(1) === 'S') {
            let response = conversationHistory[index].replace('SalBot: " ', 'SalBot: "');
            $('#messages').append(`<div  class="salbotChatContent">${response}</div>`);
        } else {
            $('#messages').append(`<div  class="userChatContent">${conversationHistory[index]}</div>`);
        }
    }
    //#endregion
    //scrolls to bottom of chat
    $('#message-container').scrollTop($('#message-container').height());
}
initSalbot();

