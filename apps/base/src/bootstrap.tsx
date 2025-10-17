import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


export function defineReactWebComponent() {
  class ReactWebComponent extends HTMLElement {
    root: ReactDOM.Root;
    constructor() {
      super();
      this.root = ReactDOM.createRoot(this);
    }
    connectedCallback() {
      this.root.render(<App />);
    }
    disconnectedCallback() {
      this.root.unmount();
    }
  }
  if (!customElements.get('base-react')) {
    customElements.define('base-react', ReactWebComponent);
  }
}
defineReactWebComponent();
export default App;

