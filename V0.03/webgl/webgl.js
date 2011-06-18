
var gl;
function initGL(canvas){
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    }catch(e){
    }
    if(!gl){
        alert("Could not initialise WebGL, sorry");
    }
}

function getShader(gl,id){
    var shaderScript = document.getElementById(id);
    if(!shaderScript){
        return null;
    }
    
    var str = "";
    var k = shaderScript.firstChild;
    while(k){
        if(k.nodeType == 3){
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if(shaderScript.type == "x-shader/x-fragment"){
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }else if(shaderScript.type == "x-shader/x-vertex"){
        shader = gl.createShader(gl.VERTEX_SHADER);
    }else{
        return null;
    }

    gl.shaderSource(shader,str);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var shaderProgram;
function initShaders(){
    var fragmentShader = getShader(gl,"shader-fs");
    var vertexShader = getShader(gl,"shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vertexShader);
    gl.attachShader(shaderProgram,fragmentShader);
    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)){
        alert("Couldn't init shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram,"aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightingDirection");
    shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
    shaderProgram.alphaUniform = gl.getUniformLocation(shaderProgram, "uAlpha");    

}

var mvMatrix;

function loadIdentity(){
    mvMatrix = Matrix.I(4);
}

function multMatrix(m){
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v){
    var m = Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4();
    multMatrix(m);
}

var pMatrix;
function perspective(fovy,aspect,znear,zfar){
    pMatrix = makePerspective(fovy,aspect,znear,zfar);
}

function setMatrixUniforms(){
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform,false,new Float32Array(pMatrix.flatten()));
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform,false,new Float32Array(mvMatrix.flatten()));
}

  var cubeVertexPositionBuffer;
  var cubeVertexNormalBuffer;  
  var cubeVertexTextureCoordBuffer;
  var cubeVertexIndexBuffer;

function initBuffers(){
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
      // Front face
      -1.0, -1.0,  .05,
       1.0, -1.0,  .05,
       1.0,  2.0,  .05,
      -1.0,  2.0,  .05,

      // Back face
      -1.0, -1.0, -.05,
      -1.0,  2.0, -.05,
       1.0,  2.0, -.05,
       1.0, -1.0, -.05,

      // Top face
      -1.0,  2.0, -.05,
      -1.0,  2.0,  .05,
       1.0,  2.0,  .05,
       1.0,  2.0, -.05,

      // Bottom face
      -1.0, -1.0, -.05,
       1.0, -1.0, -.05,
       1.0, -1.0,  .05,
      -1.0, -1.0,  .05,

      // Right face
       1.0, -1.0, -.05,
       1.0,  2.0, -.05,
       1.0,  2.0,  .05,
       1.0, -1.0,  .05,

      // Left face
      -1.0, -1.0, -.05,
      -1.0, -1.0,  .05,
      -1.0,  2.0,  .05,
      -1.0,  2.0, -.05,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 24;

   cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;
    

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;

    cubeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    var vertexNormals = [
      // Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    cubeVertexNormalBuffer.itemSize = 3;
    cubeVertexNormalBuffer.numItems = 24;
    
}

  var xRot = 0;
  var yRot = 0;
  var zRot = 0;

  var xSpeed = 3;
  var ySpeed = 3;

  var z = -8.0;

  var filter = 0;

function drawScene(){
    gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    loadIdentity();

    mvTranslate([0.0, 0.0, z]);

    mvRotate(xRot, [1, 0, 0]);
    mvRotate(yRot, [0, 1, 0]);
   // mvRotate(zRot, [0, 0, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glassTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    var blending = document.getElementById("blending").checked;
    if (blending) {
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.enable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);
      gl.uniform1f(shaderProgram.alphaUniform, document.getElementById("alpha").value);
    } else {
      gl.disable(gl.BLEND);
      gl.enable(gl.DEPTH_TEST);
    }
    

    var lighting = document.getElementById("lighting").checked;
    gl.uniform1i(shaderProgram.useLightingUniform, lighting);
    if (lighting) {
      gl.uniform3f(
        shaderProgram.ambientColorUniform,
        parseFloat(document.getElementById("ambientR").value),
        parseFloat(document.getElementById("ambientG").value),
        parseFloat(document.getElementById("ambientB").value)
      );

      var lightingDirection = Vector.create([
        parseFloat(document.getElementById("lightDirectionX").value),
        parseFloat(document.getElementById("lightDirectionY").value),
        parseFloat(document.getElementById("lightDirectionZ").value)
      ]);
      var adjustedLD = lightingDirection.toUnitVector().x(-1);
      var flatLD = adjustedLD.flatten();
      gl.uniform3f(
        shaderProgram.lightingDirectionUniform,
        flatLD[0], flatLD[1], flatLD[2]
      );

      gl.uniform3f(
        shaderProgram.directionalColorUniform,
        parseFloat(document.getElementById("directionalR").value),
        parseFloat(document.getElementById("directionalG").value),
        parseFloat(document.getElementById("directionalB").value)
      );
    }
    
 
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

}

function webGLStart(){
    var canvas = document.getElementById("lesson01-canvas");
    initGL(canvas);
    initShaders();
    initBuffers();
    initTexture();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    setInterval(tick,15);
}

  var currentlyPressedKeys = Object();

  function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;

    if (String.fromCharCode(event.keyCode) == "F") {
      filter += 1;
      if (filter == 3) {
        filter = 0;
      }
    }
  }

  function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
  }


  var glassTexture;
  function initTexture() {
    glassTexture = gl.createTexture();
    glassTexture.image = new Image();
    glassTexture.image.onload = function() {
      handleLoadedTexture(glassTexture)
    }

    glassTexture.image.src = "cardo.png";
  }


function handleLoadedTexture(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

}


var lastTime = 0;
function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

      xRot += (xSpeed * elapsed) / 1000.0;
      yRot += (ySpeed * elapsed) / 1000.0;
      //zRot += (90 * elapsed) / 1000.0;

    }
    lastTime = timeNow;
}

function tick() {
    handleKeys();
    drawScene();
    animate();
    document.querySelector("#x").innerHTML = xRot;
    document.querySelector("#y").innerHTML = yRot;
    document.querySelector("#z").innerHTML = zRot;
}
  function handleKeys() {
    if (currentlyPressedKeys[33]) {
      // Page Up
      z -= 0.05;
    }
    if (currentlyPressedKeys[34]) {
      // Page Down
      z += 0.05;
    }
    if (currentlyPressedKeys[37]) {
      // Left cursor key
      ySpeed -= 1;
    }
    if (currentlyPressedKeys[39]) {
      // Right cursor key
      ySpeed += 1;
    }
    if (currentlyPressedKeys[38]) {
      // Up cursor key
      xSpeed -= 1;
    }
    if (currentlyPressedKeys[40]) {
      // Down cursor key
      xSpeed += 1;
    }
  }


var mvMatrixStack = [];

function mvPushMatrix(m) {
    if (m) {
        mvMatrixStack.push(m.dup());
        mvMatrix = m.dup();
    } else {
        mvMatrixStack.push(mvMatrix.dup());
    }
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
    return mvMatrix;
}

function mvRotate(ang, v) {
    var arad = ang * Math.PI / 180.0;
    var m = Matrix.Rotation(arad, $V([v[0], v[1], v[2]])).ensure4x4();
    multMatrix(m);
}
  


