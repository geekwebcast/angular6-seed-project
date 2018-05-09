import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const router: Routes = [
    {
        path: '',
        redirectTo:'core',
        pathMatch: 'full'
    },
    {
        path: 'core',
        loadChildren: 'app/core/core.module#CoreModule'
    },
    { path: 'feature', loadChildren: 'app/feature/feature.module#FeatureModule'},
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(router, { useHash: true });
