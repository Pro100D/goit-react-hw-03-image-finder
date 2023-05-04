import { Component } from 'react';
import Notiflix from 'notiflix';

export class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleNameChenge = evt => {
    this.setState({ inputValue: evt.target.value.toLowerCase() });
  };

  handleSubmitForm = evt => {
    evt.preventDefault();

    if (this.state.inputValue.trim() === '') {
      Notiflix.Notify.failure('please enter a name');
      return;
    }

    this.props.onSubmit(this.state.inputValue);

    this.setState({ inputValue: '' });

    evt.target.reset();
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChenge}
          />
        </form>
      </header>
    );
  }
}
