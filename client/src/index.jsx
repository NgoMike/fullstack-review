import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }
  // post to server with ajax at port 1128
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      dataType: 'text',
      success: function (data) {
        return data;
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  search (term) {
    let data = JSON.stringify({userName: term});
    console.log(data);
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: data,
      contentType: 'application/json',
      success: function (data) {
        console.log('Post successful.');
        console.log(`${data} was searched`);
      },
      error: function(error) {
        console.log(error);
      }
    });

      // TODO
      // push doesnt work for states so need to concat term into array
      // this.setState({ repos: this.state.repos.concat(term)
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));