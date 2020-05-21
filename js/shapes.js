//matter.js

const {
    Engine,
    Render,
    Bounds,
    Events,
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
// function percentX(percent) {
//     return Math.round(w / 100 * percent);
// }
function percentX(percent) {
    return Math.round(percent / 100 * w);
}

// function percentY(percent) {
//     return Math.round(h / 100 * percent);
// }
function percentY(percent) {
    return Math.round(percent / 100 * h);
}


//create Bodies from shapes-data.js
const bodies = engine.world.bodies;

shapes.forEach((el, i) => {

    const {
        percW,
        percH,
        width,
        height,
        radius,
        sprite,
        url,
        mobile,
        tablet,
        desktop
    } = el;


    World.add(engine.world, Bodies.rectangle(percentX(percW), percentY(percH), width, height, {
        chamfer: {
            radius: radius,
        },
        render: {
            sprite: {
                texture: "../../img/" + sprite,
            },
        },
        url: url
    }));




    //checks screen size and reduces shapes accordingly
    const size = ((w <= 700) ? (mobile) : ((w <= 1024) ? (tablet) : (
        desktop)));

    bodies[i].render.sprite.xScale = bodies[i].render.sprite.xScale * size;
    bodies[i].render.sprite.yScale = bodies[i].render.sprite.yScale * size;
    Body.scale(bodies[i], size, size);
});


//create room
const staticOptions = {
    isStatic: true,
    render: {
        visible: false,
    }
};
const logoWidth = (w <= 700) ? 250 : 450;
const logoHeight = (w <= 700) ? 130 : 60;

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, staticOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, staticOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 10, staticOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 10, staticOptions);
const Logo = Bodies.rectangle(50, 55, logoWidth, logoHeight, staticOptions);
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


//on click go to hyperlink
Events.on(mouseControl, 'mouseup', function (event) {
    const mConstraint = event.source;
    // console.log('mConstraint', mConstraint.bodyB);
    if (!mConstraint.bodyB) {
        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i];
            if (Bounds.contains(body.bounds, mConstraint.mouse.position)) {
                var bodyUrl = body.url;
                // console.log('body.url', bodyUrl);
                if (bodyUrl != undefined) {
                    window.open(bodyUrl, '_blank');
                    // console.log('Hyperlink was opened');
                }
                break;
            }
        }
    }
})


//add to world
World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    Logo,
    mouseControl,
]);



// console.log('bodies', bodies);

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


//add Gravity
let time = 0;
const changeGravity = function () {
    time = time + 0.008;


    const gravityS = Math.sin(time);
    const gravity = Math.cos(time);
    engine.world.gravity.y = gravity;
    engine.world.gravity.x = gravityS;
    requestAnimationFrame(changeGravity);
};

changeGravity();
window.addEventListener("resize", function () {
    location.reload();
});
// window.addEventListener('deviceOrientation', function (event) {
//     engine.world.gravity.x = event.beta / 30;
//     engine.world.gravity.y = event.gamma / 30;
// });