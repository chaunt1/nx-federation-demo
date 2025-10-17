import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'dashboard',
  exposes: {
    './Routes': 'apps/dashboard/src/app/remote-entry/entry.routes.ts',
    './Module': 'apps/dashboard/src/app/remote-entry/react-wrapper.ts',
  },
  shared: (libraryName, sharedConfig) => {
    // Share Angular packages with specific version
    if (libraryName.startsWith('@angular')) {
      return {
        ...sharedConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }
    return sharedConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
