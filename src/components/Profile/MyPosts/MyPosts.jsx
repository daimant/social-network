import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo(({ postsData, addPost }) => {
  let postsElement = postsData.map(p => (
    <Post
      message={p.message}
      img={p.img}
      likeCounts={p.likeCounts}
      id={p.id}
      key={p.id}
    />
  ));

  let onAddPost = values => {
    addPost(values.newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <div>
        <h3> Стена </h3>
        <AddNewPostFormRedux onSubmit={onAddPost} />
      </div>
      <div className={classes.posts}>{postsElement}</div>
    </div>
  );
});
const maxLength10 = maxLengthCreator(10);
const AddNewPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          validate={[required, maxLength10]}
          placeholder={"Введите сообщение"}
        />
      </div>
      <div>
        <button> Добавить пост</button>
      </div>
    </form>
  );
};
const AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
