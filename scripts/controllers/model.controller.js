//This class makes use of the STLLoader library ['/scripts/lib/STLLoader.js']
//All functionality within this class is dedicated to manipulating the loaded model.

//Load the model (defined by path) into the desired scene
function loadModel(scene, path, modelColor, scale) {
    //Create a new STLLoader
    var loader = new THREE.OBJLoader();
    //Load the STL-file using the path
    loader.load(path, function (geometry) {
        //Create a new material
        var material = new THREE.MeshPhongMaterial
        ({
            color: modelColor
        });
        // kayleigh
        geometry.traverse(function(child){
          if (child instanceof THREE.Mesh) {
            child.material=material;
          }
        });

        //Add the mesh to the scene
        scene.add(geometry);

        console.log('LOG:', material);
        //Rotate the custom model
        //rotateObject(geometry, -90, 0, 0);

        //Scale the custom model
        geometry.scale.set(0.03, 0.03, 0.03);

        //Set model position
        geometry.position.y = 0.3;
        geometry.position.z = 0;

        geometry.name = "loadedModel"

        console.log('LOG: Model loaded');

        return geometry;
    });
}

function updateModel(scene, modelColor){
    removeObject("loadedModel");
    loadModel(scene, HARDCODED_3DMODEL_PATH, modelColor, 0.014);
}
