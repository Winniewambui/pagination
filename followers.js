const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';

// Fetch followers from the API
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

  const followersSection = document.querySelector('.followers');
// Displaying the data fetched as followers
const displayFollowers = (followers) => {
  const followersHTML = followers.map((follower) => {
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

// Paginating pages
let currentPage = 1;
let paginationLimit = 10;
let numberOfPages = Math.ceil(followers.length / paginationLImit);

function DisplayPage(wrapper){
    wrapper.innerHTML = '';
currentPage = pageNum;

const startIndex = (pageNum - 1) * paginationLimit;
const EndIndex = pageNum * paginationLimit;
const paginatedFollowers = followers.slice(startIndex,EndIndex);

for(let i = 0;i < paginatedFollowers.length; i++){
    let follower = paginatedFollowers[i];

    let follower_element = document.createElement('div');
    follower_element.classList.add('item');
    follower_element.innerText = follower;
    
    wrapper.appendChild(item_element);
}
}
  