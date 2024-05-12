let cells;
let arrayCommands = []

let end = {
    x: 4,
    y: 4
}

let robot = {
    x: 0,
    y: 0
}

let barriers = [
    {
        x: 1,
        y: 3,
    },
    {
        x: 3,
        y: 2
    }
]

let elements = [
    {
        x: 0,
        y: 3,
        isUp: false
    },
    {
        x: 4,
        y: 3,
        isUp: false
    }
]

const field = document.querySelector(".field");
const resetBtn = document.querySelector(".reset")
const startBtn = document.querySelector(".start")
const commands = document.querySelector(".commands")
const codes = document.querySelector(".codes")

function genetationField(num = 5, barrierCount = 3) {

    for (x = 0; x < num; x++) {
        const column = document.createElement("div")
        field.append(column)
        for (y = 0; y < num; y++) {

            if (barriers.some(barrier => barrier.x == x && barrier.y == y)) {
                column.innerHTML += `<div class="cell barrier" data-x="${x}" data-y="${y}"></div>`
                continue
            }

            if (elements.some(element => element.x == x && element.y == y)) {
                column.innerHTML += `<div class="cell element" data-x="${x}" data-y="${y}"></div>`
                continue
            }

            if (end.x == x && end.y == y) {
                column.innerHTML += `<div class="cell end" data-x="${x}" data-y="${y}"></div>`
                continue
            }

            column.innerHTML += `<div class="cell" data-x="${x}" data-y="${y}"></div>`
        }
    }
}

function move() {
    cells.forEach((cell) => {
        if (cell.dataset.x == robot.x && cell.dataset.y == robot.y) {
            cell.innerHTML = `<div class="robot"></div>`
        }
    })
}

function clearField() {
    cells.forEach((cell) => {
        cell.innerHTML = ""
    })
}

function cheakDead() {
    if (barriers.some(barrier => barrier.x == robot.x && barrier.y == robot.y)) {
        alert("Вы проиграли")
        endGame()
    }
}

function cheakElement() {
    if (elements.some(element => element.x == robot.x && element.y == robot.y)) {

        cells.forEach((cell) => {
            if (cell.dataset.x == robot.x && cell.dataset.y == robot.y) {
               cell.classList.remove("element")
            }
        })

        elements = elements.map((el) => {
            if (el.x == robot.x && el.y == robot.y) {
                el.isUp = true
            }

            return el
        })

    }
}

function cheakEnd() {
    if (robot.x == end.x && robot.y == end.y) {

        if(elements.length == elements.filter(el => el.isUp == true).length) {
            alert("Вы победили!")
            
            return
        }

        alert("Вы собрали не все компоненты")
    }
}

function start() {
    genetationField()
    cells = document.querySelectorAll(".cell")
    move();
}

function up() {
    if (robot.y == 0) {
        move()
        return
    }
    robot.y -= 1;
    move();
}

function down() {
    if (robot.y == cells[cells.length - 1].dataset.y) {
        move()
        return
    }
    robot.y += 1;
    move();
}

function right() {

    if (robot.x == cells[cells.length - 1].dataset.x) {
        move()
        return
    }

    robot.x += 1;
    move()
}

function left() {

    if (robot.x == 0) {
        move()
        return
    }

    robot.x -= 1;
    move()
}

function startCode(command) {
    if (command == "up") {
        clearField()
        up()
        cheakElement()
        cheakDead()
        cheakEnd()
    }

    if (command == "down") {
        clearField()
        down()
        cheakElement()
        cheakDead()
        cheakEnd()
    }

    if (command == "left") {
        clearField()
        left()
        cheakElement()
        cheakDead()
        cheakEnd()
    }

    if (command == "right") {
        clearField()
        right()
        cheakElement()
        cheakDead()
        cheakEnd()
    }
}

function startProgram() {

    x = 1

    startCode(arrayCommands[0])

    setInterval(() => {
        if (x == arrayCommands.length) {
            endGame()
        }

        startCode(arrayCommands[x])
        x += 1
    }, 1000)
}

function endGame() {
    barriers = []
    end = {}
    robot = {}
    arrayCommands = []
    codes.innerHTML = ""
    field.innerHTML = ""
    start()
}

commands.addEventListener("click", (event) => {

    event.preventDefault()

    if (event.target.classList.contains("command")) {
        codes.innerHTML += `<div class="code rounded-lg ${event.target.value}">${event.target.value}</div>`
        arrayCommands.push(event.target.value)
    }
})

startBtn.addEventListener("click", (event) => {
    startProgram()
})

resetBtn.addEventListener("click", (event) => {
    endGame()
})

start()
