import { defineComponent } from 'vue';
import MultiSelect from '@vueform/multiselect'

export default defineComponent({
    name: 'DropdownChoice',
    components: {
        MultiSelect,
    },
    props: {
        choices: Array
    },
    data() {
        return {
            value: null,
            options: this.choices
        }
    },
    methods: {
        onSelection: function () {
            this.$emit('changed', this.value);
        }
    }
});