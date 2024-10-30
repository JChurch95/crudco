import Routes from "./routes/Routes";
import AuthProvider from "./AuthContext";
import CartProvider from "./CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
