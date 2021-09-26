import { Viewer } from "../src/core/viewer/viewer";
import { TokenService } from "./token.service";

export class Middleware {

  public static async check(response, data) {
    if (data.dirPath == 'src/theme/views/dashboard/') {

      const userCheck = await TokenService.checkTokenUser();
      if (userCheck.length > 0) {
        this.checkAlreadyAuth(response, data)
      } else {
        const login = {
          dirPath: 'src/theme/views/dashboard/',
          filename: 'login'
        }
        const viewContent = Viewer.make(login);
        response.responseHandler(viewContent)
      }
    } else {
      response.responseHandler(data)
    }
  }

  private static checkAlreadyAuth(response, data) {
    if (data.filename == 'login.ejs') {
      const dashboard = {
        dirPath: 'src/theme/views/dashboard/',
        filename: 'dashboard'
      }
      const viewContent = Viewer.make(dashboard);
      response.responseHandler(viewContent)
    } else {
      response.responseHandler(data)
    }
  }
}