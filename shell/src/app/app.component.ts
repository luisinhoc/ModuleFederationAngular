import { ModuleInterface } from './module.interface';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleImplementationInterface } from './module-implementation.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shell';
  constructor(private router: Router) {}
  async ngOnInit(): Promise<void> {
    const dynamicRoutes = await this.getroutes();
    this.router.config.push(...dynamicRoutes);
    this.router.resetConfig(this.router.config);
  }

  // trying to do something like a http request
  public getroutes(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const modules: ModuleInterface[] = [
        {
          path: 'remote',
          remoteEntry: 'http://localhost:3000/remoteEntry.js',
          exposedModule: './Module',
          remoteName: 'mfe1',
          moduleName: 'MicrofrontendModule',
        },
        {
          path: 'remote1',
          remoteEntry: 'http://localhost:7000/remoteEntry.js',
          remoteName: 'mfe2',
          exposedModule: './Module1',
          moduleName: 'Microfrontend1Module',
        },
      ];

      const routes = this.constructModule(modules);

      resolve(routes);
    });
  }

  public constructModule(modules: ModuleInterface[]) {
    let routes: ModuleImplementationInterface[] = [];

    routes = modules.map((module) => {
      const newRoutes: ModuleImplementationInterface = {
        path: module.path,
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: module.remoteEntry,
            remoteName: module.remoteName,
            exposedModule: module.exposedModule,
          })
            .then((m) => {
              return m[module.moduleName];
            })
            .catch((e) => {
              // if module does not exists or the remote server is down
              return import('./modulenotfound/modulenotfound.module').then(
                (h) => h.ModulenotfoundModule
              );
            }),
      };

      return newRoutes;
    });

    return routes;
  }
}
