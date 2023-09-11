import { $ } from "./utils/dom.js";
import { addUserInfo, inputUser } from "./api/api.js";
import { dateFormat, validData, noImage } from "./data/check-data.js";
import { searchDataList } from "./data/data.js";

const searchBtn = $("search-btn");
searchBtn.addEventListener("click", addUserInfo);

const grassImg = $("github-grass-img");
grassImg.addEventListener("error", noImage);

export const showUserProfile = (user, username) => {
  const profileCard = $("profile-card");
  profileCard.classList.remove("before-search");
  const profileImg = $("profile-img");
  const profileName = $("profile-name");

  const githubId = $("github-id");
  const githubIdLink = $("github-id-link");

  const bio = $("bio");

  profileImg.src = user.avatar_url;
  profileName.innerText = user.name;
  githubId.innerText = "@" + user.login;
  githubIdLink.href = `https://github.com/${username}`;
  bio.innerText = user.bio;
};

export const showUserJoinedDate = (user) => {
  const joinedDate = $("joined-date");
  const joinedDateFormat = dateFormat(user.created_at);
  joinedDate.innerText = "Joined " + joinedDateFormat;
};

export const showUserRepos = (user) => {
  const repos = $("repos-count");
  repos.innerText = user.public_repos;
};

export const showUserFollow = (user) => {
  const followers = $("followers-count");
  const following = $("following-count");
  followers.innerText = user.followers;
  following.innerText = user.following;
};

export const showUserLink = (user) => {
  const location = $("location-info");
  const email = $("email-info");
  const website = $("website-info");
  const company = $("company-info");

  validData(website, user.blog);
  validData(location, user.location);
  validData(email, user.email);
  validData(company, user.company);
};

const autoComplete = $("auto-complete");
let nowIndex = 0;

inputUser.onkeyup = (event) => {
  const value = inputUser.value.trim();
  // 자동완성 필터링
  const matchDataList = value
    ? searchDataList.filter((label) => label.includes(value))
    : [];

  switch (event.key) {
    case "ArrowUp":
      nowIndex = Math.max(nowIndex - 1, 0);
      break;
    case "ArrowDown":
      nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
      break;
    case "Enter":
      inputUser.value = matchDataList[nowIndex] || inputUser.value;
      nowIndex = 0;
      matchDataList.length = 0;
      event.preventDefault();
      $("search-btn").click();
      break;
    default:
      nowIndex = 0;
      break;
  }
  showList(matchDataList, value, nowIndex);
};

const showList = (data, value, nowIndex) => {
  const regex = new RegExp(`(${value})`, "g");

  autoComplete.innerHTML = data
    .map(
      (label, index) => `
      <div class='${nowIndex === index ? "active" : ""}'>
        ${label.replace(regex, "<mark>$1</mark>")}
      </div>
    `
    )
    .join("");
};
