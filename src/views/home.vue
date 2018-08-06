<template>
    <div class="home">
        home
    </div>
</template>

<script>
import {getUserList} from "@/api"
export default {
    mounted () {
        var params={params:{query:'',pagenum:1,pagesize:5}}
        getUserList(params).then(res=>{
            console.log(res);
        })
    },
    data: ()=>({
        
    })
}
</script>

<style lang="scss" scoped>
    
</style>