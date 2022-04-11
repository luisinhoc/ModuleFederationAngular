export interface ModuleImplementationInterface {
  path: string;
  loadChildren: () => Promise<any>;
}
