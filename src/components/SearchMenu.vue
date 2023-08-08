<!-- eslint-disable vue/valid-template-root -->
<template>
  <form class="form">
    <div class="flex items-center h-full">
      <i class="fa-solid fa-magnifying-glass text-[36px]"></i>
    </div>
    <input
      type="search"
      class="form--input"
      v-model="phone_number"
      @input="handleSearchPhoneNumber"
    />
  </form>
  <p class="text-[22px] font-semibold">Kết quả tìm kiếm danh bạ</p>
  <div class="search--result">
    <div
      class="search--result__result"
      v-for="customer in results"
      :key="customer.id"
    >
      <div class="search--result__name flex justify-between items-center">
        <p class="text-2xl font-semibold">{{ customer.fullname }}</p>
        <input
          type="radio"
          class="radioResult"
          :value="customer.id"
          name="chooseCustomer"
          v-model="chooseCustomers"
          @change="handleChooseCustomer(customer.id)"
        />
      </div>
      <div class="search--result__phone flex justify-between items-center">
        <p class="text-xl font-semibold">{{ customer.phone_number }}</p>
        <i class="fa-solid fa-magnifying-glass text-[24px]"></i>
      </div>
      <div class="search--result__action"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  emits: ["actionPanel"],
  data() {
    return {
      phone_number: "",
      results: [],
      chooseCustomers: {},
    };
  },
  methods: {
    ...mapActions("customer", ["getByPhoneNumber", "chooseCustomer"]),
    async handleSearchPhoneNumber() {
      if (this.phone_number != "") {
        const response = await this.getByPhoneNumber(this.phone_number);
        const result = response.map(function (item) {
          return JSON.parse(JSON.stringify(item));
        });
        this.results = result;
      } else {
        this.results = [];
      }
    },
    handleChooseCustomer(id) {
      this.chooseCustomer(id);
      if (!this.isMobile) this.$emit("actionPanel", "user_info");
      else {
        this.$store.dispatch("modal/show", {
          title: "Thông tin người dùng",
          body: "CustomerInfo",
          size: "max-w-lg",
        });
        this.$store.state.modal.modal.show();
      }
    },
  },
  computed: {
    ...mapState("window", ["isMobile"]),
  },
};
</script>

<style>
.form {
  display: inline-flex;
  gap: 23px;
  align-items: flex-start;
  padding: 0.602vh 8vw 0.602vh 0.521vw;
  border-radius: 10px;
  border: 2px solid var(--light-grey);
  width: 98.5%;
  margin: 0.7vh 0px 2vh;
}
.form--input {
  color: var(--black);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  max-width: 100%;
  box-sizing: border-box;
}
.form--input:focus {
  outline-width: 0;
}
.search p {
  font-family: var(--font-label);
}
.search--result {
  margin-left: 1.875vw;
  padding-top: 0.38vh;
  max-height: 65.6vh;
  overflow-y: auto;
}
.search--result__result {
  margin-top: 2.13vh;
  width: 99%;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.8vh;
}
.search--result__name {
  margin-bottom: 1.852vh;
  padding-right: 1.93vw;
}
.search--result__phone {
  padding-right: 1.6vw;
}
.search--result__name p {
  font-family: var(--font-label);
  color: var(--primary-orange);
}
.search--result__phone p {
  font-family: var(--font-label);
  color: #1858a4;
}

.radioResult {
  width: 19px;
  height: 19px;
}
/* Responsive */
@media screen and (max-width: 1600px) and (max-height: 900px) {
}
@media screen and (max-width: 1510px) and (max-height: 900px) {
  .icon__tpin {
    padding: 10px 15px 10px 15px;
  }
}
@media screen and (max-width: 1280px) and (max-height: 1080px) {
  .search--result__name p,
  .search--result__phone p {
    font-size: 18px;
  }
  .search--result {
    max-height: 62vh;
  }
}
@media screen and (max-width: 1280px) and (max-height: 720px) {
  .search--result {
    max-height: 57vh;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .search--result {
    max-height: 58vh;
  }
  .search p {
    font-size: 16px;
  }
  .form {
    gap: 8px;
  }
  .form i {
    font-size: 24px;
  }
  .search--result__name p,
  .search--result__phone p {
    font-size: 14px;
  }
  .radioResult {
    width: 14px;
    height: 14px;
  }
  .search--result__phone i {
    font-size: 14px;
  }
  .search--result__name {
    margin-bottom: 0;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  .search {
    padding: 6px;
  }
  .form {
    gap: 5px;
    width: 98.5%;
    margin: 0.7vh 0px 2vh;
  }
  .form i {
    font-size: 16px;
  }
  .form--input {
    font-size: 14px;
    max-width: 130%;
  }
  .search p {
    font-size: 12px;
  }
  .search--result {
    max-height: 53vh;
  }
  .search--result__name p,
  .search--result__phone p {
    font-size: 11px;
  }
  .radioResult {
    width: 11px;
    height: 11px;
  }
  .search--result__phone i {
    font-size: 11px;
  }
}
@media screen and (((width: 820px) and (height: 1180px)) or ((width: 768px) and (height: 1024px))) {
  .search--result {
    max-height: 62.5vh;
  }
}
@media screen and (width: 768px) and (height: 1024px) {
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .form i {
    font-size: 28px;
  }
  .form--input {
    max-width: 70%;
  }
  .search--result {
    max-height: calc(100vh - 5vh - 45.6px - 150px);
  }
}
</style>
