import * as fs from 'fs';
import { User } from '../src/core/model/user.model';

export class TokenService {

  private static fileStoragePath: string = './storage/currentTokenUser';

  public static generateToken(id) {
    var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var array = [];
    for (var i = 0; i < 35; i++) {
      var rand = (Math.random() * (caracteres.length - 1)).toFixed(0);
      array[i] = caracteres[rand];
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

  private static readToken() {
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

  public static async deleteTokenDb(id) {
    try {
      await new User().update({ token: null }, id);
      return 'user updated';

    } catch (error) {
      console.log('error for update user (api)', error)
    }
  }

  public static async deleteTokenStorage() {
    if (fs.existsSync("storage")) {
      fs.writeFile(this.fileStoragePath, '', (err) => {
        if (err) {
          throw err;
        }
      })

    } else {
      fs.mkdir("storage", (err) => {

        if (err) return err;
        fs.writeFile(this.fileStoragePath, '', (err) => {
          console.log(err)
        })

      });
    }
  }
}