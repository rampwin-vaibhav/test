import { FunctionComponent, ReactElement } from 'react';

export interface TabsContainerProps {
  id: string;
  isActive?: boolean;
  children: ReactElement;
  hide?: boolean;
}

export const TabsContainer: FunctionComponent<TabsContainerProps> = ({
  children,
  isActive = false,
  hide = false,
}) => {
  return (
    <>
      {isActive && (
        <div className="tab-page">
          <div className="card-body"></div>
          {children}
        </div>
      )}
    </>
  );
};
