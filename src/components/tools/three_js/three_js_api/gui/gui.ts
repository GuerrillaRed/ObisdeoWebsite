import { GUI } from 'dat.gui'
import * as THREE from 'three'

export class BaseGUI {
    private gui: GUI;

    constructor(primitive: THREE.Mesh) {
        this.gui = new GUI({ autoPlace: false });
        let gui_container = document.getElementById('gui-container');
        gui_container?.appendChild(this.gui.domElement);
        
        const cubeFolder = this.gui.addFolder('Cube');
        cubeFolder.add(primitive.rotation, 'x', 0, Math.PI * 2);
        cubeFolder.add(primitive.rotation, 'y', 0, Math.PI * 2);
        cubeFolder.add(primitive.rotation, 'z', 0, Math.PI * 2);
        cubeFolder.open();
        const cameraFolder = this.gui.addFolder('Camera');
        cameraFolder.add(primitive.position, 'z', 0, 10);
        cameraFolder.open();
    }

    public destroy() {
        this.gui.destroy();
    }
}