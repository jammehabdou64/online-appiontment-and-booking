export const auth = {
  default: "passport",
  strategies: {
    local: {
      fields: {
        usernameField: "email",
        passwordField: "password",
      },
    },
  },

  providers: {
    users: {
      driver: "jcc-eloquent",
      model: "User",
    },
  },
};
