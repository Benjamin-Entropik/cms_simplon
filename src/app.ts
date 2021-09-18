
import { Routes } from './theme/routes/routes';
import { ServerSingleton } from './core/server/server'
import { RoutesApi } from './theme/routes/api';

Routes.build();
RoutesApi.build();
ServerSingleton.start();
