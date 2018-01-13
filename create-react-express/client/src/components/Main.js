import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/API";

class Main extends Component {

  state = {
    title: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  //Component did mount to get a list of all saved articles & update this.state.Saved
ComponentDidMount() {
  this.getSavedArticles()
}

//method for getting saved articles (all articles) from db
getSavedArticles = () => {
  API.getArticle()
  .then((res) => {
    this.setState({ saved: res.date });
  });
}

//a method of helper for rendering one search results div each articles
renderArticles = () => {
  return this.state.articles.map(article => (
    <Results
    _id={article._id}
    key={article._id}
    title={article.headline.main}
    date={article.pub_date}
    url={article.web_url}
    handleSaveButton={this.handleSaveButton}
    getSavedArticles={this.getSavedArticles}
    />
  ));
};

//a method of helper for rendering one search results div each articles
renderSaved = () => {
  return this.state.saved.map(save => (
    <Saved
    _id={save._id}
    key={save._id}
    title={save.headline.main}
    date={save.pub_date}
    url={save.web_url}
    handleDeleteButton={this.handleDeleteButton}
    getSavedArticles={this.getSavedArticles}
    />
  ));
};

// Keep track of what user types into topic input so that input can be grabbed later
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types into topic input so that input can be grabbed later
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  // When save article button is clicked, add article to db
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  // When delete article button is clicked, remove article from db
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
            <h2 className="text-center">Search for and save articles of interest.</h2>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              Proudly built using React.js
            </p>
          </footer>
        </div>
      </div>

    );
  }

}

export default Main;
