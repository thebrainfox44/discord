const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
console.log("selected");
console.log(canvas)
console.log("as the game screen")
console.log("")
console.log("gamescreen is in " + innerWidth + "x" + innerHeight)
console.log("detail rendering :")
console.log(ctx)

class Player {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill()
	}
}

class Projectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity
	}

	draw() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color
		ctx.fill()
	}
}

const xPlayer = canvas.width / 2
const yPlayer = canvas.height / 2


let player = new Player(xPlayer, yPlayer, 30, 'blue')
player.draw()

console.log(player)

window.addEventListener('click', function (event) {
	console.log("new projectile start at", event.clientX, event.clientY)
	const projectile = new Projectile(event.clientX, event.clientY, 10, 'red', null)
	projectile.draw()
})