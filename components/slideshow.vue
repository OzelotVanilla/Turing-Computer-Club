<script lang="ts">
export default {
    // props: ["image_stock"],
    props: {
        image_paths: Array<string>,
        image_change_interval: Number,
        container_height: String
    },
    data()
    {
        const img_play_interval = this.image_change_interval ?? 10000

        return {
            img_count: 0,
            img_play_handle: -1,
            img_play_interval,
            image_height_style: "",
            current_image_index: 0
        }
    },
    mounted()
    {
        const slideshow_images = this.$refs.slideshow_images as HTMLDivElement
        this.img_count = slideshow_images.childElementCount
        this.image_height_style = `height: ${this.container_height}`
        setInterval(
            () =>
            {
                // Get next picture's index
                const next_index = (this.current_image_index + 1) % this.img_count

                // Set next picture to opaque
                slideshow_images.children[next_index].classList.remove("image_hide")

                // Then set current to transparent
                slideshow_images.children[this.current_image_index].classList.add("image_hide")

                // Set current_image_index to next
                this.current_image_index = next_index
            },
            this.img_play_interval
        )
    },
    watch: {
    }
}

function fadeInPictureAt()
{
    
}
</script>

<template>
    <div id="slideshow_container">
        <div id="slideshow_images" ref="slideshow_images" :style="image_height_style">
            <img class="slideshow_img" v-for="img_path in image_paths" :src="img_path" style="image_hide"
                alt="Slideshow pictures">
        </div>
    </div>
</template>

<style scoped>
#slideshow_images
{
    position: relative;
}

.slideshow_img
{
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.image_hide
{
    opacity: 0%;
}
</style>