import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
import { Button, Form } from "react-bootstrap";
import "./training.scss";
import { useState } from "react";
import axios from "axios";
import { useRef, useEffect } from "react";
import hand from "assets/images/hand.svg";
import dislike from "assets/images/dislike.svg";
import { UploadFile, FiberManualRecord, WebAsset } from "@mui/icons-material";
import FileUploadSingle from "components/uploading/UploadFile";
import { SERVER_URL } from "../../../utils/config";

export const Training = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("website");
  const [liked, setLiked] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const ref = useRef();

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleCorrectInputChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) {
      return; // Ignore empty messages
    }

    // Add the user's message to the messages state
    addMessage({ content: userInput, sender: "user" });

    // Clear the user input field
    setUserInput("");

    // Handle the chatbot's response
    handleChatbotResponse(userInput);
  };

  const handleSendCorrectMessage = async () => {
    if (!correctAnswer.trim()) {
      return; // Ignore empty messages
    }
    try {
      // Replace with your chatbot API endpoint
      const chatbotApiEndpoint = "http://localhost:8001/correct/";
      // Prepare the data to send in the POST request
      const data = {
        question: messages[messages.length - 2].content,
        answer: correctAnswer,
      };

      console.log(data);
      const response = await fetch(chatbotApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error saving correct response");
      } else {
        setLiked(true);
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      console.error("Error in saving data:", error);
      return "Sorry, there was an error processing your request. Please try again later.";
    }
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
      const chatbotApiEndpoint = `${SERVER_URL}/v1/message/`;

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

  const handleOnLike = () => {
    setLiked(true);
  };
  const handleOnDislike = () => {
    setLiked(false);
  };

  const handleOnSubmit = (e) => {
    const data = {
      weburl: url,
    };
    console.log(data);
    e.preventDefault();
    axios.post(`${SERVER_URL}/v1/create/`, data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="training">
      <Sidebar />
      <div className="trainingContainer">
        <Navbar title="Training" />
        <div className="training_content">
          <div className="trainingNav">
            <ul>
              <li className="li-button" onClick={() => setMethod("website")}>
                <WebAsset className="icon" />
                Training by website
              </li>
              <li className="li-button" onClick={() => setMethod("manual")}>
                <FiberManualRecord className="icon" />
                Training manually
              </li>
              <li className="li-button" onClick={() => setMethod("file")}>
                <UploadFile className="icon" />
                Training by uploading file
              </li>
            </ul>
          </div>
          <div className="fromWebsite">
            {method === "website" && (
              <div>
                <Form autoComplete="off" onSubmit={handleOnSubmit}>
                  <Form.Group className="urlForm">
                    <Form.Label>URL:</Form.Label>
                    <Form.Control
                      type="text"
                      name="url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                      placeholder="Enter site url here..."
                    />
                  </Form.Group>
                  <br></br>

                  <div>
                    <Button
                      type="submit"
                      size="lg"
                      style={{ borderRadius: "4px", padding: "10px" }}
                    >
                      Train
                    </Button>
                  </div>
                </Form>
              </div>
            )}
            {method === "manual" && (
              <div className="manual-widget">
                <div className="manual-window">
                  {messages.map((message, index) => (
                    <div>
                      <div
                        key={index}
                        className={`${
                          message.sender === "user"
                            ? "user-message"
                            : "chatbot-message"
                        }`}
                      >
                        <div>{message.content}</div>
                        {messages.length - 1 === index &&
                          message.sender !== "user" && (
                            <div>
                              <button className="like" onClick={handleOnLike}>
                                <img src={hand} width="35px" />
                              </button>
                              <button
                                className="dislike"
                                onClick={handleOnDislike}
                              >
                                <img src={dislike} width="35px" />
                              </button>
                            </div>
                          )}
                      </div>
                      {liked === false &&
                        messages.length - 1 === index &&
                        message.sender !== "user" && (
                          <div className="correct-answer">
                            <input
                              type="text"
                              value={correctAnswer}
                              onChange={handleCorrectInputChange}
                              onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                  handleSendCorrectMessage();
                                }
                              }}
                              placeholder="Type your message here..."
                            />
                            <button onClick={handleSendCorrectMessage}>
                              Send
                            </button>
                          </div>
                        )}
                    </div>
                  ))}
                  <div ref={ref} />
                </div>
                <div className="user-training-input">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message here..."
                  />
                  <button onClick={handleSendMessage}>Send</button>
                </div>
              </div>
            )}
            {method === "file" && <FileUploadSingle />}
          </div>
        </div>
      </div>
    </div>
  );
};
