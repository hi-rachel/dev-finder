const $ = (id) => document.getElementById(id);

const inputUser = $("search-user");
const mainContainer = $("main-container");

async function addUserInfo() {
  if (inputUser.value == "") {
    alert("Please write username.");
  } else {
    try {
      const username = inputUser.value;
      const response = await fetch(`https://api.github.com/users/${username}`);
      const user = await response.json();
      userCheck(username, response);
      showUser(user, username);
    } catch (error) {
      console.log("There has been a problem with your fetch operation:", error);
    }
  }
  inputUser.value = "";
}

function dateFormat(d) {
  let date = new Date(d);
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)) +
    "-" +
    date.getDate()
  );
}

function validData(tag, data) {
  if (data != "" && data != null) {
    tag.innerText = data;
    if (tag.id == "website-info") {
      let websiteLink = $("website-info-link");
      websiteLink.href = data;
    }
    if (tag.id == "email-info") {
      let emailLink = $("email-info-link");
      emailLink.href = `mailto:${data}`;
    }
  } else {
    tag.innerHTML = "-";
  }
}

function showUser(user, username) {
  const profileCard = $("profile-card");
  profileCard.classList.remove("before-search");
  const profileImg = $("profile-img");
  const profileName = $("profile-name");
  const githubId = $("github-id");
  const githubIdLink = $("github-id-link");
  const joinedDate = $("joined-date");
  const bio = $("bio");
  const repos = $("repos-count");
  const followers = $("followers-count");
  const following = $("following-count");
  // 하단 정보
  const location = $("location-info");
  const email = $("email-info");
  const website = $("website-info");

  const company = $("company-info");

  profileImg.src = user.avatar_url;
  profileName.innerText = user.name;
  githubId.innerText = "@" + user.login;
  githubIdLink.href = `https://github.com/${username}`;
  const joinedDateFormat = dateFormat(user.created_at);
  joinedDate.innerText = "Joined " + joinedDateFormat;
  bio.innerText = user.bio;
  repos.innerText = user.public_repos;
  followers.innerText = user.followers;
  following.innerText = user.following;

  validData(website, user.blog);
  validData(location, user.location);
  validData(email, user.email);
  validData(company, user.company);

  addGitGrass(username);
}

function addGitGrass(username) {
  const gitGrass = $("github-grass");
  const gitGrassImg = $("github-grass-img");
  gitGrass.classList.remove("hidden");
  gitGrassImg.classList.remove("hidden");
  gitGrassImg.src = `https://ghchart.rshah.org/6495ED/${username}`;
}

function noImage() {
  const gitGrassImg = $("github-grass-img");
  gitGrassImg.removeAttribute("src");
}

function userCheck(username, response) {
  const showUserUndefined = $("show-user-undefined");
  const profileCard = $("profile-card");

  if (!response.ok) {
    showUserUndefined.innerText = `${username} does not exist.`;
    showUserUndefined.classList.remove("hidden");
    profileCard.classList.add("hidden");
  } else {
    profileCard.classList.remove("hidden");
    showUserUndefined.innerText = "";
    showUserUndefined.classList.add("hidden");
  }
}

const dataList = [
  "hi-rachel",
  "octocat",
  "microsoft",
  "google",
  "apache",
  "facebook",
  "twitter",
  "alibaba",
  "vuejs",
  "tensorflow",
  "Tencent",
  "freeCodeCamp",
  "sindresorhus",
  "kamranahmedse",
  "donnemartin",
  "jwasham",
  "996icu",
  "trekhleb",
  "getify",
  "vinta",
  "justjavac",
  "CyC2018",
];

const autoComplete = $("auto-complete");
let nowIndex = 0;

inputUser.onkeyup = (event) => {
  const value = inputUser.value.trim();
  // 자동완성 필터링
  const matchDataList = value
    ? dataList.filter((label) => label.includes(value))
    : [];

  switch (event.keyCode) {
    // UP KEY
    case 38:
      nowIndex = Math.max(nowIndex - 1, 0);
      break;
    // DOWN KEY
    case 40:
      nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
      break;
    // ENTER KEY
    case 13:
      inputUser.value = matchDataList[nowIndex] || inputUser.value;
      nowIndex = 0;
      matchDataList.length = 0;
      event.preventDefault();
      $("search-btn").click();
      break;
    // 그외 다시 초기화
    default:
      nowIndex = 0;
      break;
  }
  // 리스트 보여주기
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
