import './assets/scss/app.scss';
import $ from 'cash-dom';
import UserProfile from './userProfile';
import UserEventsHistory from './userEventsHistory';
import { hideElement, showElement } from './utils';


export default class App {
  initializeApp() {
    $('#button-load').on('click', (e) => {
      const userName = $('#input-username').val();
      if(this.validateUsernameInput(userName)) {
        this.loadData(userName);
      };
    })
  }

  loadData(username) {
    this.hideColumns();
    this.showSpinner();
    this.loadUserProfile(username)
      .then(() => this.loadUserEventsHistory(username))
      .then(() => {
        this.hideSpinner();
        this.showColumns();
      })
      .catch(err => {
        this.hideSpinner();
        alert(err.message);
      })
  }
  
  hideSpinner() {
    hideElement('#spinner');
  }

  showSpinner() {
    showElement('#spinner');
  }

  hideColumns() {
    hideElement('#columns-container');
  }

  showColumns() {
    showElement('#columns-container');
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

  loadUserProfile(username) { 
    this.userProfile = new UserProfile(username);
    return this.userProfile.fetchUserData();
  }

  loadUserEventsHistory(username) {
    this.eventsHistory = new UserEventsHistory(username);
    return this.eventsHistory.fetchUserEvents();
  }
}
