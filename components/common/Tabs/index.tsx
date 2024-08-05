import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FunctionComponent,
  useState,
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  ReactNode,
  useEffect,
} from 'react';
import { TabsContainer, TabsContainerProps } from './TabsContainer';
import { TabsItem, TabsItemProps } from './TabsItem';
interface TabsComposition {
  /**
   * Tab Link
   */
  Item: FunctionComponent<TabsItemProps>;
  Page: FunctionComponent<TabsContainerProps>;
}
const Tabs: FunctionComponent<{
  children: ReactNode;
  default?: string;
  isBlocking?: () => Promise<boolean>;
}> &
  TabsComposition = ({ children, ...props }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(props.default!);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (router.query && router.query.tab) {
      setActiveTab(String(router.query.tab));
    } else {
      setActiveTab(props.default!);
    }
    setCurrentPath(router.asPath.split('?')[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, props.default]);

  const getTabItems = () => {
    return Children.map(children, (child) => {
      const item = child as ReactElement<PropsWithChildren<TabsItemProps>>;
      if (!item.props.hide) {
        if (item.type === TabsItem) {
          const isActive = item.props.id === activeTab;
          const onClick = async () => {
            if (props.isBlocking) {
              const block = await props.isBlocking();
              if (!block) {
                router.replace({
                  query: { ...router.query, tab: item.props.id },
                  search:
                    router.query.vehicleId && router.query.vehicleId.length > 0
                      ? null
                      : router.asPath.split('?')[1],
                });
              }
            } else {
              router.replace({
                query: { ...router.query, tab: item.props.id },
              });
            }
            item.props.onClick?.();
          };
          if (item.props.disabled) {
            return (
              <li className={`nav-link not-allowed`}>
                {cloneElement(item, {
                  isActive,
                  onClick,
                  disabled: item.props.disabled,
                })}
              </li>
            );
          } else {
            return (
              <>
                <div className="flex flex-col w-full h-full uppercase">
                  <li
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={async (e: any) => {
                      !item.props.disabled && onClick();
                    }}
                  >
                    {cloneElement(item, {
                      isActive,
                      onClick,
                      disabled: item.props.disabled,
                    })}
                  </li>
                  {isActive && (
                    <div className="flex justify-center">
                      <span className="triangle"></span>
                    </div>
                  )}
                </div>
              </>
            );
          }
        }
      }
    });
  };
  const getTabItemById = (id: string) => {
    const child = Children.toArray(children).find((child) => {
      const item = child as ReactElement<PropsWithChildren<TabsItemProps>>;
      return item.props.id === id && item.type === TabsItem;
    }) as ReactElement<PropsWithChildren<TabsItemProps>>;
    if (child) {
      const isActive = child.props.id === activeTab;
      const onClick = () => {
        child.props.onClick?.();
      };
      if (child.props.disabled) {
        return (
          <div className="accordion-header cursor-not-allowed">
            <div>{cloneElement(child, { isActive, onClick })}</div>
            <div>
              <svg
                className={`w-4 h-4 mt-px ml-2 ${
                  isActive ? 'rotate-180 transform-cpu' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        );
      } else {
        return (
          <div className="accordion-header" onClick={onClick}>
            <Link replace href={`${currentPath}?tab=${child.props.id}`}>
              <a className="flex justify-between w-full">
                <div>{cloneElement(child, { isActive, onClick })}</div>
                <div>
                  <svg
                    className={`w-4 h-4 mt-px ml-2 ${
                      isActive ? 'rotate-180 transform-cpu' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>
            </Link>
          </div>
        );
      }
    }
    return null;
  };
  const isTabContainerActive = (id: string): boolean => {
    return Children.toArray(children).some((child) => {
      const item = child as ReactElement<PropsWithChildren<TabsItemProps>>;
      return (
        item.props.id === id && item.type === TabsItem && !item.props.disabled
      );
    });
  };
  return (
    <div className="gogo-tab">
      <div className="tab">
        <ul className="nav-tabs">{getTabItems()}</ul>
        {Children.map(children, (child) => {
          const item = child as ReactElement<
            PropsWithChildren<TabsContainerProps>
          >;
          if (!item.props.hide) {
            if (item.type === TabsContainer) {
              const isActive = item.props.id === activeTab;
              return (
                <div className="tab-content accordion">
                  {getTabItemById(item.props.id)}
                  {isTabContainerActive(item.props.id) ? (
                    cloneElement(item, { isActive })
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};
Tabs.Item = TabsItem;
Tabs.Page = TabsContainer;
export { Tabs };
