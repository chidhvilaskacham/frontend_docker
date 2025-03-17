import React, { useState, useEffect } from "react";
import axios from "axios";

// Use environment variable or fallback to localhost
export const backendService = process.env.REACT_APP_BACKEND_URL || "/api";
console.log("Backend URL:", backendService); // Debugging

const toolsData = {
  Ansible: "https://upload.wikimedia.org/wikipedia/commons/2/24/Ansible_logo.svg",
  Docker: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png",
  Git: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
  Jenkins: "https://www.jenkins.io/images/logos/jenkins/jenkins.svg",
  Prometheus: "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
  Visual_studio: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Visual_Studio_Icon_2022.svg",
};

function App() {
  const [tools, setTools] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = () => {
    axios
      .get(`${backendService}/tools`)
      .then((response) => {
        const toolsArray = Object.entries(response.data).map(([name, votes]) => ({
          name,
          votes,
        }));
        setTools(toolsArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch tools. Please check the backend.");
      });
  };

  const handleVote = (toolName) => {
    axios
      .post(`${backendService}/vote/${toolName}`)  // Corrected URL
      .then(() => {
        setTools((prevTools) =>
          prevTools.map((tool) =>
            tool.name === toolName ? { ...tool, votes: tool.votes + 1 } : tool
          )
        );
      })
      .catch((error) => {
        console.error("Error voting:", error);
        setError("Failed to vote. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Vote for Your Favourite DevOps Tools</h1>

      {error && <p style={styles.error}>{error}</p>}

      {tools.length > 0 ? (
        <div style={styles.grid}>
          {tools.map((tool) => (
            <div key={tool.name} style={styles.card}>
              <img
                src={toolsData[tool.name] || "https://via.placeholder.com/100"}
                alt={tool.name}
                style={styles.image}
              />
              <h2>{tool.name}</h2>
              <p style={styles.votes}>Votes: {tool.votes}</p>
              <button style={styles.button} onClick={() => handleVote(tool.name)}>
                Vote
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tools found. Please check the backend.</p>
      )}
    </div>
  );
}

// 🎨 STYLING
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  votes: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default App;