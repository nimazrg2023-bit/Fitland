import { createSlice } from "@reduxjs/toolkit";

const initialState = { commentsByUser: {} };

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const { userId, comment } = action.payload;
      if (!userId) return;
      if (!state.commentsByUser) state.commentsByUser = {};
      if (!state.commentsByUser[userId]) state.commentsByUser[userId] = [];
      state.commentsByUser[userId].push({ id: Date.now(), createdAt: new Date().toISOString(), ...comment });
    }
  },
});

export const { addComment } = commentsSlice.actions;

export const selectUserComments = (state) => {
  const userId = state.auth?.user?.id;
  if (!userId) return [];
  return state.comments?.commentsByUser?.[userId] || [];
};

export const selectAllComments = (state) => {
  const commentsByUser = state.comments?.commentsByUser || {};
  const allComments = [];
  Object.values(commentsByUser).forEach((userComments) => { allComments.push(...userComments); });
  return allComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export default commentsSlice.reducer;