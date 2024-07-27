const axios = require('axios');

module.exports = ({ discordWebhook, currentIP, checkStatus }) => {
    const params = {
        username: "DynamicIP Manager",
        //avatar_url: "",
        content: `@everyone New public IP address is: ||${currentIP}||`
    }
    
    axios.post(discordWebhook, params)
      .then(function (response) {
        checkStatus(1, 'DISCORD');
      })
      .catch(function (error) {
        if (!error.response) return checkStatus(3, 'DISCORD') && console.log(error);
        if (error.response.status == 404) checkStatus(2, 'DISCORD');
        else checkStatus(3, 'DISCORD') && console.log(error);
      });
    
}