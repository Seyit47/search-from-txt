<script setup lang="ts">
import { ref, toRefs, computed } from "@vue/reactivity";
import { PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: [File, null] as PropType<File | null>,
    default: null,
  },
  label: {
    type: String,
    default: "Load file",
  },
});

const { modelValue } = toRefs(props);

const filename = ref("");

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  set(files: File | null): void {
    emit("update:modelValue", files);
  },
  get(): File | null {
    return modelValue.value;
  },
});

function onChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = [...Array.from(target.files || [])];
  target.value = "";
  localValue.value = files[0];
  if (files[0].name.length > 16) {
    filename.value = files[0].name.substring(0, 6) + "...";
  } else {
    filename.value = files[0].name;
  }
}
</script>

<template>
  <div
    class="relative w-full h-full flex justify-center items-center border-2 p-2 border-black"
  >
    <div class="flex items-center">
      <IconFileUpload />
      <h2>{{ filename === "" ? label : filename }}</h2>
    </div>
    <input
      id="file-picker"
      name="file-picker"
      class="absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer border-none"
      type="file"
      accept=".txt"
      @change="onChange"
    />
  </div>
</template>
