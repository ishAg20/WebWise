import { useEffect, useState } from "react";
import "./app.scss";
import * as webllm from "@mlc-ai/web-llm";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [engine, setEngine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
    webllm
      .CreateMLCEngine(selectedModel, {
        initProgressCallback: (initProgress) => {
          console.log("initProgress", initProgress);
        },
      })
      .then((engine) => {
        setEngine(engine);
      });
  }, []);

  async function sendMessageToLLM() {
    const tempMessages = [...messages];
    tempMessages.push({ role: "user", content: input });
    setMessages(tempMessages);
    setInput("");
    const reply = await engine.chat.completions.create({
      messages: tempMessages,
    });
    const response = reply.choices[0].message.content;
    tempMessages.push({ role: "tool", content: text });
    console.log(reply);
  }

  return (
    <>
      <main>
        <section>
          <div className="chat">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="input-field">
              <input
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessageToLLM();
                  }
                }}
                type="text"
                placeholder="Ask anything"
              ></input>
              <button
                onClick={() => {
                  sendMessageToLLM();
                }}
                className="send-button"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
