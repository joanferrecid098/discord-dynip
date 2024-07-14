require('dotenv').config();

/* STATUS CODES
    1: Successful
    2: Wrong Credentials
    3: Connection Error
    4: Disabled
*/

// Service status
const checkStatus = (status, service) => {
    if (status == 1) console.log(`[${service}] has successfully sent the alert.`);
    if (status == 2) console.log(`[${service}] credentials are wrong.`);
    if (status == 3) console.log(`[${service}] is having a connection error.`);
    if (status == 4) console.log(`[${service}] is DISABLED.`);
}

module.exports = (currentIP) => {
    // Get service connection files
    const discordConnection = require('./discord/connection.js');

    // Get environment variables
    const discordWebhook = process.env.DISCORD_WEBHOOK;

    // Check and send alert to each one
    if (discordWebhook) discordConnection({ discordWebhook, currentIP, checkStatus });
    if (!discordWebhook) checkStatus(4, 'DISCORD');
}