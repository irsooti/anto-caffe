import React from 'react';
import { connect } from 'react-redux';
import ChatBar from '../../components/ChatBar/ChatBar';
import ChatScreen from '../../components/ChatScreen/ChatScreen';

const Chat = (props) => {
  return (
    <div className="row">
      <ChatScreen currentUserId={props.user.uid} />
      <ChatBar />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Chat);
