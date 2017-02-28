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
          <button class="small success button" @click.prevent="finalise=true">
            Finalise Sale
          </button>
        </div>
        <div class="columns small-3 text-right"><h4> Balance Due: $100.00</h4>
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
              </div><br />
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
              <button class="button success">Commit Sale & Print Receipt</button>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .pos-dashboard {
    label select {
      display: inline;
      width: auto;
    }
    flex-grow: 1;
    display: flex;
    width: 100%;
    flex-direction: column;
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

  export default{
    data() {
      return {
        finalise: false,
      }
    },
    components: {
      TerminalItem
    }
  }
</script>
