import './assets/scss/app.scss';
import $ from 'cash-dom';


export default class App {
  initializeApp() {
    $('#button-load').on('click', (e) => {
      let userName = $('#input-username').val();
      if(this.validateUsernameInput(userName)) {
        fetch('https://api.github.com/users/' + userName)
          .then((response) => {
            if(!response.ok) throw new Error('User not found');
            else return response.json();
          })
          .then((body) => {
            this.profile = body;
            this.updateProfile();
          })
          .catch((err) => {
            alert(err.message);
          });        
      };
    })

  }

  validateUsernameInput(username) {
    const input = $('#input-username');
    if(!this.isUsernameValid(username)) {
      input.addClass('is-danger');
      return false;
    }
    input.removeClass('is-danger');
    return true;
  }

  isUsernameValid(username) {
    const pattern = /^[a-z0-9_-]+$/;
    return username && pattern.test(username);
  }

  updateProfile() {
    const { name, login, avatar_url, html_url, bio } = this.profile;
    $('#profile-name').text(name);
    $('#profile-image').attr('src', avatar_url);
    $('#profile-url').attr('href', html_url).text(login);
    $('#profile-bio').text(bio || '(no information)');
  }
}
