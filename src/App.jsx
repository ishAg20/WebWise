import { useEffect, useState } from "react";
import "./app.scss";
import * as webllm from "@mlc-ai/web-llm";

function App() {
  const [messages, setMessages] = useState([]);
  const [engine, setEngine] = useState(null);
  useEffect(() => {
    const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
    const model = webllm.getModel(selectedModel);
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
              <input type="text" placeholder="Ask anything"></input>
              <button>Send</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
