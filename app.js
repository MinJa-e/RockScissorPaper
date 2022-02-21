new Vue({
    el: "#app",
    data: {
        myChoice: null,
        count: 3,
        comChoice: null,
        winner: null,
        logs: 3,
        lifeOfMe: 3,
        lifeOfCom: 3,
        isSelectable: true,
        logs: [],
    },
    watch: {
        count: function (newVal){
            if(newVal === 0){
                console.log("화이팅")
                let number = Math.random()
                if(number < 0.333){
                    this.comChoice = "scissor"
                }else if(number < 0.666){
                    this.comChoice = "rock"
                }else{
                    this.comChoice = "paper"
                }

                //승패결정하기
                if(this.myChoice === this.comChoice) this.winner = "no"
                else if(this.myChoice === "rock" && this.comChoice === "scissor") this.winner = "me"
                else if(this.myChoice === "scissor" && this.comChoice === "paper") this.winner = "me"
                else if(this.myChoice === "paper" && this.comChoice === "rock") this.winner = "me"
                else if(this.myChoice === "scissor" && this.comChoice === "rock") this.winner = "com"
                else if(this.myChoice === "paper" && this.comChoice === "scissor") this.winner = "com"
                else if(this.myChoice === "rock" && this.comChoice === "paper") this.winner = "com"
                else this.winner = "error"

                //목숨 차감
                if(this.winner === "me"){
                    this.lifeOfCom --
                }
                else if(this.winner === "com"){
                    this.lifeOfMe --
                }
                this.count = 3
                this.isSelectable = true

                let log = {
                    message: `You: ${this.myChoice}  /  Computer: ${this.comChoice}`,
                    winner: this.winner
                }
                this.logs.unshift(log)
            }
        },
        lifeOfMe: function(newVal){
            if(newVal === 0){
                setTimeout(()=>{
                    confirm("다시 하시겠습니까?")
                    this.lifeOfMe = 3
                    this.lifeOfCom = 3
                    this.myChoice = null
                    this.comChoice = null
                    this.winner = null
                    this.logs = []
                , 500})
            }
        },
        lifeOfCom: function(newVal){
            if(newVal === 0){
                setTimeout(()=>{
                    confirm("축하드립니다, 이기셨습니다!")
                    this.lifeOfMe = 3
                    this.lifeOfCom = 3
                    this.myChoice = null
                    this.comChoice = null
                    this.winner = null
                    this.logs = []
                , 500})
            }
        }
    },
    methods: {
        startGame(){
            this.isSelectable = false
            if(this.myChoice === null){
                alert("가위, 바위, 보 중 하나를 선택해주세요.")
            }
            else{
                let countDown = setInterval(()=>{
                    this.count--
                    if(this.count === 0){
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        }
    },
})