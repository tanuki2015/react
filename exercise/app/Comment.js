import React from 'react';
import ReactDOM from 'react-dom';
import UserInfo from './components/UserInfo';

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}

Comment.defaultProps = {
  author: { avatarUrl: 'http://www.avatar.com', name: 'neoComment' },
  text: 'hello text',
  date: (new Date()).toString(),
};
Comment.propTypes = {
  author: React.PropTypes.object,
  text: React.PropTypes.string,
  date: React.PropTypes.string,
};

export default Comment;
