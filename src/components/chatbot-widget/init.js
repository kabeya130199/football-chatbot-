import React from 'react';
import ReactDOM from "react-dom/client";
import ChatbotWidget from './ChatbotWidget';

const init = (uuid) => {
    // Render the ChatbotWidget component into the specified DOM element
    const rootElem = document.body.appendChild(document.createElement("div"))
    const root = ReactDOM.createRoot(rootElem);
    console.log("AAAA!!");
    root.render(<ChatbotWidget uuid={uuid}/>);
};

window.YourChatbotWidget = {
    init,
};


console.log("YourChatbotWidget attached:", window.YourChatbotWidget);