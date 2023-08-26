<script setup lang="ts">
import { StaffInfo, StudentMajor } from "~/public/staff/StaffInfo"

interface StaffCapsuleInfo extends StaffInfo
{
    icon_path: string
}

const dir_of_fallback_icon = "/staff/fallback_icon.jpg"
const empty_staff_info: StaffCapsuleInfo = {
    name: "",
    self_introduction: "",
    major: StudentMajor.computer_science,
    icon_path: dir_of_fallback_icon
}

let props = defineProps<{
    staff_id: string
}>()

if (props.staff_id == undefined) { throw TypeError("Must set a valid staff id, cannot be empty.") }

let staff_info: StaffCapsuleInfo = empty_staff_info;
const { data } = await useFetch(`/api/staff?id=${props.staff_id}`)

if (data.value != null)
{
    staff_info = JSON.parse(data.value)
    if (staff_info.icon_path == null) { staff_info.icon_path = dir_of_fallback_icon }
}
else
{
    throw URIError(`The queried staff with id "${props.staff_id}" cannot be found.`)
}

</script>

<template>
    <div id="staff_capsule_frame" class="flex_col">
        <img :id="`staff_icon_${staff_id}`" class="staff_icon" :src="staff_info.icon_path" alt="Staff Icon" />
        <h1 class="staff_name">{{ staff_info.name }}</h1>
        <h4>{{ staff_info.major }}</h4>
        <div :id="`staff_self_intro_${staff_id}`" class="flex_col staff_self_intro">
            <p v-for="paragraph in staff_info.self_introduction.split('\n')">{{ paragraph }}</p>
        </div>
    </div>
</template>

<style scoped>
@import "~/assets/style/common.less";

*
{
    margin: 0px;
    font-family: "Roboto";
}

#staff_capsule_frame
{
    --shadow-offset-distance: 10px;
    --border-radius-size: 20px;

    --frame-width: min(25vw, 1000px);

    align-items: center;
    gap: max(1vh, 15px);

    width: var(--frame-width);
    max-height: calc(var(--frame-width) * 1.5);
    padding: max(3vh, 45px) 0px;
    margin: var(--shadow-offset-distance) 0px;

    background-color: #f3f3f3;
    border-radius: var(--border-radius-size);

    transition: all 0.5s;
}

#staff_capsule_frame:hover
{
    box-shadow: 0px 0px var(--shadow-offset-distance) 0px #7b7c7d;
}

.staff_name
{
    text-align: center;
}

.staff_icon
{
    width: max(6vw, 80px);
    height: max(6vw, 80px);

    border-radius: 50%;
}

.staff_self_intro
{
    align-items: center;
    gap: 0.8vmin;
    overflow: hidden;
}

.staff_self_intro > p
{
    margin-top: 5%;
    width: 80%;

    text-indent: 2rem;
    text-align: justify;
    text-overflow: ellipsis;
}
</style>public/staff/StaffInfo