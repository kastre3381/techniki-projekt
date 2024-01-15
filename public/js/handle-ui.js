function showLoginLogout()
{
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');

    loginButton.style.display = 'block';
    registerButton.style.display = 'block';
    logoutButton.style.display = 'none';
}

function hideLoginLogout()
{
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');

    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'block';
}

function showSimulationLoggedIn()
{
    fetch('/html/formSimulation.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("simulationParameters").innerHTML = data;
        document.getElementById("selectForOptions").style.display = 'block';
    })
}

function showSimulationLoggedOut()
{
    fetch('/html/parameters.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("simulationParameters").innerHTML = data;
        document.getElementById("selectForOptions").style.display = 'none';
    })
}