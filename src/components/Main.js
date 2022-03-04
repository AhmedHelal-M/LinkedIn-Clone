import { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { getArticlesAPI } from "../actions";
import { ReactComponent as Photo } from "./../Assets/images/photo.svg";
import { ReactComponent as Video } from "./../Assets/images/video.svg";
import { ReactComponent as Event } from "./../Assets/images/event.svg";
import { ReactComponent as Document } from "./../Assets/images/article.svg";
import { ReactComponent as Like } from "./../Assets/images/like.svg";
import { ReactComponent as Comment } from "./../Assets/images/comment.svg";
import { ReactComponent as Share } from "./../Assets/images/share.svg";
import { ReactComponent as Send } from "./../Assets/images/send.svg";
import { ReactComponent as Ellipsis } from "./../Assets/images/ellipsis.svg";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
const Main = (props) => {
  const [showModel, setShowModel] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModel) {
      case "open":
        setShowModel("close");
        break;
      case "close":
        setShowModel("open");
        break;
      default:
        setShowModel("close");
        break;
    }
  };
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} />
            ) : (
              <img src="./images/user.svg" alt="User Image" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <Photos />
              <span>Photo</span>
            </button>

            <button>
              <Videos />
              <span>Video</span>
            </button>

            <button>
              <Events />
              <span>Event</span>
            </button>

            <button>
              <Documents />
              <span>Write article</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="./images/Spinner-1s-200px.svg" />}
          {props.articles.length > 0 &&
            props.articles.map((article, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={props.user.photoURL} alt="User Image" />
                    <div>
                      <span>{props.user.displayName}</span>
                      <span>{props.user.email}</span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <Ellipsis color="rgba(0, 0, 0, 0.6)" />
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImg>
                  <a>
                    {!article.SharedImg && article.video ? (
                      <ReactPlayer width={"100%"} url={article.video} />
                    ) : (
                      article.sharedImg && <img src={article.sharedImg} />
                    )}
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    <button>
                      <img src="./images/like1.png" alt="Like Icon" />
                      <img src="./images/Celebrate.png" alt="Celebrate Icon" />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments} comments</a>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button>
                    <Like colot="rgba(0, 0, 0, 0.6)" />
                    <span>Like</span>
                  </button>
                  <button>
                    <Comment color="rgba(0, 0, 0, 0.6)" />
                    <span>Comment</span>
                  </button>
                  <button>
                    <Share color="rgba(0, 0, 0, 0.6)" />
                    <span>Share</span>
                  </button>
                  <button>
                    <Send color="rgba(0, 0, 0, 0.6)" />
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            ))}
        </Content>
        <PostModal showModel={showModel} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  backgroun: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      lien-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        span {
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
`;

const Photos = styled(Photo)`
  margin: 0 12px 0 -6px;
  color: #70b5f9;
`;
const Videos = styled(Video)`
  margin: 0 12px 0 -6px;
  color: #7fc15e;
`;
const Events = styled(Event)`
  margin: 0 12px 0 -6px;
  color: #e7a33e;
`;
const Documents = styled(Document)`
  margin: 0 12px 0 -6px;
  color: #fc9295;
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: flex;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    oblect-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.div`
  line-height: 1.3;
  display: flex;
  justify-content: space-between;
  overflow: auto;
  margin: 0 14px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 11px;
    color: rgba(0, 0, 0, 0.6);
    button {
      display: flex;
      background: transparent;
      border: none;
      img {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 8px 8px;
  button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 8px;
    @media (min-width: 768px) {
      span {
        margin-left: 5px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
