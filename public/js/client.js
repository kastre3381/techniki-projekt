fetch('/authStatus', {
  credentials: 'include'
})
  .then(response => {
    if (response.status === 200) {
      response.json().then(data => {
        if (data.isAuthenticated === true) {
            hideLoginLogout();
            console.log("Użytkownik zalogowany");
        } else {
            showLoginLogout();
            console.log("Użytkownik niezalogowany");
        }
      });
    } else {
        console.log("Błąd podczas żądania do /authStatus");
        showLoginLogout();
    }
  })
  .catch((error) => {
    console.error('Błąd:', error);
  });

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