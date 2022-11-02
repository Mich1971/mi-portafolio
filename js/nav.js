const navToggle = document.querySelector(".menu-button");
const nav = document.querySelector("nav");
const containerAll = document.querySelector(".container-all");

const cas = containerAll.style;
const bcl = document.body.classList;

navToggle.addEventListener("click", _ => {
  cas.transition = "transform 250ms ease-in-out";
  bcl.toggle("nav-is-open");
})
nav.addEventListener("click", _ => {
  cas.transition = "0ms";
  bcl.remove("nav-is-open");
})
