fetch('/authStatus', {
  credentials: 'include'
})
  .then(response => {
    if (response.status === 200) {
      response.json().then(data => {
        if (data.isAuthenticated === true) {
            hideLoginLogout();
            showSimulationLoggedIn();
            updateListOfOptions();
            console.log("Użytkownik zalogowany");
        } else {
            showLoginLogout();
            showSimulationLoggedOut();
            console.log("Użytkownik niezalogowany");
        }
      });
    } else {
        console.log("Błąd podczas żądania do /authStatus");
        showLoginLogout();
        showSimulationLoggedOut();
    }
  })
  .catch((error) => {
    console.error('Błąd:', error);
  });

function saveToDatabase()
{
    var option = {
      speed: document.getElementById('speedVal').value,
      orbit: document.getElementById('orbitCheckbox').checked
    };


    fetch('/saveOption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(option)
    }).catch(err => {
    console.log(err);
  });
  updateListOfOptions();
}

function updateListOfOptions()
{
  fetch('/getOption', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      var select = document.getElementById("selectForOptions");
      select.innerHTML = '';
      var defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Wybierz parametry animacji, które zapisałeś w bazie';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);
      if (data.success) {
        data.data.forEach(profile => {
          var option = document.createElement('option');
          option.value = `${profile.speedval},${profile.showorbit}`;
          option.textContent = `Szybkość: ${profile.speedval}, pokaż orbity: ${profile.showorbit}`;
          select.appendChild(option);
        });
      } else {
        alert('Błąd danych!');
      }
    }).catch(err => {
  console.log(err);
});
}

window.logout = async function logout() {
try {
  const response = await fetch('/logout');
  const data = await response.json();
  console.log('Logout response:', data);
  redirect('/');
} catch (error) {
  console.error('Error logging out:', error);
}
};  
