export const pullRequestEvent = ({ created_at, actor, payload, repo }) => {
  return (
    `<div class="timeline-item">
      <div class="timeline-marker"></div>
        <div class="timeline-content">
          <p class="heading">${created_at}</p>
          <div class="content">
                <span class="gh-username">
                  <img src=${actor.avatar_url}/>
                  <a href=${actor.url}>${actor.display_login}</a>
                </span>
            ${payload.action}
            <a href=${payload.pull_request.url}>pull request</a>
            <p class="repo-name">
              <a href=${repo.url}>${repo.name}</a>
            </p>
          </div>
        </div>
      </div>`
  );
}

export const pullRequestReviewCommentEvent = ({ created_at, actor, payload, repo }) => {
  return (
    `<div class="timeline-item">
      <div class="timeline-marker"></div>
        <div class="timeline-content">
          <p class="heading">${created_at}</p>
          <div class="content">
              <span class="gh-username">
                <img src=${actor.avatar_url}/>
                <a href=${actor.url}>${actor.display_login}</a>
              </span>
          ${payload.action}
          <a href=${payload.comment.url}>comment</a>
          to
          <a href=${payload.pull_request.url}>pull request</a>
          <p class="repo-name">
            <a href=${repo.url}>${repo.name}</a>
          </p>
        </div>
      </div>
    </div>`
  );
}
