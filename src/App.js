import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Navigation from "./Routes/Navigation/Navigation";
// import Signin from "./Routes/SignUp/Signin";
// import SignUp from "./Routes/SignUp/SignUp";
import Authentication from "./Routes/Authentication/Authentication";
import Shop from "./Routes/Shop/Shop";
import Checkout from "./Components/Checkout/Checkout";

// const Shop = () => {
//     return (
//         <div>
//             <h1>This is the Shop page.</h1>
//         </div>
//     );
// };

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                {/* <Route path="home" element={<Home />} /> */}
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
                {/* <Route path="sign-up" element={<Signin />}>
                    <Route index element={<SignUp />} />
                </Route> */}
            </Route>
        </Routes>
    );
}

export default App;
