import { AfterViewInit, Component,OnInit, ElementRef, Input, ViewChild, OnChanges } from '@angular/core';
// import * as THREE from 'three';
import * as THREE from 'three-full';


@Component({
  selector: 'app-td-content',
  templateUrl: './td-content.component.html',
  styleUrls: ['./td-content.component.css']
})

export class TdContentComponent implements AfterViewInit, OnChanges {
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;
  colorFromFile = {};

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }


  
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private cube: THREE.Mesh;
  private brainMesh: THREE.Mesh;

  private renderer: THREE.WebGLRenderer;

  public scene: THREE.Scene;
  private regularGeometry : THREE.Geometry;



  /* CUBE PROPERTIES */
  @Input() brainFrontColors: JSON;
  // @Input() ESIstatus_td: Boolean;
  
  public rotationSpeedX: number = 0.005;

  
  public rotationSpeedY: number = 0.01;

  
  public size: number = 200;

  
  public texture: string = '/assets/bviewer/crate.gif';

  public objBrain: string= '/assets/bviewer/model/NYmeshWithNormalsASC.ply';


  /* STAGE PROPERTIES */
  
  // public cameraZ: number = 400;
  public cameraX: number = 0;
  public cameraY: number = 0;
  public cameraZ: number = 300;

  
  // public fieldOfView: number = 70;
  public fieldOfView: number = 45;

  
  // public nearClippingPane: number = 1;
  public nearClippingPane: number = 0.01;

  
  // public farClippingPane: number = 1000;
  public farClippingPane: number = 10000000;
  



  /* DEPENDENCY INJECTION (CONSTRUCTOR) */
  constructor() { }



  /* STAGING, ANIMATION, AND RENDERING */

  /**
   * Animate the cube
   */
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the cube
   */
  private createCube() {
    let texture = new THREE.TextureLoader().load(this.texture);
    let material = new THREE.MeshBasicMaterial({ map: texture });
    
    let geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size);
    this.cube = new THREE.Mesh(geometry, material);

    // Add cube to scene
    this.scene.add(this.cube);
  }


  
  /**
   * Load NY model
   */
  private loadBrain() {



  }

  /**
   * Animate the cube
   */
  private animateBrain() {
    this.brainMesh.rotation.x += this.rotationSpeedX;
    this.brainMesh.rotation.y += this.rotationSpeedY;
  }


  /**
   * Create the scene
   */
  private addShadowedLight( x, y, z, color, intensity ) {
    let directionalLight = new THREE.DirectionalLight( color, intensity );

    directionalLight.position.set( x, y, z );
    this.scene.add( directionalLight );
    directionalLight.castShadow = true;
    let d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.001;
    
  }

  private updateColors() {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraY;
    this.camera.position.z = this.cameraZ;

    let loader = new THREE.PLYLoader();  
    // loader.load(this.objBrain, function(Geometry) {
    loader.load(this.objBrain, (Geometry) => {
      let material = new THREE.MeshLambertMaterial({
        color: new THREE.Color( 1.0, 1.0, 1.0),
        vertexColors: THREE.VertexColors,
        emissive: new THREE.Color( 0, 0, 0 ),
        transparent : true, 
        precision: "lowp" ,
        wireframe : false,
        flatShading: false
      });

      this.regularGeometry = new THREE.Geometry().fromBufferGeometry( Geometry );
      let mesh = new THREE.Mesh(this.regularGeometry, material);

      console.log(this.regularGeometry);
      // faces are in.dexed using characters
      var faceIndices = [ 'a', 'b', 'c', 'd' ];
      var color, f, p, vertexIndex;
      // 1. first, assign colors to vertices as desired
      for ( let i = 1; i < this.regularGeometry['vertices']['length']; i++ ) 
      {
        let color = new THREE.Color( 0xffffff );
        color.setRGB(this.colorFromFile['items'][i].r,this.colorFromFile['items'][i].g,this.colorFromFile['items'][i].b);
        //  color.setRGB(1.0,0.0,0.0);
        
        this.regularGeometry['colors'][i] = color; // use this array for convenience
      }
      // 2. copy the colors to corresponding positions 
      //     in each face's vertexColors array.
      // modo a
      for ( let i = 0; i < this.regularGeometry['faces']['length']; i++ ) 
      {
        let face = this.regularGeometry['faces'][ i ];
        let numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
        for( let j = 0; j < numberOfSides; j++ ) 
        {
          let vertexIndex = face[ faceIndices[ j ] ];
          color = new THREE.Color( 0xff0000 );
          color.setRGB(this.colorFromFile['items'][vertexIndex].r,this.colorFromFile['items'][vertexIndex].g,this.colorFromFile['items'][vertexIndex].b);
          face['vertexColors'][ j ] = color;
        }
      }
      this.regularGeometry['colorsNeedUpdate']= true;



      // to LPS space
      let RASToLPS = new THREE.Matrix4();
      RASToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      mesh.applyMatrix(RASToLPS);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.brainMesh = mesh;
      this.scene.add(mesh);
      console.log(this.scene);
    });

    this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    this.addShadowedLight( 0.5, 1, -1,new THREE.Color( 0.85, 0.85, 0.85), 1.35 );

  }

  /**
   * Create the scene
   */
  private createScene() {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraY;
    this.camera.position.z = this.cameraZ;

    let loader = new THREE.PLYLoader();  
    // loader.load(this.objBrain, function(Geometry) {
    loader.load(this.objBrain, (Geometry) => {
      let material = new THREE.MeshLambertMaterial({
        color: new THREE.Color( 1.0, 1.0, 1.0),
        vertexColors: THREE.VertexColors,
        emissive: new THREE.Color( 0, 0, 0 ),
        transparent : true, 
        precision: "lowp" ,
        wireframe : false,
        flatShading: false
      });

      this.regularGeometry = new THREE.Geometry().fromBufferGeometry( Geometry );
      let mesh = new THREE.Mesh(this.regularGeometry, material);

      console.log(this.regularGeometry);
      // faces are in.dexed using characters
      var faceIndices = [ 'a', 'b', 'c', 'd' ];
      var color, f, p, vertexIndex;
      // 1. first, assign colors to vertices as desired
      for ( let i = 1; i < this.regularGeometry['vertices']['length']; i++ ) 
      {
        let color = new THREE.Color( 0xffffff );
        // color.setRGB(this.colorFromFile['items'][i].r,this.colorFromFile['items'][i].g,this.colorFromFile['items'][i].b);
         color.setRGB(1.0,0.0,0.0);
        
        this.regularGeometry['colors'][i] = color; // use this array for convenience
      }
      // 2. copy the colors to corresponding positions 
      //     in each face's vertexColors array.
      // modo a
      for ( let i = 0; i < this.regularGeometry['faces']['length']; i++ ) 
      {
        let face = this.regularGeometry['faces'][ i ];
        let numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
        for( let j = 0; j < numberOfSides; j++ ) 
        {
          let vertexIndex = face[ faceIndices[ j ] ];
          color = new THREE.Color( 0xff0000 );
          // color.setRGB(this.colorFromFile['items'][vertexIndex].r,this.colorFromFile['items'][vertexIndex].g,this.colorFromFile['items'][vertexIndex].b);
          face['vertexColors'][ j ] = color;
        }
      }
      this.regularGeometry['colorsNeedUpdate']= true;



      // to LPS space
      let RASToLPS = new THREE.Matrix4();
      RASToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      mesh.applyMatrix(RASToLPS);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.brainMesh = mesh;
      this.scene.add(mesh);
      console.log(this.scene);
    });

    this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    this.addShadowedLight( 0.5, 1, -1,new THREE.Color( 0.85, 0.85, 0.85), 1.35 );

  }



  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   */
  private startRenderingLoop() {
    /* Renderer */
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas,antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;

    let component: TdContentComponent = this;
    (function render() {
      requestAnimationFrame(render);
      //component.animateCube();
      // component.animateBrain();
      component.renderer.render(component.scene, component.camera);
    }());
  }



  /* EVENTS */

  /**
   * Update scene after resizing. 
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }



  /* LIFECYCLE */

  /**
   * We need to wait until template is bound to DOM, as we need the view
   * dimensions to create the scene. We could create the cube in a Init hook,
   * but we would be unable to add it to the scene until now.
   */
  public ngAfterViewInit() {
    // this.createScene();
    // // this.createCube();
    // this.startRenderingLoop();
    // this.ESIstatus_td = true;
  }
  
  public ngOnChanges() {
    console.log('entre al onchange',this.brainFrontColors);
    this.colorFromFile = this.brainFrontColors;
    this.updateColors();
    
    this.startRenderingLoop();
    //this.ESIstatus_td = true;
  }
}