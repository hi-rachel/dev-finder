import { $ } from "../utils/dom.js";
import {
  showUserProfile,
  showUserJoinedDate,
  showUserFollow,
  showUserLink,
  showUserRepos,
} from "../index.js";
import { userCheck } from "../data/check-data.js";

const USERS_BASE_URL = "https://api.github.com/users";
const USERS_GRASS_BASE_URL = "https://ghchart.rshah.org/6495ED";

export const inputUser = $("search-user");

export const addUserInfo = async () => {
  if (inputUser.value == "") {
    alert("Please write username.");
    return;
  } else {
    try {
      const username = inputUser.value;
      const response = await fetch(`${USERS_BASE_URL}/${username}`);
      const user = await response.json();
      userCheck(username, response);
      showUserProfile(user, username);
      showUserJoinedDate(user);
      showUserRepos(user);
      showUserFollow(user);
      showUserLink(user);
      addGitGrass(username);
    } catch (error) {
      console.log("There has been a problem with your fetch operation:", error);
    }
  }
  inputUser.value = "";
};

export const addGitGrass = (username) => {
  const gitGrass = $("github-grass");
  const gitGrassImg = $("github-grass-img");
  gitGrass.classList.remove("hidden");
  gitGrassImg.classList.remove("hidden");
  gitGrassImg.src = `${USERS_GRASS_BASE_URL}/${username}`;
};
