import { useState } from "react";
import { Input } from "../../components/Input";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { MenuIn } from "../../components/MenuIn";

export default () => {
  const links = [
    {
      name: "CONFIGURAÇÕES",
      url: "/consumer",
    },
    {
      name: "DADOS",
      url: "#",
    },
  ];

  const [name, Name] = useState("");
  const [email, Email] = useState("");
  const [password, Password] = useState("");
  const [rePassword, RePassword] = useState("");
  const [phone, Phone] = useState("");
  const [city, City] = useState("");
  const [state, State] = useState("");
  const [neighborhood, Neighborhood] = useState("");
  const [street, Street] = useState("");
  const [number, Number] = useState("");
  const [complement, Complement] = useState("");

  function Account(e) {
    e.preventDefault();

    if (name === "") return;
    if (email === "") return;
    if (password === "") return;
    if (rePassword === "") return;
    if (phone === "") return;
    if (password !== rePassword) return;

    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
  }

  return (
    <div>
      <MenuIn select={1} />
      <section className="center">
        <Breadcrumbs links={links} />
        <br />
        <form className="box" onSubmit={(e) => Account(e)}>
          <p className="form_title">PESSOAL</p>
          <div className="field field_grid">
            <Input name="Nome" placeholder="Digite seu nome" onChange={Name} />
            <Input
              name="Email"
              placeholder="Digite seu email"
              onChange={Email}
            />
          </div>
          <p className="form_title">SENHA</p>
          <div className="field field_grid">
            <Input
              name="Senha"
              placeholder="Digite sua senha"
              password={true}
              onChange={Password}
            />
            <Input
              name="Confirme sua senha"
              placeholder="Confirme sua senha"
              password={true}
              onChange={RePassword}
            />
          </div>
          <p className="form_title">Contato</p>
          <div className="field">
            <Input
              name="Telefone"
              placeholder="Confirme seu telefone"
              onChange={Phone}
            />
          </div>
          <br />
          <button className="button button_big" type="submit">
            Atualizar dados
          </button>
        </form>
      </section>
    </div>
  );
};
