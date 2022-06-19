import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/users", "UsersController.create");
  Route.post("/users/login", "UsersController.login");
});

Route.group(() => {
  Route.group(() => {
    Route.get("/users", "UsersController.index");
    Route.put("/users", "UsersController.update");
  });

  Route.group(() => {
    Route.post("/consumers", "ConsumersController.create");
    Route.get("/consumers", "ConsumersController.index");
    Route.get("/consumers/interests", "ConsumersController.getInterests");
    Route.post("/consumers/interests", "ConsumersController.setInterests");
    Route.get("/consumers/signature", "ConsumersController.getSignature");
    Route.post("/consumers/signature", "ConsumersController.setSignature");
    Route.post("/consumers/signature/renovation", "ConsumersController.setRenovation");
    Route.get("/consumers/signature/items", "ConsumersController.getSignatureItems");
    Route.post("/consumers/signature/items", "ConsumersController.setSignatureItems");
  });

  Route.group(() => {
    Route.post("/producers", "ProducersController.create");
    Route.get("/producers", "ProducersController.index");
  });

  Route.group(() => {
    Route.post("/addresses", "AddressesController.create");
    Route.get("/addresses", "AddressesController.index");
    Route.delete("/addresses/:code", "AddressesController.delete");
    Route.patch("/addresses/:code", "AddressesController.main");
  });

  Route.group(() => {
    Route.get("/products", "ProductsController.index");
  });

  Route.group(() => {
    Route.get("/plans", "PlansController.index");
  });
}).middleware("auth:api");
