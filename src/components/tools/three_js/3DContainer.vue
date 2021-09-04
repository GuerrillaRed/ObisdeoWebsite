<template>
    <div class="canvas-container">
        <div id="gui-container" />
        <canvas id="renderer" />
        
        <button class="fullscreen-button" @click="fullscreen">fs</button>
    </div>
</template>

<script lang="ts" src="./3DContainer.ts" />
<style scoped src="./3DContainer.css" />