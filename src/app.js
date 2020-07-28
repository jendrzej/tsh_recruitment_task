import './assets/scss/app.scss';
import $ from 'cash-dom';


export default class App {
  initializeApp() {
    let self = this;

    $('#button-load').on('click', function (e) {
      let userName = $('#input-username').val();

      fetch('https://api.github.com/users/' + userName)
        .then((response)=> {response.json})
        .then(function (body) {
          self.profile = body;
          self.update_profile();
        })

    })

  }

  update_profile() {
    $('#profile-name').text($('#input-username').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
