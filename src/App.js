import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase.utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";

const Home = lazy(() => import("./routes/home/home.components"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.components"));
const Navigation = lazy(() => import("./routes/navigation/navigation.components"));
const Checkout = lazy(() => import("./routes/checkout/checkout.components"));


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }

      const pickedUser = user && (({ accessToken, email }) => ({ accessToken, email }))(user);
      //console.log(user);
      //console.log(pickedUser);
      dispatch(setCurrentUser(pickedUser));
    })

    return unsubscribe;
  }, []);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );

}

export default App;
