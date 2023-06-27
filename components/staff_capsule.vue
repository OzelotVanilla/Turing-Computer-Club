<script lang="ts">
import { StaffInfo, StudentMajor } from "~/assets/staff/StaffInfo"

interface StaffCapsuleInfo extends StaffInfo
{
    icon_path: string
}

const dir_of_fallback_icon = "_nuxt/assets/staff/fallback_icon.jpg"

export default {
    props: {
        staff_id: String,
        lang_selected: String
    },
    data()
    {
        if (this.staff_id == undefined) { throw TypeError("Must set a valid staff id, cannot be empty.") }

        const empty_staff_info: StaffCapsuleInfo = {
            name: "",
            self_introduction: "",
            major: StudentMajor.computer_science,
            icon_path: dir_of_fallback_icon
        }

        return {
            staff_info: empty_staff_info
        }
    },
    created()
    {
        this.updateStaffInfo()
    },
    methods: {
        updateStaffInfo()
        {
            this.getStaffInfo(this.staff_id?.toLocaleLowerCase()).then(
                (info_got) =>
                {
                    this.staff_info.name = info_got.name
                    this.staff_info.major = info_got.major
                    this.staff_info.self_introduction = info_got.self_introduction
                    this.staff_info.icon_path = info_got.icon_path ?? dir_of_fallback_icon
                }
            )
        },
        async getStaffInfo(staff_id: string | undefined): Promise<StaffCapsuleInfo>
        {
            const { data } = await useFetch(`/api/staff?id=${staff_id}`)

            if (data.value != null)
            {
                return JSON.parse(data.value)
            }
            else
            {
                throw URIError(`The queried staff with id "${staff_id}" cannot be found.`)
            }
        }
    }
}
</script>

<template>
    <div id="staff_capsule_frame" class="flex_col">
        <img id="staff_icon" :src="staff_info.icon_path" alt="Staff Icon" />
        <!-- <div id="staff_icon"></div> -->
        <h1>{{ staff_info.name }}</h1>
        <h4>{{ staff_info.major }}</h4>
        <div id="self_intro" class="flex_col">
            <p v-for="paragraph in staff_info.self_introduction.split('\n')">{{ paragraph }}</p>
        </div>
    </div>
</template>

<style scoped>
@import "~/assets/style/common.css";

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

#staff_icon
{
    width: max(6vw, 80px);
    height: max(6vw, 80px);

    border-radius: 50%;
}

#self_intro
{
    align-items: center;
    gap: 0.8vmin;
    overflow: hidden;
}

#self_intro > p
{
    margin-top: 5%;
    width: 80%;
    max-height: 40%;

    text-indent: 2rem;
    text-align: justify;
    text-overflow: ellipsis;
}
</style>