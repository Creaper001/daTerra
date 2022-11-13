import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../Auth";
import Api from "../../Api";
import { MenuIn } from "../../components/MenuIn";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Interests } from "../../components/Interests";

export default () => {
  const links = [
    {
      name: "CONFIGURAÇÕES",
      url: "/consumer",
    },
    {
      name: "INTERESSES",
      url: "#",
    },
  ];

  const authContext = useContext(AuthContext);
  const [allProducts, AllProducts] = useState();
  const [myInterests, MyInterests] = useState();

  async function ApiProducts() {
    const response = await Api.get("/products");
    AllProducts(response.data);
  }
  async function ApiGetInterests() {
    const response = await Api.get("/consumer/interests", {
      headers: {
        Authorization: `Bearer ${authContext.token.token}`,
      },
    });
    MyInterests(response.data.map(({ product_id }) => product_id));
  }
  async function ApiSetInterests(data) {
    await Api.put(
      "/consumer/interests",
      { interest_ids: data },
      {
        headers: {
          Authorization: `Bearer ${authContext.token.token}`,
        },
      }
    );
  }
  function onChange(interests) {
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    if (!equals(interests, myInterests)) {
      MyInterests(interests);
      ApiSetInterests(interests);
    }
  }

  useEffect(() => {
    if (authContext.token) {
      ApiProducts();
      ApiGetInterests();
    }
  }, []);

  return (
    <main>
      <MenuIn select={1} />
      <section className="center">
        <Breadcrumbs links={links} />
        <br />
        <br />
        <div className="search search_full">
          <input type="text" placeholder="Buscar aqui" />
          <img src="/icons/search.svg" />
        </div>
        <br />
        {allProducts && myInterests && (
          <Interests
            products={allProducts}
            defaultInterests={myInterests}
            onChange={(interests) => onChange(interests)}
          />
        )}
      </section>
    </main>
  );
};
