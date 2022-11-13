import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ConsumerSignUp from "./pages/consumer/SignUp";
import Consumer from "./pages/consumer";
import ConsumerAccount from "./pages/consumer/Account";
import ConsumerPlan from "./pages/consumer/Plan";
import Boxes from "./pages/consumer/Boxes";
import Interests from "./pages/consumer/Interests";
import ProducerSignUp from "./pages/producer/SignUp";
import Producer from "./pages/producer";
import Requests from "./pages/producer/Requests";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/consumer/signup" element={<ConsumerSignUp />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/consumer/account" element={<ConsumerAccount />} />
        <Route path="/consumer/plan" element={<ConsumerPlan />} />
        <Route path="/consumer/boxes" element={<Boxes />} />
        <Route path="/consumer/interests" element={<Interests />} />
        <Route path="/producer/signup" element={<ProducerSignUp />} />
        <Route path="/producer" element={<Producer />} />
        <Route path="/producer/requests" element={<Requests />} />
      </Routes>
    </AuthProvider>
  );
};
