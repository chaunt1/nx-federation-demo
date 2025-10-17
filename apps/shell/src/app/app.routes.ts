import { Route } from '@angular/router';
import { WrapperComponent } from '../../react-wrapper';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: WrapperComponent,
    data: {
      elementName: 'home-react',
      loadChildren: () => import('base/Module'),
    },
  },
];
