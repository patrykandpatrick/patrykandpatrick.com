import { useEffect } from "react";
import { useParams } from "react-router-dom";

type Props =
  | { to: string; build?: never }
  | { to?: never; build: (params: Record<string, string>) => string };

const Redirect = ({ to, build }: Props) => {
  const params = useParams() as Record<string, string>;
  useEffect(() => {
    const url = to ?? build!(params);
    window.location.replace(url);
  }, [to, build, params]);
  return null;
};

export default Redirect;
