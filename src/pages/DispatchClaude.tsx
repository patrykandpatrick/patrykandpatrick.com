import { Send } from "lucide-react";
import { type SyntheticEvent, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

const defaults = {
  pat: "",
};

type SettingsKey = keyof typeof defaults;

const settingKeys = Object.keys(defaults) as SettingsKey[];
const repo = "patrykandpatrick/vico";
const workflow = "dispatch-claude.yml";
const branch = "master";

const storageKey = (key: SettingsKey) => `dispatchClaude.${key}`;

const resizeTextArea = (element: HTMLTextAreaElement) => {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};

const getInitialSettings = () =>
  settingKeys.reduce(
    (nextSettings, key) => ({
      ...nextSettings,
      [key]: localStorage.getItem(storageKey(key)) ?? defaults[key],
    }),
    defaults,
  );

const DispatchClaude = () => {
  const requestTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [request, setRequest] = useState("");
  const [settings, setSettings] = useState(getInitialSettings);
  const [isDispatching, setIsDispatching] = useState(false);

  useEffect(() => {
    document.title = "Dispatch Claude | Patryk & Patrick";
  }, []);

  useEffect(() => {
    if (requestTextAreaRef.current) {
      resizeTextArea(requestTextAreaRef.current);
    }
  }, [request]);

  const updateSetting = (key: SettingsKey, value: string) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedRequest = request.trim();
    const pat = settings.pat.trim();

    if (!trimmedRequest) return;

    if (!pat) {
      window.alert("Set a GitHub PAT first.");
      return;
    }

    settingKeys.forEach((key) => {
      localStorage.setItem(storageKey(key), settings[key]);
    });

    setIsDispatching(true);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${pat}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: JSON.stringify({
            ref: branch,
            inputs: { request: trimmedRequest },
          }),
        },
      );

      if (response.status === 204) {
        setRequest("");
      } else {
        window.alert(`Dispatch failed (${response.status}).`);
      }
    } catch {
      window.alert("Network error.");
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col bg-brand-red text-white">
      <PageHeader />
      <div className="flex flex-1 flex-col py-16">
        <div className="m-auto w-full max-w-xl px-5">
          <h1 className="font-display text-3xl">Dispatch Claude</h1>

          <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Request
              <textarea
                ref={requestTextAreaRef}
                autoFocus
                className="min-h-36 resize-none overflow-hidden rounded-md bg-white px-3 py-2 font-normal leading-6 text-black shadow-[0.25rem_0.25rem_0_0_black] outline-none transition focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none"
                required
                value={request}
                onChange={(event) => {
                  setRequest(event.currentTarget.value);
                  resizeTextArea(event.currentTarget);
                }}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              GitHub PAT
              <input
                autoComplete="off"
                className="rounded-md bg-white px-3 py-2 font-normal text-black shadow-[0.25rem_0.25rem_0_0_black] outline-none transition focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none"
                type="password"
                value={settings.pat}
                onChange={(event) => updateSetting("pat", event.target.value)}
              />
            </label>

            <Button
              className="justify-center gap-2 px-5 py-3 font-semibold"
              disabled={isDispatching}
              icon={Send}
              type="submit"
            >
              Dispatch
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default DispatchClaude;
