<template>
    <div class="button-container-top">
      <label class="select-button">
        <div>
          <span v-if="file">Selected File: {{file.name}}</span>
          <span v-else>Select File</span>
        </div>
        <input type="file" @change="handleLoadFile"/>
      </label>
      <button class="export-button" @click="handleExportFile">Export PDF</button>
      <button class="export-button" @click="setWindowCenter">Set Center</button>
    </div>
    <div class="tooltray">
        
    </div>
    <div class="iframe-container">
        <iframe id="pdf" allowfullscreen />
    </div>
</template>

<script lang="ts" src="./CustomPDFDocument.ts" />
<style scoped src="./CustomPDFDocument.css" />