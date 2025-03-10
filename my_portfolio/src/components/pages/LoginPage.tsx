import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/admin"); // Redirect to Admin page
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Admin Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800"
          required
        />
        <button type="submit" className="px-3 py-2 bg-blue-500 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
