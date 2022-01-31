//waits for button click so that tokens are not wasted during testing
$('button').click(() => {
    let conversationHistory = localStorage.getItem('conversationHistory') || '';
    $('body').text(requestChatResponse(prompt, conversationHistory));
});