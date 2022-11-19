<script setup lang="ts">
import FileInput from "@/components/FileInput.vue";
import { ref, watch } from "vue";

const file = ref<File | null>(null);

const search = ref("");

const count = ref(0);

const text = ref<string>("");

watch(file, (value) => {
  if (value) {
    readTextFile(value);
  }
});

watch(search, (value) => {
  if (value.length <= 1) {
    count.value = 0;
  }
  if (value.length >= 2) {
    count.value = searchFromText(value);
  }
});

function replaceSpecialCharacters(str: string) {
  return str
    .replaceAll("ä", "a")
    .replaceAll("ç", "c")
    .replaceAll("ö", "o")
    .replaceAll("ž", "z")
    .replaceAll("ý", "y")
    .replaceAll("ş", "s")
    .replaceAll("ň", "n")
    .replaceAll("ü", "u");
}

function searchFromText(find: string): number {
  return text.value.split(find).length - 1;
}

function readTextFile(file: File) {
  var fr = new FileReader();
  fr.onload = () => {
    text.value = replaceSpecialCharacters(String(fr.result).toLowerCase());
  };

  fr.readAsText(file);
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-32">
      <FileInput v-model="file" />
    </div>
    <div
      class="flex flex-col items-center mt-14 py-12 px-24 border-2 border-black"
    >
      <div>
        <input
          v-model="search"
          type="text"
          class="border-2 border-black px-2"
          :disabled="file === null"
          placeholder="type to search"
          name="search"
          id="search"
        />
      </div>
      <div class="border-2 border-black py-14 px-4 mt-16">
        <div class="flex items-center">
          <IconFileUpload />
          <span class="text-md"> there's {{ count }} matches </span>
        </div>
      </div>
    </div>
  </div>
</template>
