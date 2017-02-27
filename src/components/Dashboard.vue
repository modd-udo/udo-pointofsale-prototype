

<template>
  <div>
    <div class="row">
      <div class="columns small-12">
        <h3>Sales Overview</h3>
        <dashboard-table :rows="salesData" :headings="salesHead"></dashboard-table>
      </div>
    </div>
    <div class="row">
      <div class="columns small-6">
        <h3>Recently Sold Out</h3>
        <dashboard-table :rows="outOfStock"></dashboard-table>
      </div>
      <div class="columns small-6">
        <h3>Low Stock Items</h3>
        <dashboard-table :rows="lowStock"></dashboard-table>
      </div>
    </div>
    <div class="row">
      <div class="columns small-12">
        <h3>Stock on Hold</h3>
        <dashboard-table :rows="onHold"></dashboard-table>
        <h3>Current Lay-by's</h3>
        <dashboard-table :rows="onHold"></dashboard-table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
    
</style>
<script lang="babel">
  import DashboardTable from './DashboardTable'

  export default{
    data() {
      return {
        salesHead: ['','Yesterday','Today','Last Week','This Week','+/-','Last Month','This Month','+/-'],
        salesData: [
          ['Online Via myshop.com.au','(2) $550.00', '(0) $0.00','(9) $4,000','(7) $3,850','+50%','(80) $21,424.00','(27) $7250.00','+5%'],
          ['Online Via myspeciality.com','(2) $550.00', '(0) $0.00','(9) $4,000','(7) $3,850','+50%','(80) $21,424.00','(27) $7250.00','+5%'],
          ['In-store in Windsor','(2) $550.00', '(0) $0.00','(9) $4,000','(7) $3,850','+50%','(80) $21,424.00','(27) $7250.00','+5%'],
          ['In-store in Noble Park','(2) $550.00', '(0) $0.00','(9) $4,000','(7) $3,850','+50%','(80) $21,424.00','(27) $7250.00','+5%'],
        ],
        outOfStock: [
          ['Blue Vee Neck T-Shirt Large','TSHIRT-VEE-BLUE-L','Mar 1 @ 4:15PM'],
          ['Red Vee Neck T-Shirt Small','TSHIRT-VEE-RED-S','Mar 1 @ 4:15PM'],
        ],
        lowStock: [
          ['Blue Vee Neck T-Shirt Medium','TSHIRT-VEE-BLUE-S','1 left'],
          ['Blue Vee Neck T-Shirt Small','TSHIRT-VEE-BLUE-S','1 left'],
        ],
        onHold: [
          ['Yellow Dress Medium','YEDRESS-M','Tina Smith','0400 123 321','tinasmith87@gmail.com','$150.00 / $450.00 23 days old'],
          ['Mens Black Leather Belt Size: 48','BELT-BL-LTH-48','James Smith','03 9500 9500','jimbo@optusnet.com.au','$50.00 / $90.00 31 Days Old'],
        ],
      }
    },
    components:{
      DashboardTable,
    }
  }
</script>
