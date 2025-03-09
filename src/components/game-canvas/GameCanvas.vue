<template>
    <canvas id="canvas" :height="height" :width="width"></canvas>
</template>

<script>
import Player from "@/classes/Player";
import SpaceShip from "@/classes/SpaceShip";
import HighScore from "@/classes/HighScore";
import Live from "@/classes/Live";

export default {
    name: 'GameCanvas',

    data() {
        return {
            level: 1,
            width: 800,
            height: 600,
            enemyDirection: 1,
            game: {
                backgroundColor: '#000',
                enemiesEachLine: 20,
                enemyLines: 4,
                enemySpace: 30,
                enemyFireRate: 1000,
                enemyFireTimer: 0,
                enemyStep: 5,
                highScoreStep: 100
            },
            enemies: [],
            player: null,
            highScore: null,
            live: null
        };
    },

    mounted() {
        this.setupGame();
        window.addEventListener('keydown', (event) => {
            // Prevent default behavior for game control keys
            if ([32, 37, 39, 65, 68].includes(event.keyCode)) {
                event.preventDefault();
            }
            this.game.keydown(event);
        });
        this.game.init();
    },

    methods: {
        setupGame() {
            this.game.canvas = document.getElementById('canvas');
            this.game.ctx = this.game.canvas.getContext('2d');
            this.game.init = this.initGame;
            this.game.update = this.updateGame;
            this.game.stop = () => {
                clearInterval(this.game.interval);
            };

            this.game.restart = () => {
                this.game.stop();
                this.game.init();
            };
            this.game.keydown = this.handlePlayerMovement;
        },

        initGame() {
            this.highScore = new HighScore();
            this.live = new Live(this.width);
            this.game.interval = setInterval(this.game.update, 1000 / 60);
            this.player = new Player(
                this.width / 2 - 50,
                this.height - 50,
                20,
                20,
                '#0099cc',
                this.width
            );

            this.createEnemies();
        },

        createEnemies() {
            this.enemies = [];
            for (let i = 0; i < this.game.enemyLines; i++) {
                for (let j = 0; j < this.game.enemiesEachLine; j++) {
                    this.enemies.push(new SpaceShip(
                        this.game.enemySpace + j * this.game.enemySpace,
                        this.game.enemySpace + i * this.game.enemySpace,
                        20,
                        20,
                        '#ff0000',
                        false
                    ));
                }
            }
        },

        handlePlayerMovement(event) {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                this.player.update(-5, 0);
            }

            if (event.key === 'ArrowRight' || event.key === 'd') {
                this.player.update(5, 0);
            }

            if (event.key === ' ') { // Space character
                this.player.shoot(-5);
            }
        },

        updateGame() {
            this.game.ctx.fillStyle = this.game.backgroundColor;
            this.game.ctx.fillRect(0, 0, this.width, this.height);

            this.player.draw(this.game.ctx);

            this.enemies.forEach((enemy) => {
                enemy.draw(this.game.ctx);
                enemy.update(this.enemyDirection, 0);
            });

            this.highScore.draw(this.game.ctx);
            this.live.draw(this.game.ctx);

            if (this.enemies.length === 0) {
                this.updateLevel();
            }

            this.handleEnemyMovement();
            this.handleEnemyFire();
            this.handlePlayerBulletCollision();
            this.handleEnemyBulletCollision();
            this.handleEnemyPosition();
        },

        updateLevel() {
            this.level++;
            this.game.enemyStep++;
            this.game.enemyLines++;
            this.game.enemyFireRate -= (this.level * 50);
            this.createEnemies();
        },

        handleEnemyMovement() {
            if (this.enemyDirection === 1) {
                let closestToRightSideEnemy = this.enemies[0];

                this.enemies.forEach((enemy) => {
                    if (enemy.xPos > closestToRightSideEnemy.xPos) {
                        closestToRightSideEnemy = enemy;
                    }
                });

                if (closestToRightSideEnemy.xPos + closestToRightSideEnemy.width > this.width) {
                    this.enemyDirection = -1;
                    this.enemies.forEach((enemy) => {
                        enemy.update(0, this.game.enemyStep);
                    });
                }
            } else if (this.enemyDirection === -1) {
                let closestToLeftSideEnemy = this.enemies[0];
                this.enemies.forEach((enemy) => {
                    if (enemy.xPos < closestToLeftSideEnemy.xPos) {
                        closestToLeftSideEnemy = enemy;
                    }
                });

                if (closestToLeftSideEnemy.xPos < 0) {
                    this.enemyDirection = 1;
                    this.enemies.forEach((enemy) => {
                        enemy.update(0, this.game.enemyStep);
                    });
                }
            }
        },

        handleEnemyFire() {
            this.game.enemyFireTimer += Math.random() * 10;
            if (this.game.enemyFireTimer > this.game.enemyFireRate) {
                this.game.enemyFireTimer = 0;
                this.enemies[Math.floor(Math.random() * this.enemies.length)].shoot(5);
            }
        },

        handlePlayerBulletCollision() {
            this.player.bullets.forEach((bullet, bulletIndex) => {
                this.enemies.forEach((enemy, enemyIndex) => {
                    if (enemy.collidesWith(bullet)) {
                        this.enemies.splice(enemyIndex, 1);
                        this.player.bullets.splice(bulletIndex, 1);
                        this.highScore.update(this.game.highScoreStep);
                    }
                })
            });
        },

        handleEnemyBulletCollision() {
            this.enemies.forEach((enemy) => {
                enemy.bullets.forEach((bullet) => {
                    if (this.player.collidesWith(bullet)) {
                        this.live.update();
                        if (this.live.lives === 0) {
                            this.game.restart();
                        }
                    }
                })
            });
        },

        handleEnemyPosition() {
            this.enemies.forEach((enemy) => {
                if (enemy.yPos + enemy.height > this.player.yPos) {
                    this.game.restart();
                }
            });
        }
    }
}
</script>
