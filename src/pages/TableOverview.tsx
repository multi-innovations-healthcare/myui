import { useState, useEffect } from 'react';
import { Table, ArrowRight, RefreshCcw, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Table as MyTable } from '../components/Table';
import type { TableColumnType, TableExpandable } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { DocHeader, DocExample, DocApiTable, DocToc } from '../components/Documentation';

// --- Types & Mocks ---
interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  department?: string;
  notes?: string;
}

const tocItems = [
  { id: 'basic', label: '1. Basic Table' },
  { id: 'interactive', label: '2. Interactive Rows' },
  { id: 'sorting', label: '3. Sorting & Pagination' },
  { id: 'server-side', label: '4. Server-Side Data' },
  { id: 'v1-features', label: '5. Auto-Actions & Toggles' },
  { id: 'layout', label: '6. Fixed Layout & Scroll' },
  { id: 'loading', label: '7. Skeleton Pre-loading' },
  { id: 'expandable', label: '8. Expandable Rows ✨' },
  { id: 'grouped', label: '9. Grouped Headers ✨' },
  { id: 'api', label: '10. API Reference' },
];

const mockData: UserData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Online', lastLogin: '2 mins ago', department: 'Engineering', notes: 'VIP customer since 2024' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Designer', status: 'Offline', lastLogin: '1 hour ago', department: 'Design', notes: 'Working on new landing page' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Developer', status: 'Online', lastLogin: 'Just now', department: 'Engineering', notes: 'Fixing critical bug #4872' },
  { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'Manager', status: 'Busy', lastLogin: '10 mins ago', department: 'Marketing', notes: 'Preparing Q2 campaign' },
  { id: 5, name: 'Robert Brown', email: 'robert@example.com', role: 'Support', status: 'Away', lastLogin: '5 hours ago', department: 'Support', notes: 'On annual leave until April 10' },
];

const wideMockData = Array.from({ length: 8 }).map((_, i) => ({
  id: `EMP-${9000 + i}`,
  name: `Employee ${i + 1}`,
  department: ['Engineering', 'Marketing', 'Sales', 'HR'][i % 4],
  location: ['New York', 'London', 'Tokyo', 'Berlin'][i % 4],
  ...Object.fromEntries(Array.from({ length: 6 }).map((_, j) => [`month${j + 1}`, `$${(Math.random() * 1000).toFixed(2)}`])),
}));

const statusMap: Record<string, 'success' | 'default' | 'danger' | 'warning'> = {
  Online: 'success',
  Offline: 'default',
  Busy: 'danger',
  Away: 'warning',
};

// Expanded row render example
const expandedRowRender = (record: UserData) => (
  <div className="p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
    <div className="flex items-start gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <Avatar name={record.name} size="md" />
          <div>
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{record.name}</h4>
            <p className="text-sm text-gray-500 dark:text-zinc-400">{record.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-zinc-400">Department</span>
            <p className="font-medium">{record.department}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-zinc-400">Role</span>
            <p className="font-medium">{record.role}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500 dark:text-zinc-400">Internal Notes</span>
            <p className="text-gray-700 dark:text-zinc-300 mt-1 leading-relaxed">{record.notes}</p>
          </div>
        </div>
      </div>
      <div className="w-px h-40 bg-gray-200 dark:bg-zinc-700 self-stretch" />
      <div className="flex-1 text-xs space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Last Login</span>
          <span className="font-mono text-emerald-600">{record.lastLogin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <Badge variant="soft" color={statusMap[record.status] || 'default'} pill>
            {record.status}
          </Badge>
        </div>
        <div className="pt-3 border-t border-gray-100 dark:border-zinc-800">
          <Button size="sm" variant="outlined" className="w-full justify-center">
            View Full Profile
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function TableOverview() {
  const [activeId, setActiveId] = useState(tocItems[0].id);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [wideSelectedKeys, setWideSelectedKeys] = useState<(string | number)[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>([]);

  // Server-side state
  const [serverData, setServerData] = useState<UserData[]>([]);
  const [serverTotal, setServerTotal] = useState(0);
  const [serverLoading, setServerLoading] = useState(false);
  const [serverPage, setServerPage] = useState(1);

  // Simulate server fetch
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) setServerLoading(true);
    });
    const timer = setTimeout(() => {
      if (!active) return;
      const itemsPerPage = 3;
      const start = (serverPage - 1) * itemsPerPage;
      setServerData(mockData.slice(start, start + itemsPerPage));
      setServerTotal(mockData.length);
      setServerLoading(false);
    }, 800);
    return () => { active = false; clearTimeout(timer); };
  }, [serverPage]);

  // Intersection Observer for Table of Contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: [0.1, 0.5] }
    );

    tocItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const columns: TableColumnType<UserData>[] = [
    {
      dataIndex: 'name',
      title: 'User',
      sorter: true,
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <Avatar name={item.name} size="sm" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-zinc-50">{item.name}</span>
            <span className="text-xs text-gray-500">{item.email}</span>
          </div>
        </div>
      ),
    },
    { dataIndex: 'role', title: 'Role', sorter: true },
    {
      dataIndex: 'status',
      title: 'Status',
      sorter: true,
      render: (val) => (
        <Badge variant="soft" color={statusMap[String(val)] || 'default'} pill>
          {val}
        </Badge>
      ),
    },
    { dataIndex: 'lastLogin', title: 'Last Login' },
  ];

  // Grouped columns example
  const groupedColumns: TableColumnType<UserData>[] = [
    {
      title: 'User Information',
      children: [
        {
          dataIndex: 'name',
          title: 'Full Name',
          sorter: true,
          render: (_, item) => (
            <div className="flex items-center gap-3">
              <Avatar name={item.name} size="sm" />
              <span className="font-semibold">{item.name}</span>
            </div>
          ),
        },
        { dataIndex: 'email', title: 'Email', width: 220 },
      ],
    },
    {
      title: 'Job Details',
      children: [
        { dataIndex: 'role', title: 'Role', width: 140 },
        { dataIndex: 'department', title: 'Department', width: 160 },
      ],
    },
    {
      title: 'Activity',
      children: [
        {
          dataIndex: 'status',
          title: 'Status',
          render: (val) => (
            <Badge variant="soft" color={statusMap[String(val)] || 'default'} pill>
              {val}
            </Badge>
          ),
        },
        { dataIndex: 'lastLogin', title: 'Last Login' },
      ],
    },
  ];

  const wideColumns: TableColumnType<Record<string, unknown>>[] = [
    { dataIndex: 'name', title: 'Full Name', width: 200, fixed: 'left' },
    { dataIndex: 'id', title: 'Emp ID', width: 120 },
    { dataIndex: 'department', title: 'Department', width: 150 },
    { dataIndex: 'location', title: 'Location', width: 150 },
    ...Array.from({ length: 6 }).map((_, i) => ({
      dataIndex: `month${i + 1}`,
      title: `Month ${i + 1}`,
      width: 120,
      align: 'right' as const,
    })),
    {
      key: 'action',
      title: 'Action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: () => (
        <Button size="sm" variant="text" color="primary" className="h-8 w-8 p-0 flex items-center justify-center">
          <ArrowRight size={16} />
        </Button>
      ),
    },
  ];

  const expandableConfig: TableExpandable<UserData> = {
    expandedRowRender: (record) => expandedRowRender(record),
    expandedRowKeys: expandedKeys,
    onExpandedChange: setExpandedKeys,
    rowExpandable: (record) => record.status === 'Online',
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 relative px-4 sm:px-6 lg:px-8">
      <div className="lg:pr-72 xl:pr-80 animate-in fade-in zoom-in-95 duration-500">
        <DocHeader
          title="Table"
          description="A stunning foundational data table component for advanced layouts. Native skeletons, column pinning, precise row selections, expandable rows, grouped headers, and automated states out of the box."
          icon={<Table className="w-6 h-6" />}
          importCode="import { Table } from '@/components/Table';"
        />

        {/* 1. Basic */}
        <section id="basic" className="space-y-6 scroll-mt-28 mb-24 mt-12">
          <DocExample
            title="1. Basic Table"
            description="A clean, simple table configuration adhering to standard layout boundaries."
            code={`const columns = [
  { dataIndex: 'name', title: 'Name' },
  { dataIndex: 'role', title: 'Role' },
];

<Table columns={columns} dataSource={data} />`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={[
                    { dataIndex: 'name', title: 'Name' },
                    { dataIndex: 'role', title: 'Role' },
                    { dataIndex: 'status', title: 'Status' },
                  ]}
                  dataSource={mockData.slice(0, 3)}
                  pagination={false}
                  rowHoverable={false}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 2. Interactive Rows */}
        <section id="interactive" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="2. Interactive Rows & Selection"
            description="Row selection via checkbox/radio and clickable row overlays natively sync with standard behaviors."
            code={`<Table 
  rowHoverable={true}
  onRowClick={(record) => toast(record.name)}
  rowSelection={{ selectedRowKeys, onChange }}
/>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={columns.slice(0, 3)}
                  dataSource={mockData.slice(0, 4)}
                  rowHoverable={true}
                  onRowClick={(record) => toast.success(`Clicked on ${record.name}`)}
                  rowSelection={{
                    selectedRowKeys: selectedKeys,
                    onChange: (keys) => setSelectedKeys(keys),
                  }}
                  pagination={false}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 3. Sorting & Pagination */}
        <section id="sorting" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="3. Sorting & Pagination"
            description="Enable sorters to toggle states. Pagination logic automatically clips active data sets if the length exceeds pageSize."
            code={`<Table
  columns={columns}
  dataSource={data}
  pagination={{ pageSize: 4 }}
/>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={columns}
                  dataSource={mockData}
                  pagination={{
                    current: page,
                    pageSize: 4,
                    onChange: (p) => setPage(p),
                  }}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 4. Server-Side Data */}
        <section id="server-side" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="4. Server-Side Pagination & Data"
            description="Use onChange along with pagination.total to integrate seamlessly with external APIs."
            code={`<Table 
  loading={loading}
  dataSource={serverData}
  onChange={(pagination) => fetch(pagination.current)}
  pagination={{ current: page, pageSize: 3, total: totalCount }}
/>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={columns.map(c => ({ ...c, width: 150 }))}
                  dataSource={serverData}
                  loading={serverLoading}
                  skeletonRows={3}
                  onChange={(pagination) => {
                    if (pagination.current && pagination.current !== serverPage) {
                      setServerPage(pagination.current);
                    }
                  }}
                  pagination={{
                    current: serverPage,
                    pageSize: 3,
                    total: serverTotal,
                  }}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 5. V1 Features */}
        <section id="v1-features" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="5. Auto Actions & Columns Toggle"
            description="Use the columnsToggle prop to generate a powerful display manager. Pass actions strictly as arrays."
            code={`<Table
  columnsToggle={{ defaultHidden: ['lastLogin'] }}
  actions={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', color: 'danger' }
  ]}
/>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={columns}
                  dataSource={mockData.slice(0, 4)}
                  columnsToggle={{ defaultHidden: ['lastLogin'] }}
                  actions={[
                    { label: 'Edit', onClick: (r) => toast.info(`Editing ${r.name}`) },
                    { label: 'Destroy', color: 'danger', onClick: (r) => toast.error(`Deleted ${r.name}`) },
                  ]}
                  pagination={false}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 6. Layout */}
        <section id="layout" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="6. Fixed Layout & Scroll"
            description="Specify dimensions within scroll. Table intelligently calculates left/right offsets."
            code={`<Table 
  scroll={{ x: '1000px', y: '300px' }}
  columns={[{ fixed: 'left' }, ... , { fixed: 'right' }]}
/>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={wideColumns}
                  dataSource={wideMockData}
                  rowHoverable
                  scroll={{ x: 1000, y: 300 }}
                  rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: wideSelectedKeys,
                    onChange: (keys) => setWideSelectedKeys(keys),
                  }}
                  pagination={false}
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 7. Loading */}
        <section id="loading" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="7. Skeleton Pre-loading"
            description="Supply skeletonRows configuration. Notice how loading skeletons effortlessly map standard widths natively."
            code={`<Table 
  loading={true} 
  skeletonRows={4} 
  columns={columns} 
  dataSource={[]} 
/>`}
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
                  {loading ? 'Re-fetching...' : 'Trigger Fetch'}
                </Button>
              </div>
              <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-max">
                  <MyTable
                    rowKey="id"
                    loading={loading}
                    skeletonRows={4}
                    columns={columns}
                    dataSource={loading ? [] : mockData.slice(0, 4)}
                    rowSelection={{ type: 'checkbox' }}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          </DocExample>
        </section>

        {/* 8. Expandable Rows — NEW ✨ */}
        <section id="expandable" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="8. Expandable Rows ✨"
            description="Super clean expandable rows with custom content. Just pass expandedRowRender — no complicated config needed."
            code={`<Table
  expandable={{
    expandedRowRender: (record) => <ExpandedDetail record={record} />,
    expandedRowKeys,
    onExpandedChange: setExpandedRowKeys,
  }}
/>`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={columns}
                  dataSource={mockData}
                  expandable={expandableConfig}
                  pagination={false}
                />
              </div>
            </div>
          </DocExample>
          <div className="text-xs text-emerald-600 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-3 rounded-2xl">
            <ChevronRight className="w-3 h-3" />
            <span>Click the arrow on the left of any row to expand. Only “Online” users are expandable in this demo.</span>
          </div>
        </section>

        {/* 9. Grouped Headers — NEW ✨ */}
        <section id="grouped" className="space-y-6 scroll-mt-28 mb-24">
          <DocExample
            title="9. Grouped Headers ✨"
            description="Multi-level headers with automatic colSpan / rowSpan. Just use children array — the table handles everything."
            code={`const columns = [
  {
    title: 'User Information',
    children: [ { title: 'Name' }, { title: 'Email' } ]
  },
  {
    title: 'Job Details',
    children: [ { title: 'Role' }, { title: 'Department' } ]
  }
];`}
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <MyTable
                  rowKey="id"
                  columns={groupedColumns}
                  dataSource={mockData}
                  pagination={false}
                  rowHoverable
                />
              </div>
            </div>
          </DocExample>
        </section>

        {/* 10. API */}
        <section id="api" className="space-y-8 scroll-mt-28 mb-16">
          <div className="border-b border-gray-200 dark:border-zinc-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">
              10. API Reference
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 mt-2">
              Explore all props for the powerful Table component.
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-50 mb-4">Table Props</h3>
              <DocApiTable props={[
                { name: 'dataSource', type: 'T[]', default: '[]', description: 'Array of data objects to display.' },
                { name: 'columns', type: 'TableColumnType<T>[]', default: '[]', description: 'Column configuration array.' },
                { name: 'rowKey', type: 'string | fn', default: 'index', description: 'Row unique key accessor.' },
                { name: 'expandable', type: 'TableExpandable<T>', default: '—', description: 'Config for expandable rows with custom render.' },
                { name: 'bordered', type: 'boolean', default: 'true', description: 'Configures table outer border.' },
                { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Controls cell padding and typography scale.' },
                { name: 'loading', type: 'boolean', default: 'false', description: 'Displays continuous inline skeletons if true.' },
                { name: 'skeletonRows', type: 'number', default: 'pageSize | 5', description: 'Hard limit for skeleton loading generation.' },
                { name: 'rowHoverable', type: 'boolean', default: 'true', description: 'Enables hover state overlay.' },
                { name: 'onRowClick', type: 'fn', default: '—', description: 'Global click interception callback.' },
                { name: 'scroll', type: '{ x?, y? }', default: '—', description: 'Dimensions controlling overflow.' },
                { name: 'columnsToggle', type: 'boolean | object', default: 'false', description: 'Adds visual Column settings popover.' },
                { name: 'actions', type: 'TableAction<T>[]', default: '[]', description: 'Rapid action buttons on the right.' },
                { name: 'rowSelection', type: 'TableRowSelection<T>', default: '—', description: 'Selection state control.' },
                { name: 'emptyState', type: 'ReactNode', default: '<Inbox />', description: 'Override node when dataSource is empty.' },
              ]} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-50 mb-4">Column Definition (TableColumnType)</h3>
              <DocApiTable props={[
                { name: 'dataIndex', type: 'string', default: '—', description: 'Data field accessor key.' },
                { name: 'title', type: 'ReactNode', default: '—', description: 'Column label.' },
                { name: 'children', type: 'TableColumnType<T>[]', default: '—', description: 'Nested columns for grouped headers.' },
                { name: 'sorter', type: 'boolean | fn', default: 'false', description: 'Enables interactive sorting.' },
                { name: 'render', type: '(val, rec, index) => ReactNode', default: '—', description: 'Custom cell renderer.' },
                { name: 'align', type: '"left" | "center" | "right"', default: '"left"', description: 'Text alignment.' },
                { name: 'fixed', type: '"left" | "right"', default: '—', description: 'Sticky column pinning.' },
                { name: 'width', type: 'number | string', default: '—', description: 'Fixed column width.' },
              ]} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-50 mb-4">Expandable Config (TableExpandable)</h3>
              <DocApiTable props={[
                { name: 'expandedRowRender', type: '(record, index) => ReactNode', default: '—', description: 'Content to show when row is expanded.' },
                { name: 'expandedRowKeys', type: '(string | number)[]', default: '—', description: 'Controlled expanded row keys.' },
                { name: 'onExpandedChange', type: 'fn', default: '—', description: 'Callback when expanded state changes.' },
                { name: 'rowExpandable', type: '(record) => boolean', default: 'true', description: 'Disable expand for specific rows.' },
              ]} />
            </div>
          </div>
        </section>

      </div>
      <DocToc items={tocItems} activeId={activeId} />
    </div>
  );
}