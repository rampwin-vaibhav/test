import { FunctionComponent, ReactElement } from 'react';

export interface TabsItemProps {
  id: string;
  isActive?: boolean;
  onClick?: () => void;
  children: ReactElement;
  disabled?: boolean;
  hide?: boolean;
}

export const TabsItem: FunctionComponent<TabsItemProps> = ({
  children,
  disabled,
  isActive = false,
  hide = false,
  onClick,
}) => <>{children}</>;
