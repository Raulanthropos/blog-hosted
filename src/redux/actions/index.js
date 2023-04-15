export const FETCH_BLOGS = "FETCH_BLOGS";
export const SET_ID = "SET_ID";
export const SET_USER = "SET_USER";

const baseUrl = process.env.REACT_APP_BE_URL;

export const getBlogs = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseUrl + "/blogPosts");
      if (response.ok) {
        const blogs = await response.json();
        console.log("Blogs are here", blogs);
        dispatch({
          type: FETCH_BLOGS,
          payload: blogs,
        });
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
