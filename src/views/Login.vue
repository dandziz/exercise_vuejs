<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="screen">
    <div class="container">
      <VeeForm
        v-slot="{ handleSubmit, errors }"
        :validation-schema="schema"
        as="div"
        class="w-full form-div"
      >
        <form
          action=""
          class="form-login"
          @submit.prevent="handleSubmit($event, onSubmit)"
        >
          <p class="title">Customer Care</p>
          <p class="label" for="account">Tên đăng nhập</p>
          <Field
            type="text"
            id="account"
            name="account"
            v-model="account"
            placeholder="example@gmail.com"
            :rules="emailRules"
            :class="{
              'input-error': errors.account,
            }"
          />
          <span class="error">{{ errors.account }}</span>
          <p class="label" for="password">Mật khẩu</p>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="**********************"
            v-model="password"
            :rules="passwordRules"
            :class="{
              'input-error': errors.password,
            }"
            :autocomplete="password"
          />
          <span class="error">{{ errors.password }}</span>
          <div class="box-memory">
            <input type="checkbox" v-model="memory" />
            <span class="memory">Ghi nhớ ?</span>
          </div>
          <button :disabled="loading">
            <svg
              v-if="loading"
              aria-hidden="true"
              role="status"
              class="loading inline w-7 h-7 mb-1 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              /></svg
            >Đăng nhập
          </button>
        </form>
      </VeeForm>
      <div class="image-info"></div>
    </div>
  </div>
</template>

<script>
import { Field, Form as VeeForm } from "vee-validate";
import * as yup from "yup";
import { mapState, mapActions, useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();
    const emailRules = yup.string().required("Hãy điền tên đăng nhập của bạn!");
    const passwordRules = yup
      .string()
      .required("Hãy điền mật khẩu của bạn!")
      .min(8, "Mật khẩu tối thiểu 8 kí tự!");
    const schema = yup.object({
      account: emailRules,
      password: passwordRules,
    });
    let store_user = undefined;
    store.dispatch("user/getRememberAccount");
    store_user = store.state.user.rememberAccount;
    const account = ref("");
    const password = ref("");
    if (store_user) {
      account.value = store_user.email;
      password.value = store_user.password;
    }
    return { emailRules, passwordRules, schema, store_user, account, password };
  },
  components: {
    Field,
    VeeForm,
  },
  data() {
    return {
      memory: false,
      loading: false,
    };
  },
  computed: {
    ...mapState("user", ["status", "rememberAccount"]),
  },
  methods: {
    ...mapActions("user", ["login"]),
    ...mapActions("alert", ["clear"]),
    onSubmit() {
      this.handleClearAlert();
      this.loading = true;
      const { account, password, memory } = this;
      if (this.account && this.password) {
        this.login({ account, password, memory });
      }
      setTimeout(() => {
        this.loading = false;
      }, 800);
    },
    handleClearAlert() {
      this.clear();
    },
  },
};
</script>

<style scoped>
.screen {
  display: flex;
  align-items: center;
  height: 100vh;
}
.container {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 74.72%;
  margin-left: 14.17vw;
  width: 100%;
}
.form-login {
  flex-shrink: 0;
  border-radius: 30px;
  border: 0px solid var(--log-in, #000);
  background: #fffcfc;
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  width: 720px;
  padding: 7.7vh 20.13% 15.46vh;
  height: 100%;
}
.image-info {
  background: url("../assets/images/Image.png");
  height: 100%;
  width: 56.35vw;
  flex-shrink: 0;
  border-radius: 30px;
  position: absolute;
  z-index: -1;
  left: 18vw;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
}
input:not([type="checkbox"]),
input::placeholder,
.label,
button {
  font-size: 28px;
}
input:not([type="checkbox"]) {
  width: 431px;
  padding: 12px 56px 15px 32px;
  border-radius: 15px;
  border: 1px solid var(--grey);
  background: #fffcfc;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  color: var(--black);
}

.box-memory {
  margin-top: 1.5vh;
}

input::placeholder {
  font-family: Roboto;
}

label,
input,
p,
input::placeholder,
span {
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  flex-shrink: 0;
}
.error {
  font-family: var(--font-label);
  font-size: 20px;
  margin: 6px 8px;
  color: red;
}
.input-error {
  border-color: red !important;
}
.title {
  font-size: 2.6875rem;
  color: var(--orange);
  margin-bottom: 3.8vh;
  font-family: var(--font);
}
.label {
  color: #0070d2;
  font-family: var(--font-label);
  margin-bottom: 2.3vh;
  margin-top: 2.3vh;
}

input[type="checkbox"] {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 2px solid var(--grey);
  background: #fffcfc;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.memory {
  font-size: 1.25rem;
  margin-left: 18px;
  color: var(--primary-color);
}

button {
  font-family: var(--font-label);
  color: var(--white);
  background-color: var(--primary-color);
  border: none;
  padding: 19px 4vw 19px 4vw;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
  margin-top: 3.85vh;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
  transition: 0.3s ease-in-out;
}
/* Width */

@media screen and (min-width: 1920px) {
  .form-login {
    width: 50%;
    padding: 7.7vh 5% 15.46vh;
  }
}

@media screen and (max-width: 1920px) {
  .form-login {
    width: 720px;
    padding-left: 8.8%;
    padding-right: 9%;
  }
  input:not([type="checkbox"]) {
    width: 100%;
  }
  button {
    width: 100%;
  }
}

@media screen and (max-width: 1600px) {
  .form-login {
    width: 600px;
    padding-left: 5%;
    padding-right: 5%;
  }
}

@media screen and (max-width: 1600px) and (max-height: 900px) {
  .form-login {
    padding-top: 4vh;
  }
  input:not([type="checkbox"]) {
    padding: 8px 56px 11px 32px;
  }
}

@media screen and (max-width: 1280px) {
  .form-login {
    width: 600px;
  }
}

@media screen and ((max-width: 960px) or ((max-width: 960px) and (max-height: 540px))) {
  .form-login {
    width: 480px;
  }
  button {
    margin-top: 1.8vh;
  }
}

@media screen and (max-width: 640px) {
  .form-login {
    width: 480px;
    margin-right: 0;
  }
  .image-info {
    display: none;
  }
}

/* Height */
@media screen and (max-height: 900px) {
  .container {
    height: 77%;
  }
}
@media screen and (max-height: 820px) {
  .container {
    height: 82%;
  }
}
@media screen and (max-height: 720px) {
  .form-login {
    padding: 3vh 10% 15.46vh;
  }
  .container {
    height: 85%;
  }
}

@media screen and (max-height: 620px) and (max-width: 960px) {
  .form-login {
    padding: 3vh 10% 15.46vh;
  }
  .container {
    height: 85%;
  }
  input:not([type="checkbox"]),
  input::placeholder,
  .label,
  button {
    font-size: 20px;
  }
  .title {
    font-size: 36px;
  }
  .memory {
    font-size: 16px;
  }
}

@media screen and ((max-height: 520px) or (max-width: 414.4px)) {
  .title {
    margin-bottom: 2vh;
  }
  input:not([type="checkbox"]) {
    padding-top: 5px;
    padding-bottom: 8px;
  }
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
  }
  button {
    padding: 13px 0px 13px;
  }
}

@media screen and (max-height: 360px) and (max-width: 640px) {
  input:not([type="checkbox"]),
  input::placeholder,
  .label,
  button {
    font-size: 18px;
  }
  .title {
    font-size: 28px;
  }
  .memory {
    font-size: 14px;
  }
  input:not([type="checkbox"]) {
    padding-top: 2px;
    padding-bottom: 5px;
  }
  button {
    margin-top: 2vh;
    padding: 8px 0px 8px;
  }
  .form-login {
    padding-top: 1vh;
  }
  .loading {
    width: 16px;
    height: 16px;
    margin-top: 1px;
    margin-bottom: 1px;
  }
}

/* Mobile */
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .container {
    margin-left: 0px;
    justify-content: center;
    height: 60%;
  }
  .form-login {
    width: 95%;
    padding: 3vh 5% 5vh;
  }
  .image-info {
    display: none;
  }
  input:not([type="checkbox"]),
  input::placeholder,
  .label,
  button {
    font-size: 18px;
  }
  .title {
    font-size: 34px;
  }
  .memory {
    font-size: 14px;
  }
  .form-div {
    display: flex;
    justify-content: center;
  }
}

@media screen and (((width: 412px) and (height: 915.2px)) or ((width: 414.4px) and (height: 896px)) or ((width: 414.4px) and (height: 916px))) {
  .container {
    height: 53%;
  }
  .error {
    font-size: 14px;
  }
}
</style>
