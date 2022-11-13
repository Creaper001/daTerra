import { useContext, useState, useEffect } from "react";
import { MenuBack } from "../../components/MenuBack";
import { Steps } from "../../components/Steps";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Textarea } from "../../components/Textarea";
import { Products } from "../../components/Products";
import { AuthContext } from "../../Auth";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";

export const FormAccount = ({ onSubmit }) => {
  const [name, Name] = useState("");
  const [email, Email] = useState("");
  const [cpf, CPF] = useState("");
  const [rg, RG] = useState("");
  const [password, Password] = useState("");
  const [rePassword, RePassword] = useState("");
  const [phone, Phone] = useState("");

  function Account(e) {
    e.preventDefault();

    if (name === "") return;
    if (email === "") return;
    if (cpf === "") return;
    if (rg === "") return;
    if (password === "") return;
    if (rePassword === "") return;
    if (phone === "") return;
    if (password !== rePassword) return;

    onSubmit({
      name: name,
      email: email,
      cpf: cpf,
      rg: rg,
      password: password,
      phone: phone,
    });
  }

  return (
    <form className="box" onSubmit={(e) => Account(e)}>
      <p className="form_title">PESSOAL</p>
      <div className="field field_grid">
        <Input name="Nome" placeholder="Digite seu nome" onChange={Name} />
        <Input name="Email" placeholder="Digite seu email" onChange={Email} />
        <Input name="CPF" placeholder="Digite seu CPF" onChange={CPF} />
        <Input name="RG" placeholder="Digite seu RG" onChange={RG} />
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
        Próximo
      </button>
    </form>
  );
};

export const FormFarm = ({ onSubmit }) => {
  const [history, History] = useState("");
  const [city, City] = useState("");
  const [state, State] = useState("");
  const [neighborhood, Neighborhood] = useState("");
  const [street, Street] = useState("");
  const [number, Number] = useState("");
  const [complement, Complement] = useState("");

  function Farm(e) {
    e.preventDefault();

    if (history === "") return;
    if (city === "") return;
    if (state === "") return;
    if (neighborhood === "") return;
    if (street === "") return;
    if (number === "") return;

    onSubmit({
      history: history,
      city: city,
      state: state,
      neighborhood: neighborhood,
      street: street,
      number: number,
      complement: complement,
    });
  }

  return (
    <form className="box" onSubmit={(e) => Farm(e)}>
      <p className="form_title">HISTÓRIA</p>
      <div className="field">
        <Textarea
          name="História"
          placeholder="Conte sua história"
          onChange={History}
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

export const FormProducts = ({ products = [], onSubmit }) => {
  const [myProducts, MyProducts] = useState(products);

  return (
    <form className="box" onSubmit={(e) => onSubmit(e, myProducts)}>
      <p className="form_title">PRODUÇÂO</p>
      <div className="field">
        <Products products={myProducts} onChange={MyProducts} />
      </div>
      <br />
      <button className="button button_big" type="submit">
        Finalizar
      </button>
    </form>
  );
};

export default () => {
  const steps = ["Dados Pessoais", "Sobre a Fazenda", "Produção"];

  const navegate = useNavigate();
  const authContext = useContext(AuthContext);
  const [allProducts, AllProducts] = useState([]);

  async function ApiProducts() {
    const response = await Api.get("/products");
    const products = Object.values(response.data).flat(1);
    AllProducts(products);
  }
  async function ApiProducer(data) {
    const response = await Api.post("/producers", data);
    return response.data;
  }

  useEffect(() => {
    ApiProducts();
  }, []);

  const [step, Step] = useState(1);
  const [myAccount, MyAccount] = useState();
  const [myFarm, MyFarm] = useState();

  function formAccount(account) {
    MyAccount(account);
    Step(($) => $ + 1);
  }
  function formFarm(farm) {
    MyFarm(farm);
    Step(($) => $ + 1);
  }
  async function formProducts(e, products) {
    e.preventDefault();
    const myProducts = products.filter(({ units }) => {
      return units && units > 0;
    });

    const data = await ApiProducer({
      products: myProducts,
      ...myAccount,
      ...myFarm,
    });

    authContext.Token(data.token);
    authContext.User(data.user);
    authContext.Producer(data.producer);
    return navegate("/");
  }

  return (
    <main>
      <MenuBack />
      <section className="center">
        <Steps names={steps} select={step} />
        <br />
        {step === 1 && <FormAccount onSubmit={formAccount} />}
        {step === 2 && <FormFarm onSubmit={formFarm} />}
        {step === 3 && allProducts.length > 0 && (
          <FormProducts products={allProducts} onSubmit={formProducts} />
        )}
      </section>
    </main>
  );
};
