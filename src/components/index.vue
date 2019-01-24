<template>
  <div class="as">
    <h4 @click="ass()">
		爱我就点我吧
    </h4>
     <h4 @click="asa()">
		爱我就点我吧
    </h4>
    
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
    	methods: {
  		ass(){
  			alert('aa')
  			let that =this;
  				that.$router.push({
						path: 'vuea'
					})
  		},
  		
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.as{
	margin: 100px;
}
</style>
