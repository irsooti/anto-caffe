import React, { useState, useRef } from 'react';
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
  const [displayName, setDisplayName] = useState(user.displayName);
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);
  const [updated, setUpdatedStatus] = useState(null);

  const fileInput = useRef();
  let reader;

  function uploadClickHandler() {
    fileInput.current.click();
  }

  const displayNameHandler = value => {
    setDisplayName(value);
    setUpdatedStatus(null)
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

  const successFrag = (
    <span style={{ color: 'var(--success-color)' }}>
      Profilo aggiornato con successo! <i className="far fa-check-circle" />
    </span>
  );
  const errorFrag = (
    <span style={{ color: 'var(--error-color)' }}>
      Profilo non aggiornato! <i className="far fa-times-circle" />
    </span>
  );

  const conditionalFrag = {
    true: successFrag,
    false: errorFrag,
    null: null
  };

  const updateUserProfileHandler = async () => {
    const id = user.uid;
    let photoUrl;
    try {
      if (fileInput.current.files.length !== 0) {
        photoUrl = await uploadAvatarAndRetrieveUrl(
          id,
          fileInput.current.files[0]
        );
      }

      if (!photoUrl) photoUrl = user.photoURL;

      if (displayName.trim().length === 0) return;

      apiUpdateProfile(displayName, photoUrl).then(resp => {
        setUpdatedStatus(true);
        props.updateUserProfile(displayName, photoUrl);
      });
      setAvatarUrl(photoUrl);
    } catch (err) {
      setUpdatedStatus(false);
    }
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
                value={displayName}
              />
            </div>
            <div className="text-right pt-3">
              {conditionalFrag[updated]}
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
    dispatch(updateUserProfile(displayName, photoUrl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
