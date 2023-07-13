<template>
  <div class="file-progress">
    <div class="file-progress-line">
      <div class="file-progress-line-schedule">
        <span
          class="file-progress-line-schedule-full"
          :style="{ width: progress + 5 + '%' }"
        ></span>
      </div>

      <div class="file-progress-line-num">{{ progress }} %</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fileProgress",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.file-progress {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  &-line {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    &-schedule {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      overflow: hidden;
      &-full {
        position: absolute;
        left: 0;
        width: 0;
        height: 100%;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
        background: #31c27c;
        transition: all 0.3s ease-in-out;
      }
    }
    &-num {
      position: absolute;
      top: 30px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
