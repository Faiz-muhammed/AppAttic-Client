import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

const api = {
  quoteChange: (color,quote) => {
    return new Promise((resolve, reject) => {
      let data={changedColor:color,Quote:quote.input}
      axios.post(`${BASE_URL}/quoteChange`, data).then((res) => {
        resolve(res);
      }).catch((err) => {console.log("quote api call error")});
    });
  },

};

export default api;
