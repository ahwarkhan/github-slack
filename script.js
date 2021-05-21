const userImg = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const userDescription = document.querySelector(".user_description p");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const repo = document.querySelector(".repo");
const repo_details = document.querySelector(".repo_details");

let user_name = "";

function inputFunction() {
  let input_user = document.querySelector(".input_user").value.trim();

  if (input_user.length <= 0) {
    alert("Please enter a valid Github username");
    document.querySelector(".input_user").value = "";
    document.querySelector(".input_user").focus();
    return false;
  } else {
    user_name = input_user.split("").join("");

    fetchUser();

    document.querySelector(".input_user").value = "";
    document.querySelector(".input_user").focus();
  }
}

document.querySelector(".input_user").addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    inputFunction();
  }
});

function fetchUser() {
  fetch(`https://api.github.com/users/${user_name}`)
    .then((response) => response.json())
    .then(function (data) {
      if (data.message === "Not Found") {
        alert("User not found");
        return false;
      } else {
        console.log(data);
        userImg.innerHTML = `<img src="${data.avatar_url}">`;
        userName.innerHTML = data.name;
        userDescription.innerHTML = data.bio;
        followers.innerHTML = data.followers;
        following.innerHTML = data.following;
        repo.innerHTML = data.public_repos;
      }
    });

  fetch(`https://api.github.com/users/${user_name}/repos`)
    .then((response) => response.json())
    .then(function (repo_data) {
      if (repo_data.length <= 0) {
        repo_details.innerHTML = `
            No repository found
            `;
      } else {
        if (repo_data.message === "Not Found") {
          repo_details.innerHTML = `
        No Repository Found
          `;

          userImg.innerHTML = `<img src="GitHub-Mark-Light-120px-plus.png">`;
          userName.innerHTML = `No User Found`;
          followers.innerHTML = "0";
          following.innerHTML = "0";
          repo.innerHTML = "0";
        } else {
          let repo_Data = repo_data.map((item) => {
            console.log(item);
            return `
            <span class='repo_name'>#${item.name}</span>`;
          });
          repo_details.innerHTML = repo_Data.slice(0, 15).join("");
        }
      }
    });
}
