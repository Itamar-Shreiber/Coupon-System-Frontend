abstract class Config {}

class Development extends Config {
  public urls = {
   admin:"http://localhost:8080/api/admin",
   company:"http://localhost:8080/api/companies",
   customer:"http://localhost:8080/api/customers",
   auth:"http://localhost:8080/api/users",
  };
}

class Production extends Config {
  public urls = {
   admin:"http://localhost:8080/api/admin",
   company:"http://localhost:8080/api/companies",
   customer:"http://localhost:8080/api/customers",
   auth:"http://localhost:8080/api/users",
  };
}

const global =
  process.env.NODE_ENV === "development" ? new Development() : new Production();
export default global;
