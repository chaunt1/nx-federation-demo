import * as React from 'react';

interface AngularWrapperProps {
  mountFn: (element: HTMLElement) => Promise<() => void>;
  elementName?: string;
}

/**
 * Wrapper component to render Angular components in React
 * Takes a mount function that handles Angular bootstrapping
 */
export const AngularWrapper: React.FC<AngularWrapperProps> = ({
  mountFn,
  elementName = 'angular-element'
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    const initAngularComponent = async () => {
      if (!containerRef.current || !mountFn) return;

      try {
        // Call the mount function provided by the Angular remote
        const cleanup = await mountFn(containerRef.current);
        cleanupRef.current = cleanup;
        setIsLoaded(true);
      } catch (err) {
        console.error('Error loading Angular component:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Angular component');
      }
    };

    initAngularComponent();

    return () => {
      // Cleanup: destroy Angular application
      if (cleanupRef.current) {
        try {
          cleanupRef.current();
        } catch (err) {
          console.error('Error destroying Angular app:', err);
        }
      }
    };
  }, [mountFn, elementName]);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    >
      {!isLoaded && <div>Loading Angular component...</div>}
    </div>
  );
};

export default AngularWrapper;

