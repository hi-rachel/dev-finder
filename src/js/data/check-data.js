import { $ } from "../utils/dom.js";

export const dateFormat = (today) => {
  let date = new Date(today);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return (
    year +
    "-" +
    (month + 1 > 9 ? month + 1 : "0" + (month + 1)) +
    "-" +
    (day < 10 ? "0" + day : day)
  );
};

export const validData = (tag, data) => {
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
};

export const noImage = () => {
  const gitGrassImg = $("github-grass-img");
  gitGrassImg.removeAttribute("src");
};

export const userCheck = (username, response) => {
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
};
