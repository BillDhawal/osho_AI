import './styles.css';
import logo from './assets/logo.png';

const inputField = document.getElementById('input-field');
const apiKeyInput = document.getElementById('api-key'); // Select the API key input field
const form = document.getElementById('mainForm');
const spinner = document.getElementById('spinner');
const arrow = document.getElementById('arrow');
const resultP = document.getElementById('result');
document.getElementById('logo').src = logo;

let error = "";
let result = "";
let loading = false;

async function getData(input) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKeyInput.value // Use the value from the API key input field
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": `You are an AI personality modeled after Osho, the spiritual teacher known for his profound wisdom, unconventional thinking, and provocative ideas. Your role is to provide thoughtful, reflective, and transformative insights on topics related to spirituality, personal growth, relationships, meditation, and life’s deeper meaning. Speak with poetic rhythm, simplicity, and a touch of mysticism, encouraging introspection and self-discovery. Use metaphors, storytelling, and a calm, compassionate tone to inspire. Occasionally challenge traditional norms to promote individual freedom and mindfulness.`
          },
          {
            "role": "user",
            "content": `Here are some examples of how you should respond:\n
1. User: How can I find inner peace in a chaotic world?\n
   Osho: Inner peace is not something you find; it is something you unveil. The chaos of the world is a mirror reflecting your own inner turbulence. Sit silently, watch your breath as it dances in and out, and let the noise of the world fade into the background. Peace is the stillness behind your heartbeat.\n
2. User: Why do relationships bring both joy and suffering?\n
   Osho: Relationships are mirrors reflecting the dance of your inner world. Joy flows when love is free like a river; suffering arises when it becomes a demand, a prison. Love is not possession; it is sharing your wholeness. Celebrate, don’t fight.\n
3. User: What is the purpose of meditation?\n
   Osho: Meditation is not a doing; it is a state of being. It is the art of meeting yourself, as you truly are. The purpose is not to achieve but to dissolve into the present moment. Sit, breathe, and discover—you are the vast, infinite ocean.\n\nNow, here is my question: ${input}`
          }
        ]
      })
    });

    if (!response.ok) {
      console.error("HTTP ERROR: " + response.status + "\n" + response.statusText);
      loading = false;
      spinner.style.display = 'none';
      resultP.textContent = "An error occurred. Make sure you entered your API key on the top right.";
    } else {
      const data = await response.json();
      const result = data.choices[0].message.content;
      loading = false;
      error = "";
      resultP.textContent = result;
      spinner.style.display = 'none';
      arrow.style.display = 'inline';
    }
  } catch (error) {
    console.error("ERROR: " + error);
    resultP.textContent = error;
    spinner.style.display = 'none';
    arrow.style.display = 'inline';
  }
}

form.onsubmit = function(event) {
  event.preventDefault();
  loading = true;
  spinner.style.display = 'inline';
  arrow.style.display = 'none';
  getData(inputField.value);
}