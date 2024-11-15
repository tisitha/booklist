import "./assets/logout.css";

function Logout() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return <button className="logOutB" onClick={handleLogout}>Logout</button>;
}

export default Logout;
