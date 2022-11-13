/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/plans", "PlansController.index");
  Route.get("/products", "ProductsController.index");
});

Route.group(() => {
  Route.put("/address", "");
}).prefix("/user");

Route.group(() => {
  Route.post("/auth", "ConsumersController.index");
  Route.post("/", "ConsumersController.create");
  Route.put("/", "");

  Route.get("/interests", "ConsumersController.getInterests");
  Route.put("/interests", "ConsumersController.setInterests");

  Route.get("/plan", "");
  Route.put("/plan", "");

  Route.get("/boxes", "BoxesController.consumers");
}).prefix("/consumer");

Route.group(() => {
  Route.post("/auth", "ProducersController.index");
  Route.post("/", "ProducersController.create");
  Route.put("/", "");

  Route.get("/products", "");
  Route.put("/products", "");

  Route.get("/boxes", "BoxesController.producers");
  Route.put("/boxes", "");
}).prefix("/producers");

Route.get("/boxes", "BoxesController.create");
