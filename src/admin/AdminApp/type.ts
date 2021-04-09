export interface NavigationService {
    title: string;
    modules: Module[];
}

export interface Module {
    name: string;
    path: string;
    component: React.ComponentType<any>;
    routeParameter?: string;
}
