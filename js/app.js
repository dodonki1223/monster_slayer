new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    logs: [],
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
    reverseLogs: function() {
      return this.logs.reverse()
    },
    displayLogs: function() {
      return this.logs.length
    }
  },
  methods: {
    hitPointsStyle: function(chara) {
      return {
        backgroundColor: 'green',
        margin: 0,
        color: 'white',
        width: (chara.hitPoint <= 0) ? '0px' : chara.hitPoint + '%'
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
      this.logs = []
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
    buildLog: function(fromChara, toChara, actionType, value) {
      return `${fromChara} ${actionType} ${toChara} FOR ${value}`
    },
    playAttack: function() {
      attackToMonster = Math.round(this.you.attack * this.randomValue())
      attachToYou     = Math.round(this.monster.attack * this.randomValue())

      this.monster.hitPoint -= attackToMonster
      this.you.hitPoint     -= attachToYou

      this.logs.push(this.buildLog('PLAYER', 'MONSTER', 'HITS', attackToMonster))
      this.logs.push(this.buildLog('MONSTER', 'PLAYER', 'HITS', attachToYou))
      this.existsLog = true
      this.isEndGame()
    },
    playSpecialAttack: function() {
      attackToMonster = Math.round((this.you.attack * 1.5) * this.randomValue())
      attachToYou     = Math.round(this.monster.attack * this.randomValue())

      this.monster.hitPoint -= attackToMonster
      this.you.hitPoint     -= attachToYou

      this.logs.push(this.buildLog('PLAYER', 'MONSTER', 'HITS', attackToMonster))
      this.logs.push(this.buildLog('MONSTER', 'PLAYER', 'HITS', attachToYou))
      this.existsLog = true
      this.isEndGame()
    },
    playHeal: function() {
      attachToYou = Math.round(this.monster.attack * this.randomValue())

      this.you.hitPoint += this.you.heal
      this.you.hitPoint -= Math.round(this.monster.attack * this.randomValue())

      this.logs.push(this.buildLog('PLAYER', 'HIMSELF', 'HEALS', this.you.heal))
      this.logs.push(this.buildLog('MONSTER', 'PLAYER', 'HITS', attachToYou))
      this.existsLog = true
      this.isEndGame()
    }
  }
})
