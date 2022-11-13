import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, User] = useState();
  const [token, Token] = useState();
  const [consumer, Consumer] = useState();
  const [producer, Producer] = useState();

  function localUser(data) {
    User(data);
    localStorage.setItem("user", JSON.stringify(data));
  }
  function localToken(data) {
    Token(data);
    localStorage.setItem("token", JSON.stringify(data));
  }
  function localConsumer(data) {
    Consumer(data);
    localStorage.setItem("consumer", JSON.stringify(data));
  }
  function localProducer(data) {
    Producer(data);
    localStorage.setItem("producer", JSON.stringify(data));
  }

  function LocalStore() {
    const localUser = localStorage.getItem("user");
    if (localUser && localUser !== "undefined") {
      User(JSON.parse(localUser));
    }

    const localToken = localStorage.getItem("token");
    if (localToken && localToken !== "undefined") {
      Token(JSON.parse(localToken));
    }

    const localConsumer = localStorage.getItem("consumer");
    if (localConsumer && localConsumer !== "undefined") {
      Consumer(JSON.parse(localConsumer));
    }

    const localProducer = localStorage.getItem("producer");
    if (localProducer && localProducer !== "undefined") {
      Producer(JSON.parse(localProducer));
    }
  }

  useEffect(() => {
    LocalStore();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        User: localUser,
        token,
        Token: localToken,
        consumer,
        Consumer: localConsumer,
        producer,
        Producer: localProducer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
