import Spin from "../spin";
import { ComponentSize } from "../types";

export interface ListProps<T> {
  bordered?: boolean;
  className?: string;
  // rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dataSource?: T[];
  extra?: React.ReactNode;
  // grid?: ListGridType;
  // id?: string;
  // itemLayout?: ListItemLayout;
  loading?: boolean;
  loadMore?: React.ReactNode;
  // pagination?: PaginationConfig | false;
  // prefixCls?: string;
  rowKey?: ((item: T) => React.Key) | keyof T;
  renderItem?: (item: T, index: number) => React.ReactNode;
  size?: ComponentSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  // locale?: ListLocale;
}

const List = <T = string,>({
  // pagination = false as ListProps<any>['pagination'],
  // prefixCls: customizePrefixCls,
  bordered = false,
  split = true,
  className,
  // rootClassName,
  style,
  children,
  // itemLayout,
  loadMore,
  // grid,
  dataSource = [],
  size,
  header,
  footer,
  loading = false,
  rowKey,
  renderItem,
  // locale,
  ...rest
}: ListProps<T>) => {
  return (
    <>
      {header && <div>{header}</div>}
      <Spin {...loadingProp}>
        {/* {childrenContent} */}
        {children}
      </Spin>
      {footer && <div>{footer}</div>}
    </>
  );
};

export default List;
