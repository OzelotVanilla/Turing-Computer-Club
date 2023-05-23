<script lang="ts">
import { StaffInfo, StudentMajor } from "~/assets/staff/StaffInfo"

interface StaffCapsuleInfo extends StaffInfo
{
    icon_path: string
}

const dir_of_staff = "~/assets/staff/"
const dir_of_fallback_icon = "_nuxt/assets/staff/fallback_icon.jpg"
const empty_staff_info: StaffCapsuleInfo = {
    name: "",
    self_introduction: "",
    major: StudentMajor.computer_science,
    icon_path: dir_of_fallback_icon
}

export default {
    props: {
        staff_id: String,
        lang_selected: String
    },
    data()
    {
        if (this.staff_id == undefined) { console.error("Must set a valid staff id.") }

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
            getStaffInfo(this.staff_id?.toLocaleLowerCase()).then(
                (info_got) =>
                {
                    this.staff_info.name = info_got.name
                    this.staff_info.major = info_got.major
                    this.staff_info.self_introduction = info_got.self_introduction
                    this.staff_info.icon_path = info_got.icon_path ?? dir_of_fallback_icon
                }
            )
        }
    }
}

async function getStaffInfo(staff_id: string | undefined): Promise<StaffCapsuleInfo>
{
    const { data } = await useFetch(`/api/staff?id=${staff_id}`)
    return JSON.parse(data.value!)
}


</script>

<template>
    <div id="staff_capsule_frame" class="flex_col">
        <img id="staff_icon" :src="staff_info.icon_path" alt="Staff Icon" />
        <!-- <div id="staff_icon"></div> -->
        <h1>{{ staff_info.name }}</h1>
        <h4>{{ staff_info.major }}</h4>
        <p>{{ staff_info.self_introduction }}</p>
    </div>
</template>

<style scoped>
@import "~/assets/style/common.css";

*
{
    margin: 0px;
}

#staff_capsule_frame
{
    --shadow-offset-distance: 10px;
    --border-radius-size: 20px;

    align-items: center;
    /* justify-content: center; */
    gap: max(1vh, 15px);

    width: min(25vw, 1000px);
    height: min(40vh, 500px);
    padding: max(2vh, 30px) 0px;

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
    background-image: url();
}
</style>