import { useState } from "react";
import "./app.scss";

function App() {
  const [messages, setMessages] = useState([]);

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
