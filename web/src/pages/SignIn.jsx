import { Input } from "../components/Input";
import "../assets/pages/SignIn.css";
import Api from "../Api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth";
import { useNavigate } from "react-router-dom";

export default () => {
  const navegate = useNavigate();
  const authContext = useContext(AuthContext);
  const [email, Email] = useState("");
  const [password, Password] = useState("");

  function isAuth() {
    const { producer, consumer } = authContext;
    if (consumer || producer) navegate("/");
  }

  async function Auth(e) {
    e.preventDefault();

    const user = { email, password };
    const dataConsumer = await Api.post("/consumer/auth", user).catch(
      () => false
    );
    const dataProducer = await Api.post("/producers/auth", user).catch(
      () => false
    );

    const data = dataConsumer ? dataConsumer.data : dataProducer.data;

    authContext.Token(data.token);
    authContext.User(data.user);

    if (data.consumer) {
      authContext.Consumer(data.consumer);
    } else if (data.producer) {
      authContext.Producer(data.producer);
    }

    return navegate("/");
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <main className="signin">
      <form className="signin_form" onSubmit={Auth}>
        <div className="signin_head">
          <img src="/daterra.svg" alt="DaTerra" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </div>
        <div className="field">
          <Input
            name="Email"
            placeholder="Confirme seu email"
            onChange={Email}
          />
        </div>
        <div className="field">
          <Input
            name="Senha"
            placeholder="Confirme sua senha"
            password={true}
            onChange={Password}
          />
        </div>
        <br />
        <button className="button button_login" type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
};
