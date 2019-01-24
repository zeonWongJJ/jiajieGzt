<template>
  <div class="as">
    <h4>
		欢迎来到7度世界
		
    </h4>
 
    
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted(){
		this.ass()
  },
    	methods: {
  		ass(){
  			let that =this;
		  		setTimeout(() => {
						that.$router.push({
							path: '/home'
						})
					}, 3000);
  		},
 
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>h4{
	margin: 1rem;
}
</style>
