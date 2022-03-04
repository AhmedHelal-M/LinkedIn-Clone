import { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";
import { ReactComponent as Close } from "./../Assets/images/close.svg";
import { ReactComponent as ShareImage } from "./../Assets/images/share-image.svg";
import { ReactComponent as ShareVideo } from "./../Assets/images/share-video.svg";
import { ReactComponent as Docmment } from "./../Assets/images/docmment-post.svg";
import { ReactComponent as Share } from "./../Assets/images/share-post.svg";
import { ReactComponent as Celebrate } from "./../Assets/images/celebrate.svg";
import { ReactComponent as Poll } from "./../Assets/images/poll.svg";
import { ReactComponent as Apost } from "./../Assets/images/addToPost.svg";
import { ReactComponent as Comment } from "./../Assets/images/comment-post.svg";

const PostModal = (props) => {
  const [EditorText, SetEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [VideoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    console.log(`Hello`);
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: VideoLink,
      user: props.user,
      description: EditorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    SetEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModel === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <Close height={20} width={20} />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="./images/user.svg" alt="User Image" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={EditorText}
                  onChange={(e) => SetEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === `image` ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === `media` && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={VideoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {VideoLink && (
                        <ReactPlayer width={"100%"} url={VideoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <label htmlFor="file">
                    {" "}
                    <ShareImage />
                  </label>
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <ShareVideo />
                </AssetButton>
                <AssetButton>
                  <Docmment />
                </AssetButton>
                <AssetButton>
                  <Share />
                </AssetButton>
                <AssetButton>
                  <Celebrate />
                </AssetButton>
                <AssetButton>
                  <Poll />
                </AssetButton>
                <AssetButton>
                  <Apost />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <Comment />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!EditorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 7px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 6px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 18px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 35px;
    width: 35px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.6);
    border: none;
    background: transparent;

    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
      border-radius: 50%;
    }
    &:active {
      color: black;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  svg,
  img {
    width: 52px;
    height: 52px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  min-width: auto;
  background-color: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.6);
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
    height: 40px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
      border-radius: 55%;
    }
    &:active {
      color: black;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 19px;
  border: none;
  color: white;
  background: ${(props) =>
    props.disabled ? "rgba(0, 0, 0, 0.12)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.3)" : "white")};
`;

const ShareComment = styled.div`
  display: flex;
  align-items: center;
  padding-left: 18px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
`;

const Editor = styled.div`
  padding: 12px 0;
  textarea {
    width: 100%;
    min-height: 200px;
    resize: none;
    border: none;
    outline: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
