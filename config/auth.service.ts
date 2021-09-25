import * as fs from 'fs';
import { User } from '../src/core/database/model/user.model';

export class AuthService {

  private static fileStoragePath: string = './storage/currentTokenUser';

  public static generateToken(id) {
    var caractere = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var array = [];
    for (var i = 0; i < 35; i++) {
      var rand = (Math.random() * (caractere.length - 1)).toFixed(0);
      array[i] = caractere[rand];
    }

    const token = array.join("");

    this.setTokenDb(token, id)
    this.setTokenStorage(token);
    return { status: 200, message: 'vous êtes connecté' };
  }

  private static async setTokenDb(token, id) {
    try {
      await new User().update({ token }, id);
      return 'user updated';

    } catch (error) {
      console.log('error for update user (api)', error)
    }
  }

  private static setTokenStorage(token) {
    if (fs.existsSync("storage")) {
      fs.writeFile(this.fileStoragePath, token, (err) => {
        if (err) {
          throw err;
        }
      })

    } else {
      fs.mkdir("storage", (err) => {

        if (err) return err;
        fs.writeFile(this.fileStoragePath, token, (err) => {
          console.log(err)
        })

      });
    }
  }

  public static readToken() {
    return fs.readFileSync(this.fileStoragePath, "utf8");
  }

  public static async checkTokenUser() {
    try {
      const user = await new User().findAll({ token: this.readToken() });
      return user;
    } catch (error) {
      return error
    }
  }
}