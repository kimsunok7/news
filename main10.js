const API_KEY = "1da975d52f9948caa279024b4220f4d3";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
// console.log("mm", menus);
menus.forEach((menu) => {
  menu.addEventListener("click", (event) => getNewsByCategory(event));
});

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );

  //   console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  //   console.log("fetch", response);
  //   console.log("data", data.articles);
  newsList = data.articles;
  render();
  console.log("news", newsList);
};

const getNewsByCategory = async (event) => {
  // console.log("cagegory");
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("dd", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword", data);
  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src=${news.urlToImage}
      />
    </div>
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>${news.description}</p>
      <div>${news.source.name} * ${news.publishedAt}</div>
    </div>
  </div>
    `
    )
    .join("");
  console.log("html", newsHTML);

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
