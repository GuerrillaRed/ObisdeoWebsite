<!-- 
  This file is the Root of the project
  It is akin to the Main() function if you are programming in a traditional language
  This is where the execution flow of the program starts
  It is where you should start when trying to reason about what the program is actually doing

    -Justin Morrow
-->

<style>
body { background-color: #16161a; }
.p-blueish-gray { color: #94a1b2; }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <!-- <three-d-container /> -->
  <!-- <basic-button content="test" @click="hello"/> -->
  <img :src="require('./assets/' + selectedDropdownImg)" :alt="'./assets/' + selectedDropdownImg" />
  <dropdown-choice @changed="onPicureDropdownChanged" v-bind:choices="pictureDropdownImgs" />
</template>

<script lang="ts">

///
/// VUE COMPONENT
///

import { defineComponent } from "vue";
import Homepage from "./components/home/Homepage.vue";
import TransparentTopbar from "./components/tools/topbar/TransparentTopbar.vue";
import BasicButton from "./components/tools/button/BasicButton.vue";
import BasicContainer from "./components/tools/container/basic_container/BasicContainer.vue";
import CustomPDFDocument from "./components/tools/pdf/CustomPDFDocument.vue";
import ThreeDContainer from './components/tools/three_js/3DContainer.vue';
import DropdownChoice from './components/tools/dropdown/DropdownChoice.vue';

export default defineComponent({
  name: "App",
  components: {
    Homepage,
    TransparentTopbar,
    BasicButton,
    BasicContainer,
    CustomPDFDocument,
    ThreeDContainer,
    DropdownChoice
  },
  data() {
    return {
      pictureDropdownImgs: [
        { key:"test 1", value:"Potts House.jpg" },
        { key:"test 2", value:"River Road.jpg" },
        { key:"test 3", value:"Farm Lane.jpg" },
      ],
      selectedDropdownImg: "Potts House.jpg"
    }
  },
  methods: {
    SendMessage: sendMessage,
    LorumIpsum: lorumIpsum,
    hello: function() {
      alert("hello world");
    },
    onPicureDropdownChanged: function (value: string) {
      this.selectedDropdownImg = value;
    }
  },
});


///
/// NON-VUE FUNCTIONS
///

function sendMessage(message: String) {
  alert(message);
}

function lorumIpsum(line_cnt: Number): String {
  let lines = [
    "She sells sea shells by the sea shore.",
    "The quick brown fox raped my mother.",
    "All work and no play makes jack a dull boy.",
    "Death to Americana music.",
    "Help I cannot hear myself think."
  ]; 

  let output = '';
  for(var i = 0; i < line_cnt; i++)
  {
    output += lines[RandomIntInRange(0, lines.length - 1)];;
  }

  return output;
}

function RandomIntInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

</script>


