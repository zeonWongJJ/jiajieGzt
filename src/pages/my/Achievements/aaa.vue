<template>
    <div>
      <div style="width:100%;">
      <span class="two_float">二级联动：</span>
          <select v-on:change="indexSelect($event)">
         <option v-for="option1 in YX" >{{option1.text}}</option>
       </select>
      <select>
       <option v-for="option2 in option1" >{{option2}}</option>
      </select>
    </div>



    </div>
</template>

<script>

    export default {
      data() {
        return {
          A:'',
          YX:[
            {
              text:'计信院',
              ZY:[
                {text:'软件工程'},
                {text:'计算机科学与技术'},
                {text:"信息安全"},
              ]
            },
            {
              text:'商学院',
              ZY:[
                {text:'旅游管理'},
                {text:'工商管理'},
                {text:"行政管理"},
              ]
            },
          ]
        }
      },
      computed : {
        selection (){
          let list = this.YX.length;
          for(var i = 0; i < list; i++){
            if(list[i].text == this.A){
              return list[i].ZY;
            }
          }
        },
      },
      methods:{
        indexSelect(event){
          this.A = event.target.value;
          console.log(this.A);

        },
      }
    }
</script>

<style scoped>

</style>
