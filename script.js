var hero = { //Hero position
    x: 300,
    y: 480
};

var score = 0;

var bullets = []; //adding bullet into array when pushing spacebar/firing

var enemies = [{ x: 150, y: -20 }, { x: 350, y: -50 }, { x: 550, y: -70 }, { x: 650, y: -30 }]; //Enemies position

var enemies2 = [{ x: 50, y: 570 }, { x: 850, y: 550 }, { x: 550, y: 520 }] //Enemies2 position

var backgrounds = ["background.jpg", "background2.jpg", "background3.png"];

var map = getRandom(3);
document.getElementById("container").style.background = `url(${backgrounds[map]})`;

var sounds = {
    collide: "explosion.mp3",
    bullet: "shot.mp3",
}

function playSound(path) {
    document.getElementById("explode").innerHTML = "<embed src='" + path + "' hidden='true' autostart='true' loop='false' />";
}

function playSound(path) {
    var audio = new Audio(path);
    audio.play();
  }

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function displayHero() {
    document.getElementById('hero').style['left'] = hero.x + "px";
    document.getElementById('hero').style['top'] = hero.y + "px";
};

function displayEnemies() {
    var output = '';
    for (var i = 0; i < enemies.length; i++) {
        output += "<div class='enemy1' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
    }
    document.getElementById('enemies').innerHTML = output;
}

function displayEnemies2() {
    var output = '';
    for (var i = 0; i < enemies2.length; i++) {
        output += "<div class='enemy2' style='top:" + enemies2[i].y + "px; left:" + enemies2[i].x + "px;'></div>";
    }
    document.getElementById('enemies2').innerHTML = output;
}

function displayBullets() {
    var output = '';
    for (var i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
    }
    document.getElementById('bullets').innerHTML = output;
}

function moveEnemies() { //looping top to bottom
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].y += 1;
        if (enemies[i].y > 580) {
            enemies[i].y = 0;
            enemies[i].x = Math.random() * 1000;
        }
    }
    for (var i = 0; i < enemies2.length; i++) { //looping bottom to top
        enemies2[i].y -= 0.5;
        if (enemies2[i].y < -50) {
            enemies2[i].y = 570;
            enemies2[i].x = Math.random() * 900;
        }
    }
}

function moveBullets() { //looping bullet top to bottom
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5;
        if (bullets[i].y < 0) {
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
        }
    }
};

function detectCollision() {
    for (var i = 0; i < bullets.length; i++) { //pop enemies when enemies hit bullet
        for (var j = 0; j < enemies.length; j++) {
            if (Math.abs(bullets[i].x - enemies[j].x) < 15 && Math.abs(bullets[i].y - enemies[j].y) < 15) {
                playSound(sounds.collide);
                score += 5;
                enemies[j].y = -20;
                enemies[j].x = Math.random() * 900
                bullets.pop();
            }
        }
    }
}

function detectCollision2(){
    for (var i = 0; i < bullets.length; i++) { //pop enemies2 when enemies hit bullet
        for (var j = 0; j < enemies2.length; j++) {
            if (Math.abs(bullets[i].x - enemies2[j].x - 25) < 15 && Math.abs(bullets[i].y - enemies2[j].y) < 15) {
                playSound(sounds.collide);
                score += 10;
                enemies2[j].y = 570;
                enemies2[j].x = Math.random() * 900
                bullets.pop();
            }
        }
    }
}

function heroCollison(){
    for (var i = 0; i < enemies.length; i++) { //pop enemies when hit hero
        if (Math.abs(enemies[i].x - hero.x) < 10 && Math.abs(enemies[i].y - hero.y) < 10) {
            playSound(sounds.collide);
            score -= 500;
            enemies[i].y = -20;
            enemies[i].x = Math.random() * 800
            hero.x = Math.random() * 800;
        }
    }
}
function heroCollison2(){
    for (var i = 0; i < enemies2.length; i++) { //pop enemies2 when hit hero
        if (Math.abs(enemies2[i].x - hero.x) < 10 && Math.abs(enemies2[i].y - hero.y) < 10) {
            playSound(sounds.collide);
            score -= 500;
            enemies2[i].y = 570;
            enemies2[i].x = Math.random() * 800
        }
    }
}


function displayScore() {
    document.getElementById('score').innerHTML = score;
}

function gameLoop() {
    moveEnemies();
    displayHero();
    displayEnemies();
    displayEnemies2()
    moveBullets();
    displayBullets();
    heroCollison();
    heroCollison2();
    detectCollision();
    detectCollision2();
    displayScore();
}


setInterval(gameLoop, 20)

document.onkeydown = function (e) {
    if (e.keyCode == 37 && hero.x != -20) { //Right
        hero.x -= 10;
    } else if (e.keyCode == 39 && hero.x != 990) { //Left
        hero.x += 10;
    } else if (e.keyCode == 38 && hero.y != 0) { //Top
        hero.y -= 10;
    } else if (e.keyCode == 40 && hero.y != 510) { // Down
        hero.y += 10;
    } else if (e.keyCode == 32) {
        bullets.push({ x: hero.x + 3, y: hero.y - 20 });
        displayBullets();
        playSound(sounds.bullet);
        
    }
    //console.log(e.keyCode);
};

