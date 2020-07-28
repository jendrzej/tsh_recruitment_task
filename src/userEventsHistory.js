import $ from 'cash-dom';
import { pullRequestEvent, pullRequestReviewCommentEvent } from './templates/userEventsTemplates';

const TYPE_PULL_REQUEST = 'PullRequestEvent';
const TYPE_PULL_REQUEST_REVIEW_COMMENT = 'PullRequestReviewCommentEvent';

 export default class UserEventsHistory {
  constructor(username) {
    this.username = username;
  }

  fetchUserEvents() {
      this.clearContainer();
      this.hideEmptyParagraph();
      return fetch(`https://api.github.com/users/${this.username}/events/public`)
        .then((response) => {
          if(!response.ok) throw new Error('User not found');
          else return response.json();
        })
        .then((data) => {
          const eventsToDisplay = this.filterEvents(data);
          this.addEventsToContainer(eventsToDisplay);
        });
  }

  filterEvents(allEvents) {
    const eventTypesToDisplay = [TYPE_PULL_REQUEST, TYPE_PULL_REQUEST_REVIEW_COMMENT];
    return allEvents.filter(event => eventTypesToDisplay.includes(event.type));
  }

  addEventsToContainer(events) {
    if(!events || !events.length) {
      this.showEmptyParagraph();
    } else {
      const timelineContainer = $('#user-timeline');
      events.forEach(event => timelineContainer.append(this.getTemplateByEvent(event)));
    }
  }

  clearContainer() {
    const timelineContainer = $('#user-timeline');
    timelineContainer.empty();
  }

  showEmptyParagraph() {
    $('#history-empty').removeClass('is-hidden')
  }

  hideEmptyParagraph() {
    $('#history-empty').addClass('is-hidden');
  }

  getTemplateByEvent(event) {
    const { type } = event;
    return type === TYPE_PULL_REQUEST ? pullRequestEvent(event) 
      : type === TYPE_PULL_REQUEST_REVIEW_COMMENT ? pullRequestReviewCommentEvent(event)
      : 'Unknown event';
  }
 }

