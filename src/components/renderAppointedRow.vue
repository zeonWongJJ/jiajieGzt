<template>
	<section>
		<span style="color: red;">{{captain.staff_name}}</span>
		<span v-for="(item, i) in otherMember">
	      <i v-if="i !== otherMember.length">,</i>
	      {{item.staff_name}}
	    </span>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				captain: {},
				otherMember: {}
			}
		},
		name: 'renderAppointedRow',
		props: ['member'],
		watch: {
			member: {
				handle(newVal, oldVal) {
					this.member = newVal
					deep: true
				}
			}
		},
		mounted() {
			setTimeout(() => {
				if(this.member.length > 0) {
					const member = this.member
					this.captain = member.shift();
					this.otherMember = member;
				}
			}, 0)

		}
	}
</script>