import Token from './Token';
import AppStorage from './AppStorage';

class User {
  login(data) {
    axios
      .post('/api/auth/login', data)
      .then(res => this.responseAfterLogin(res))
      .catch(err => console.error(err.response.data));
  }

  responseAfterLogin(res) {
    const token = res.data.access_token;
    const username = res.data.user;
    if (Token.isValid(token)) {
      AppStorage.store(username, token);
      window.location = '/forum';
    }
  }

  hasToken() {
    const storedToken = AppStorage.getToken();

    if (storedToken) {
      return Token.isValid(storedToken) ? true : this.logout();
    }

    return false;
  }

  loggedIn() {
    return this.hasToken();
  }

  logout() {
    AppStorage.clear();
    window.location = '/forum';
  }

  name() {
    if (this.loggedIn()) {
      return AppStorage.getUser();
    }
  }

  id() {
    if (this.loggedIn()) {
      const payload = Token.payload(AppStorage.getToken());
      return payload.sub;
    }
  }

  own(id) {
    return this.id() == id;
  }

  admin() {
    return this.id() == 13;
  }
}

export default (User = new User());
