import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    if (fetching || !data?.me) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [fetching, data]);
  return isAuth;
};
