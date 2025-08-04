<<<<<<< HEAD

=======
// import React, { createContext, useState, useEffect, useContext } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     // Check local storage for saved theme preference
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? JSON.parse(savedTheme) : false; // Default to light mode
//   });

//   useEffect(() => {
//     // Apply or remove dark-mode class on body
//     if (darkMode) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//     }
//     // Save theme preference to local storage
//     localStorage.setItem('theme', JSON.stringify(darkMode));
//   }, [darkMode]);

//   const toggleTheme = () => {
//     setDarkMode(prevMode => !prevMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
>>>>>>> 501744de934533a45971193d0c974f2265742b3c

import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false; // Default to light mode
  });

  useEffect(() => {
    // Apply dark-mode class to the root HTML element
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add('dark-mode');
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.classList.remove('dark-mode');
      htmlElement.setAttribute('data-theme', 'light');
    }
    // Save theme preference to local storage
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);