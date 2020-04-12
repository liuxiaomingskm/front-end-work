import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }
  
  componentDidMount() {
    const topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';
    
    fetch(topStories)
      .then(data => {
        console.log("data", data);
        return data.json()})
      .then(data => data.map(id => {
        const url = `${storyUrlBase}${id}.json`;
        return fetch(url).then(d => d.json());
      }))
      .then(promises => {
        console.log('promises',promises)
        // the Promise.all() method returns a single Promise that fulfills when all of the promises passed as an iterable
        // have been fulfilled or when the iterable contains no promises or when the iterable contains promises that have been 
        // fulfilled and non-promises that have been returned. It rejects with the reason of the first promise that 
        // rejects, or with the error caught by the first argument if that argument has caught an error inside it 
        // using try/catch/throw blocks
        return Promise.all(promises)})
      .then(stories => {
        console.log('stories',stories);
        return this.setState({stories})});
  }
  
  render() {
    let views = <div>Loading...</div>;
    const {stories} = this.state;
    if (stories && stories.length > 0) {
      views = stories.map(s=> (
        <p key={s.id}>
          <a href={s.url}>{s.title}</a> from <strong>{s.by}</strong>
        </p>
      ));
    }
    
    return (
      <div className="App">
        <h2>Hacker News Top Stories</h2>
        {views}
      </div>
    );
  }
}

export default App;
