import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
  SVGProps,
} from "react";

type BaseProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
};

type ButtonAnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = ButtonAnchorProps | NativeButtonProps;

const getButtonClasses = ({ className = "" }: { className?: string }) =>
  [
    "flex items-center gap-3 rounded-full bg-white px-4 py-4 font-medium tracking-[-0.0125em] text-black shadow-[0.25rem_0.25rem_0_0_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0_0_0_0_black] disabled:cursor-progress disabled:opacity-50 cursor-pointer",
    className,
  ].join(" ");

const isAnchorButton = (props: ButtonProps): props is ButtonAnchorProps => "href" in props;

const Button = (props: ButtonProps) => {
  if (isAnchorButton(props)) {
    const { icon: Icon, children, className, ...anchorProps } = props;

    return (
      <a className={getButtonClasses({ className })} {...anchorProps}>
        <Icon className="size-6" />
        {children}
      </a>
    );
  }

  const { icon: Icon, children, className, ...buttonProps } = props;

  return (
    <button className={getButtonClasses({ className })} {...buttonProps}>
      <Icon className="size-6" />
      {children}
    </button>
  );
};

export default Button;
