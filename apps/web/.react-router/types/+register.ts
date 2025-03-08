import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/dashboard": {};
  "/settings": {};
  "/login": {};
  "/register": {};
  "/*": {
    "*": string;
  };
};