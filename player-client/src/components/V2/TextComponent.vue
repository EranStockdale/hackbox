<script setup lang="ts">
import markdown from "@/lib/markdown";
import { computed } from "vue";

const customProps = defineProps(["custom"]);

const defaultProps = {
  text: "Sample Text",
  style: {
    background: "white",
    border: "4px solid black",
    color: "black",
    align: "center",
    fontFamily: "sans-serif",
  },
};

const props = {
  ...defaultProps,
  ...customProps.custom,
  style: {
    ...defaultProps.style,
    ...customProps.custom?.style,
  },
};

const text = computed(() => markdown(props.text));
</script>

<template>
  <div class="textbox" v-html="text"></div>
</template>

<style scoped>
.textbox {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  justify-content: v-bind("props.style.align");
  text-align: v-bind("props.style.align");
  color: v-bind("props.style.color");
  background: v-bind("props.style.background");
  border: v-bind("props.style.border");
  font-family: v-bind("props.style.fontFamily");
}

p {
  margin: 0;
}
</style>
