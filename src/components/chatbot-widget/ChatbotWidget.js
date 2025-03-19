import { Create, KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "./chatbotWidget.scss";
import { ChatBubble } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import avartar from "./team.jpg";
import logo from "../../assets/images/logos/logo.png";
import { v5 as uuidv5 } from "uuid";
import { SERVER_URL } from "../..//utils/config";


const ChatbotWidget = ({ uuid }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [foreColor, setForeColor] = useState("");
  const [myStyle, setMyStyle] = useState({});
  const [style1, setStyle] = useState({});
  const [botName, setBotName] = useState("");
  const [onlineStatus, setOnlineStatus] = useState("");
  const [show, setShow] = useState(true);
  const [labelText, setLabelText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const ref = useRef();

  const MY_NAMESPACE = "1b671a94-40d5-491e-99b0-da01ff1f3341";

  if (uuid === undefined) {
    uuid = uuidv5(localStorage.getItem("email"), MY_NAMESPACE);
    console.log(uuid);
  }

  const scrollToBottom = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) {
      setIsShake(true);
      setTimeout(() => {
        setIsShake(false);
      }, 500);
      return; // Ignore empty messages
    }

    // Add the user's message to the messages state
    addMessage({ content: userInput, sender: "user" });

    // Clear the user input field
    setUserInput("");

    // Handle the chatbot's response
    handleChatbotResponse(userInput);
  };

  const handleChatbotResponse = async (userMessage) => {
    try {
      // Call your backend or NLP service to process the user's message
      const chatbotResponse = await fetchChatbotResponse(userMessage);
      // const chatbotResponse = "this is test response"

      // Add the chatbot's response to the messages state
      addMessage({ content: chatbotResponse, sender: "chatbot" });
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  // Fetch Chatbot Response function
  async function fetchChatbotResponse(userMessage) {
    try {
      // Replace with your chatbot API endpoint
      const chatbotApiEndpoint = `${SERVER_URL}/v1/chat/message/`;

      // Prepare the data to send in the POST request
      const data = {
        message: userMessage,
      };

      // Send a POST request to the chatbot API with the user message
      const response = await fetch(chatbotApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Error fetching chatbot response");
      }

      // Parse the response JSON data
      const responseData = await response.json();

      // // Extract the chatbot message from the response data

      const chatbotMessage = responseData["message"];

      // // Return the chatbot message
      return chatbotMessage;
    } catch (error) {
      console.error("Error in fetchChatbotResponse:", error);
      return "Sorry, there was an error processing your request. Please try again later.";
    }
  }

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setUserInput(userInput + emoji);
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .post(`${SERVER_URL}/v1/appearance/appearance`, { uuid: uuid })
        .then((res) => {
          const data = JSON.parse(res.data.data);
          setBgColor(data.bgColor);
          setBotName(data.botName);
          setOnlineStatus(data.onlineStatus);
          setLabelText(data.labelText);
          setForeColor(data.foreColor);
        });
    };
    getData();

    // var r, g, b;
    // function hexToRgbA(hex){
    //     var c;

    //     if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    //         c= hex.substring(1).split('');
    //         if(c.length== 3){
    //             c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    //         }
    //         c= '0x'+c.join('');
    //         r = (c>>16)&255;
    //         g = (c>>8)&255;
    //         b = c&255;
    //     }
    // }

    // hexToRgbA('#fbafff')

    const brightRate = 0.4;
    const xBgColor = parseInt(bgColor.replace(/^#/, ""), 16);
    const b = parseInt((255 - (xBgColor % 256)) * brightRate);
    const g = parseInt((255 - ((xBgColor / 256) % 256)) * brightRate);
    const r = parseInt((255 - ((xBgColor / 65536) % 256)) * brightRate);

    const temp =
      (parseInt((xBgColor / 65536) % 256) + r) * 65536 +
      (parseInt((xBgColor / 256) % 256) + g) * 256 +
      parseInt(xBgColor % 256) +
      b;

    const brightColor = temp.toString(16);

    setMyStyle({
      background:
        "linear-gradient(135deg," + bgColor + "," + "#" + brightColor + ")",
    });
    setStyle({
      background:
        "linear-gradient(135deg," + bgColor + ", #" + brightColor + ")",
    });
  }, [bgColor]);

  return (
    <div>
      {show === true && (
        <div className="chatbot-widget">
          <div className="chat-header" style={myStyle}>
            <div className="avartars-wrapper">
              <img src={avartar} className="header-ava" alt="" />
            </div>
            <h2 className="oneline">{botName}</h2>
            <button className="header-but" onClick={() => setShow(false)}>
              <KeyboardArrowDown className="btn_icon" />
            </button>
            <button className="header-but">
              <MoreVert className="btn_icon" />
            </button>
          </div>
          <div className="online-message" style={style1}>
            <span>{onlineStatus}</span>
          </div>
          <div className="conversation-group">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user-message" : "chatbot-message"
                }`}
                style={message.sender === "user" ? myStyle : {}}
              >
                {message.content}
              </div>
            ))}
            <div ref={ref} />
          </div>
          <div className="input-group">
            <hr style={{ width: "100%" }} />
            <textarea
              className={isShake ? "shake" : ""}
              id="new-message-textarea"
              rows="1"
              placeholder="Enter your message..."
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <div className="footer-bottom">
              <button onClick={() => setShowEmojis(!showEmojis)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              {showEmojis && (
                <div className="emoji emojiFade-enter-done">
                  <Picker
                    data={data}
                    onEmojiSelect={addEmoji}
                    previewPosition="none"
                  />
                </div>
              )}
              {/* <a
                href="https://www.tidio.com/powered-by-tidio/?platform=others&project=qbpudb…f&utm_medium=widget_v4&utm_campaign=plugin_ref&utm_referrer=scarflings.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Powered by Tidio."
              >
                <span>POWERED BY</span>
                <img src={logo} className="logo" />
              </a> */}
            </div>
          </div>

          <div className="btn-send">
            <div className="buttonWave"></div>
            <button
              className="trigger"
              onClick={handleSendMessage}
              style={myStyle}
            >
              <i>
                <svg
                  id="ic_send"
                  fill="#FFFFFF"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </i>
            </button>
            <button
              className="hidden"
              onClick={handleSendMessage}
              style={myStyle}
            >
              <i>
                <svg
                  id="ic_send"
                  fill="rgb(255, 141, 168)"
                  height="30"
                  viewBox="0 0 23 23"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </i>
            </button>
          </div>
        </div>
      )}
      {show === false && (
        <div className="mini-chatbot">
          <div className="label-chatbot" style={{ display: "flex" }}>
            <div>{labelText}</div>
          </div>
          <div className="btn-mini">
            <button
              className="button-mini"
              onClick={() => setShow(true)}
              style={myStyle}
            >
              <ChatBubble />
            </button>
            <button className="hidden-mini" onClick={() => setShow(true)}>
              <Create />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
