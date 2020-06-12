new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    existsLog: false,
    hitPoints: {
      you: 100,
      monster: 100,
    }
  },
  computed: {
    hitPointsYouStyle: function() {
      return {
        backgroundColor: 'green',
        margin: 0,
        color: 'white',
        width: this.hitPoints.you + '%'
      }
    },
    hitPointsMonsterStyle: function() {
      return {
        backgroundColor: 'green',
        margin: 0,
        color: 'white',
        width: this.hitPoints.monster + '%'
      }
    }
  }
})
