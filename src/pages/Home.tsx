import { SiGithub } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import Button from "../components/Button";
import Logo from "../components/Logo";

const Home = () => (
  <div className="min-h-dvh flex items-center justify-center bg-brand-red">
    <div className="w-full max-w-screen-md px-5 py-16 flex flex-col items-center gap-8">
      <Logo className="size-20" />
      <h1 className="text-white text-3xl font-display text-center">
        Patryk &amp; Patrick
      </h1>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        <Button icon={SiGithub} href="https://github.com/patrykandpatrick">
          GitHub
        </Button>
        <Button icon={Mail} href="mailto:contact@patrykandpatrick.com">
          Email
        </Button>
      </div>
    </div>
  </div>
);

export default Home;
