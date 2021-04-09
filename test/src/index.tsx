import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AdminApp } from "@iamyth/web-ui/admin/AdminApp";
import { NavigationService } from "./navigationService";

const App = React.memo(() => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AdminApp logoSrc={""} navigationService={NavigationService} />
      </BrowserRouter>
    </ChakraProvider>
  );
});

ReactDOM.render(<App />, document.getElementById("app"));
