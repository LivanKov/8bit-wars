import { createStore } from 'vuex'

const HIGH_SCORE_STEPS = 20;
const DEFAULT_LIVES = 3;

const store = createStore({
    state() {
        return {
            lives: DEFAULT_LIVES,
            highScore: 0,
            started: false
        }
    },
    mutations: {
        reduceLives(state) {
            state.lives--;
        },

        resetLives(state) {
            state.lives = DEFAULT_LIVES;
        },

        resetHighScore(state) {
            state.highScore = 0;
        },

        updateHighScore(state) {
            state.highScore += HIGH_SCORE_STEPS;
        },

        start(state) {
            state.started = true;
        }
    },

    getters: {
        getLives(state) {
            return state.lives;
        },

        isGameOver(state) {
            return state.lives === 0;
        },

        isStarted(state) {
            return state.started;
        },

        getHighScore(state) {
            return state.highScore;
        },

        getDefaultLives() {
            return DEFAULT_LIVES;
        }
    },

    actions: {
        reduceLives({ commit }) {
            commit('reduceLives');
        },

        reset({ commit }) {
            commit('resetLives');
            commit('resetHighScore');
            commit('start');
        },

        incrementHighScore({ commit }) {
            commit('updateHighScore');
        }
    }
});

export default store;
