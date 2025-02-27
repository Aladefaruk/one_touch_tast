import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "Context/Auth";
import { GlobalProvider } from "Context/Global";
import Main from "./main";

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalProvider>
          <Main />
        </GlobalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
