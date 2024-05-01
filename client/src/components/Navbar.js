import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

//delete function starts

  function Delete() {
    // Assuming the user object includes a property named _id for the user's ID
    if (!user || !user._id) {
      alert("User ID not found");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) {
      return;
    }
  
    fetch(`/api/users/delete-account/${user._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary headers, such as authentication tokens
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      // Clear user data and redirect
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error deleting account');
    });
  }
  
//delete function ends
  



  const navAction = () => {
    if (user) {
      return (
        <ul className="navbar-nav mr-5 " style={{ background: "yellow" }}>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user mr-2"></i>
              {user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/profile">
                Profile
              </a>

              <a className="dropdown-item" href="#" onClick={Logout}>
                Logout
              </a>
              <a className="dropdown-item"  onClick={Delete}>
                Delete Account
              </a>
            </div>
          </div>
        </ul>
      );
    }

    return (
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/register">
            Register
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/" style={{ fontWeight: "bold",fontFamily:"Baskerville Old Face" }}>
          Hotel Tranquil
        </a>

        <div className="anchor" >
          <a href="/" style={{ color: "DarkOliveGreen" }}>
            Home
          </a>
          <a href="/about" style={{ color: "DarkOliveGreen" }}>
            About Us
          </a>
          <a href="/home" style={{ color: "DarkOliveGreen" }}>
            Rooms
          </a>
        </div>
        <div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i class="fas fa-bars" style={{ color: "white" }}></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {navAction()}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
