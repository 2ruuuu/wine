import ButtonProps from './type';

const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  const commonBase =
    'inline-flex items-center justify-center font-body-sm md:font-body-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none';
  const commonRect = 'h-10.5 md:h-12.5 font-medium md:font-bold rounded-[4px]';
  const commonOutline =
    'border border-gray-300 hover:bg-[hsl(0,0%,98%)] active:bg-[hsl(0,0%,95%)]';

  const variants = {
    primary: `${commonRect} bg-black text-white hover:bg-[hsl(30,2%,19%)] active:bg-[hsl(30,1%,28%)]`,
    outline: `${commonRect} ${commonOutline} bg-white text-black`,
    social: `${commonOutline} h-12 md:h-13 bg-white font-medium text-black rounded-[4px]`,
    arrow:
      'p-3 bg-white rounded-full border border-[hsl(0,0%,95%)] shadow-[0px_2px_20px_0px_hsla(0,0%,0%,0.04)] hover:bg-gray-100 active:bg-[hsl(30,1%,28%)] active:border-[hsl(30,1%,28%)]',
  };

  const arrowIconActive =
    variant === 'arrow' ? 'group-active:brightness-0 group-active:invert' : '';

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`group ${commonBase} ${variants[variant]} ${widthStyle} ${className} disabled:bg-gray-600 disabled:cursor-not-allowed`}
      {...props}
    >
      {icon && (
        <span className={`${children ? 'mr-2' : ''} ${arrowIconActive}`}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
