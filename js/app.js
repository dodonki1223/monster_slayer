new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    logs: [],
    actionType: {
      attack: 'HITS',
      specialAttack: 'SPECIAL HITS',
      heal: 'HEALS',
    },
    you: {
      name: 'PLAYER',
      hitPoint: 100,
      attack: 9,
      heal: 10,
    },
    monster: {
      name: 'MONSTER',
      hitPoint: 100,
      attack: 5,
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
      this.gameStarted = true
      this.you.hitPoint = 100
      this.monster.hitPoint = 100
      this.logs = []
    },
    isEndGame: function() {
      if (this.you.hitPoint <= 0 ) {
        if (confirm('You lose! New Game?')) {
          this.startNewGame()
        } else {
          this.gameStarted = false
        }
        return true
      } else if (this.monster.hitPoint <= 0 ) {
        if (confirm('You win! New Game?')) {
          this.startNewGame()
        } else {
          this.gameStarted = false
        }
        return true
      }
      return false
    },
    createLog: function(monsterAction, youAction) {
      this.logs.push([monsterAction, youAction])
    },
    buildAction: function(charaFrom, charaTo, type) {
      actionValue = 0
      toName = charaTo.name
      switch(type) {
        case this.actionType.attack:
          actionValue = Math.round(charaFrom.attack * this.randomValue())
          break
        case this.actionType.specialAttack:
          actionValue = Math.round(charaFrom.attack * 1.5 * this.randomValue())
          break
        case this.actionType.heal:
          actionValue =  (charaTo.hitPoint + charaFrom.heal) > 100 ? 100 - charaTo.hitPoint : charaFrom.heal
          toName = (charaFrom.name === charaTo.name) ? 'HIMSELF' : charaTo.name
          break
      }
      return {
        value: actionValue,
        style: [{'monster-turn': charaFrom.name === this.monster.name}, {'player-turn': charaFrom.name === this.you.name}],
        text: `${charaFrom.name} ${type} ${toName} FOR ${actionValue}`
      }
    },
    runAction: function(chara, value) {
      chara.hitPoint = chara.hitPoint + value
      return this.isEndGame()
    },
    playAttack: function() {
      attackActionMonster = this.buildAction(this.monster, this.you, this.actionType.attack)
      if (this.runAction(this.you, -attackActionMonster.value)) return

      attackActionYou = this.buildAction(this.you, this.monster, this.actionType.attack)
      this.runAction(this.monster, -attackActionYou.value)

      this.createLog(attackActionMonster, attackActionYou)
    },
    playSpecialAttack: function() {
      attackActionMonster = this.buildAction(this.monster, this.you, this.actionType.attack)
      if (this.runAction(this.you, -attackActionMonster.value)) return

      specialAttackActionYou = this.buildAction(this.you, this.monster, this.actionType.specialAttack)
      this.runAction(this.monster, -specialAttackActionYou.value)

      this.createLog(attackActionMonster, specialAttackActionYou)
    },
    playHeal: function() {
      attackActionMonster = this.buildAction(this.monster, this.you, this.actionType.attack)
      if (this.runAction(this.you, -attackActionMonster.value)) return

      healActionYou = this.buildAction(this.you, this.you, this.actionType.heal)
      this.runAction(this.you, healActionYou.value)

      this.createLog(attackActionMonster, healActionYou)
    }
  }
})
