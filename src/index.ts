import joke from "./joke";
import "./styles/main.scss";
import kocakGeming from "./assets/kocak.jpg";

const image = document.getElementById("kocak-geming") as HTMLImageElement;
image.src = kocakGeming;

const jokeBtn = document.getElementById("jokeBtn") as HTMLElement;
jokeBtn.addEventListener("click", joke);

joke();
