import { ComponentProps, FC } from 'react';
import { cn } from '../lib/tailwind-utils';

type PinkBoxProps = ComponentProps<'div'> & {
  className?: string;
  children?: React.ReactNode;
};

const PinkBox: FC<PinkBoxProps> = ({ className, children }) => {
  return <div className={cn('bg-hackathon-pink text-white font-body', className)}>{children}</div>;
};

export default PinkBox;
