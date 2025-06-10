body {
  background: black;
  color: white;
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
}

h1, h2 {
  margin-top: 40px;
}

#intro-text {
  font-family: Impact, sans-serif;
  font-size: 2.5rem;
  animation: popIn 1s ease-in-out forwards;
}

#countdown-container {
  margin-top: 80px;
  font-size: 2rem;
}

#start-btn {
  font-size: 1.5rem;
  padding: 15px 25px;
  margin-top: 20px;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

#code-container input, #secret-access input {
  padding: 10px;
  font-size: 1rem;
  margin-top: 20px;
}

#code-container button, #secret-access button {
  padding: 10px 15px;
  font-size: 1rem;
  margin-left: 10px;
  cursor: pointer;
}

#secret-access {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.small-warning {
  font-size: 0.8rem;
  color: #aaaaaa;
}

@keyframes popIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
