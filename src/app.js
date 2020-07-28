import './assets/scss/app.scss';
import $ from 'cash-dom';


export default class App {
  initializeApp() {
    $('#button-load').on('click', (e) => {
      let userName = $('#input-username').val();

      fetch('https://api.github.com/users/' + userName)
        .then((response) => response.json())
        .then((body) => {
          this.profile = body;
          this.updateProfile();
        });

    })

  }

  updateProfile() {
    const { name, login, avatar_url, html_url, bio } = this.profile;
    $('#profile-name').text(name);
    $('#profile-image').attr('src', avatar_url);
    $('#profile-url').attr('href', html_url).text(login);
    $('#profile-bio').text(bio || '(no information)');
  }
}
