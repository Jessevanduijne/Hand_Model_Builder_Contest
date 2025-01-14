window.onload = init;
var scene = new THREE.Scene();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var camera;

//The function that is run once when the page loads
function init(scale)
{
    //Create a new (more flexible) GUI panel
    var gui;

    //document.addEventListener("click", mouseClick,false);
    //var customContainer = document.getElementById('gui-container');
    //customContainer.appendChild(gui.domElement);

    //Create scene
     scene = new THREE.Scene();

    //Create camera
    camera = createCamera
    (
        3,              //x position
        0,              //y position
        0,              //z position
        45,             //perspective
        WINDOW_RATIO,   //ratio (1 == original size)
        0.1,              //Near field clipping plane
        2000,           //Far field clipping plane
        gui             //GUI object
    );

    //Load the model
    var geometry = loadModel(scene, HARDCODED_3DMODEL_PATH, DEFAULT_MODEL_COLOR, 0.014);
    createStandard(scene,DEFAULT_MODEL_COLOR,null,null);

    //Create a light source (& sphere to visualize source)
    var light = createPointLight(0.8, 1, 2, 2);

    //Add a light source to the camera
    camera.add(light);

    //Add all models to the scene
    scene.add(camera);

    var renderer = createRenderer
    (
        'scene',            //Scene name
        window.innerWidth/2,  //Width
        window.innerHeight/2, //Height
        BACKGROUND_COLOR    //Background color
    );


    var orbitControl = createOrbitController(camera, renderer);

    //Disable the use of the arrow keys on the keyboard
    orbitControl.enableKeys = false;
    //Disable panning the orbit controller (relative to the model)
    orbitControl.enablePan = false;

    //Update the renderer, scene and camera
    update(renderer, scene, camera, orbitControl);
}

//The function that serves as an endless loop, allowing for animations and dynamic changes in the render
function update(renderer, scene, camera, control)
{
    onWindowResize(camera, renderer);

    //Set the background of the renderer to be transparent
    renderer.setClearColor( 0x000000, 0 );

    //Make the renderer render the scene and the camera
    renderer.render
    (
        scene,
        camera
    );

    //Call the update function in the orbit control
    control.update();

    //Make the method call itself so it will loop indefinitely
    requestAnimationFrame(function()
    {
        update(renderer, scene, camera, control);
    });
}

//function getMouseLocation(event){
 //mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
 //mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
 //console.log(mouse);

 //raycaster.setFromCamera(mouse, camera);
 //var intersects = raycaster.intersectObjects(scene.children);

 //if(intersects.length > 0) {
  //var point = intersects[0].point;
  //return new THREE.Vector3(point.x, point.y, point.z);
 //}
//}

//function mouseClick(event) {
 //var position = getMouseLocation(event);

 //var mesh = creatimagemesh(position);

 //scene.add(mesh);
//}
