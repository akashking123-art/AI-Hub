const chatBox =
document.getElementById("chatBox");

const userInput =
document.getElementById("userInput");

const modelSelect =
document.getElementById("modelSelect");

/* Add Message */

function addMessage(text,type){

  const div =
  document.createElement("div");

  div.classList.add(
    type === "user"
    ? "user-message"
    : "bot-message"
  );

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop =
  chatBox.scrollHeight;
}

/* Send Message */

async function sendMessage(){

  const text =
  userInput.value.trim();

  if(text === "") return;

  addMessage(text,"user");

  userInput.value = "";

  addMessage(
    "⏳ AI is thinking...",
    "bot"
  );

  const loading =
  chatBox.lastChild;

  try{

    const response =
    await fetch(
      "http://localhost:11434/api/generate",
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({

          model:
          modelSelect.value,

          prompt:text,

          stream:false
        })
      }
    );

    const data =
    await response.json();

    loading.remove();

    addMessage(
      data.response,
      "bot"
    );

  }
  catch(error){

    loading.remove();

    addMessage(
      "❌ Ollama not running.",
      "bot"
    );

    console.log(error);
  }
}

/* Enter Key */

userInput.addEventListener(
  "keypress",
  function(e){

    if(e.key === "Enter"){
      sendMessage();
    }

  }
);