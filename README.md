# MyUI (`@multi_innovations_healthcare/myui`)

React component library for building healthcare applications.

| Resource | Link |
| --- | --- |
| Documentation | [myui.mih.co.th](https://myui.mih.co.th) |
| Source code | [github.com/multi-innovations-healthcare/myui](https://github.com/multi-innovations-healthcare/myui) |

## Install

```bash
npm install @multi_innovations_healthcare/myui
```

Peer dependencies: `react` and `react-dom` (see [`package.json`](https://github.com/multi-innovations-healthcare/myui/blob/main/package.json)).

## Usage

```tsx
import { Button } from "@multi_innovations_healthcare/myui";

export default function App() {
  return (
    <Button variant="solid" color="primary">
      Solid Primary
    </Button>
  );
}
```

Styles ship inside the JS bundle: **you do not need** a separate `import ".../style.css"` or a project **`tailwind.config.js`** for MyUI components to look correct. After upgrading, reinstall the package and restart the dev server.

For full API details and examples, see the **[documentation site](https://myui.mih.co.th)**.

## License

[MIT](https://github.com/multi-innovations-healthcare/myui/blob/main/LICENSE)
