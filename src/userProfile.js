import $ from 'cash-dom';

export default class UserProfile {
  constructor(username) {
    this.username = username;
  }


  fetchUserData() {
    return fetch('https://api.github.com/users/' + this.username)
          .then((response) => {
            if(!response.ok) throw new Error('User not found');
            else return response.json();
          })
          .then((body) => {
            this.profile = body;
            this.updateProfile();
          });      
      };

  updateProfile() {
    const { name, login, avatar_url, html_url, bio } = this.profile;
    $('#profile-name').text(name);
    $('#profile-image').attr('src', avatar_url);
    $('#profile-url').attr('href', html_url).text(login);
    $('#profile-bio').text(bio || '(no information)');
  }
}