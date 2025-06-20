import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.components";
import Navigation from "./routes/navigation/navigation.components";
import Authentication from "./routes/authentication/authentication.components";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.components";
import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase.utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user));
    })

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );

}

export default App;
