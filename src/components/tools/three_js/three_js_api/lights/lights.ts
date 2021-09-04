import * as THREE from 'three';

export class SkyLight {
	constructor(hemi_light: THREE.HemisphereLight, dir_light: THREE.DirectionalLight) {
		this.hemisphere_light = hemi_light;
		this.direction_light = dir_light;
	}

	hemisphere_light: THREE.HemisphereLight;
	direction_light: THREE.DirectionalLight;
}