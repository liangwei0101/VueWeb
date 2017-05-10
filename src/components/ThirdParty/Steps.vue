<template>
    <div class="vc-steps-component" v-show="show">
        <slot name="header">
        <div class="steps-header">
            <div class="title">{{ title }}</div>
            <div class="sub-title">{{ subTitle }}</div>
        </div>
        </slot>
        <div v-if="closeable" class="btn-close" @click="show = false">
            <span>&times;</span>
        </div>
        <div class="steps-body">
            <div :class="[ 'step-item', step.status ]" v-for="(index, step) in s" :style="{ 'width': calc(index) }">
                <div class="step-progress" v-if="!isLast(index)">
                    <div class="step-icon">
                        <i v-if="step.status === 'finish'" class="glyphicon glyphicon-ok"></i>
                        <i v-if="step.status === 'error'" class="glyphicon glyphicon-remove"></i>
                        <i v-if="step.status === 'wait'" class="glyphicon glyphicon-off"></i>
                    </div>
                    <div class="step-line"></div>
                </div>
                <div class="step-progress" v-if="isLast(index)">
                    <div class="step-icon">
                        <i v-if="step.status === 'finish'" class="glyphicon glyphicon-ok"></i>
                        <i v-if="step.status === 'error'" class="glyphicon glyphicon-remove"></i>
                        <i v-if="step.status === 'wait'" class="glyphicon glyphicon-off"></i>
                    </div>
                </div>
                <div class="record">{{ step.record }}</div>
                <div class="time">{{ step.time }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.vc-steps-component {
    position: relative;
    padding: 10px 15px 20px 15px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #eee;
    -webkit-transition: all ease-in .2s;
    transition: all ease-in .2s;

    &:hover {
        box-shadow: 0 0 6px rgba(0,0,0,.15);
    }

    .btn-close {
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #666;
    }

    .steps-header {
        border-bottom: 1px solid #eee;

        .title {
            font-size: 16px;
        }
        .sub-title {
            margin-top: 5px;
            margin-bottom: 15px;
            font-size: 14px;
        }
    }
    .steps-body {

        .step-item {
            text-align: center;
            display: inline-block;
            vertical-align: top;

            @size: 30px;
            @statusFinish: #87d068;
            @statusError: #f50;
            @statusWait: #ddd;
            @bgColor: whiteSmoke;

            &.finish {
                .step-progress {
                    .step-icon,
                    .step-line {
                        background-color: @statusFinish;
                        i {
                            background-color: @statusFinish;
                            color: @bgColor;
                            margin-top: -1px;
                        }
                    }
                }
            }
            &.error {
                .step-progress {
                    .step-icon {
                        background-color: @statusError;
                        i {
                            background-color: @statusError;
                            color: @bgColor;
                        }
                    }
                }
            }

            &.wait {
                .step-progress {
                    .step-icon {
                        background-color: @statusWait;
                        i {
                            background-color: @statusWait;
                            color: @bgColor;
                        }
                    }
                }
            }

            .step-progress {
                position: relative;
                margin: 15px 5px;

                .step-icon {
                    z-index: 2;
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                    width: @size;
                    height: @size;
                    border-radius: 50%;
                    background-color: @bgColor;

                    i {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-top: -1px;
                        transform: translate(-50%, -50%);
                        background-color: @bgColor;
                        &::before {
                            font-size: 12px;
                        }
                    }
                }
                .step-line {
                    background-color: @bgColor;
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(20px);
                    transform: translate(10px);
                    height: 4px;
                }
            }
            .record { // 进度文字
                font-size: 14px;
            }
            .time { // 达成时间
                font-size: 12px;
            }
        }
    }
}
</style>

<script>
const STEP_FINISH = 'finish'
const STEP_WAIT = 'wait'

export default {
  name: 'vcSteps',
  props: {
    show: {
      type: Boolean,
      twoWay: true,
      default: true
    },
        // 传入的steps，如果传入合法的 `allSteps` 预设，则会合并
    steps: {
      type: Array
    },
        // 可选的预设，多用于系统通用的流程，可传入通用预设
        // 只有长度大于传入的`steps` 才会进行预设追加的合并
    allSteps: {
      type: Array
    },
    title: {
      default: 'title'
    },
    subTitle: {
      default: 'subTitle'
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    isLast (index) {
      if (this.total) {
        if (index === (this.total - 1)) {
          return true
        }
      }
      return false
    },
    calc (index) {
      // 使用 `99` 避免溢出
      return `${99 / this.total}%`
    }
  },
  computed: {
    // computed allSteps
    as () {
      let ass = this.allSteps
      if (ass) {
        ass.forEach(step => {
          let keys = Object.keys(step)
          // 只有一个键，就默认为文案
          if (keys.length === 1) {
            step['record'] = step[keys[0]]
            delete step[keys[0]]
          }
          if (!step['status']) {
            step['status'] = STEP_WAIT
          }
        })
        return ass
      }
    },
        // computed finial render steps
    s () {
      if (!this.steps) {
        console.warn('props `step` must be Array with `record` key')
        return
      }
      let ss = this.steps.slice()
      ss.forEach(step => {
        if (!step['status']) {
          step['status'] = STEP_FINISH
        }
      })
      let as = this.as
      // 如果传入了合法的 `allSteps` 才使用，否则只使用 `steps`
      if (as && as.length > 0 && as.length > ss.length) {
        // 组合 `steps` 和 `allSteps`
        let delta = as.length - ss.length
        for (let i = ss.length, len = ss.length + delta; i < len; i++) {
          ss.push(as[i])
        }
        return ss
      } else {
        return this.steps
      }
    },
    total () {
      if (this.s && Array.isArray(this.s)) {
        return Object.keys(this.s).length
      }
      return null
    }
  }
}
</script>
