import { Link } from "react-router-dom";
import Logo from "./Logo";

const PageHeader = () => (
  <header className="flex justify-center pt-5">
    <Link aria-label="Go home" to="/">
      <Logo className="size-10" />
    </Link>
  </header>
);

export default PageHeader;
