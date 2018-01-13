import axios from "axios";

const API = {
  searchNYT: function(topic, startYear, endYear) {
    const APIKEY = "c6da490237904c19aab2db1a9ab26eda";
    const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    APIKEY + "&q=" + topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231";
    return axios.get(BASEURL);
  },
// Retrives saved articles from the db
getArticle: function() {
  return axios.get("/api/saved");
},
saveArticle: function(articleObject) {
  return axios.post("/api/saved", articleObject);
},
deleteArticle: function(id) {
  return axios.delete("/api/saved/${id}");
}
};

export default API;


// export default {
//   // search: function(query) {
//   //   return axios.get(BASEURL + query + APIKEY);
//   // },
//   getTitle: function(title) {
//     return axios.get(BASEURL + APIKEY + "&q=" + title);
//   },
//   getStartDate: function(beginYear) {
//     return axios.get(BASEURL + APIKEY + "&begin_date=" + beginYear + "0101");
//   },
//   getEndDate: function(endYear) {
//     return axios.get(BASEURL + APIKEY + "&end_date=" + endYearYear + "1231");
//   }
// };
