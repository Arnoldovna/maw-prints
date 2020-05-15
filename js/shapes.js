const {
    Engine,
    Render,
    Bodies,
    MouseConstraint,
    World
} = Matter;

const sectionTag = document.querySelector("section.shapes");

//width and height of page

const w = window.innerWidth;
const h = window.innerHeight;


const engine = Engine.create();
const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        width: w,
        height: h,
        background: "#ffffff",
        wireframes: false,
        pixelratio: window.devicePixelRatio
    },

});



const createShape = function (x, y) {
    return Bodies.circle(x, y, 20, {
        frictionAir: 0.01,
        resitution: 1,
        render: {
            fillStyle: 'blue',

        }
    });
};

const walloptions = {
    isStatic: true,
    // render: {
    //     visible: false
    // }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, walloptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, walloptions);
const leftWall = Bodies.rectangle(w + 50, h, 100, h + 100, walloptions);
const rightWall = Bodies.rectangle(-50, h, 100, h + 100, walloptions);

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
});



World.add(engine.world, [ground, ceiling, leftWall, rightWall, mouseControl]);


//on click add a new shape
document.addEventListener("click", function (event) {
    console.log('click');
    const shape = createShape(event.pageX, event.pageY);
    World.add(engine.world, shape);
});
Engine.run(engine);
Render.run(renderer);