import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth";
import { MenuBack } from "../../components/MenuBack";
import { Steps } from "../../components/Steps";
import { Plans } from "../../components/Plans";
import { Interests } from "../../components/Interests";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import Api from "../../Api";

export const FormPlans = ({ plans, onSubmit }) => {
  const defaultSelected = plans[0].id;
  const [myPlan, MyPlan] = useState(defaultSelected);

  return (
    <form className="box" onSubmit={(e) => onSubmit(e, myPlan)}>
      <p className="form_title">SELECIONE O PLANO</p>
      <div className="field">
        <Plans
          plans={plans}
          onChange={(plan) => MyPlan(plan)}
          defaultPlan={defaultSelected}
        />
      </div>
      <br />
      <button className="button button_big">Próximo</button>
    </form>
  );
};

export const FormInterests = ({ products, onSubmit }) => {
  const [myInterests, MyInterests] = useState([]);

  return (
    <form className="box" onSubmit={(e) => onSubmit(e, myInterests)}>
      <p className="form_title">SELECIONE SEUS INTERESES</p>
      <div className="field">
        <Interests
          products={products}
          onChange={(interests) => MyInterests(interests)}
        />
      </div>
      <br />
      <button className="button button_big" type="submit">
        Próximo
      </button>
    </form>
  );
};

export const FormAccount = ({ onSubmit }) => {
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
    if (city === "") return;
    if (state === "") return;
    if (neighborhood === "") return;
    if (street === "") return;
    if (number === "") return;

    onSubmit({
      name: name,
      email: email,
      password: password,
      phone: phone,
      city: city,
      state: state,
      neighborhood: neighborhood,
      street: street,
      number: number,
      complement: complement,
    });
  }

  return (
    <form className="box" onSubmit={(e) => Account(e)}>
      <p className="form_title">PESSOAL</p>
      <div className="field field_grid">
        <Input name="Nome" placeholder="Digite seu nome" onChange={Name} />
        <Input name="Email" placeholder="Digite seu email" onChange={Email} />
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
      <p className="form_title">ENDEREÇO</p>
      <div className="field field_grid">
        <Input name="Cidade" placeholder="Digite sua cidade" onChange={City} />
        <Select
          name="Estado"
          placeholder="Digite seu estado"
          options={[
            { value: "AC", name: "Acre" },
            { value: "AL", name: "Alagoas" },
            { value: "AP", name: "Amapá" },
            { value: "AM", name: "Amazonas" },
            { value: "BA", name: "Bahia" },
            { value: "CE", name: "Ceará" },
            { value: "DF", name: "Distrito Federal" },
            { value: "ES", name: "Espirito Santo" },
            { value: "GO", name: "Goiás" },
            { value: "MA", name: "Maranhão" },
            { value: "MS", name: "Mato Grosso do Sul" },
            { value: "MT", name: "Mato Grosso" },
            { value: "MG", name: "Minas Gerais" },
            { value: "PA", name: "Pará" },
            { value: "PB", name: "Paraíba" },
            { value: "PR", name: "Paraná" },
            { value: "PE", name: "Pernambuco" },
            { value: "PI", name: "Piauí" },
            { value: "RJ", name: "Rio de Janeiro" },
            { value: "RN", name: "Rio Grande do Norte" },
            { value: "RS", name: "Rio Grande do Sul" },
            { value: "RO", name: "Rondônia" },
            { value: "RR", name: "Roraima" },
            { value: "SC", name: "Santa Catarina" },
            { value: "SP", name: "São Paulo" },
            { value: "SE", name: "Sergipe" },
            { value: "TO", name: "Tocantins" },
          ]}
          onChange={State}
        />
      </div>
      <div className="field">
        <Input
          name="Bairro"
          placeholder="Digite seu bairro"
          onChange={Neighborhood}
        />
      </div>
      <div className="field field_grid">
        <Input name="Rua" placeholder="Digite sua rua" onChange={Street} />
        <Input
          name="Número"
          placeholder="Digite seu número"
          type="number"
          onChange={Number}
        />
      </div>
      <div className="field">
        <Input
          name="Complemento"
          placeholder="Digite um complemento"
          onChange={Complement}
        />
      </div>
      <br />
      <button className="button button_big" type="submit">
        Próximo
      </button>
    </form>
  );
};

export const FormPayment = ({ onSubmit }) => {
  return (
    <form className="box" onSubmit={(e) => onSubmit(e)}>
      <button className="button button_big" type="submit">
        Finalizar
      </button>
    </form>
  );
};

export default () => {
  const steps = [
    "Escolha seu plano",
    "Selecione seus intereses",
    "Crie sua conta",
    "Pagamento",
  ];

  const navegate = useNavigate();
  const authContext = useContext(AuthContext);
  const [allPlans, AllPlans] = useState([]);
  const [allProducts, AllProducts] = useState([]);

  async function ApiPlans() {
    const response = await Api.get("/plans");
    AllPlans(response.data);
  }
  async function ApiProducts() {
    const response = await Api.get("/products");
    AllProducts(response.data);
  }
  async function ApiConsumer(data) {
    const response = await Api.post("/consumer", data);
    return response.data;
  }

  useEffect(() => {
    ApiPlans();
    ApiProducts();
  }, []);

  const [step, Step] = useState(1);
  const [myPlan, MyPlan] = useState();
  const [myInterests, MyInterests] = useState();
  const [myAccount, MyAccount] = useState();

  function formPlans(e, plan) {
    e.preventDefault();
    MyPlan(plan);
    Step(($) => $ + 1);
  }
  function formInterests(e, interests) {
    e.preventDefault();
    MyInterests(interests);
    Step(($) => $ + 1);
  }
  function formAccount(account) {
    MyAccount(account);
    Step(($) => $ + 1);
  }
  async function formPayment(e) {
    e.preventDefault();

    const data = await ApiConsumer({
      plan_id: myPlan,
      interest_ids: myInterests,
      ...myAccount,
    });

    authContext.Token(data.token);
    authContext.User(data.user);
    authContext.Consumer(data.consumer);
    return navegate("/");
  }

  return (
    <main>
      <MenuBack />
      <section className="center">
        <Steps names={steps} select={step} />
        <br />
        {step === 1 && allPlans.length > 0 && (
          <FormPlans plans={allPlans} onSubmit={formPlans} />
        )}
        {step === 2 && (
          <FormInterests products={allProducts} onSubmit={formInterests} />
        )}
        {step === 3 && <FormAccount onSubmit={formAccount} />}
        {step === 4 && <FormPayment onSubmit={formPayment} />}
      </section>
    </main>
  );
};
