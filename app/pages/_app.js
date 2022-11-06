import { createContext, useContext, useState } from "react";
import "../styles/globals.css";

export const AppContext = createContext();
function MyApp({ Component, pageProps }) {
  const [chainId, setChainId] = useState();
  // useEffect(() => {
  //   if (window !== undefined) {
  //     const chainId = localStorage.getItem("chainId");
  //     if (chainId) {
  //       setChainId(chainId);
  //     }
  //   }
  // }, []);
  return (
    <AppContext.Provider value={{ chainId, setChainId }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;

export function useAppContext() {
  return useContext(AppContext);
}
