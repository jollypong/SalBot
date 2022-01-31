let prompt =    `Salbot is your tutor. He has knowledge of javascript, html, css and can answer your questions in a clear and concise manner.` +
                `The following is a conversation between you and Salbot.`;
let conversationHistory = `Salbot: "Hey, I heard you were struggling with javascript in class today. Did you have any questions?"` +
                            `You: "Yea sal, I waswondering if you could explain api's again to me?"` +
                            `Salbot: "`;
$('body').text(requestChatResponse(prompt, conversationHistory));