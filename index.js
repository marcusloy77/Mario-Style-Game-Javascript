const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.45
const drag = 0.8
const maxVelocity = 7



class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
        this.grounded = false
        this.jumps = 0
    }

    moveRight() {
        if(player.velocity.x == 7){
            player.velocity.x =7
        }
        else if(player.velocity.x > 3){
            player.velocity.x += 2
        }
        else{
            player.velocity.x += 3
        }
    }
    moveLeft() {
        if(player.velocity.x == -7){
            player.velocity.x = -7
        }
        else if(player.velocity.x <= -3){
            player.velocity.x -= 2
        }
        else{
            player.velocity.x -= 3
        }
    }

    

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y, this.width, this.height)
    }
    update() {
        
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.velocity.x = this.velocity.x * drag

        
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }
        else{
            this.velocity.y = 0
            this.grounded = true
        }
        
        this.draw()


        console.log(this.position.x)
    }

}

//platform construct
class Platform {
    constructor({x,y}) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }        

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
}


    
        


const player = new Player()
const platforms = [new Platform({x : 200, y : 50}), new Platform({x : 400, y : 20})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed : false
    }
}

let scrollOffset = 0




function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()

    platforms.forEach((platform) => {
        platform.draw()
    })



    //player left right movement
    if(keys.right.pressed && player.position.x < 400){
        player.moveRight()
        scrollOffset += 5
    }
    else if(keys.left.pressed && player.position.x > 100){
        player.moveLeft()
        scrollOffset -=5
    }
    else {
        if (keys.right.pressed){
            player.moveRight()
            platforms.forEach((platform) => {
                platform.velocity.x = player.velocity.x * 2
            })
        
            
        }
        else if (keys.left.pressed){
            player.moveLeft()
            platforms.forEach((platform) => {
                    platform.velocity.x = player.velocity.x * 2
                
                
            })
        }
    }


    //jumping code/ platform landings   
    platforms.forEach((platform) =>{
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
            player.grounded = true
        }
    })
    if(keys.up.pressed && player.grounded){
        player.velocity.y = -10
    }

    if (player.grounded){
        player.jumps = 0
    }

    //platform collision
    
    
    player.grounded = false

}

animate()


//event listeners for movement
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 83:
            console.log('down')
            keys.down.pressed = true
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            keys.up.pressed = true

            break
    }
})
addEventListener('keyup', ({keyCode}) => {
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 83:
            console.log('down')
            keys.down.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            keys.up.pressed = false
            break
    }
})