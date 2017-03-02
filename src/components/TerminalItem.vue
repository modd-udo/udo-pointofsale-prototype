<template>
  <div class="pos-terminal-item callout">
    <div class="row">
      <div class="column large-3">
        <div><strong>{{item.info.code}}</strong></div>
        <div class="button-group">
          <button class="button"
                  :class="item.mode == 'purchase'?'success':'secondary'"
                  @click.prevent="item.mode='purchase'">Purchase
          </button>
          <button class="button"
                  :class="item.mode == 'return'?'warning':'secondary'"
                  @click.prevent="item.mode='return'">Return
          </button>
        </div>
        <div class="button-group" v-if="item.mode == 'return'">
          <button class="button"
                  :class="item.returnStock == 'hold'?'':'secondary'"
                  @click.prevent="item.returnStock='hold'">Hold Return
          </button>
          <button class="button"
                  :class="item.returnStock == 'restock'?'':'secondary'"
                  @click.prevent="item.returnStock='restock'">Re-stock
          </button>
        </div>
      </div>
      <div class="column large-5">
        <h4>{{item.info.title}}</h4>
        <div>SKU: {{item.info.sku}}</div>
        <div>GTIN: {{item.info.gtin}}</div>
        <div v-if="item.mode == 'return'">
          <div>Reason for Return</div>
          <input type="text" v-model="item.returnReason"/>
        </div>
        <div class="row collapse" v-if="item.mode == 'return'">
          <div class="column small-5">Order/Receipt No</div>
          <div class="column small-5"><input type="text" v-model="item.returnInvoice" /></div>
          <div class="column small-2"><button class="small button">...</button></div>
        </div>
      </div>
      <div class="column large-4">
        <div class="row collapse">
          <div class="column small-6">Quantity</div>
          <div class="column small-6 text-right"><input type="text"
                                                        class="text-right"
                                                        v-model="item.quantity"/>
          </div>
        </div>
        <div class="row collapse">
          <div class="column small-6">Price</div>
          <div class="column small-6 text-right"><h5>$
            {{price.toFixed(2)}}</h5></div>
        </div>
        <div class="row collapse">
          <div class="column small-4">Discount</div>
          <div class="column small-4 button-group">
            <button class="tiny button"
                    :class="item.discountType == 'percent'?'':'secondary'"
                    @click.prevent="item.discountType='percent'">%
            </button>
            <button class="tiny button"
                    :class="item.discountType == 'dollar'?'':'secondary'"
                    @click.prevent="item.discountType='dollar'">$
            </button>
          </div>
          <div class="column small-4"><input type="text"
                                             class="text-right"
                                             v-model="item.discountAmount"/>
          </div>
        </div>
        <div class="row collapse" v-if="item.discountAmount > 0">
          <div class="column small-4">Reason</div>
          <div class="column small-8 text-right"><input type="text"
                                                        v-model="item.discountReason"
                                                        placeholder="for Discount" />
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="column medium-8">
        <button class="small alert button">Remove</button>
      </div>
      <div class="column medium-4">
        <div class="row collapse">
          <div class="column small-4"><strong>Sub-Total</strong></div>
          <div class="column small-8 text-right"><h4>
            ${{subtotal.toFixed(2)}}</h4></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script lang="babel">
  export default{
    props: {
      item: Object,
    },
    data() { return {}; },
    computed: {
      price() {
        return this.item.info.price.inc + this.item.info.price.ex;
      },
      subtotal() {
        const qty = parseInt(this.item.quantity) || 0;
        const price = this.price;
        let discount = 0;
        if (this.item.discountAmount > 0) {
          let amount = Number(this.item.discountAmount) || 0;
          if (this.item.discountType == 'percent')
            discount = price * (amount / 100);
          if (this.item.discountType == 'dollar')
            discount = amount;
        }
        discount = Math.max(0, Math.min(price, discount));
        if (this.item.mode == 'return')
          return -1 * qty * (this.item.price - discount);
        return qty * (price - discount);
      }
    },
    components: {}
  }
</script>
