<template>
  <div class="container mx-auto">
    <VeeForm
      v-slot="{ handleSubmit, errors }"
      :validation-schema="schema"
      as="div"
      class="w-full form-div"
    >
      <form action="" @submit.prevent="handleSubmit($event, onSubmit)">
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div class="flex items-center flex-col">
            <label for="profile_picture" class="relative cursor-pointer">
              <img
                :src="sourceImageProfile"
                alt=""
                class="rounded-full w-20 h-20 object-cover"
              />
              <i
                class="fa-solid fa-camera absolute right-0 bottom-1 bg-[#f9f8f8] p-1 rounded-full"
              ></i>
            </label>
            <span class="error mt-2">{{
              error_profile_picture || errors.profile_picture
            }}</span>
            <Field
              type="file"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 hidden"
              id="profile_picture"
              name="profile_picture"
              v-model="profile_picture"
              accept="image/*"
              :rules="profile_pictureRules"
              @change="handleFileChange($event, errors.profile_picture)"
            />
          </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="username"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Tên người dùng</label
            >
            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
              </span>
              <Field
                type="text"
                id="username"
                name="username"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                v-model="username"
                :rules="usernameRules"
                :class="{
                  'input-error': errors.username,
                }"
              />
            </div>
            <span class="error">{{ errors.username }}</span>
          </div>
          <div>
            <label
              for="fullname"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Họ và tên</label
            >
            <Field
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="fullname"
              name="fullname"
              v-model="fullname"
              :rules="fullnameRules"
              :class="{
                'input-error': errors.fullname,
              }"
            />
            <span class="error">{{ errors.fullname }}</span>
          </div>
          <div>
            <label
              for="input-group-1"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Email</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path
                    d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                  />
                  <path
                    d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                  />
                </svg>
              </div>
              <Field
                type="text"
                id="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="name@flowbite.com"
                v-model="email"
                :rules="emailRules"
                :class="{
                  'input-error': errors.email,
                }"
              />
            </div>
            <span class="error">{{ errors.email }}</span>
          </div>
          <div>
            <label
              for="password"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <Field
              type="password"
              id="password"
              name="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              autocomplete=""
              v-model="password"
              :rules="passwordRules"
              :class="{
                'input-error': errors.password,
              }"
            />
            <span class="error">{{ errors.password }}</span>
          </div>
          <div>
            <label
              for="phone_number"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Số điện thoại</label
            >
            <Field
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="phone_number"
              name="phone_number"
              v-model="phone_number"
              :rules="phone_numberRules"
              :class="{
                'input-error': errors.phone_number,
              }"
            />
            <span class="error">{{ errors.phone_number }}</span>
          </div>
          <div>
            <label
              for="address"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Địa chỉ</label
            >
            <Field
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="address"
              name="address"
              v-model="address"
              :rules="addressRules"
              :class="{
                'input-error': errors.address,
              }"
            />
            <span class="error">{{ errors.address }}</span>
          </div>
          <div>
            <label
              for="id_card"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Số CMND (CCCD)</label
            >
            <Field
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="id_card"
              name="id_card"
              v-model="id_card"
              :rules="id_cardRules"
              :class="{
                'input-error': errors.id_card,
              }"
            />
            <span class="error">{{ errors.id_card }}</span>
          </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div>
            <label
              for="tags_multiple"
              class="font-sans block mb-2 text-sm font-medium text-gray-900"
              >Chọn thẻ tags</label
            >
            <Field
              as="select"
              multiple
              id="tags_multiple"
              name="selectedTags"
              v-model="selectedTags"
              :rules="tagsRules"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="Vip">VIP</option>
              <option value="Active">ACTIVE</option>
              <option value="Tpin">TPIN</option>
            </Field>
            <span class="error">{{ errors.selectedTags }}</span>
          </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-4">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Thêm người dùng
          </button>
        </div>
      </form>
    </VeeForm>
  </div>
</template>

<script setup>
const store = new useStore();
yup.addMethod(yup.string, "uniqueEmail", function (message) {
  return this.test("uniqueEmail", message, async function (value) {
    if (!value) return false;
    try {
      const customer = await store.dispatch("customer/getByEmail", value);
      if (customer) return false;
      else return true;
    } catch (error) {
      return false;
    }
  });
});
yup.addMethod(yup.string, "uniqueUsername", function (message) {
  return this.test("uniqueUsername", message, async function (value) {
    if (!value) return false;
    try {
      const customer = await store.dispatch("customer/getByUsername", value);
      if (customer) return false;
      else return true;
    } catch (error) {
      return false;
    }
  });
});
const usernameRules = yup
  .string()
  .required("Hãy nhập tên người dùng của người dùng!")
  .min(6, "Tên người dùng phải có ít nhất 6 ký tự!")
  .uniqueUsername("Tên người dùng đã tồn tại trong hệ thống!");
const fullnameRules = yup
  .string()
  .required("Hãy điền họ và tên của người dùng!")
  .max(100, "Họ và tên không được vượt quá 100 ký tự!");
const emailRules = yup
  .string()
  .required("Hãy nhập tài khoản email của người dùng!")
  .email("Hãy nhập đúng định dạng email!")
  .uniqueEmail("Tài khoản email đã tồn tại trong hệ thống");
const passwordRules = yup
  .string()
  .required("Hãy nhập mật khẩu của người dùng!")
  .min(8, "Mật khẩu phải có tối thiểu 8 ký tự!");
const phone_numberRules = yup
  .string()
  .required("Hãy nhập số điện thoại của người dùng!");
const addressRules = yup.string().required("Hãy nhập địa chỉ của người dùng!");
const id_cardRules = yup
  .string()
  .required("Hãy nhập mã CMND (CCCD) của người dùng!");
const profile_pictureRules = yup.object().shape({
  name: yup.string().required("Hãy chọn ảnh đại diện cho người dùng!"),
  type: yup.string().matches(/^image\//, "Vui lòng chọn một tệp hình ảnh."),
  file: yup
    .mixed()
    .test("fileSize", "Kích thước ảnh phải nhỏ hơn 60KB!", (value) => {
      if (!value) return false;
      return value.size <= 60 * 1024;
    }),
});
const tagsRules = yup
  .array()
  .of(yup.string())
  .min(1, "Phải có ít nhất 1 thẻ được chọn!")
  .test("requiredValue", "Hãy chọn đúng giá trị của thẻ", (value) => {
    if (value) {
      const arr = Array.from(value);
      const arr_required = ["Vip", "Active", "Tpin"];
      for (let i = 0; i < arr.length; i++) {
        if (!arr_required.includes(arr[i])) {
          return false;
        }
      }
      return true;
    }
  });
const schema = yup.object().shape({
  username: usernameRules,
  fullname: fullnameRules,
  email: emailRules,
  password: passwordRules,
  phone_number: phone_numberRules,
  address: addressRules,
  id_card: id_cardRules,
  profile_picture: profile_pictureRules,
  selectedTags: tagsRules,
});
</script>

<script>
import { Field, Form as VeeForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";

export default {
  setup() {},
  components: {
    Field,
    VeeForm,
  },
  data() {
    return {
      selectedTags: [],
      username: "",
      fullname: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
      id_card: "",
      errors: {},
      error_profile_picture: "",
      profile_picture: {
        name: "",
        type: "",
        file: "",
      },
      sourceImageProfile: require("../assets/images/AddCustomer/no-thumb.png"),
    };
  },
  methods: {
    onSubmit() {
      if (
        this.selectedTags.length > 0 &&
        this.sourceImageProfile !=
          require("../assets/images/AddCustomer/no-thumb.png")
      ) {
        this.error_selectedTags = "";
        const CryptoJS = require("crypto-js");
        const customer = {
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          password: CryptoJS.MD5(this.password).toString(),
          phone_number: this.phone_number,
          address: this.address,
          id_card: this.id_card,
          tags: Array.from(this.selectedTags),
          profile_picture: this.sourceImageProfile,
        };
        this.$store
          .dispatch("customer/addCustomer", customer)
          .then((response) => {
            if (response) {
              this.$store.state.modal.modal.hide();
            } else {
              this.$store.dispatch(
                "alert/danger",
                "Thêm người dùng thất bại vui lòng thử lại!"
              );
            }
          });
      } else {
        this.error_selectedTags = "Hãy chọn ít nhất 1 thẻ cho người dùng!";
      }
    },
    handleFileChange(event) {
      let rawImg;
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          rawImg = reader.result;
          this.sourceImageProfile = rawImg;
        };
        const convertedFile = {
          name: file.name,
          type: file.type,
          file: file,
        };
        this.profile_picture = convertedFile;
        if (/^image\//.test(file.type)) {
          if (file.size <= 60 * 1024) {
            reader.readAsDataURL(file);
            this.error_profile_picture = "";
          } else {
            this.error_profile_picture = "Kích thước ảnh phải nhỏ hơn 60KB!";
          }
        } else {
          this.error_profile_picture = "Vui lòng chọn một tệp hình ảnh.";
        }
      } else {
        this.error_profile_picture = "Hãy chọn ảnh đại diện cho người dùng!!!";
      }
    },
  },
};
</script>

<style>
.error {
  font-family: var(--font-label);
  font-size: 14px;
  color: red;
  margin-left: 8px;
}
.input-error {
  border-color: red !important;
}
</style>
