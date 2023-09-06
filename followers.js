const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';

// Fetch followers from the API and display them
fetchFollowers();

function fetchFollowers() {
  fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let followers = data;
      displayFollowers(followers);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

const followersSection = document.querySelector('.followers');
const btnContainer = document.querySelector('.btn-container');

let currentPage = 1;
const followersPerPage = 10; // Set the number of followers per page

// Displaying the data fetched as followers
const displayFollowers = (followers) => {
  createPageButtons(followers);
  displayPage(currentPage, followers);
}

// Paginating pages
function displayPage(pageNum, followers) {
  const startIndex = (pageNum - 1) * followersPerPage;
  const endIndex = startIndex + followersPerPage;
  const paginatedFollowers = followers.slice(startIndex, endIndex);
  
  const followersHTML = paginatedFollowers.map((follower) => {
    const { login, html_url, avatar_url } = follower;
    return `
      <article class="person">
        <img src="${avatar_url}" alt="person" class="image">
        <h2 class="name">${login}</h2>
        <a href="${html_url}" class="profile-btn">View Profile</a>
      </article>
    `;
  }).join('');
  followersSection.innerHTML = followersHTML;
}

// Create page buttons dynamically
function createPageButtons(followers) {
  const numberOfPages = Math.ceil(followers.length / followersPerPage);
  const buttonsHTML = Array.from({ length: numberOfPages }, (_, index) => {
    return `<button class="page-btn" data-page="${index }">${index + 1}</button>`;
  })

  buttonsHTML.push(`<button class="next-btn">next</button>`)
  buttonsHTML.unshift(`<button class="prev-btn">prev</button>`)

  btnContainer.innerHTML = buttonsHTML.join('');

  const pageButtons = Array.from(document.querySelectorAll('.page-btn'));
  pageButtons.forEach((button) => {
    button.addEventListener('click', handlePageButtonClick);
  });
}

// Handle page button click event
function handlePageButtonClick(event) {
    currentPage = parseInt(event.target.getAttribute('data-page'));
    displayPage(currentPage, followers);
  }

// Initial fetch and display
function initialize() {
    fetchFollowers();
  }
  
  initialize();
