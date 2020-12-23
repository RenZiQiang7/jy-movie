<template>
    <div>
        <FilmHeader/>
        <router-view/>
    </div>
</template>

<script>
import FilmHeader from '@/components/Navigation/FilmHeader'
export default {
    components:{
        FilmHeader,
    }
}
</script>