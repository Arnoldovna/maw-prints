//matter.js
const {
    Engine,
    Render,
    Bounds,
    Query,
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
                texture: "../../assets/images/" + sprite,
            },
        },
        url: url,
        label: name,
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
const logoWidth = (w <= 700) ? 350 : 560;
const logoHeight = (w <= 700) ? 230 : 170;

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, staticOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, staticOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 10, staticOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 10, staticOptions);
const Logo = Bodies.rectangle(0, 0, logoWidth, logoHeight, staticOptions);
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
});


//make eye blink
setInterval(function () {
    bodies[4].render.sprite.texture = '../../assets/images/eye-close.svg';
    setTimeout(function () {
        bodies[4].render.sprite.texture = '../../assets/images/eye.svg';
    }, 400);
}, 5000);


//animate scissors and pen
function animate(i, file, time, sequenz) {
    setInterval(function () {
        bodies[i].render.sprite.texture = '../../assets/images/' + file + '_1.svg';
        setTimeout(function () {
            bodies[i].render.sprite.texture = '../../assets/images/' + file + '.svg';
            setTimeout(function () {
                bodies[i].render.sprite.texture = '../../assets/images/' + file + '_1.svg';
                setTimeout(function () {
                    bodies[i].render.sprite.texture = '../../assets/images/' + file + '.svg';
                    setTimeout(function () {
                        bodies[i].render.sprite.texture = '../../assets/images/' + file + '_1.svg';
                        setTimeout(function () {
                            bodies[i].render.sprite.texture = '../../assets/images/' + file + '.svg';
                            setTimeout(function () {
                                bodies[i].render.sprite.texture = '../../assets/images/' + file + '_1.svg';
                                setTimeout(function () {
                                    bodies[i].render.sprite.texture = '../../assets/images/' + file + '.svg';
                                }, sequenz);
                            }, sequenz);
                        }, sequenz);
                    }, sequenz);
                }, sequenz);
            }, sequenz);
        }, sequenz);
    }, time);
}

animate(5, 'pen', 7000, 50);
animate(6, 'scissors', 5000, 200);


//Add event with 'mousemove': HOVER menupoints
Events.on(mouseControl, 'mousemove', function (event) {
    var hoveredShape = Query.point(bodies, event.mouse.position);
    var hoveredArray = [],
        X = 2;
    while (hoveredArray.length < X) {
        hoveredArray.push(hoveredShape[0]);
    }
    // console.log('hoverrShp', hoveredShape);
    hoveredArray.reduce((prev, curr) => {

        if (prev == undefined) {
            //no object hovered
            bodies[0].render.sprite.texture = '../../assets/images/about.svg';
            bodies[1].render.sprite.texture = '../../assets/images/showcase.svg';
            bodies[2].render.sprite.texture = '../../assets/images/contact.svg';
            bodies[3].render.sprite.texture = '../../assets/images/instagram.svg';
            bodies[4].render.sprite.texture = '../../assets/images/eye.svg';
            bodies[5].render.sprite.texture = '../../assets/images/pen.svg';
            bodies[6].render.sprite.texture = '../../assets/images/scissors.svg';
            sectionTag.classList.remove("pointer");

        } else if (prev != undefined && prev === curr) {
            //object hovered

            if (prev.label && curr.label === 'about' ||
                prev.label && curr.label === 'contact' ||
                prev.label && curr.label === 'showcase' ||
                prev.label && curr.label === 'instagram'
            ) {
                sectionTag.classList.add("pointer");
                console.log('ADD');
            }
            if (prev.label === 'about') {

                bodies[0].render.sprite.texture = '../../assets/images/about_l.svg';

            } else if ((prev.label != 'about')) {
                bodies[0].render.sprite.texture = '../../assets/images/about.svg';


            }

            if (prev.label && curr.label === 'showcase') {

                bodies[1].render.sprite.texture = '../../assets/images/showcase_l.svg';


            } else {
                bodies[1].render.sprite.texture = '../../assets/images/showcase.svg';

            }


            if (prev.label && curr.label === 'contact') {
                bodies[2].render.sprite.texture = '../../assets/images/contact_l.svg';


            } else {
                bodies[2].render.sprite.texture = '../../assets/images/contact.svg';

            }


            if (prev.label && curr.label === 'instagram') {
                bodies[3].render.sprite.texture = '../../assets/images/instagram_l.svg';

            } else {
                bodies[3].render.sprite.texture = '../../assets/images/instagram.svg';

            }

            if (prev.label && curr.label === 'eye') {
                bodies[4].render.sprite.texture = '../../assets/images/eye-close.svg';
            } else {
                bodies[4].render.sprite.texture = '../../assets/images/eye.svg';
            }

            if (prev.label && curr.label === 'scissors') {
                bodies[6].render.sprite.texture = '../../assets/images/scissors_1.svg';
            } else {
                bodies[6].render.sprite.texture = '../../assets/images/scissors.svg';
            }

            if (
                prev.label && curr.label != 'about' &&
                prev.label && curr.label != 'contact' &&
                prev.label && curr.label != 'showcase' &&
                prev.label && curr.label != 'instagram' &&
                prev.label && curr.label != 'scissors'
            ) {
                console.log('REMOVE');
                sectionTag.classList.remove("pointer");

            }


        } else return;

    });
});


//add to world
World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    Logo,
    mouseControl,
]);


Engine.run(engine);
Render.run(render);


//add Gravity
let time = 0;
const changeGravity = function () {
    time = time + 0.006;


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