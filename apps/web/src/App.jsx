import AppRoute from './routes/AppRoute';
import { AuthProvider } from './context/AuthContext.jsx';

const App = () => {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
};

export default App;