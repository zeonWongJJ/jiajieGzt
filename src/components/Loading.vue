<template>
  <section>
      <div v-show="show" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.1); z-index: 999999;">
			<div style="position: absolute;top: 50%;left: 50%;margin: -0.2rem 0 0 -0.2rem;">
				<van-loading type="spinner" />
			</div>
		</div>
  </section>
</template>

<script>
export default {
  data () {
    return {
    	
    }
  },
	props: ['show']
}
</script>

<style scoped>
  .com_tit {
    font-size: .12rem;
    color: red;
    margin:-0.05rem  0.14rem 0 0;
  }
</style>
