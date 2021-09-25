
import { Routes } from './theme/routes/routes';
import { ServerSingleton } from './core/server/server'
import { RoutesApi } from './theme/routes/api';

RoutesApi.build();
Routes.build();
ServerSingleton.start();
