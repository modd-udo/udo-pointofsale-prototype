<template>
  <div class="pos-dashboard">
    <div class="pos-top">
      <p></p>
      <div class="row">
        <div class="columns small-12 medium-8">
          <input type="text"
                 placeholder="Scan or Enter Product Name or Code, Loyalty Card, Gift Voucher, Lay-by or Promo Code"/>
        </div>
        <div class="columns small-12 medium-4 button-group">
          <button class="button small">Find Promos</button>
          <button class="button small">Find Voucher</button>
          <button class="button small">Find Lay-by</button>
        </div>
      </div>
    </div>
    <div class="pos-scroll">
      <div class="pos-scroll-wrap">
      <div class="row">
        <div class="columns small-12">
          <div class="callout">
            <div class="row collapse">
              <div class="columns medium-6">
                <h4>Customer</h4>
              </div>
              <div class="columns medium-6 text-right">
                <button class="button small">Order History</button>
              </div>
            </div>
            <div class="row collapse">
              <div class="columns medium-4 large-3">
                <input type="text" placeholder="Customer Name"/>
              </div>
              <div class="columns medium-4 large-6">
                <input type="text" placeholder="Customer Email"/>
              </div>
              <div class="columns medium-4 large-3">
                <input type="text" placeholder="Customer Phone"/>
              </div>
            </div>
            <div class="row">
              <div class="columns medium-6">
                <div><label><input type="checkbox"/>&nbsp;Subscribe to
                  Newsletter</label></div>
                2 Gift Vouchers ($247.00)
                <button class="button small">Lookup</button>
              </div>
              <div class="columns medium-6 text-right">
                <div>3 Items on HOLD
                  <button class="button small">Recall</button>
                </div>
                <div>2 Items on Lay-by
                  <button class="button small">Recall</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row collapse">
            <div class="column small-6"><h4>Items</h4></div>
            <div class="column small-6 text-right">
              <button class="small success button">Add Item</button>
            </div>
          </div>
          <terminal-item></terminal-item>
          <terminal-item></terminal-item>
        </div>
      </div>
    </div>
    </div>
    <div class="pos-totals callout success">
      <div class="row collapse">
        <div class="columns small-3">&nbsp;</div>
        <div class="columns small-6 text-center">
          <button class="small alert button">Cancel Sale</button>
          <button class="small button">Place on Hold</button>
          <button class="small success button">Finalize Order</button></div>
        <div class="columns small-3 text-right"><h4> Balance Due: $100.00</h4></div>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
  .pos-dashboard {
    flex-grow: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
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
      top:0;
      left:0;
      right:0;
      bottom:0;
    }
    .pos-totals {
      margin: 0;
    }
  }
</style>
<script lang="babel">
  import TerminalItem from './TerminalItem'

  export default{
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      TerminalItem
    }
  }
</script>
