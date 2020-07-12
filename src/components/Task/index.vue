<template>
  <div class="u-task">
    <div id="app" @mousemove="onDrag($event)" @mouseup="onDragStop()">
      <main>
        <div v-for="(pane, paneIdx) in filledPanes" :key="paneIdx" :ref="`pane-${paneIdx}`" class="pane">
          <div class="pane-header">{{ pane.name }}</div>
          <div v-for="(card, cardIdx) in pane.cards" :key="cardIdx"
             :class="{ 'pane-card': true, 'dragging': draggedCardIdx === card.index }"
             :ref="`card-${card.index}`"
             @mousedown="onDragStart($event, card.index)"
          >
            {{ card.name }}
          </div>
        </div>
      </main>
      <div
        id="ghost-card"
        ref="ghostCard"
        :style="`
               width: ${ghostCardStyle.width}px;
               left: ${ghostCardStyle.pos.x}px; top: ${ghostCardStyle.pos.y - 10}px;
               transform: ${ghostCardStyle.transform};
               transform-origin: ${ghostCardStyle.transformOrigin};
               `"
        :class="{ 'pane-card': true, 'active': draggedCardIdx !== -1, leaving: ghostCardStyle.leaving, animate: settings.animate }"
      >
        {{ draggedCard.name }}
      </div>
    </div>
  </div>
</template>

<script>
const SETTINGS = {
  trelloStyle: false,
  animateEnd: true,
  transformOriginMode: 'mouse',
  scale: 1.1,
  rotationOffset: {
    min: 1.2,
    max: 2
  },
  rotationMitigation: 0.2,
  debug: {
    dataInspector: false
  }
}

export default {
  name: 'index',
  data: function () {
    return {
      mousePos: {
        x: -1000,
        y: -1000
      },
      lastMousePos: { x: 0, y: 0 },
      draggedCardIdx: -1,
      paneOverlappedIdx: -1,
      ghostCardStyle: {
        leaving: false,
        pos: {
          x: 0,
          y: 0
        },
        width: 0,
        cursorDistance: {
          x: 0,
          y: 0
        },
        percentDistanceMiddle: 0,
        transform: '',
        transformOrigin: '',
        velocity: 0,
        rotation: 0
      },
      cards: [{
        name: '登陆月球',
        paneIndex: 0
      }, {
        name: '登陆太阳',
        paneIndex: 0
      }, {
        name: '踏足山巅',
        paneIndex: 1
      }, {
        name: '写个管理系统',
        paneIndex: 2
      }],
      panes: [
        {
          name: '准备做'
        },
        {
          name: '正在做'
        },
        {
          name: '已完成'
        }
      ],
      settings: SETTINGS,
      settingsExpanded: false
    }
  },
  methods: {
    onDragStart (e, index) {
      const cardEl = this.$refs[`card-${index}`][0]
      const cardRect = cardEl.getBoundingClientRect()

      document.documentElement.style.cursor = 'grabbing'

      const paddingLeft = parseFloat(getComputedStyle(cardEl).paddingLeft)
      const paddingRight = parseFloat(getComputedStyle(cardEl).paddingRight)

      this.mousePos.x = e.pageX
      this.mousePos.y = e.pageY

      this.draggedCardIdx = index

      this.ghostCardStyle.width = cardEl.clientWidth - paddingLeft - paddingRight
      this.ghostCardStyle.cursorDistance.x = e.pageX - cardRect.x
      this.ghostCardStyle.cursorDistance.y = e.pageY - cardRect.y

      this.setGhostCardStyle(e)
      this.updateUI()

      if (this.settings.transformOriginMode === 'center') { this.ghostCardStyle.transformOrigin = 'center' } else { this.ghostCardStyle.transformOrigin = `${this.ghostCardStyle.cursorDistance.x}px ${this.ghostCardStyle.cursorDistance.y}px` }
      this.ghostCardStyle.percentDistanceMiddle =
        this.ghostCardStyle.cursorDistance.x - cardEl.clientWidth / 2
      this.ghostCardStyle.percentDistanceMiddle = Math.abs(
        this.ghostCardStyle.percentDistanceMiddle
      )
      this.ghostCardStyle.percentDistanceMiddle /= cardEl.clientWidth / 2
      this.ghostCardStyle.percentDistanceMiddle =
        Math.round(this.ghostCardStyle.percentDistanceMiddle * 100) / 100
    },

    onDrag (e) {
      e = e || window.event
      if (this.draggedCardIdx === -1) { return }
      this.mousePos.x = e.pageX
      this.mousePos.y = e.pageY
    },

    updateUI () {
      const dragX = this.mousePos.x
      const dragY = this.mousePos.y

      if (this.draggedCardIdx === -1 || this.ghostCardStyle.leaving) return

      if (!dragX && !dragY) {
        this.lastMousePos.x = 0
        this.lastMousePos.y = 0
        return requestAnimationFrame(this.updateUI)
      }
      this.findTransformValues()
      this.setGhostCardStyle(true)

      let isOverlapping

      for (let i = 0, paneEl = null; (paneEl = this.$refs[`pane-${i}`]); i++) {
        paneEl = paneEl[0] ? paneEl[0] : paneEl

        isOverlapping = this.checkOverlap(
          { x: dragX, y: dragY },
          paneEl.getBoundingClientRect()
        )

        if (isOverlapping && this.paneOverlappedIdx === i) { return requestAnimationFrame(this.updateUI) } else if (isOverlapping) {
          this.paneOverlappedIdx = i
          break
        }
      }

      if (!isOverlapping) {
        return requestAnimationFrame(this.updateUI)
      }
      this.putCardInPane()
      return requestAnimationFrame(this.updateUI)
    },

    onDragStop () {
      if (this.draggedCardIdx === -1) { return }
      document.documentElement.style.cursor = 'default'
      const cardEl = this.$refs[`card-${this.draggedCardIdx}`] && this.$refs[`card-${this.draggedCardIdx}`][0]
      const cardRect = cardEl.getBoundingClientRect()

      if (!this.settings.animateEnd) {
        return this.resetValues()
      }
      setTimeout(() => {
        this.resetValues()
      }, 100)
      this.ghostCardStyle.leaving = true
      const xOffset = cardRect.x - this.ghostCardStyle.pos.x
      const yOffset = cardRect.y - this.ghostCardStyle.pos.y
      this.ghostCardStyle.transform = `scale(1) translate(${xOffset}px, ${yOffset}px)`
    },

    resetValues () {
      this.draggedCardIdx = -1
      this.paneOverlappedIdx = -1
      this.lastMousePos.x = 0
      this.lastMousePos.y = 0
      this.ghostCardStyle.x = -1000
      this.ghostCardStyle.y = -1000
      this.ghostCardStyle.width = 0
      this.ghostCardStyle.cursorDistance.x = 0
      this.ghostCardStyle.cursorDistance.y = 0
      this.ghostCardStyle.transform = ''
      this.ghostCardStyle.leaving = false
      this.ghostCardStyle.percentDistanceMiddle = 0
    },

    checkOverlap (drag, rect) {
      if (drag.x < rect.x || drag.x > rect.x + rect.width) return false
      if (drag.y < rect.y || drag.y > rect.y + rect.height) return false
      return true
    },

    putCardInPane () {
      this.cards[this.draggedCardIdx].paneIndex = this.paneOverlappedIdx
    },

    setGhostCardStyle (isDragstart) {
      const dragX = this.mousePos.x
      const dragY = this.mousePos.y
      const transform = []

      if (isDragstart) { transform.push(`scale(${this.settings.scale})`) }

      transform.push(`rotate(${this.ghostCardStyle.rotation}deg)`)
      this.ghostCardStyle.transform = transform.join(' ')
      this.ghostCardStyle.pos.x = dragX - this.ghostCardStyle.cursorDistance.x
      this.ghostCardStyle.pos.y = dragY - this.ghostCardStyle.cursorDistance.y
    },

    findTransformValues () {
      if (this.settings.trelloStyle) {
        this.ghostCardStyle.rotation = '4'
        this.lastMousePos.x = this.mousePos.x
        this.lastMousePos.y = this.mousePos.y
        return
      }

      const velocity = this.mousePos.x - this.lastMousePos.x
      let rotation = this.ghostCardStyle.rotation || 0

      const rotationMin = this.settings.rotationOffset.min
      const rotationMax = this.settings.rotationOffset.max
      const rotationOffset =
        (rotationMax - rotationMin) *
        (1 - this.ghostCardStyle.percentDistanceMiddle)
      const rotationMitigation = this.settings.rotationMitigation

      rotation =
        rotation * (1 - rotationMitigation) +
        this.sigmoid(velocity) * (rotationMin + rotationOffset)
      if (Math.abs(rotation) < 0.01) rotation = 0

      this.ghostCardStyle.velocity = velocity
      this.ghostCardStyle.rotation = rotation
      this.lastMousePos.x = this.mousePos.x
      this.lastMousePos.y = this.mousePos.y
    },

    sigmoid (x) {
      return x / (1 + Math.abs(x))
    },

    expandSettings () {
      if (this.settingsExpanded) return
      this.settingsExpanded = true
    },

    wrapSettings () {
      this.settingsExpanded = false
    }
  },
  computed: {
    filledPanes () {
      const filledPanes = this.panes.map(item => ({ name: item.name }))

      for (let i = 0; i < this.cards.length; i++) {
        const pane = filledPanes[this.cards[i].paneIndex]

        if (!pane.cards) pane.cards = []
        pane.cards.push({ ...this.cards[i], index: i })
      }

      return filledPanes
    },
    draggedCard () {
      return this.cards[this.draggedCardIdx] || { name: '' }
    }
  }
}
</script>
<style lang="scss" scoped>
  .u-task{
    $color-bg: #0079bf;
    $color-bg-pane: #ebecf0;
    $color-bg-card: #ffffff;
    $color-bg-card-active: #f4f5f7;
    $color-text: #172b4d;

    main {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      padding: 20px 0 30px 0;
      box-sizing: border-box;

      // Forced to do this due to the flex overflow padding bug
      &:before {
        content: '';
        float: right;
        min-width: 20px;
        width: 10px;
        height: 100%;
      }
      &:after {
        content: '';
        float: right;
        min-width: 20px;
        width: 10px;
        height: 100%;
      }
    }

    .pane {
      display: inline-block;
      height: 100%;
      min-width: 272px;
      max-width: 272px;
      margin: 0 5px;
      border-radius: 3px;
      padding: 10px;
      box-sizing: border-box;
      background: $color-bg-pane;
      min-height: 400px;
    }

    .pane-header {
      font-weight: 600;
    }

    .pane-card {
      background: $color-bg-card;
      padding: 10px;
      margin: 10px 0;
      border-radius: 3px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      cursor: grab;

      &:hover {
        background: $color-bg-card-active;
      }

      &.dragging {
        color: transparent;
        background: none;
        border: 2px dashed rgba(0, 0, 0, 0.2);
        box-shadow: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: grabbing;
      }
    }

    #ghost-card {
      position: absolute;
      user-select: none;
      pointer-events: none;
      top: 100vh;
      left: 100vw;
      opacity: 0;
      transform-origin: center;
      transform: scale(1) rotate(0);
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      transition: transform 0.04s ease-in-out;

      &.animate {
        transition: box-shadow 0.1s ease-in-out;
        transition: transform 0.05s ease-in-out;
      }

      &.active {
        opacity: 1;
        box-shadow: 0 12px 24px -6px rgba(9, 30, 66, 0.25),
        0 0 0 1px rgba(9, 30, 66, 0.08);
      }

      &.leaving {
        transition: all .1s ease;
        box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      }
    }
  }
</style>
