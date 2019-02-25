export const setUser = user => ({
    type: 'SET_USER',
    user
});

export const logout = () => ({
    type: 'LOG_OUT'
});

export const employeeSelected = user => {
    return {
      type: `USER_SELECTED`,
      payload: user
    };
  };

