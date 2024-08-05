import { FC, ReactElement } from 'react';
import { CloseIcon } from '../icons';

type PrivatePageLayoutProps = {
  /**
   * JSX Element/HTML content of modal footer.
   */
  children: JSX.Element;
  /**
   * This property use to hide/show back button for page.
   */
  showBackButton?: boolean;
  /**
   * This property use to display page title.
   */
  title?: string;

  dir?: 'rtl' | 'ltr';
};

const PrivatePageLayout: FC<PrivatePageLayoutProps> = ({
  children,
  showBackButton = false,
  title,
  dir,
}: PrivatePageLayoutProps): ReactElement => {
  return (
    <div className="main-container" dir={dir!}>
      {(showBackButton || title) && (
        <header className="text-3xl pb-[30px] font-bold">
          <div className="flex gap-4 items-center">
            {showBackButton && (
              <div
                onClick={() => {
                  console.log(`back button clicked`);
                }}
              >
                <CloseIcon />
              </div>
            )}
            {title && <label>{title}</label>}
          </div>
        </header>
      )}
      <div>{children}</div>
    </div>
  );
};
export default PrivatePageLayout;
