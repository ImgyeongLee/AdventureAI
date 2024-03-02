import { ComponentProps, FC } from 'react';
import { cn } from '../lib/tailwind-utils';

type RoleCardProps = ComponentProps<'div'> & {
  className?: string;
  children?: React.ReactNode;
};

const RoleCard: FC<RoleCardProps> = ({ className, children }) => {
  return <div className={cn('bg-hackathon-dark-purple text-white font-body', className)}>{children}</div>;
};

export default RoleCard;
