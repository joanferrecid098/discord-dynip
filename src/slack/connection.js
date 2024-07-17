const axios = require('axios');

module.exports = ({ slackWebhook, currentIP, checkStatus }) => {
    const params = {
        text: `<!everyone> New public IP address is: ${currentIP}`
    }
    
    axios.post(slackWebhook, params)
      .then(function (response) {
        checkStatus(1, 'SLACK');
      })
      .catch(function (error) {
        if (!error.response) return checkStatus(3, 'SLACK') && console.log(error);
        if (error.response.status == 404) checkStatus(2, 'SLACK');
        else checkStatus(3, 'SLACK') && console.log(error);
      });
    
}