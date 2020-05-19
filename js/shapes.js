//matter.js

const {
    Engine,
    Render,
    Bodies,
    Body,
    Runner,
    MouseConstraint,
    World,
} = Matter;

const sectionTag = document.querySelector('section.shapes');

//width and height of page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();
const runner = Runner.create();

const render = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        width: w,
        height: h,
        background: 'white',
        // wireframes: true,
        wireframes: false,
        pixelratio: window.devicePixelRatio,
    },
});

//view percentage
function percentX(percent) {
    return Math.round(percent / 100 * w);
}

function percentY(percent) {
    return Math.round(percent / 100 * h);
}


//create Bodies from shapes-data.js
const bodies = engine.world.bodies;

shapes.forEach((el, i) => {

    const {
        name,
        percW,
        percH,
        width,
        height,
        radius,
        sprite,
        mobile,
        tablet,
        desktop
    } = el;
    console.log('percentX', name, percentX(percW));
    World.add(engine.world, Bodies.rectangle(percW, percH, width, height, {
        chamfer: {
            radius: radius,
        },
        render: {
            sprite: {
                texture: "../../img/" + sprite,
            },
        },
    }));

    if (w < 700) {
        bodies[i].render.sprite.xScale = bodies[i].render.sprite.xScale * mobile;
        bodies[i].render.sprite.yScale = bodies[i].render.sprite.yScale * mobile;
        Body.scale(bodies[i], mobile, mobile);
    } else if (w < 1024) {
        bodies[i].render.sprite.xScale = bodies[i].render.sprite.xScale * tablet;
        bodies[i].render.sprite.yScale = bodies[i].render.sprite.yScale * tablet;
        Body.scale(bodies[i], tablet, tablet);

    } else {
        return;
    }
});


//create room
const wallOptions = {
    isStatic: true,
    // render: {
    //     visible: false,
    // }
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 10, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 10, wallOptions);

//create mouse dynamics
const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        stiffness: 0.8,
        render: {
            visible: true,
        },
    },
});

World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
]);



console.log('bodies', bodies);

//on click add a new shape
// document.addEventListener('click', function (event) {
//   console.log('click');
//   const shape = createShape(event.pageX, event.pageY);
//   World.add(engine.world, shape);
// });

// fit the render viewport to the scene


// Runner.run(runner, engine);

Engine.run(engine);
Render.run(render);

// window.addEventListener("resize", function () {
// Engine.clear(engine);
// Render.stop(render);

// Body.setPosition(ground, {
//     x: w / 2,
//     y: h
// });
// Body.scale(rightWall, {
//     scaleY: h * 2
// });
// Body.setPosition(rightWall, {
//     x: w - 200,
//     y: h
// });
// Body.setPosition(leftWall, {
//     x: 0,
//     y: h
// });

// });
// window.addEventListener('resize', function () {
//     console.log('heeee resize', engine);
//     Engine.clear(engine);
//     console.log('done');
// })

//Gravity
let time = 0;
const changeGravity = function () {
    time = time + 0.008;


    const gravityS = Math.sin(time);
    const gravity = Math.cos(time);
    engine.world.gravity.y = gravity;
    engine.world.gravity.x = gravityS;
    requestAnimationFrame(changeGravity)
};

changeGravity();
window.addEventListener("resize", function () {
    location.reload();
});
// window.addEventListener('deviceOrientation', function (event) {
//     engine.world.gravity.x = event.beta / 30;
//     engine.world.gravity.y = event.gamma / 30;
// });