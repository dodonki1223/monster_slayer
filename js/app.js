new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    existsLog: false,
    you: {
      hitPoint: 100,
      attack: 8,
      heal: 10,
    },
    monster: {
      hitPoint: 100,
      attack: 7,
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
    randomValue: function() {
      // ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values
      const randomRange = 1.2
      return Math.random() * (randomRange - 1) + 1
    },
    startNewGame: function() {
      this.gameStarted = !this.gameStarted
      this.you.hitPoint = 100
      this.monster.hitPoint = 100
    },
    isEndGame: function() {
      if (this.you.hitPoint <= 0 ) {
        if (confirm('You lose! New Game?')) {
          this.startNewGame()
        }
      }
      if (this.monster.hitPoint <= 0 ) {
        if (confirm('You win! New Game?')) {
          this.startNewGame()
        }
      }
    },
    playAttack: function() {
      this.monster.hitPoint -= Math.round(this.you.attack * this.randomValue())
      this.you.hitPoint -= Math.round(this.monster.attack * this.randomValue())
      this.isEndGame()
    },
    playSpecialAttack: function() {
      this.monster.hitPoint -= Math.round( (this.you.attack * 1.5) * this.randomValue())
      this.you.hitPoint -= Math.round(this.monster.attack * this.randomValue())
      this.isEndGame()
    },
    playHeal: function() {
      this.you.hitPoint += this.you.heal
      this.you.hitPoint -= Math.round(this.monster.attack * this.randomValue())
      this.isEndGame()
    }
  }
})
