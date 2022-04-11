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
    const dynamicRoutes = await this.getroute();
    this.router.config.push(...dynamicRoutes);
    this.router.resetConfig(this.router.config);
    console.log(this.router.config);
  }

  public getroute(): Promise<any> {
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
    let obj: ModuleImplementationInterface[] = [];

    obj = modules.map((module) => {
      const newObj: ModuleImplementationInterface = {
        path: module.path,
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: module.remoteEntry,
            remoteName: module.remoteName,
            exposedModule: module.exposedModule,
          }).then((m) => {
            return m[module.moduleName];
          }),
      };

      return newObj;
    });

    return obj;
  }
}
