// script.js
const myButton = document.getElementById('myButton');
const textInput = document.getElementById('textInput');
const resultsContainer = document.getElementById('results');

const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', () => {
    window.location.href = 'upload.html';
});

myButton.addEventListener('click', async () => {
    const inputValue = textInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive matching

    try {
        const response = await fetch('servers.json');
        const jsonData = await response.json();

        const matchingServers = [];

        for (const serverKey in jsonData) {
            const server = jsonData[serverKey];
            if (server.keywords.includes(inputValue)) {
                matchingServers.push(server);
            }
        }

        resultsContainer.innerHTML = ''; // Clear previous results

        if (matchingServers.length > 0) {
            matchingServers.forEach(server => {
                const serverInfo = document.createElement('div');
                serverInfo.classList.add('server-info');

                const serverName = document.createElement('p');
                serverName.textContent = `Server Name: ${server.Discord_server_name}`;
                serverInfo.appendChild(serverName);

                const joinButton = document.createElement('button');
                joinButton.textContent = 'Join';
                joinButton.addEventListener('click', () => {
                    window.open(server.Discord_Link, '_blank');
                });
                serverInfo.appendChild(joinButton);

                resultsContainer.appendChild(serverInfo);
            });
        } else {
            resultsContainer.textContent = 'No matching servers found.';
        }
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
});
