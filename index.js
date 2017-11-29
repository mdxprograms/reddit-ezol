const Ezol = require("ezoljs");
const axios = require("axios");

const ezol = new Ezol();
const { a, table, tbody, thead, th, tr, td, input } = Ezol;

const tableStyle = `
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const tdThStyle = `
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
`;

function getReddit() {
  const url = "https://www.reddit.com/r/mechanicalkeyboards.json";
  return new Promise(resolve => {
    axios.get(url).then(res => resolve(res));
  });
}

const redditHead = () =>
  thead({}, "", [
    th({ style: tdThStyle }, "Title", []),
    th({ style: tdThStyle }, "URL", []),
    th({ style: tdThStyle }, "Author", [])
  ]);

const redditBody = reddits =>
  tbody(
    {},
    "",
    reddits.data.data.children.map(r =>
      tr({}, "", [
        td({ style: tdThStyle }, r.data.title, []),
        td({ style: tdThStyle }, "", [
          a(
            {
              target: "_blank",
              href: `https://www.reddit.com${r.data.permalink}`
            },
            "reddit link",
            []
          )
        ]),
        td({ style: tdThStyle }, r.data.author, [])
      ])
    )
  );

const redditTable = reddits =>
  table({ id: "app", style: tableStyle }, "", [
    redditHead(),
    redditBody(reddits)
  ]);

document.addEventListener("DOMContentLoaded", () => {
  getReddit().then(reddits => {
    ezol.attach(redditTable(reddits), "body");
  });
});
