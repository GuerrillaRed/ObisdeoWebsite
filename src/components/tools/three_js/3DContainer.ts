import { defineComponent } from 'vue';
import { Scene, SceneData } from "./three_js_api/scene/scene"
import { BaseGUI } from './three_js_api/gui/gui'

let scene: Scene;
let gui: BaseGUI;

export default defineComponent({
    name: 'ThreeDContainer',
	mounted() {
		makeDefaultScene();
	},
	methods: {
		attachFullscreenCallback: function (my_canvas: HTMLElement, scene: Scene) {
			window.addEventListener('resize', () => { scene.FullscreenEventCallback(); }, );
		},
		fullscreen: function (){
			var el = document.getElementById('renderer');
			el?.requestFullscreen();
		}
	}
});

function makeDefaultScene() {
	let my_canvas = document.getElementById("renderer");
	scene = new Scene(my_canvas!);

	// this.attachFullscreenCallback(my_canvas!, scene);

	const cube = scene.addCubePrimitive();

	/* scene.addSimpleAnimation(() => {
		cube!.rotation.x += 0.01;
		cube!.rotation.y += 0.1;
	}); */

	gui = new BaseGUI(cube!);

	const landscape = scene.addPlaneGeometry(5,5,199,199);
	landscape.position.set(0, -2, 0);
	landscape.scale.set(1, 1, 1);
	landscape.rotation.x = -(Math.PI / 2);

	const backdrop = scene.addPlaneGeometry(50,50,199,199);
	backdrop.position.set(0, 0, -1);
	backdrop.scale.set(1, 1, 1);
	
	const plight = scene.addPointLight();
	scene.addSkylight();

	scene.renderSceneToTarget();
	
}