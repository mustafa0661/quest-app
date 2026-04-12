import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      alert("Lütfen kullanıcı adı ve şifre giriniz.");
      return;
    }
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ userName, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("login response data:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", userName);
      alert("Giriş Başarılı")
      //navigate("/"); // anasayfaya yönlendir
    } else {
      const errorData = await response.json();
      alert("Giriş başarısız: " + (errorData.message || "Bilinmeyen hata"));
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
}

export default Login;