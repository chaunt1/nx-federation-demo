declare module 'dashboard/Module' {
  export function mountAngularComponent(element: HTMLElement): Promise<() => void>;
  export const RemoteEntry: any;
}

declare module 'dashboard/Routes' {
  export const remoteRoutes: any[];
}

