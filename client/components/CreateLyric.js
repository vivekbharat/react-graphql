import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class CreateLyric extends Component {
  constructor(props) {
    super(props);

    this.state = { content: "" };
  }
  // console.log(this.state.content)
  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.content);
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
      })
      .then(() => {
        this.setState({ content: "" });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <br />
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>{this.state.content}</label>
      </form>
    );
  }
}

const mutation = gql`
  mutation addLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(CreateLyric);
