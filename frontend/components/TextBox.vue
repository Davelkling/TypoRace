<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
const API = useRuntimeConfig().public.API;
const { data: paragraphs } = await useFetch<[{paragraphText:string,id:number}]>(`${API}/game`);
let paragraphLength: number;

const randomParagraph = ref("");
let totalCharacters = 0;
let isTimerRunning = ref(false);
let isFinished = ref(false);
let starter = ref(false);
let isControl = ref<boolean>(false);
let characterCounter = 0;
let mistake = 0;
let timer = ref(0);
let wpm = 0;
let accuracy = 0;
let words = ref<Array<string>>([]);
let totalWords = 0;
let startOfWord = 0;
const typedText = ref("");

function getRandomParagraph() {
    if(paragraphs.value){
        paragraphLength = paragraphs.value.length
        const randomIndex = Math.floor(Math.random() * paragraphLength);
        randomParagraph.value = paragraphs.value[randomIndex].paragraphText
            .split("")
            .map((span) => `<span>${span}</span>`)
            .join("");
        totalCharacters = paragraphs.value[randomIndex].paragraphText.length;
        words.value = paragraphs.value[randomIndex].paragraphText.split(" ");
        totalWords = words.value.length;
        console.log(totalWords);
        console.log(words.value);
        console.log(totalCharacters);
        isTimerRunning = ref(false);
        characterCounter = 0;
        mistake = 0;
        accuracy = 0
        wpm = 0;
        timer = ref(0);
        isFinished.value = false;
        
        // Reset the input text
        const inputElement = document.querySelector("input");
        if (inputElement) {
            console.log("input element = " + inputElement.value);
            inputElement.value = "";

        }
    }
}

function initTyping() {
    watch(typedText, (newType) => {
        const capsLockState = useKeyModifier("CapsLock");
        console.log(capsLockState.value);
        starter.value = true;
        isControl.value = false;
        const splitType = newType.split("")[characterCounter];
        const characters = document.querySelectorAll(".typing-text span");
        console.log("typedText = " + typedText.value);
        console.log("splitType = " + splitType);

        if (!isTimerRunning.value) {
        isTimerRunning.value = true;
        let intervalId = setInterval(() => {
            timer.value++;
            if (isFinished.value) {
                
                clearInterval(intervalId);
               
            }
            
        }, 1000);
        }

        if (characterCounter === totalCharacters - 1) {
            isFinished.value = true;
            wpm = Math.round(((characterCounter - mistake) / 5 / timer.value) * 60);
            accuracy = Math.round(((characterCounter - mistake) / totalCharacters) * 100);
            console.log(accuracy);
            console.log(isFinished.value);
            console.log("DONE");
            console.log(timer.value);
            console.log(characterCounter);
            console.log(totalCharacters);
            console.log(mistake);
        }

        if (splitType == null) {
        characterCounter--;
        console.log("BACKSPACE");
        characters[characterCounter].classList.remove("text-[#b3e6e9]");
        characters[characterCounter].classList.remove("text-red-500");
        if (characters[characterCounter].textContent === " ") {
            characters[characterCounter].classList.remove("bg-red-500");
        }
        } else {
        if (splitType === characters[characterCounter].textContent) {
            characters[characterCounter].classList.add("text-[#b3e6e9]");
            if (characters[characterCounter].textContent === " ") {
            characters[characterCounter].classList.remove("bg-red-500");
            startOfWord = characterCounter + 1;
            }
        } else {
            characters[characterCounter].classList.remove("text-[#b3e6e9]");
            characters[characterCounter].classList.add("text-red-500");
            if (characters[characterCounter].textContent === " ") {
            characters[characterCounter].classList.add("bg-red-500");
            }
            mistake++;
        }
        characterCounter++;
        }

        characters.forEach((span) => span.classList.remove("underline"));
        if (characterCounter < characters.length) {
        characters[characterCounter].classList.add("underline");
        }
    });
}

const handleKeyDown = (event: KeyboardEvent) => {
    console.log("Key pressed:", event.key);
    if (event.key === "Control" && event.code === "Backspace") {
        event.preventDefault();
        isControl.value = true;
        console.log("event.key");
    }
};

onMounted(() => {
    getRandomParagraph();
    initTyping();
});
</script>

<template>
    <div class="container mx-auto h-full overflow-hidden">
        <div
        class="flex flex-col justify-center items-center h-[70vh] w-full gap-4"
        >
        <div class="flex flex-col justify-center items-center gap-6 mb-12 w-full">
            <div class="flex flex-col justify-center items-center w-full">
                <div v-if="starter" class="flex justify-start items-center w-full gap-32 mb-4">
                    <p class="text-[#00ADB5] text-xl">Timer: {{ timer }}</p>
                    <p class="text-[#00ADB5] text-xl">
                    Remaining: {{ characterCounter }}/{{ totalCharacters }}
                    </p>
                </div>
                <div v-else class="flex justify-start items-center w-full gap-32 mb-4">
                    <p class="text-[#00ADB5] text-xl">Timer: </p>
                    <p class="text-[#00ADB5] text-xl">Remaining:</p>
                </div>
                <div class="flex flex-col justify-center items-center w-full">
                    <transition name="fade" mode="out-in">
                        <p :key="randomParagraph" class="text-[#00ADB5] text-2xl text-center mb-6 font-semibold typing-text" v-html="randomParagraph"></p>
                    </transition>
                    <div class="">
                        <input
                            type="text"
                            v-model="typedText"
                            @keyup="handleKeyDown"
                            placeholder="Type to Start"
                            class="text-white font-semibold text-xl placeholder-white placeholder placeholder-opacity-75 w-[40rem] h-[2.5rem] px-[1rem] border-2 rounded-md border-[#00ADB5] border-opacity-33 bg-[#033639] bg-opacity-17"
                        />
                    </div>
                </div>
            </div>
            <transition name="fade" mode="out-in">
            <div :key="randomParagraph" class="flex justify-center items-center gap-20">
                
                <p class="text-[#00ADB5] text-xl">Time: {{ timer }}</p>
                <p class="text-[#00ADB5] text-xl">WPM: {{ wpm }}</p>
                <p class="text-[#00ADB5] text-xl">Mistakes: {{ mistake }}</p>
                <p class="text-[#00ADB5] text-xl">Accuracy: %{{ accuracy }}</p>
             </div>
            </transition>
            
            <div>
                <span
                    @click="getRandomParagraph"
                    class="material-symbols-outlined text-2xl font-bold text-[#00ADB5] cursor-pointer"
                    >replay</span
                >
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
