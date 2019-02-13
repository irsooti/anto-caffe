import React, { useState, useRef, useEffect } from 'react';
import avatarImg from '../../assets/avatar.svg';
import { connect } from 'react-redux';
import cssModule from './Profile.module.css';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import {
  updateProfile as apiUpdateProfile,
  uploadAvatarAndRetrieveUrl
} from '../../api/auth';

import { updateUserProfile } from '../../store/actions/auth';

const Profile = props => {
  const { user } = props;
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const fileInput = useRef();
  let reader;

  function uploadClickHandler() {
    fileInput.current.click();
  }

  const displayNameHandler = value => {
    setDisplayName(value);
  };

  const handleFileRead = e => {
    console.log(e);
    setAvatarUrl(reader.result);
  };

  const handleFileChoosen = evt => {
    reader = new FileReader();
    reader.onloadend = handleFileRead;
    if (evt.target.files.length > 0) reader.readAsDataURL(evt.target.files[0]);
  };

  const updateUserProfileHandler = async () => {
    const id = user.uid;
    try {
      const photoUrl = uploadAvatarAndRetrieveUrl(id, avatarUrl);
      apiUpdateProfile(displayName, photoUrl).then(resp => {
        props.updateUserProfile(displayName, photoUrl);
      });
      setAvatarUrl(photoUrl);
    } catch (err) {}
  };

  return (
    <div>
      <div className="row" style={{ margin: 'auto', maxWidth: '600px' }}>
        <div className="pt-3 row">
          <div className={`column full ${cssModule.profileContainer}`}>
            <div className={`${cssModule.avatarContainer}`}>
              <div
                className={cssModule.avatar}
                onClick={uploadClickHandler}
                style={{
                  backgroundSize: 'contain',
                  backgroundImage: `url(${avatarUrl ? avatarUrl : avatarImg})`
                }}
              />
            </div>
            <div className="text-center">
              <h3>Profilo</h3>
              <Input
                block={true}
                label="Username"
                onChange={displayNameHandler}
                value={displayName ? displayName : user.displayName}
              />
            </div>
            <div className="text-right pt-3">
              <span>azz</span>
              <Button text="Salva" onClick={updateUserProfileHandler} type="" />
            </div>
          </div>
        </div>
      </div>
      <input
        ref={fileInput}
        onChange={handleFileChoosen}
        type="file"
        style={{ display: 'none' }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  updateUserProfile: (displayName, photoUrl) =>
    updateUserProfile(displayName, photoUrl)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
