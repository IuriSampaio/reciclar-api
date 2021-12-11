import { Router } from 'express';
import userController from './controllers/user'
import auth from './middlewares/auth';

const routes = Router();

routes.post(userController.path, userController.store)
  .post(userController.path + '/auth', userController.login)

routes.use(auth);

routes.get(userController.path, userController.show)
  .delete(userController.path + '/:sys_id', userController.delete)
  .put(userController.path + '/:sys_id', userController.update)
  .get(userController.path, userController.index);


export default routes; 