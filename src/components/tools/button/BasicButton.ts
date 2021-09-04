import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BasicButton',
    props: {
        content: String,
        height: {
            type: Number,
            default: 5,
            required: false,
        },
        width: {
            type: Number,
            default: 20,
            required: false
        }
    },
    data() {
        return {
            button_style: {
                height: this.height.toString() + 'vmax',
                width: this.width.toString() + '%'
            }
        }
    },
    methods: {
        onclick: function () {
            this.$emit('click');
        },
    }
});