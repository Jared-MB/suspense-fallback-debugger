# Suspense Fallback Debugger

`suspense-fallback-debugger` is an npm package designed to help you debug your React Suspense components and their fallbacks during development. It provides a visual interface to identify, inspect, and force the fallback state of any Suspense component on your page.

## Installation

To install the package, run one of the following commands in your project's terminal:

```bash
npm install suspense-fallback-debugger -E
# or
yarn add suspense-fallback-debugger -E
# or
pnpm add suspense-fallback-debugger -E
```

## Usage

To start using the debugger, you need to import and use the custom `Suspense` component from the package instead of the default `React.Suspense`. Additionally, you can add the `DevDropdown` component to your layout to interact with the debugger.

Here's a basic example of how to set it up in your application:

```tsx
import { Suspense, DevDropdown } from 'suspense-fallback-debugger';

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <SomeOtherComponent />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <MyComponent />
      <DevDropdown />
    </main>
  );
}
```

### Key Features

*   **Visual Debugging**: The package renders a subtle border around your `Suspense` components in development mode, which highlights when you hover over them in the `DevDropdown`.
*   **Force Fallbacks**: From the `DevDropdown`, you can click on any `Suspense` component's ID to force its fallback state to be displayed. This is incredibly useful for testing your loading UI without having to simulate slow network conditions.
*   **Identify Suspense Components**: The `DevDropdown` lists all the `Suspense` components currently rendered on the page, making it easy to identify and debug them.
*   **Fallback Warnings**: If a `Suspense` component is missing a `fallback` prop, the debugger will display a warning, helping you catch potential issues early.
