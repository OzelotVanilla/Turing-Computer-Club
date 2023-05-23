<script lang="ts">


export default {
    props: {
        width: String
    },
    data()
    {
        return {
            colored_squares_width_style: `width: ${this.width}`
        }
    }
}
</script>

<template>
    <div id="colored_squares" :style="colored_squares_width_style">
        <div v-for="i in 9" :class="`item${i} size_changable`"></div>
    </div>
</template>

<style scoped>
#colored_squares
{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 0.5vw;
    grid-template-areas:
        "colored_squares_1 colored_squares_2 colored_squares_3"
        "colored_squares_4 colored_squares_5 colored_squares_6"
        "colored_squares_7 colored_squares_8 colored_squares_9";
}

#colored_squares > div
{
    width: 5vw;
    height: 5vw;
}

.size_changable
{
    transition: all 0.3s;
}

.size_changable:hover
{
    transform: scale(0.9);
}

.item1
{
    grid-area: colored_squares_1;
    background-color: #5c9291
}

.item2
{
    grid-area: colored_squares_2;
    background-color: #00a381;
}

.item3
{
    grid-area: colored_squares_3;
    background-color: #72c1c8;
}

.item4
{
    grid-area: colored_squares_4;
    background-color: transparent
}

.item5
{
    grid-area: colored_squares_5;
    background-color: #3eb370
}

.item6
{
    grid-area: colored_squares_6;
    background-color: transparent
}

.item7
{
    grid-area: colored_squares_7;
    background-color: #82ae46
}

.item8
{
    grid-area: colored_squares_8;
    background-color: transparent
}

.item9
{
    grid-area: colored_squares_9;
    background-color: transparent
}
</style>