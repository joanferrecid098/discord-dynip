const triggerServices = require('./services.js');
const http = require('http');
const fs = require('fs');

// Check if file exists and create it if not
const checkFile = async (json) => {
    try {
        const data = fs.readFileSync('src/ip-adr.json', 'utf8');

        return JSON.parse(data).ip;
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found. Creating new ip-adr.json...');

            try {
                fs.writeFileSync('src/ip-adr.json', json);
                console.error('File successfully created.');

                return JSON.parse(json).ip;
            } catch (writeErr) {
                console.error('Error writing file:', writeErr);
            }
        } else {
            console.error('Error reading file:', err);
        }
    }
};

// Write new IP to file
const writeFile = async (json) => {
    try {
        fs.writeFileSync('src/ip-adr.json', json, (err) => err && console.error(err));

        return console.log('File successfully written.');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

// Compare IPs and trigger actions
const compareIP = ({ current, stored }) => {
    if (current === stored) {
        console.log("IP address hasn't changed.");

        return false;
    } else {
        console.log("IP address has changed, writing storing new one and triggering alerts.");
        writeFile(JSON.stringify({
            ip: current
        }));

        triggerServices(current);

        return true;
    }
}

// Get current IP
http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, async function(resp) {
    resp.on('data', async function(currentIP) {
        var json = JSON.stringify({
            ip: currentIP.toString()
        });
        
        const storedIP = await checkFile(json);
        const comparison = compareIP({ current: currentIP.toString(), stored: storedIP });

        return comparison;
    });
});