import { useEffect, useState } from "react";
import User from "./user";
import "./styles.css";

export default function GithubProfileFinder() {
  const [username, setUsername] = useState("DiwanshuG");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchGithbUserData() {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${username}`);

    const data = await res.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUsername("");
    }

    // console.log(data);
  }

  function handleSubmit() {
    fetchGithbUserData();
  }
  useEffect(() => {
    fetchGithbUserData();
  }, []);

  if (loading) {
    return <h1> Loading data please wait ....</h1>;
  }
  return (
    <div className="github-profile-container">
      <div className="input-wrapper">
        <input
          name="search-by-username"
          placeholder="Search GitHub Username here"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <button onClick={handleSubmit}>Search</button>
      </div>
      {userData !== null ? <User user={userData} /> : null}
    </div>
  );
}
