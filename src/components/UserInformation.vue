<!-- eslint-disable vue/valid-template-root -->
<template>
  <div :class="{ isSearch: 'flex flex-col' }">
    <div
      class="group-user"
      :class="{ 'mti-2': isSearch && this.$store.state.modal.status }"
    >
      <div class="image">
        <img
          :src="
            isSearch
              ? customer.profile_picture
              : current_customer.profile_picture
          "
          alt=""
        />
      </div>
      <div class="user-info">
        <p class="user-name">
          {{ isSearch ? customer.fullname : current_customer.fullname }}
        </p>
        <div class="user-status" v-if="handleShowCustomer()">
          <div
            class="user-status__icon"
            v-if="
              isSearch
                ? customer.tags.includes('Vip')
                : current_customer.tags.includes('Vip')
            "
          >
            <span class="icon__vip">VIP</span>
          </div>
          <div
            class="user-status__icon"
            v-if="
              isSearch
                ? customer.tags.includes('Active')
                : current_customer.tags.includes('Active')
            "
          >
            <span class="icon__active">ACTIVE</span>
          </div>
          <div
            class="user-status__icon"
            v-if="
              isSearch
                ? customer.tags.includes('Tpin')
                : current_customer.tags.includes('Tpin')
            "
          >
            <span class="icon__tpin">TPIN</span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-detail" v-if="handleShowCustomer()">
      <ul class="user-detail__list">
        <li class="user-detail__mail">
          <img src="../assets/images/Menu/Vector.svg" alt="" /><span
            class="break-all"
            >{{ isSearch ? customer.email : current_customer.email }}</span
          >
        </li>
        <li class="user-detail__id">
          <img src="../assets/images/Menu/Card.svg" alt="" /><span
            class="break-all"
            >{{ isSearch ? customer.id_card : current_customer.id_card }}</span
          >
        </li>
        <li class="user-detail__phone">
          <img src="../assets/images/Menu/Phone.svg" alt="" /><span
            class="break-all"
            >{{
              isSearch ? customer.phone_number : current_customer.phone_number
            }}</span
          >
        </li>
        <li class="user-detail__address">
          <img
            src="../assets/images/Menu/fa-regular_address-book.svg"
            alt=""
          /><span class="break-all">{{
            isSearch ? customer.address : current_customer.address
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore, mapState } from "vuex";

export default {
  setup() {
    const store = useStore();
    const status = store.state.user.status;
    let current_customer = status.user;
    return { current_customer };
  },
  props: {
    isSearch: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    customer() {
      return JSON.parse(
        JSON.stringify(this.$store.state.customer.chooseCustomer)
      )[0];
    },
    ...mapState("window", ["isMobile"]),
  },
  methods: {
    handleShowCustomer() {
      if (this.isMobile) {
        if (!this.isSearch) return false;
        return true;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.mti-2 {
  margin-top: 10px !important;
}
.group-user {
  margin-top: 10vh;
  display: flex;
  max-height: 101px;
}
.image {
  width: 102px;
  margin-left: 1.12vw;
  margin-right: 0.4vw;
  display: block;
}
.image img {
  width: 102px;
  height: 102px;
  border-radius: 100%;
  border: 3px solid #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
  object-fit: cover;
  max-width: -webkit-fill-available;
}
.user-info {
  display: flex;
  justify-content: end;
  flex-direction: column;
  width: 100%;
  margin-left: 0.3vw;
}
.user-status {
  display: flex;
  width: 100%;
}
.user-name {
  font-family: var(--font-label);
  font-size: 28px;
  font-weight: 700;
  margin-left: 0.38vw;
  margin-bottom: 1.86vh;
}
.user-status__icon {
  height: 29px;
  background-color: var(--primary-orange);
  border-radius: 16px;
  color: var(--primary-white);
}
.user-status__icon:first-child {
  margin-right: 1vw;
}
.user-status__icon:nth-child(2) {
  margin-right: 1.302vw;
  background-color: #0b8e11;
}
.user-status__icon:nth-child(3) {
  background-color: #ffdada;
  color: #db524e;
}
.user-status__icon span {
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
}
.icon__vip {
  padding: 10px 21px 10px 21px;
}
.icon__active {
  padding: 10px 23px 10px 12px;
}
.icon__tpin {
  padding: 10px 30px 10px 29px;
}
.user-detail {
  margin-top: 5.5vh;
}
.user-detail__list {
  list-style-type: none;
}
ul li {
  margin-left: 2.224vw;
  margin-bottom: 2.4vh;
  display: flex;
  align-items: center;
}
ul li:nth-child(2) {
  margin-bottom: 2.6vh;
}
ul li:nth-child(3) {
  margin-bottom: 3vh;
}
li img {
  max-width: 90%;
  height: auto;
}
li:first-child img {
  margin-right: 32px;
}
li:nth-child(2) img {
  margin-right: 24px;
}
li:nth-child(3) img {
  margin-right: 34px;
}
li:last-child img {
  margin-right: 37px;
}
li span {
  font-size: 22px;
}
li:nth-child(3) span {
  margin-bottom: 1vh;
}
li:last-child span {
  margin-bottom: 0.3vh;
}
/* Responsive */
@media screen and (max-width: 1730px) {
  .customer-info,
  .customer-search {
    font-size: 16px;
  }
}
@media screen and (max-width: 1600px) and (max-height: 900px) {
  .user-info {
    margin-left: 12px;
  }
  .user-name {
    font-size: 24px;
    margin-bottom: 1.8vh;
    margin-left: 1.2vw;
  }
  .user-status {
    justify-content: start;
  }
  .user-status__icon {
    display: flex;
    align-items: center;
    margin-right: 1vw !important;
    height: 29px;
  }
  .user-status__icon span {
    font-size: 18px;
    padding: 10px 1vw;
  }
  .image {
    display: flex;
    width: 100px;
    align-items: end;
  }
  .image img {
    width: 80px;
    height: 80px;
  }
}
@media screen and (max-width: 1510px) and (max-height: 900px) {
}
@media screen and (max-width: 1280px) and (max-height: 1080px) {
  .customer-info,
  .customer-search {
    font-size: 14px;
  }
  .image {
    margin: 0 1vw;
    width: 70px;
  }
  .group-user {
    margin-top: 7vh;
  }
  .image img {
    width: 70px;
    height: 70px;
  }
  .user-name {
    margin-bottom: 1vh;
    font-size: 24px;
    margin-left: 1.2vw;
  }
  .user-status {
    justify-content: start;
  }
  .user-status__icon {
    display: flex;
    align-items: center;
    margin-right: 1vw !important;
    height: 29px;
  }
  .user-status__icon span {
    padding: 10px 11px;
    font-size: 18px;
  }
  li span {
    font-size: 18px;
  }
}
@media screen and (max-width: 1280px) and (max-height: 720px) {
  .image {
    width: 60px;
  }
  .image img {
    width: 60px;
    height: 60px;
  }
  .search--result {
    max-height: 61vh;
  }
  .user-name {
    font-size: 22px;
  }
  li img {
    max-width: 10%;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .image {
    width: 50px;
  }
  .image img {
    width: 50px;
    height: 50px;
  }
  .user-info {
    margin-left: 4px;
  }
  .user-name {
    font-size: 18px;
    margin-bottom: 1vh;
  }
  .user-status__icon {
    height: 20px;
  }
  .user-status__icon span {
    padding: 8px 8px;
    font-size: 13px;
  }
  li img {
    margin-right: 20px !important;
  }
  li span {
    font-size: 14px;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  .group-user {
    flex-direction: column;
    margin-top: 2vh;
  }
  .image {
    width: 90%;
    display: flex;
    justify-content: center;
  }
  .user-info {
    margin-left: 0;
  }
  .image img {
    width: 40px;
    height: 40px;
  }
  .user-name {
    font-size: 14px;
    text-align: center;
    margin-top: 2vh;
    margin-left: 0;
  }
  .user-status {
    justify-content: space-evenly;
  }
  .user-status__icon {
    height: 16px;
    display: flex;
    align-items: center;
  }
  .user-status__icon span {
    font-size: 10px;
  }
  .user-detail {
    margin-top: 5vh;
  }
  ul li {
    margin-bottom: 1vh !important;
  }
  li span {
    font-size: 10px;
  }
}
@media screen and (((width: 820px) and (height: 1180px)) or ((width: 768px) and (height: 1024px))) {
  .group-user {
    flex-direction: column;
    margin-top: 5vh;
    width: 100%;
  }
  .image {
    width: 90%;
    display: flex;
    justify-content: center;
  }
  .user-info {
    margin-left: 0;
  }
  .image img {
    width: 80px;
    height: 80px;
  }
  .user-name {
    font-size: 28px;
    text-align: center;
    margin-left: 0;
    margin-top: 10px;
  }
  .user-status {
    justify-content: space-evenly;
  }
  .user-status__icon {
    height: 28px;
    display: flex;
    align-items: center;
  }
  .user-status__icon span {
    padding-left: 10px;
    padding-right: 10px;
  }
  .user-detail__list {
    margin-top: 10vh;
  }
}
@media screen and (width: 768px) and (height: 1024px) {
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .group-user {
    margin-top: 1.5vh;
    flex-direction: column;
    align-items: center;
  }
  .user-info {
    justify-content: center;
  }
  .user-name {
    text-align: center;
    margin: 3px 0;
  }
  .user-status {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  .user-status__icon span {
    padding: 6px 7px;
    font-size: 14px;
  }
  li span {
    font-size: 16px;
  }
}
</style>
