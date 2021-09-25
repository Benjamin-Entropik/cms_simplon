import { Viewer } from "../src/core/viewer/viewer";
import { AuthService } from "./auth.service";

export class Middleware {

  public static async check(response, data) {
    if (data.dirPath == 'src/theme/views/dashboard/') {
      const userCheck = await AuthService.checkTokenUser();
      if (userCheck.length > 0) {
        response.responseHandler(data)
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
}