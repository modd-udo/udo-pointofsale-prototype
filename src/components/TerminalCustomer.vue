<template>
  <div class="callout">
    <div class="row collapse">
      <div class="columns medium-6">
        <h4>Select Customer
          <a class="small button" v-if="custInfo.id < 0"
             href="javascript: alert('Set customer to [Guest]')">Anonymous
            Sale
          </a>
        </h4>
      </div>
      <div class="columns medium-6 text-right">
        <a class="button small" v-if="custInfo.id > 0"
           href="javascript: alert('Show list of all past sales for this user')">Sales
          History
        </a>
      </div>
    </div>
    <div class="row collapse" v-if="custInfo.id < 0">
      <div class="columns medium-4 large-3">
        <combo-input v-model="name" placeholder="Customer Name"
                     :options="nameOptions" @select="selectCust">
          <template scope="item">
            <div>{{item.item.userfirst}} {{item.item.userlast}} -
              {{item.item.userphone}}
            </div>
          </template>
        </combo-input>
      </div>
      <div class="columns medium-4 large-6">
        <combo-input v-model="email" placeholder="Customer Email"
                     :options="emailOptions" @select="selectCust">
          <template scope="item">
            <div>{{item.item.useremail}} - {{item.item.userfirst}}
              {{item.item.userlast}}
            </div>
          </template>
        </combo-input>
      </div>
      <div class="columns medium-4 large-3">
        <combo-input v-model="phone" placeholder="Customer Phone"
                     :options="phoneOptions" @select="selectCust">
          <template scope="item">
            <div>{{item.item.userfirst}} {{item.item.userlast}} -
              {{item.item.userphone}} / {{item.item.usermobile}}
            </div>
          </template>
        </combo-input>
      </div>
    </div>
    <div class="row collapse" v-if="custInfo.id >= 0">
      <div class="columns medium-4">
        <h4>{{custInfo.title}}</h4>
      </div>
      <div class="columns medium-4">
        <a :href="'mailto:'+custInfo.useremail">{{custInfo.useremail}}</a>
      </div>
      <div class="columns medium-4">
        Ph: <a :href="'tel:'+custInfo.userphone">{{custInfo.userphone}}</a>
        Mob: <a :href="'tel:'+custInfo.usermobile">{{custInfo.usermobile}}</a>
      </div>
    </div>
    <div class="row" v-if="custInfo.id > 0">
      <div class="columns medium-6">
        <div><label><input type="checkbox"/>&nbsp;Subscribe to
          Newsletter</label></div>
        2 Gift Vouchers ($247.00)
        <a class="button small"
           href="javascript: alert('Show list of Vouchers for this customer')">Lookup
        </a>
      </div>
      <div class="columns medium-6 text-right">
        <div>3 Items on HOLD
          <a class="button small"
             href="javascript: alert('Load this held sale, and clear hold flag')">Recall</a>
        </div>
        <div>2 Items on Lay-by
          <a class="button small"
             href="javascript: alert('Load Lab-by sale to allow payments to be made')">Recall</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script lang="babel">
  import ComboInput from './ComboInput'

  import Customers from '../data/customers'

  export default{
    data() {
      return {
        name: "",
        nameOptions: [],
        email: "",
        emailOptions: [],
        phone: "",
        phoneOptions: [],
      }
    },
    watch: {
      name(v) {
        const search = v.toLowerCase();
        this.nameOptions = Customers
          .filter(i => String(i.title).toLowerCase().indexOf(search) >= 0)
          .sort((a, b) => a.title.localeCompare(b.title));
      },
      email(v) {
        const search = v.toLowerCase();
        this.emailOptions = Customers
          .filter(i => String(i.useremail).toLowerCase().indexOf(search) >= 0)
          .sort((a, b) => a.useremail.localeCompare(b.useremail));
      },
      phone(v) {
        const search = v.toLowerCase();
        this.phoneOptions = Customers
          .filter(i => (String(i.userphone).toLowerCase().indexOf(search) >= 0
          || String(i.usermobile).toLowerCase().indexOf(search) >= 0))
          .sort((a, b) => a.title.localeCompare(b.title));
      },
    },
    methods: {
      selectCust(custData) {
        this.$store.dispatch('pos/setCustomer', custData)
      }
    },
    computed: {
      sale() {
        return this.$store.getters['pos/sale'];
      },
      custInfo() {
        return this.sale.customer;
      },
    },
    components: {
      ComboInput,
    }
  }
</script>
