import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BasicContainer',
    props: {
        width: {
            type: Number,
            default: 90,
            required: false
        }
    },
    data() {
        return {
            container_style: {
                width: this.width.toString() + '%'
            }
        }
    },
    methods: {}
});