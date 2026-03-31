import React, { useState, useMemo, useCallback } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Inbox,
  ChevronRight as ExpandIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Checkbox } from '../Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';

// ---------------------- TYPES ----------------------
export interface TableColumnType<T> {
  dataIndex?: keyof T | string;
  key?: string | number;
  title?: React.ReactNode;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  hidden?: boolean;
  sorter?: boolean | ((a: T, b: T) => number);
  children?: TableColumnType<T>[];           // ← Grouped Header Support
}

export interface TableExpandable<T> {
  expandedRowRender?: (record: T, index: number) => React.ReactNode;
  expandedRowKeys?: (string | number)[];
  onExpandedChange?: (expandedKeys: (string | number)[]) => void;
  rowExpandable?: (record: T) => boolean;
}

export interface TablePaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
  placement?: 'top' | 'bottom';
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
}

export interface TableRowSelection<T> {
  selectedRowKeys?: (string | number)[];
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  type?: 'checkbox' | 'radio';
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
}

export interface TableAction<T> {
  label: React.ReactNode;
  onClick: (record: T) => void;
  color?: 'default' | 'primary' | 'danger';
  hidden?: (record: T) => boolean;
}

export interface TableProps<T extends Record<string, any>> {
  dataSource?: T[];
  columns: TableColumnType<T>[];
  rowKey?: keyof T | ((record: T) => string | number);
  loading?: boolean;
  skeletonRows?: number;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  scroll?: { x?: number | string; y?: number | string };
  sticky?: boolean;
  showHeader?: boolean;
  pagination?: false | TablePaginationConfig;
  rowSelection?: TableRowSelection<T>;
  rowHoverable?: boolean;
  onRowClick?: (record: T, index: number) => void;
  emptyState?: React.ReactNode;
  onChange?: (
    pagination: TablePaginationConfig,
    sorter: { field?: keyof T | string; order: 'asc' | 'desc' | null }
  ) => void;
  actions?: TableAction<T>[];
  columnsToggle?: boolean | { defaultHidden?: string[] };
  expandable?: TableExpandable<T>;                    // ← Expandable Row
  className?: string;
  wrapperClassName?: string;
}

// ---------------------- STYLES ----------------------
const tableWrapperVariants = cva(
  'w-full overflow-hidden bg-white dark:bg-zinc-950 transition-all duration-300 relative',
  {
    variants: {
      bordered: {
        true: 'border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm',
        false: '',
      },
    },
    defaultVariants: { bordered: true },
  }
);

const thVariants = cva(
  'text-sm font-semibold text-gray-700 dark:text-zinc-300 transition-colors whitespace-nowrap bg-gray-50/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800',
  {
    variants: {
      size: { sm: 'px-4 py-3', md: 'px-6 py-3.5', lg: 'px-8 py-4' },
      sticky: { true: 'sticky top-0 z-20', false: '' },
    },
    defaultVariants: { size: 'md', sticky: false },
  }
);

const tdVariants = cva(
  'text-sm font-normal text-gray-600 dark:text-zinc-400 transition-colors border-b border-gray-100 dark:border-zinc-800/60',
  {
    variants: {
      size: { sm: 'px-4 py-2.5', md: 'px-6 py-4', lg: 'px-8 py-5' },
      ellipsis: { true: 'max-w-0 truncate', false: '' },
    },
    defaultVariants: { size: 'md', ellipsis: false },
  }
);

const SELECTION_COL_WIDTH = 48;
const EXPAND_COL_WIDTH = 48;

// ---------------------- UTILS ----------------------
function getColKey<T>(col: TableColumnType<T>, index: number): string | number {
  if (col.key !== undefined) return col.key;
  if (col.dataIndex !== undefined) return String(col.dataIndex);
  return `col-${index}`;
}

// Helper สำหรับ Grouped Header
const getMaxDepth = <T extends Record<string, any>>(columns: TableColumnType<T>[]): number => {
  return columns.reduce((max, col) => {
    if (col.children && col.children.length > 0) {
      return Math.max(max, 1 + getMaxDepth(col.children));
    }
    return max;
  }, 1);
};

const getFlatColumns = <T extends Record<string, any>>(columns: TableColumnType<T>[]): TableColumnType<T>[] => {
  return columns.reduce<TableColumnType<T>[]>((acc, col) => {
    if (col.children && col.children.length > 0) {
      return acc.concat(getFlatColumns(col.children));
    }
    return acc.concat(col);
  }, []);
};

// ---------------------- COMPONENT ----------------------
export function Table<T extends Record<string, any>>({
  dataSource = [],
  columns,
  rowKey,
  loading = false,
  skeletonRows,
  bordered = true,
  size = 'md',
  scroll,
  sticky = false,
  showHeader = true,
  pagination,
  rowSelection,
  rowHoverable = true,
  onRowClick,
  emptyState,
  onChange,
  actions,
  columnsToggle,
  expandable,
  className = '',
  wrapperClassName = '',
}: TableProps<T>) {

  // --- Expandable Row ---
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<(string | number)[]>([]);

  const expandedRowKeys = expandable?.expandedRowKeys ?? internalExpandedKeys;
  const setExpandedRowKeys = expandable?.onExpandedChange ?? setInternalExpandedKeys;

  const toggleExpand = (key: string | number) => {
    if (expandedRowKeys.includes(key)) {
      setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key));
    } else {
      setExpandedRowKeys([...expandedRowKeys, key]);
    }
  };

  const isRowExpandable = (record: T) => {
    if (!expandable?.expandedRowRender) return false;
    if (expandable.rowExpandable) return expandable.rowExpandable(record);
    return true;
  };

  const hasExpand = !!expandable?.expandedRowRender;

  // --- Row Key ---
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(record);
    if (typeof rowKey === 'string' && record[rowKey as keyof T] !== undefined) {
      return record[rowKey as keyof T] as string | number;
    }
    return index;
  };

  // --- Pagination ---
  const isPaginated = pagination !== false && pagination !== undefined;
  const currentPage = isPaginated ? (pagination?.current ?? 1) : 1;
  const pageSize = isPaginated ? (pagination?.pageSize ?? 10) : 10;
  const total = isPaginated && pagination?.total != null ? pagination.total : dataSource.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginationPlacement = isPaginated ? (pagination?.placement ?? 'bottom') : 'bottom';
  const showPagination = isPaginated && total > pageSize;
  const pageSizeOptions = (isPaginated && pagination?.pageSizeOptions) ? pagination.pageSizeOptions : [10, 20, 50, 100];
  const showSizeChanger = isPaginated ? (pagination?.showSizeChanger !== false) : false;

  // --- Fixed Left Offset ---
  const fixedLeftOffset = (rowSelection ? SELECTION_COL_WIDTH : 0) + (hasExpand ? EXPAND_COL_WIDTH : 0);

  // --- Columns Toggle ---
  const defaultHidden = typeof columnsToggle === 'object' ? columnsToggle.defaultHidden ?? [] : [];
  const [hiddenCols, setHiddenCols] = useState<Set<string | number>>(() => {
    const set = new Set<string | number>(defaultHidden);
    const flat = getFlatColumns(columns);
    flat.forEach((c, i) => { if (c.hidden) set.add(getColKey(c, i)); });
    return set;
  });

  const toggleColumn = (key: string | number) => {
    setHiddenCols((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // --- Sorter ---
  const [sortState, setSortState] = useState<{
    key: string | number;
    direction: 'asc' | 'desc' | null;
    dataIndex?: keyof T | string;
  }>({ key: '', direction: null });

  const handleSort = useCallback((col: TableColumnType<T>, colKey: string | number) => {
    if (!col.sorter) return;
    let nextDir: 'asc' | 'desc' | null = 'asc';
    if (sortState.key === colKey) {
      if (sortState.direction === 'asc') nextDir = 'desc';
      else if (sortState.direction === 'desc') nextDir = null;
    }
    setSortState({ key: colKey, direction: nextDir, dataIndex: col.dataIndex });
    onChange?.(
      { current: currentPage, pageSize },
      { field: col.dataIndex, order: nextDir }
    );
  }, [sortState.key, sortState.direction, onChange, currentPage, pageSize]);

  // --- Column Structure (Grouped Header + Flat Leaf Columns) ---
  const { flatColumns: baseFlatColumns, headerRows } = useMemo(() => {
    const flat: TableColumnType<T>[] = [];
    const rows: React.ReactNode[][] = [];
    const maxDepth = getMaxDepth(columns);

    const traverse = (cols: TableColumnType<T>[], depth: number) => {
      if (!rows[depth]) rows[depth] = [];

      cols.forEach((col) => {
        const colKey = getColKey(col, rows[depth].length);

        if (col.children && col.children.length > 0) {
          const leafCount = getFlatColumns([col]).length;

          rows[depth].push(
            <th
              key={colKey}
              className={thVariants({ size, sticky })}
              colSpan={leafCount}
              style={{ textAlign: col.align }}
            >
              {col.title}
            </th>
          );
          traverse(col.children, depth + 1);
        } else {
          // Leaf column
          const isSorted = sortState.key === colKey;
          const rowSpan = maxDepth - depth + 1;

          rows[depth].push(
            <th
              key={colKey}
              className={cn(
                thVariants({ size, sticky }),
                col.sorter && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 select-none',
                col.fixed === 'left' && 'sticky z-30 bg-gray-50 dark:bg-zinc-950 shadow-[1px_0_0_0_#e5e7eb] dark:shadow-[1px_0_0_0_#27272a]',
                col.fixed === 'right' && 'sticky right-0 z-30 bg-gray-50 dark:bg-zinc-950 shadow-[-1px_0_0_0_#e5e7eb] dark:shadow-[-1px_0_0_0_#27272a]'
              )}
              style={{
                width: col.width,
                textAlign: col.align,
                ...(col.fixed === 'left' ? { left: fixedLeftOffset } : {}),
              }}
              onClick={() => col.sorter && handleSort(col, colKey)}
              rowSpan={rowSpan}
            >
              <div className={cn(
                'flex items-center gap-2',
                col.align === 'center' && 'justify-center',
                col.align === 'right' && 'justify-end'
              )}>
                {col.title}
                {col.sorter && (
                  <span className="flex flex-col -space-y-1">
                    <ChevronUp size={14} className={cn(isSorted && sortState.direction === 'asc' && 'text-indigo-600')} />
                    <ChevronDown size={14} className={cn(isSorted && sortState.direction === 'desc' && 'text-indigo-600')} />
                  </span>
                )}
              </div>
            </th>
          );
        }
      });
    };

    traverse(columns, 0);

    // Collect flat leaf columns
    const collectFlat = (cols: TableColumnType<T>[]) => {
      cols.forEach((col) => {
        if (col.children?.length) {
          collectFlat(col.children);
        } else {
          flat.push(col);
        }
      });
    };
    collectFlat(columns);

    return { flatColumns: flat, headerRows: rows };
  }, [columns, sortState, handleSort, size, sticky, fixedLeftOffset]);

  // --- Active Columns (filtered by hidden + actions) ---
  const activeColumns = useMemo(() => {
    let cols = baseFlatColumns.filter((col, i) => !hiddenCols.has(getColKey(col, i)));

    if (actions && actions.length > 0) {
      cols = [
        ...cols,
        {
          key: '__table_actions__',
          title: '',
          align: 'right' as const,
          width: 100,
          render: (_: any, record: T) => (
            <div className="flex items-center justify-end gap-1.5">
              {actions.map((action, i) => {
                if (action.hidden?.(record)) return null;
                return (
                  <Button
                    key={i}
                    size="sm"
                    variant="text"
                    color={action.color || 'default'}
                    onClick={(e) => { e.stopPropagation(); action.onClick(record); }}
                    className="h-8 px-2.5 text-xs font-medium"
                  >
                    {action.label}
                  </Button>
                );
              })}
            </div>
          ),
        },
      ];
    }
    return cols;
  }, [baseFlatColumns, hiddenCols, actions]);

  // --- Selection ---
  const selectedKeys = useMemo(
    () => new Set(rowSelection?.selectedRowKeys ?? []),
    [rowSelection?.selectedRowKeys]
  );

  const handleSelect = (key: string | number, checked: boolean | 'indeterminate') => {
    if (!rowSelection?.onChange) return;
    let nextKeys: (string | number)[];
    if (rowSelection.type === 'radio') {
      nextKeys = checked === true ? [key] : [];
    } else {
      nextKeys = Array.from(selectedKeys);
      if (checked === true) nextKeys.push(key);
      else nextKeys = nextKeys.filter((k) => k !== key);
    }
    const nextRows = dataSource.filter((d, i) => nextKeys.includes(getRowKey(d, i)));
    rowSelection.onChange(nextKeys, nextRows);
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (!rowSelection?.onChange || rowSelection.type === 'radio') return;
    if (checked === true) {
      const enabledPairs = dataSource
        .map((d, i) => ({ record: d, key: getRowKey(d, i) }))
        .filter(({ record }) => !rowSelection.getCheckboxProps?.(record)?.disabled);
      rowSelection.onChange(
        enabledPairs.map((p) => p.key),
        enabledPairs.map((p) => p.record)
      );
    } else {
      rowSelection.onChange([], []);
    }
  };

  const isAllSelected =
    dataSource.length > 0 &&
    dataSource.every((d, i) => {
      if (rowSelection?.getCheckboxProps?.(d)?.disabled) return true;
      return selectedKeys.has(getRowKey(d, i));
    });
  const isIndeterminate = selectedKeys.size > 0 && !isAllSelected;

  // --- Page Size Changer ---
  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      if (isPaginated && pagination?.onChange) {
        pagination.onChange(1, newSize);
      } else {
        onChange?.({ current: 1, pageSize: newSize }, { field: undefined, order: null });
      }
    },
    [isPaginated, pagination, onChange]
  );

  // --- Data Pipeline ---
  const processedData = useMemo(() => {
    let data = [...dataSource];

    // Local sort — skip when onChange is provided (server-side mode)
    if (sortState.direction && !onChange) {
      const col = activeColumns.find((c, idx) => getColKey(c, idx) === sortState.key);
      const di = col?.dataIndex as string | undefined;
      data.sort((a, b) => {
        if (typeof col?.sorter === 'function') {
          return col.sorter(a, b) * (sortState.direction === 'asc' ? 1 : -1);
        }
        const vA = di ? (a as any)[di] : a;
        const vB = di ? (b as any)[di] : b;
        if (vA < vB) return sortState.direction === 'asc' ? -1 : 1;
        if (vA > vB) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Local pagination — skip when pagination.total is set (server controls total)
    if (isPaginated && !pagination?.total) {
      const start = (currentPage - 1) * pageSize;
      data = data.slice(start, start + pageSize);
    }

    return data;
  }, [dataSource, sortState, onChange, activeColumns, isPaginated, pagination?.total, currentPage, pageSize]);

  const colCount = (rowSelection ? 1 : 0) + (hasExpand ? 1 : 0) + activeColumns.length;

  // --- Render Pagination ---
  const renderPagination = () => {
    if (!showPagination) return null;
    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, total);

    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
        <div className="text-sm text-gray-500 dark:text-zinc-400">
          Showing{' '}
          <span className="font-medium text-gray-900 dark:text-zinc-100">{from}</span> to{' '}
          <span className="font-medium text-gray-900 dark:text-zinc-100">{to}</span> of{' '}
          <span className="font-medium text-gray-900 dark:text-zinc-100">{total}</span> results
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => isPaginated && pagination?.onChange?.(currentPage - 1, pageSize)}
              disabled={currentPage === 1 || loading}
              className="w-9 h-9 p-0"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </Button>

            <div className="flex items-center gap-1 px-2">
              {pages.map((p, i) =>
                p === 'ellipsis' ? (
                  <span key={`ellipsis-${i}`} className="w-8 text-center text-gray-400 text-sm select-none">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => isPaginated && pagination?.onChange?.(p, pageSize)}
                    aria-label={`Page ${p}`}
                    aria-current={currentPage === p ? 'page' : undefined}
                    className={cn(
                      'min-w-[34px] h-9 rounded-lg text-sm font-medium transition-all',
                      currentPage === p
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400'
                    )}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            <Button
              variant="outlined"
              size="sm"
              onClick={() => isPaginated && pagination?.onChange?.(currentPage + 1, pageSize)}
              disabled={currentPage === totalPages || loading}
              className="w-9 h-9 p-0"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          {showSizeChanger && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outlined"
                  size="sm"
                  className="h-9 px-4 font-medium border-gray-200 dark:border-zinc-700"
                >
                  {pageSize} / page
                  <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-32 p-1.5 rounded-xl">
                {pageSizeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handlePageSizeChange(opt)}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors',
                      pageSize === opt && 'bg-indigo-50 dark:bg-zinc-800 font-medium text-indigo-600 dark:text-indigo-400'
                    )}
                  >
                    {opt} / page
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    );
  };

  const skeletonCount = skeletonRows ?? (isPaginated ? pageSize : 5);

  return (
    <div className={cn('flex flex-col gap-3', wrapperClassName)}>
      {/* Columns Toggle (ใช้ flat leaf columns เท่านั้น) */}
      {columnsToggle && (
        <div className="flex justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outlined" size="sm" className="h-9 text-gray-600 dark:text-zinc-300 border-gray-200 dark:border-zinc-800">
                <Settings2 className="w-4 h-4 mr-2" />
                View
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2 rounded-xl">
              <div className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-2 px-2">Toggle Columns</div>
              <div className="flex flex-col gap-0.5 max-h-60 overflow-y-auto">
                {baseFlatColumns.map((col, i) => {
                  const k = getColKey(col, i);
                  if (k === '__table_actions__') return null;
                  const label = col.title ?? (typeof col.dataIndex === 'string' ? col.dataIndex : 'Column');
                  return (
                    <label
                      key={k}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <Checkbox checked={!hiddenCols.has(k)} onChange={() => toggleColumn(k)} />
                      <span className="text-sm text-gray-700 dark:text-zinc-200 truncate">{label}</span>
                    </label>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Table Container */}
      <div className={tableWrapperVariants({ bordered })}>
        {paginationPlacement === 'top' && renderPagination()}

        <div
          className="w-full overflow-x-auto"
          style={{ maxHeight: scroll?.y, height: scroll?.y ? '100%' : 'auto' }}
        >
          <table className={cn('w-full text-left border-collapse', className)} style={{ minWidth: scroll?.x }}>
            {showHeader && (
              <thead>
                {headerRows.map((rowCells, rowIndex) => (
                  <tr key={`header-row-${rowIndex}`}>
                    {/* Selection Column (เฉพาะ row แรก + rowSpan เต็ม) */}
                    {rowIndex === 0 && rowSelection && (
                      <th
                        className={thVariants({ size, sticky })}
                        style={{ width: SELECTION_COL_WIDTH }}
                        rowSpan={headerRows.length}
                      >
                        <div className="flex justify-center">
                          {rowSelection.type !== 'radio' && (
                            <Checkbox
                              checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
                              onChange={handleSelectAll}
                            />
                          )}
                        </div>
                      </th>
                    )}

                    {/* Expand Column (เฉพาะ row แรก + rowSpan เต็ม) */}
                    {rowIndex === 0 && hasExpand && (
                      <th
                        className={thVariants({ size, sticky })}
                        style={{ width: EXPAND_COL_WIDTH }}
                        rowSpan={headerRows.length}
                      />
                    )}

                    {/* Grouped / Leaf Header Cells */}
                    {rowCells}
                  </tr>
                ))}
              </thead>
            )}

            <tbody>
              {loading ? (
                [...Array(skeletonCount)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b border-gray-100 dark:border-zinc-800/50">
                    {rowSelection && (
                      <td className={tdVariants({ size })} style={{ width: SELECTION_COL_WIDTH }}>
                        <div className="w-5 h-5 mx-auto bg-gray-200 dark:bg-zinc-700 rounded animate-pulse" />
                      </td>
                    )}
                    {hasExpand && (
                      <td className={tdVariants({ size })} style={{ width: EXPAND_COL_WIDTH }}>
                        <div className="w-5 h-5 mx-auto bg-gray-200 dark:bg-zinc-700 rounded animate-pulse" />
                      </td>
                    )}
                    {activeColumns.map((col, j) => (
                      <td key={j} className={tdVariants({ size })} style={{ textAlign: col.align }}>
                        <div className={cn(
                          'h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse',
                          j === 0 ? 'w-3/4 max-w-[180px]' : j === activeColumns.length - 1 ? 'w-10 ml-auto' : 'w-1/2 max-w-[120px]',
                          col.align === 'center' && 'mx-auto',
                          col.align === 'right' && 'ml-auto mr-0'
                        )} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : processedData.length > 0 ? (
                processedData.map((record, index) => {
                  const key = getRowKey(record, index);
                  const isExpanded = expandedRowKeys.includes(key);
                  const canExpand = isRowExpandable(record);
                  const isSelected = selectedKeys.has(key);
                  const checkboxProps = rowSelection?.getCheckboxProps?.(record) ?? {};

                  return (
                    <React.Fragment key={key}>
                      {/* Main Row */}
                      <tr
                        onClick={onRowClick ? () => onRowClick(record, index) : undefined}
                        className={cn(
                          'group transition-colors',
                          rowHoverable && 'hover:bg-gray-50/80 dark:hover:bg-zinc-900/50',
                          isSelected && 'bg-indigo-50/70 dark:bg-indigo-950/30',
                          onRowClick && 'cursor-pointer'
                        )}
                      >
                        {/* Selection */}
                        {rowSelection && (
                          <td
                            className={tdVariants({ size })}
                            style={{ width: SELECTION_COL_WIDTH }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex justify-center">
                              {rowSelection.type === 'radio' ? (
                                <input
                                  type="radio"
                                  checked={isSelected}
                                  disabled={checkboxProps.disabled}
                                  onChange={(e) => handleSelect(key, e.target.checked)}
                                  className="w-4 h-4 accent-indigo-600"
                                />
                              ) : (
                                <Checkbox
                                  checked={isSelected}
                                  disabled={checkboxProps.disabled}
                                  onChange={(checked) => handleSelect(key, checked)}
                                />
                              )}
                            </div>
                          </td>
                        )}

                        {/* Expand Button */}
                        {hasExpand && (
                          <td
                            className={tdVariants({ size })}
                            style={{ width: EXPAND_COL_WIDTH }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {canExpand && (
                              <button
                                onClick={() => toggleExpand(key)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                              >
                                <ExpandIcon
                                  size={18}
                                  className={cn('transition-transform', isExpanded && 'rotate-90')}
                                />
                              </button>
                            )}
                          </td>
                        )}

                        {/* Data Cells */}
                        {activeColumns.map((col, j) => {
                          const val = col.dataIndex ? (record as any)[col.dataIndex] : undefined;
                          const content = col.render ? col.render(val, record, index) : val;

                          return (
                            <td
                              key={getColKey(col, j)}
                              className={cn(
                                tdVariants({ size, ellipsis: col.ellipsis }),
                                col.fixed === 'left' && 'sticky z-10 bg-white dark:bg-zinc-950',
                                col.fixed === 'right' && 'sticky right-0 z-10 bg-white dark:bg-zinc-950'
                              )}
                              style={{
                                width: col.width,
                                textAlign: col.align,
                                ...(col.fixed === 'left' ? { left: fixedLeftOffset } : {}),
                              }}
                            >
                              {content}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Expanded Row */}
                      {isExpanded && expandable?.expandedRowRender && (
                        <tr className="bg-gray-50/70 dark:bg-zinc-900/50">
                          <td colSpan={colCount} className="p-0 border-b border-gray-100 dark:border-zinc-800">
                            <div className="p-6">
                              {expandable.expandedRowRender(record, index)}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={colCount} className="px-6 py-24 text-center">
                    {emptyState ?? (
                      <div className="flex flex-col items-center gap-4 text-gray-400 dark:text-zinc-500">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center">
                          <Inbox className="w-8 h-8" />
                        </div>
                        <p className="text-sm">No Data Available</p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {paginationPlacement === 'bottom' && renderPagination()}
      </div>
    </div>
  );
}