import './App.css';
import React, { useState } from 'react';
import Home from "./Page/Home/Home";
import { createContext} from 'react';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	  }

  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>    
    <div className="App">
        <Home />
    </div>
    </ThemeContext.Provider>

  );
}

export default App;
