import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { AuthProvider } from "context/AuthContext";
import "./style.scss";
import { PostProvider } from "context/PostContext";
// ==============================|| APP ||============================== //

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={themes({ fontFamily: `'Roboto', sans-serif`, borderRadius: 12 })}
      >
        <CssBaseline />
        <NavigationScroll>
          <AuthProvider>
            <PostProvider>
              <Routes />
            </PostProvider>
          </AuthProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
