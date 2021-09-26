import { TokenService } from "../../../config/token.service";
import { Crypt } from "../../../config/md5";
import { User } from "../../core/model/user.model";
import { Viewer } from "../../core/viewer/viewer";

export class AuthController {

  public static viewLogin() {
    const file = {
      dirPath: 'src/theme/views/dashboard/',
      filename: 'login'
    }
    return Viewer.make(file);
  }

  public static async login(request: any) {
    try {
      const { email, password } = request.data.body;
      const password_crypt = Crypt.calcMD5((password));

      const user = await new User().findAll({ email: email });
      if (user.length > 0) {
        return password_crypt == user[0].password ? TokenService.generateToken(user[0].id) : { status: 422, message: 'mot de passe incorrect' };
      } else {
        return { status: 422, message: 'utilisateur inconnu' }
      }
    } catch (error) {
      console.log('error in post article (api)', error)
    }
  }


  public static async logout() {
    const userCheck = await TokenService.checkTokenUser();
      if (userCheck.length > 0) {
        TokenService.deleteTokenDb(userCheck[0].id);
        TokenService.deleteTokenStorage();
      } else {
        return 'pas d\'utilisateur authentifier'
      }
  }

}