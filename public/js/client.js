// client.js
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus(); // Check authentication status on page load
  
    // Function to check authentication status
    async function checkAuthStatus() {
        try {
          const response = await fetch('/authStatus');
          const data = await response.json();
          console.log('Authentication status:', data);
    
          // Update UI based on authentication status
          updateUI(data);
        } catch (error) {
          console.error('Error checking authentication status:', error);
          
          // Handle the case when authentication status cannot be checked
          updateUI(false);
        }
      }
  
    // Function to update UI based on authentication status
    function updateUI(data) {
      // Get button and content elements
      const loginButton = document.getElementById('loginButton');
      const registerButton = document.getElementById('registerButton');
      const logoutButton = document.getElementById('logoutButton');
      console.log('loginButton:', loginButton);
      console.log('registerButton:', registerButton);
      console.log('logoutButton:', logoutButton);

      if (data.isAuthenticated) {
        // User is authenticated, show logout button and logged-in content
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';
      } else {
        // User is not authenticated, show login and register buttons and logged-out content
        loginButton.style.display = 'block';
        registerButton.style.display = 'block';
        logoutButton.style.display = 'none';
      }
    }

    window.logout = async function logout() {
        try {
          const response = await fetch('/logout');
          const data = await response.json();
          console.log('Logout response:', data);
    
          // Redirect to home page after logout
          window.location.href = '/';
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
  });

  
  