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
    tag.innerHTML = data;
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
  const joinedDate = $("joined-date");
  const bio = $("bio");
  const repos = $("repos-count");
  const followers = $("followers-count");
  const following = $("following-count");
  // 하단 정보
  const location = $("location-info");
  const email = $("email-info");
  const blog = $("blog-info");
  const company = $("company-info");
  const gitGrass = $("github-grass-img");

  profileImg.src = user.avatar_url;
  profileName.innerText = user.name;
  githubId.innerText = "@" + user.login;
  const joinedDateFormat = dateFormat(user.created_at);
  joinedDate.innerText = "Joined " + joinedDateFormat;
  bio.innerText = user.bio;
  repos.innerText = user.public_repos;
  followers.innerText = user.followers;
  following.innerText = user.following;

  validData(blog, user.blog);
  validData(location, user.location);
  validData(email, user.email);
  validData(company, user.company);

  gitGrass.src = `https://ghchart.rshah.org/6495ED/${username}`;
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

inputUser.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.$("search-btn").click();
  }
});
