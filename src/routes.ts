import { Router } from 'express';
import UnleashController from './controller/UnleashController'

const routes = Router();

routes.get("/features", UnleashController.index);

export default routes;