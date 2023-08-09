document.getElementById("logOutUser").addEventListener("click", async () => {
  await fetch(`/api/users/logout`, {
    method: "POST",
  });
  document.location.replace("/auth");
});
document.getElementById("createPost").addEventListener("click", async () => {
  const post = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
  };
  await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  location.reload();
});