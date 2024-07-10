const carCanvas = document.getElementById('carCanvas');
carCanvas.width = 200;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road =new Road(carCanvas.width/2,carCanvas.width*0.9)
const N = 100
const cars =generateCars(N)


const traffic =[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
]

animate();
function generateCars(N){
    const cars=[]
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"))
    }
    return cars
}
function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
    }
    car.update(road.borders,traffic);

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    
    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.7)

    
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"black")
    }
    car.draw(carCtx,"purple");

    carCtx.restore()
    networkCtx.lineDashOffset=-time/50
    Visualizer.drawNetwork(networkCtx,car.brain);
    requestAnimationFrame(animate)
}