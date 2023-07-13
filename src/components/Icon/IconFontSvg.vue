<template>
  <svg
    class="icon"
    aria-hidden="true"
    :width="size"
    :height="size"
    :style="{ fill: color }"
  >
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: "IconFontSvg",
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: [Number, String],
    color: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="scss" scoped></style>
