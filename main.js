const API_KEY = "1da975d52f9948caa279024b4220f4d3";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
// console.log("mm", menus);
menus.forEach((menu) => {
  menu.addEventListener("click", (event) => getNewsByCategory(event));
});

let url = new URL(
  `https://lustrous-quokka-c9ccab.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);

    console.log("fetch", response);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      console.log("data", data.articles);
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("error", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );

  // //   console.log("url", url);
  // const response = await fetch(url);
  // const data = await response.json();
  // //   console.log("fetch", response);
  // //   console.log("data", data.articles);
  // newsList = data.articles;
  // render();
  // console.log("news", newsList);
  url = new URL(
    `https://lustrous-quokka-c9ccab.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  // console.log("cagegory");
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://lustrous-quokka-c9ccab.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  // const response = await fetch(url);
  // const data = await response.json();
  // console.log("dd", data);
  // newsList = data.articles;
  // render();
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  url = new URL(
    `https://lustrous-quokka-c9ccab.netlify.app/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  // const response = await fetch(url);
  // const data = await response.json();
  // console.log("keyword", data);
  // newsList = data.articles;
  // render();
  getNews();
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">${errorMessage}</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
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

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  if (firstPage == 1) {
    paginationHTML = "";
  } else {
    paginationHTML = ` 
      <li class="page-item" onclick="moveToPage(${1})"><a class="page-link" href="#1">&laquo</a></li>
      <li class="page-item" onclick="moveToPage(${
        page - 1
      })"><a class="page-link" href="#1">&lt</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link" href="#1">${i}</a></li>`;
  }
  if (lastPage == totalPages) {
    paginationHTML += "";
  } else {
    paginationHTML += ` <li class="page-item" onclick="moveToPage(${
      page + 1
    })"><a class="page-link" href="#1">&gt</a></li>
    <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link" href="#1">&raquo</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("movetopage", pageNum);
  page = pageNum;
  getNews();
};
getLatestNews();
