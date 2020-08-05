<template>
  <Page>
    <WrapLayout orientation="horizontal">
      <StackLayout width="50%">
        <Label text="first" height="70" backgroundColor="#43b883" />
        <Label text="first222" height="70" backgroundColor="#123123" />
      </StackLayout>
      <StackLayout width="50%">
        <Label text="first2222  22222222" height="70" backgroundColor="#ffffff" />

        <Button
          width="75"
          class="btn-rounded-lg"
          text="View All"
          textTransform="none"
          marginBottom="5"
          backgroundColor="#89acff"
          color="#000000"
          @tap="toFuncTest()"
        ></Button>
      </StackLayout>
    </WrapLayout>
  </Page>
</template>

<script>
// A stub for a service that authenticates users.
const userService = {
  register(user) {
    return Promise.resolve(user);
  },
  login(user) {
    return Promise.resolve(user);
  },
  resetPassword(email) {
    return Promise.resolve(email);
  },
};

// A stub for the main page of your app. In a real app you’d put this page in its own .vue file.
const HomePage = {
  template: `
<Page>
	<Label class="m-20" textWrap="true" text="You have successfully authenticated. This is where you build your core application functionality."></Label>
</Page>
`,
};

export default {
  data() {
    return {
      isLoggingIn: true,
      user: {
        email: "foo@foo.com",
        password: "foo",
        confirmPassword: "foo",
      },
      HomePage2: {
        template: `
        <Page>
          <Label class="m-20" textWrap="true" text="222222222."></Label>
          <Button width="75" class="btn-rounded-lg"
                                text="View All" textTransform="none"
                                marginBottom="5" backgroundColor="#89acff"
                                color="#000000" @tap="dexxx()"></Button>
        </Page>
        `,
        methods: {
          dexxx() {
            prompt({
              title: "Forgot Password",
              message:
                "Enter the email address you used to register for APP NAME to reset your password.",
              inputType: "email",
              defaultText: "",
              okButtonText: "Ok",
              cancelButtonText: "Cancel",
            }).then((data) => {
              alert(data);
            });
          },
        },
      },
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    dexxx22() {
      alert("Please provide both an email address and password.");
    },

    toFuncTest() {
      this.$navigateTo(this.HomePage2);
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      userService
        .login(this.user)
        .then(() => {
          this.$navigateTo(HomePage);
        })
        .catch(() => {
          this.alert("Unfortunately we could not find your account.");
        });
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
      }

      userService
        .register(this.user)
        .then(() => {
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.alert("Unfortunately we were unable to create your account.");
        });
    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",
      }).then((data) => {
        if (data.result) {
          userService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.alert(
                "Unfortunately, an error occurred resetting your password."
              );
            });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message,
      });
    },
  },
};
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #d51a1a;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input-field .input {
  font-size: 54;
}

.btn-primary {
  height: 50;
  margin: 30 5 15 5;
  background-color: #d51a1a;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}

.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>
