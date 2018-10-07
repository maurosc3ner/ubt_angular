// demo topoplot 
// 1. open edf
// 2. siguiente una vez
// 3. topoplot
// 4. cursor al comienzo
// 5. mover cursor al final
// 6. aplicar ocular

// demo brain, 
// 1. open EDF
// 2. deja ver el actual
// 3. siguiente una vez
// 4. cursor al comienzo
// 5. mover cursor a la mitad
// 6. Abrir MRI



import { AfterViewInit, Component,OnInit, ElementRef, Input, ViewChild, OnChanges } from '@angular/core';
// import * as THREE from 'three';
import * as THREE from 'three-full';
import { validateHorizontalPosition } from '../../../../node_modules/@angular/cdk/overlay';


@Component({
  selector: 'app-td-content',
  templateUrl: './td-content.component.html',
  styleUrls: ['./td-content.component.css']
})

export class TdContentComponent implements AfterViewInit, OnChanges {
  /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
  private camera: THREE.PerspectiveCamera;
  private controls: THREE.OrbitControls;
  colorFromFile = {};

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private cubeMesh: THREE.Mesh;
  private brainMesh: THREE.Mesh;

  private renderer: THREE.WebGLRenderer;

  public scene: THREE.Scene;
  //cmb2
  //private regularGeometry : THREE.Geometry;
  private regularGeometry : THREE.BufferGeometry;
  private cubeGeometry : THREE.Geometry;

  private cubeTexture: THREE.material;

  /* CUBE PROPERTIES */
  @Input() brainFrontColors: JSON;
  // @Input() ESIstatus_td: Boolean;
  
  public rotationSpeedX: number = 0.001;

  
  public rotationSpeedY: number = 0.001;

  
  public size: number = 200;

  public colorSel=0;

  
  public texture: string = '/assets/bviewer/crate.gif';

  public objBrain: string= '/assets/bviewer/model/NYmeshWithNormalsASC.ply';
  
  public drawCounter : number = 0;


  /* STAGE PROPERTIES */
  
  // public cameraZ: number = 400;
  public cameraX: number = 0;
  public cameraY: number = 0;
  public cameraZ: number = 275;

  
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
   * Create the cube
   */
  private createCube() {
    let texture = new THREE.TextureLoader().load(this.texture);
    // let material = new THREE.MeshBasicMaterial({ map: texture });
    this.cubeTexture = new THREE.MeshLambertMaterial({
      color: new THREE.Color( 1.0, 1.0, 1.0),
      vertexColors: THREE.VertexColors,
      emissive: new THREE.Color( 0, 0, 0 ),
      transparent : true, 
      //opacity: 1, 
      precision: "highp" ,
      wireframe : false,
      flatShading: false
    });
  
    this.cubeGeometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.cubeMesh = new THREE.Mesh(this.cubeGeometry, this.cubeTexture);

    if (this.colorSel === 0){
      for ( let i = 0; i < this.cubeGeometry.faces.length; i += 2 ) {
        let faceColor1 = 0xff0000;
        this.cubeGeometry.faces[i].color.setHex(faceColor1);
        let faceColor2 = 0xff0000;
        this.cubeGeometry.faces[i+1].color.setHex(faceColor2);
      }
      this.colorSel=1;
    }else if (this.colorSel === 1){
      for ( let i = 0; i < this.cubeGeometry.faces.length; i += 2 ) {
        let faceColor1 = 0x00ff00;
        this.cubeGeometry.faces[i].color.setHex(faceColor1);
        let faceColor2 = 0x00ff00;
        this.cubeGeometry.faces[i+1].color.setHex(faceColor2);
      }
      this.colorSel =0;
    }

    // Add cube to scene
    this.scene.add(this.cubeMesh);
  }


  
  /**
   * Load NY model
   */
  private createBrain() {
    let loader = new THREE.PLYLoader();  
  
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
      //cmb1
      //this.regularGeometry = new THREE.Geometry().fromBufferGeometry( Geometry );
      this.regularGeometry = Geometry;
      this.brainMesh = new THREE.Mesh(this.regularGeometry, material);

      // console.log(this.regularGeometry);
      // // faces are in.dexed using characters
      // var faceIndices = [ 'a', 'b', 'c', 'd' ];
      // var color, f, p, vertexIndex;
      // // 1. first, assign colors to vertices as desired
      // for ( let i = 1; i < this.regularGeometry['vertices']['length']; i++ ) 
      // {
      //   let color = new THREE.Color( 0xffffff );
      //   // color.setRGB(this.colorFromFile['items'][i].r,this.colorFromFile['items'][i].g,this.colorFromFile['items'][i].b);
      //    color.setRGB(1.0,0.0,0.0);
        
      //   this.regularGeometry['colors'][i] = color; // use this array for convenience
      // }
      // // 2. copy the colors to corresponding positions 
      // //     in each face's vertexColors array.
      // // modo a
      // for ( let i = 0; i < this.regularGeometry['faces']['length']; i++ ) 
      // {
      //   let face = this.regularGeometry['faces'][ i ];
      //   let numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
      //   for( let j = 0; j < numberOfSides; j++ ) 
      //   {
      //     let vertexIndex = face[ faceIndices[ j ] ];
      //     color = new THREE.Color( 0xff0000 );
      //     // color.setRGB(this.colorFromFile['items'][vertexIndex].r,this.colorFromFile['items'][vertexIndex].g,this.colorFromFile['items'][vertexIndex].b);
      //     face['vertexColors'][ j ] = color;
      //   }
      // }
      // this.regularGeometry['colorsNeedUpdate']= true;
      // to LPS space
      let RASToLPS = new THREE.Matrix4();
      RASToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      this.brainMesh.applyMatrix(RASToLPS);
      this.brainMesh.castShadow = true;
      this.brainMesh.receiveShadow = true;
      this.scene.add(this.brainMesh);
      this.drawCounter++;
      console.log('draw='+this.drawCounter);
    });
  }

  /**
   * Animate the brain
   */
  private animateBrain() {
    this.brainMesh.rotation.x += this.rotationSpeedX;
    this.brainMesh.rotation.y += this.rotationSpeedY;
  }

   /**
   * Animate the cube
   */
  private animateCube() {
    this.cubeMesh.rotation.x += this.rotationSpeedX;
    this.cubeMesh.rotation.y += this.rotationSpeedY;
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


  
  private updateCubeColors() {
    this.scene.remove(this.cubeMesh);

// vuelvo y lo creo
    // let material = new THREE.MeshLambertMaterial({
    //   color: new THREE.Color( 1.0, 1.0, 1.0),
    //   vertexColors: THREE.VertexColors,
    //   emissive: new THREE.Color( 0, 0, 0 ),
    //   transparent : true, 
    //   //opacity: 1, 
    //   precision: "highp" ,
    //   wireframe : false,
    //   flatShading: false
    // });
  
    this.cubeGeometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    if (this.colorSel === 0){
      for ( let i = 0; i < this.cubeGeometry.faces.length; i += 2 ) {
        let faceColor1 = 0xff0000;
        this.cubeGeometry.faces[i].color.setHex(faceColor1);
        let faceColor2 = 0xff0000;
        this.cubeGeometry.faces[i+1].color.setHex(faceColor2);
      }
      this.colorSel=1;
    }else if (this.colorSel === 1){
      for ( let i = 0; i < this.cubeGeometry.faces.length; i += 2 ) {
        let faceColor1 = 0x00ff00;
        this.cubeGeometry.faces[i].color.setHex(faceColor1);
        let faceColor2 = 0x00ff00;
        this.cubeGeometry.faces[i+1].color.setHex(faceColor2);
      }
      this.colorSel =2;
    } else if (this.colorSel === 2){
      for ( let i = 0; i < this.cubeGeometry.faces.length; i += 2 ) {
        let faceColor1 = 0x00ff00;
        this.cubeGeometry.faces[i].color.setHex(faceColor1);
        let faceColor2 = 0x00ff00;
        this.cubeGeometry.faces[i+1].color.setHex(faceColor2);
      }
      this.colorSel =0;
    }
    this.cubeMesh = new THREE.Mesh(this.cubeGeometry, this.cubeTexture);

    // Add cube to scene
    this.scene.add(this.cubeMesh);


    // console.log("updateCubeColors", this.colorSel);
  }

/*
 este funciona creando el cerebro desde cero pero es costoso 09-09-2018
 
  private updateBrainColors() {
    
    this.scene.remove(this.brainMesh);

    let loader = new THREE.PLYLoader();  
  
    loader.load(this.objBrain, (Geometry) => {
      let material = new THREE.MeshLambertMaterial({
        color: new THREE.Color( 1.0, 1.0, 1.0),
        vertexColors: THREE.VertexColors,
        emissive: new THREE.Color( 0.0, 0.0, 0.0 ),
        transparent : true, 
        precision: "lowp" ,
        wireframe : false,
        flatShading: false
      });

      this.regularGeometry = new THREE.Geometry().fromBufferGeometry( Geometry );
      this.brainMesh = new THREE.Mesh(this.regularGeometry, material);

      //lo coloreo
      // faces are in.dexed using characters
      let faceIndices = [ 'a', 'b', 'c', 'd' ];
      let color = new THREE.Color;
      let f, p, vertexIndex;
      // 1. first, assign colors to vertices as desired
      for ( let i = 1; i < this.regularGeometry['vertices']['length']; i++ ) 
      {
        let color = new THREE.Color( 0xffffff );
        color.setRGB(this.brainFrontColors['items'][i].r,this.brainFrontColors['items'][i].g,this.brainFrontColors['items'][i].b);
        //  color.setRGB(1.0,0.0,0.0);
        // console.log(i,this.brainFrontColors['items'][i]);
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
          color.setRGB(this.brainFrontColors['items'][vertexIndex].r,this.brainFrontColors['items'][vertexIndex].g,this.brainFrontColors['items'][vertexIndex].b);
          face['vertexColors'][ j ] = color;
        }
      }

      this.regularGeometry['colorsNeedUpdate']= true;
      // to LPS space
      let RASToLPS = new THREE.Matrix4();
      RASToLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      this.brainMesh.applyMatrix(RASToLPS);
      this.brainMesh.castShadow = true;
      this.brainMesh.receiveShadow = true;
      this.scene.add(this.brainMesh);
      this.drawCounter++;
      console.log('draw='+this.drawCounter);// console.log("updatebrainColors");
    });
    
  }

*/

  private updateBrainColors() {
    //    this.scene.remove(this.brainMesh); no brain removal!!
    if(this.regularGeometry){
      if (this.drawCounter>0){
        let colors2 = new Float32Array(this.regularGeometry.attributes.position.count*3);
        for ( let i = 0; i < this.regularGeometry.attributes.position.count; i ++ ) {
            colors2[ i * 3 ] = this.brainFrontColors['items'][i]['r'];
            colors2[ i * 3 + 1 ] = this.brainFrontColors['items'][i]['g'];
            colors2[ i * 3 + 2 ] = this.brainFrontColors['items'][i]['b'];
        }
        this.regularGeometry.addAttribute( "color", new THREE.BufferAttribute( colors2, 3 ) );
        this.regularGeometry.colorsNeedUpdate= true;
      }else{
          console.log("no existo");
      }
      this.drawCounter++;
      console.log('draw='+this.drawCounter);// console.log("updatebrainColors");
    }
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
    this.controls = new THREE.OrbitControls( this.camera );

    this.scene.add( new THREE.HemisphereLight( 0x887777, 0x111122 ) );
    this.addShadowedLight( 0.5, 1, -1,new THREE.Color(1, 1, 1), 1);
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
      component.controls.update();
      component.animateBrain();
      // component.animateCube()
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
    this.createScene();
    this.createBrain()
    //this.createCube();
    this.startRenderingLoop();
    
  }
  
  public ngOnChanges(changes) {
    // console.log('entre al onchange',changes.colorSel);
    // this.colorFromFile = this.brainFrontColors;
    // this.updateCubeColors();
    this.updateBrainColors();
    //this.startRenderingLoop();
  }
}