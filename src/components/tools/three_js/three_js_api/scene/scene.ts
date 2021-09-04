import * as THREE from 'three';
import { render } from 'vue';
import { SkyLight } from "../lights/lights";

export class SceneData {
    scene: null | THREE.Scene = null;
    renderer: null | THREE.Renderer = null;
    cameras: THREE.Camera[] = [];
    sky_light: null | SkyLight = null;
}

export class Scene {
    scene_data: SceneData = new SceneData();
    
    private render_canvas: HTMLElement;
    private camera_aspect_ratio: number;
    private renderer_width: number;
    private renderer_height: number;

    constructor(my_canvas: HTMLElement) {
        // get canvas and generate a scene, renderer, and main camera for it

        this.render_canvas = my_canvas;
        let scene: THREE.Scene = new THREE.Scene();
        this.scene_data.scene = scene;

        this.renderer_width = this.render_canvas.clientWidth;
        this.renderer_height = this.render_canvas.clientHeight;
        this.camera_aspect_ratio = this.renderer_width / this.renderer_height;
        
        const camera = new THREE.PerspectiveCamera(100, this.camera_aspect_ratio, 0.1, 1000);
        camera.name = "main_camera";
        this.scene_data.cameras.push(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.render_canvas as HTMLCanvasElement });
        renderer.setSize(this.renderer_width, this.renderer_height);
        this.scene_data.renderer = renderer;

        camera.position.z = 5;
        this.addSimpleAnimation(() => {});
        this.renderSceneToTarget();
    }

    private recalcRendererSize() {
        this.renderer_width = this.render_canvas.clientWidth;
        this.renderer_height = this.render_canvas.clientHeight;
        this.camera_aspect_ratio = this.renderer_width / this.renderer_height;
    }

    public getMainCamera(): THREE.Camera {
        let camera = this.scene_data.cameras.find(x => x.name === "main_camera") as THREE.Camera;
        return camera;
    }

    

    public addCubePrimitive(): THREE.Mesh | undefined {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshLambertMaterial( { color: new THREE.Color("rgb(201, 201, 201)") } );
        const cube = new THREE.Mesh(geometry, material);

        if (this.scene_data.scene != null) {
            this.scene_data.scene.add(cube);
            return cube;
        }
    
        return undefined;
    }

    // generate a landscape geometry with lambert material
    public addPlaneGeometry(width: number, height: number, x_seg: number, y_seg: number): THREE.Mesh {
        const landscape_geo = new THREE.PlaneGeometry(width, height, x_seg, y_seg);
        const landscape_mat = new THREE.MeshLambertMaterial({ color: new THREE.Color("rgb(201, 201, 201)"), wireframe:false });
        const landscape = new THREE.Mesh(landscape_geo, landscape_mat);
        
        this.scene_data.scene!.add(landscape);
        return landscape;
    }

    // generate a skylight and add it to the scene
    public addSkylight() {
        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
        hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
        hemiLight.position.set( 0, 500, 0 );
        
        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set( -1, 0.75, 1 );
        dirLight.position.multiplyScalar( 50);
        dirLight.name = "dirlight";
        this.scene_data.scene!.add(dirLight);
        this.scene_data.scene!.add(hemiLight);
        this.scene_data.sky_light = new SkyLight(hemiLight, dirLight);
    }

    // generate a point light and add it to the scene
    public addPointLight(): THREE.PointLight {
        const light = new THREE.PointLight(new THREE.Color("rgb(255, 0, 0)"), 1, 500, 100);
        light.position.set(0, -.1, 0);
        this.scene_data.scene!.add(light);
        return light;
    }

    public addSimpleAnimation(anim: () => void) {
        const animate = function (render_func: () => void) {
            requestAnimationFrame(() => { animate(render_func) } );
            anim();
            render_func();
        };

        animate(() => { this.renderSceneToTarget(); });
    }

    renderSceneToTarget() {
        let camera = this.getMainCamera();
        if (this.scene_data.renderer && this.scene_data.scene) {
            this.scene_data.renderer.render( this.scene_data.scene, camera );	
        }
    }

    public FullscreenEventCallback() {
        this.recalcRendererSize();
        this.scene_data.renderer!.setSize(this.renderer_width, this.renderer_height);
    }
}