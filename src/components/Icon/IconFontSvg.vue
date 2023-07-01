<template>
  <svg class="icon" aria-hidden="true" :width="size" :height="size">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'IconFontSvg',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: [Number, String]
  }
};
</script>

<style lang="scss" scoped>

</style>