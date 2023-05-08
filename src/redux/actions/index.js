export const FETCH_BLOGS = "FETCH_BLOGS";
export const ADD_POST = "ADD_POST";
export const SET_ID = "SET_ID";
export const SET_USER = "SET_UPDATED_USER";
export const SET_UPDATED_USER = "SET_UPDATED_USER";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

const baseUrl = process.env.REACT_APP_BE_URL;

export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const getAccessToken = (loggingInUser) => {
  console.log(baseUrl);
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(loggingInUser),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("options", options);
    try {
      console.log("---------inside the getAccessToken action----------");
      const response = await fetch(baseUrl + "/authors/login", options);
      if (response.ok) {
        const tokens = await response.json();
        const accessToken = await tokens.accessToken;

        if (accessToken) {
          console.log("---------access token created----------");
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: accessToken,
          });
          localStorage.setItem("accessToken", accessToken);
          dispatch({
            type: SET_AUTHENTICATED,
            payload: true,
          });
          try {
            const opts = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
            };
            const userResponse = await fetch(baseUrl + "/authors/me", opts);
            if (userResponse.ok) {
              const user = await userResponse.json();

              dispatch({
                type: SET_UPDATED_USER,
                payload: user,
              });
            } else {
              console.log("error getting the user");
            }
          } catch (error) {
            console.log("error in trycatch", error);
          }
        } else {
          console.log("access token not created");
        }
      } else {
        const errorResponse = await response.json();
        console.log("error logging in user", errorResponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBlogs = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(baseUrl + "/blogPosts");
      if (response.ok) {
        const blogs = await response.json();
        // console.log("Blogs are here", blogs);
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

export const addPost = (token, post) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseUrl + "/blogPosts", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: ADD_POST,
          payload: data,
        });
      } else {
        console.log("Error adding new post");
      }
    } catch (error) {
      console.log("Error while adding new post", error);
    }
  };
};

export const updateAuthor = (author) => {
  return async (dispatch) => {
    if (!author?._id) {
      console.log("Error: author._id is undefined");
      return;
    }

    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        _id: author._id,
        name: author.name,
        surname: author.surname,
        password: author.password,
      }),
    };
    try {
      const response = await fetch(baseUrl + `/authors/${author._id}`, opts);

      if (response.ok) {
        const updatedAuthor = await response.json();
        console.log("updatedAuthor", updatedAuthor);
        dispatch({
          type: SET_UPDATED_USER,
          payload: updatedAuthor,
        });
      } else {
        console.log("Error updating user");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
