import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // just find the post if the currentID exist in state
  // fetch a single post
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          className={classes.fileInput}
          label='Creator'
          name='creator'
          value={postData.creator}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant='outlined'
          className={classes.fileInput}
          label='Title'
          name='title'
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant='outlined'
          className={classes.fileInput}
          label='Message'
          name='message'
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant='outlined'
          className={classes.fileInput}
          label='Tags'
          name='tags'
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          className={classes.buttonSubmit}
        >
          {currentId ? "Edit" : "Create"}
        </Button>
        <Button
          type='button'
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
