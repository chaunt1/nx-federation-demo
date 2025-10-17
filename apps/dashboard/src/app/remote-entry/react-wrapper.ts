import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { RemoteEntry } from './entry';

/**
 * Export a function that can mount the Angular component in a React app
 */
export async function mountAngularComponent(element: HTMLElement) {
  // Create Angular component element
  const angularElement = document.createElement('app-dashboard-entry');
  element.appendChild(angularElement);

  // Bootstrap the Angular application
  const appRef = await bootstrapApplication(RemoteEntry, {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
    ],
  });

  // Return cleanup function
  return () => {
    appRef.destroy();
  };
}

export { RemoteEntry };

