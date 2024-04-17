<template>
  <button @click="handleAdd"></button>
  <WordCloud :words="words" width="100%" height="500px" />
</template>

<script setup>
import { ref, watch } from 'vue'

const words = ref([
  "Hello", "world", "normally", "you", "want", "more", "words",
  "than", "this"].map(function (d) {
    return { text: d, size: 4 + Math.random() * 90, test: "haha" };
  }));

const handleAdd = () => {
  words.value.push({ text: "new", size: 10 + Math.random() * 90, test: "haha" });
};

watch(() => words.value, (newVal, oldVal) => {
  console.log(newVal, oldVal);
})

</script>

<style scoped></style>
