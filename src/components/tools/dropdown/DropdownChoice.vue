<template>
    <div id="test">
        <select v-model="value" @change="onSelection">
            <option value="null" disabled>Please select a picture</option>
            <option v-for="item in options" :key="item.key" :value="item.value">{{ item.key }}</option>
        </select>   
    </div>
</template>

<script lang="ts" src="./DropdownChoice.ts" />
<style scoped src="./DropdownChoice.css" />