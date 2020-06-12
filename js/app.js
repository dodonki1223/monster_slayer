new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    existsLog: false,
    you: {
      hitPoint: 100,
      attack: 8,
    },
    monster: {
      hitPoint: 100,
      attack: 6,
    }
  },
  computed: {
  },
  methods: {
    hitPointsStyle: function(character) {
      return {
        backgroundColor: 'green',
        margin: 0,
        color: 'white',
        width: (character.hitPoint <= 0) ? '0px' : character.hitPoint + '%'
      }
    },
    playAttack: function() {
      const randomValue = Math.random() * (1.3 - 1) + 1
      this.monster.hitPoint -= Math.round(this.you.attack * randomValue)
      this.you.hitPoint -= Math.round(this.monster.attack * randomValue)
    }
  }
})
