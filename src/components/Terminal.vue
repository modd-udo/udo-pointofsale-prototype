<template>
  <div class="pos-dashboard">
    <div class="pos-sales">
      <terminal-sales></terminal-sales>
    </div>
    <div class="pos-terminal-body">
      <div class="pos-top">
        <p></p>
        <div class="row">
          <div class="columns small-12 medium-8">
            <combo-input v-model="product"
                         placeholder="Scan or Enter Product Name or Code, Loyalty Card, Gift Voucher, Lay-by or Promo Code"
                         :options="productOptions" @select="selectProduct">
              <template scope="item">
                <div>{{item.item.title}}<br />
                  <strong>{{item.item.code}}</strong> - GTIN:{{item.item.gtin}} - SKU:{{item.item.sku}}
                </div>
              </template>
            </combo-input>
          </div>
          <div class="columns small-12 medium-4 button-group">
            <a class="button small"
               href="javascript: alert('Show searchable list of current promotional codes\nID, Code, Name, Description')">Find Promos</a>
            <a class="button small"
               href="javascript: alert('Show searchable list of unused vouchers\nID, Customer Name & email, Value, Date Purcahsed, Expiry Date')">Find Voucher</a>
            <a class="button small"
               href="javascript: alert('Show list of incomplete lay-by sales\n(ID, Customer, Email, Phone, Amount Due, Total)')">Find Lay-by</a>
          </div>
        </div>
      </div>
      <div class="pos-scroll">
        <div class="pos-scroll-wrap">
          <div class="row">
            <div class="columns small-12">
              <terminal-customer></terminal-customer>
              <div class="row collapse">
                <div class="column small-6"><h4>Items</h4></div>
                <div class="column small-6 text-right">
                  <a class="small success button"
                     href="javascript: alert('Show tile based view of product categories, drill down into products\nDesign for touch screen to quickly find product\n(image, code, name, price)')">Add Item</a>
                </div>
              </div>
              <terminal-item v-for="(item, idx) in items" :item="item" :key="idx"></terminal-item>
            </div>
          </div>
        </div>
      </div>
      <div class="pos-totals callout success">
        <div class="row collapse">
          <div class="columns small-3">&nbsp;</div>
          <div class="columns small-6 text-center">
            <button class="small alert button"
                    @click="$store.dispatch('pos/cancelSale')">Cancel Sale
            </button>
            <button class="small button"
                    @click="$store.dispatch('pos/holdSale')">Place on Hold
            </button>
            <button class="small success button" @click.prevent="finalise=true">
              Finalise Sale
            </button>
          </div>
          <div class="columns small-3 text-right"><h4> Balance Due: $ {{balance.toFixed(2)}}</h4>
          </div>
        </div>
      </div>
      <div class="pos-finalise" v-if="finalise">
        <div class="content">
          <div class="row">
            <div class="columns small-12">
              <button class="small alert button" style="float:right;"
                      @click.prevent="finalise = false">Cancel
              </button>
              <h3>Finalise Sale</h3>
              <label>Sales Assistant <select>
                <option>- Select -</option>
                <option>Jane Smith</option>
              </select></label>
              <h4>Items Total: $100.00</h4>
              <div class="callout success">
                <h5>Payments</h5>
                <div class="rows collapse">
                  <div class="columns small-8">
                    Stripe Payment - ch_4912398fe9a9879878c78
                  </div>
                  <div class="columns small-4 text-right">$10.00</div>
                </div>
                <br/>
              </div>
              <h4>Balance Outstanding: $90.00</h4>
              <h4>Payment of <input type="text"
                                    style="display:inline; width: 5rem;"
                                    value="90.00"/> received via:</h4>
              <div class="button-group">
                <button class="small button">Cash</button>
                <button class="small button">Credit Card</button>
                <button class="small button">Start Lay-by</button>
              </div>
              <p class="text-center">
                <button class="button success">Commit Sale & Print Receipt
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .pos-dashboard {
    flex-grow: 1;
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    .pos-sales {
      flex: 0 0 40px;
    }
    .pos-terminal-body {
      display: flex;
      flex-direction: column;
      flex: 1 1;
    }
    label select {
      display: inline;
      width: auto;
    }
    .pos-finalise {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.6);
      .content {
        position: absolute;
        height: 600px;
        width: 768px;
        background: white;
        border: 1px solid #eee;
      }
    }

    .callout {
      padding: 0.5rem;
      margin: 0 0 0.5rem;
    }
    input, .button, label {
      margin-top: 0.1em;
      margin-bottom: 0.1em;
    }
    .pos-top {
    }
    .pos-scroll {
      flex-grow: 1;
      flex-shrink: 1;
      position: relative;
    }
    .pos-scroll-wrap {
      overflow-y: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .pos-totals {
      margin: 0;
    }
  }
</style>
<script lang="babel">
  import TerminalItem from './TerminalItem'
  import TerminalSales from './TerminalSales'
  import TerminalCustomer from './TerminalCustomer'
  import ComboInput from './ComboInput'

  import Products from '../data/products'

  export default{
    data() {
      return {
        finalise: false,
        product: "",
        productOptions: [],
      }
    },
    methods: {
      selectProduct(prod) {
        this.$store.dispatch('pos/addItem', prod);
        this.product = "";
      },

    },
    watch: {
      product(v) {
        const search = v.toLowerCase();
        if(v.trim() != "") {
          this.productOptions = Products
            .filter(i => {
              return (
                String(i.code).toLowerCase().indexOf(search) == 0 ||
                String(i.gtin).toLowerCase().indexOf(search) == 0 ||
                String(i.sku).toLowerCase().indexOf(search) == 0 ||
                String(i.title).toLowerCase().indexOf(search) >= 0
              );
            })
            .sort((a, b) => a.title.localeCompare(b.title));
        } else {
          this.productOptions = [];
        }
      },
    },
    computed: {
      items() {
        return this.$store.getters['pos/sale'].items;
      },
      balance() {
        return this.$store.getters['pos/balance'];
      },
    },
    components: {
      TerminalItem, TerminalSales, TerminalCustomer, ComboInput
    }
  }
</script>
