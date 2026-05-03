interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={`
        w-full
        mx-auto
        px-4
        tablet:px-0
        tablet:max-w-[704px]
        pc:max-w-[1140px]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
