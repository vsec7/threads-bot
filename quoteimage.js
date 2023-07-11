const { ThreadsAPI } = require('threads-api');
const axios = require('axios');
require('dotenv').config();

async function randomQuote() {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/vsec7/45b5b362d9dde8bd381dc9b8a3b6331a/raw/7934009fc02655de3ffc4a28af22a6c0c1ecd102/quote-id.json');
      const quotes = response.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex]['quote'];
      return randomQuote;
    } catch (error) {
      throw new Error('Failed to retrieve random quote.');
    }
}

async function nulis(txt) {
    try {
        const res = await axios.get(`https://salism3api.pythonanywhere.com/write/?text=${txt}`);
        const img = res.data.images
        return img[0]
    } catch(error) {
        console.log("failed convert to image")
    }
}

const main = async () => {
    try {        
        const threadsAPI = new ThreadsAPI({
            username: process.env.UNAME,
            password: process.env.PASSW
        });

        const q = await randomQuote();
        const qimg = await nulis(q);
        const p = await threadsAPI.publish({
          text: q,
          image: qimg
        });

        console.log(p);

    } catch (error) {
        console.log("failed");
    }
}

setInterval( async () => {
        await main()
    }, process.env.DELAY * 1000);
