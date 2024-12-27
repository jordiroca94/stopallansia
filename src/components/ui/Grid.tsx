type Props = {
  children: React.ReactNode;
  className?: string;
  customGap?: string;
};

const Grid = ({ children, className, customGap }: Props) => {
  return (
    <div
      className={`${className} ${
        customGap ? customGap : "gap-4 lg:gap-8"
      } grid grid-cols-4 lg:grid-cols-12`}
    >
      {children}
    </div>
  );
};

export default Grid;
