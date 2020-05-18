//matter.js
const {
    Engine,
    Render,
    Bodies,
    MouseConstraint,
    World,
} = Matter;

const sectionTag = document.querySelector('section.shapes');

//width and height of page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();

const render = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        width: w,
        height: h,
        background: 'white',
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

//create Bodies
const about = Bodies.rectangle(percentX(20), percentY(20), 146, 49, {
    // frictionAir: 0.1,
    render: {
        sprite: {
            texture: '../../img/about.png',
        },
    },
});

const form1 = Bodies.rectangle(percentX(40), percentY(2), 200, 184, {
    render: {
        sprite: {
            texture: '../../img/form_1.png',
        },
    },
});

const form2 = Bodies.rectangle(percentX(30), percentY(5), 324, 100, {
    render: {
        sprite: {
            texture: '../../img/form_2.png',
        },
    },
});


//create room
const walloptions = {
    isStatic: true,
    // render: {
    //     visible: false,
    // }
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, walloptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, walloptions);

const leftWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, walloptions);
const rightWall = Bodies.rectangle(-50, h / 2, 100, h + 100, walloptions);

//create mouse dynamics
const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        stiffness: 0.8,
        render: {
            visible: false,
        },
    },
});

// const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
//   return createShape(x, y);
// });

World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    about,
    form1,
    form2,
    mouseControl,
]);

//on click add a new shape
// document.addEventListener('click', function (event) {
//   console.log('click');
//   const shape = createShape(event.pageX, event.pageY);
//   World.add(engine.world, shape);
// });

// fit the render viewport to the scene



Engine.run(engine);
Render.run(render);

// window.addEventListener("resize", function () {

//     Matter.Body.setPosition(ground, {
//         x: w / 2,
//         y: h + 30
//     });
//     Matter.Body.setPosition(rightWall, {
//         x: w + 30,
//         y: h / 2
//     });
// });