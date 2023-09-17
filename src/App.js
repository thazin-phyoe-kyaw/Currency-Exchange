import { Suspense } from "react";
import CurrencyExchange from "./page/CurrencyExchange.jsx";
import Loading from "./components/Loading.jsx";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <CurrencyExchange />
    </Suspense>
  );
}
export default App;
