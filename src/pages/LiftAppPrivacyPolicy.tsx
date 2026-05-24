import { useEffect } from "react";
import PageHeader from "../components/PageHeader";

const LiftAppPrivacyPolicy = () => {
  useEffect(() => {
    document.title = "LiftApp privacy policy | Patryk & Patrick";
  }, []);

  return (
    <main className="flex min-h-dvh flex-col bg-brand-red text-white">
      <PageHeader />
      <div className="flex flex-1 flex-col py-16">
        <div className="m-auto w-full max-w-xl px-5">
          <h1 className="font-display text-3xl">LiftApp privacy policy</h1>
          <p className="mt-8 text-balance">
            LiftApp collects no personal or non-personal information. It goes online only to update
            the release notes and preloaded photos.
          </p>
        </div>
      </div>
    </main>
  );
};

export default LiftAppPrivacyPolicy;
