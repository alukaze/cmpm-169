/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Moon Landing", 
        assetUrl: "https://cdn.glitch.global/35674e39-e7aa-40df-9b27-ee6e26c8da6b/Moon.png?v=1715134201152",
        credit: "Picture from Moon landing 1969"
      },
      {
        name: "Tiananmen Square", 
        assetUrl: "https://cdn.glitch.global/35674e39-e7aa-40df-9b27-ee6e26c8da6b/TankSquare.png?v=1715145479784",
        credit: "Tiananmen Square Protestor stops a column of Type 59 tanks, 1989"
      },
      {
        name: "Sailor and Nurse", 
        assetUrl: "https://cdn.glitch.global/35674e39-e7aa-40df-9b27-ee6e26c8da6b/Sailor.png?v=1715134206533",
        credit: "Sailor kisses Nurse after end of WW2, 1945"
      },
      {
        name: "Raising Flag at Iwo Jima", 
        assetUrl: "https://cdn.glitch.global/35674e39-e7aa-40df-9b27-ee6e26c8da6b/IwoJima.png?v=1715134209490",
        credit: "American flag is raised by Marines at Iwo Jima"
      },
    ];
  }
  
  function initDesign(inspiration) {
    resizeCanvas(inspiration.image.width, inspiration.image.height);
    
    let design = {
      bg: 128,
      fg: []
    }
    
    for(let i = 0; i < 1000; i++) {
      design.fg.push({x: random(width),
                      y: random(height),
                      w: random(width/20),
                      h: random(height/20),
                      op: random(255)})
    }
    return design;
  }
  
  function renderDesign(design, inspiration) {
    noStroke();
    for(let box of design.fg) {
      let x = currentInspiration.image.get(box.x, box.y)
      fill(x[0], x[1], x[2], box.op);
      let shapes = ["rectangle", "ellipse", "triangle"];
      let randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      if (randomShape == "rectangle") {
          rect(box.x - box.w/2, box.y - box.h/2, box.w, box.h);
      } else if (randomShape == "ellipse") {
          ellipse(box.x, box.y, box.w, box.h);
      } else {
          triangle(box.x, box.y - box.h/2, box.x - box.w/2, box.y + box.h/2, box.x + box.w/2, box.y + box.h/2)
      }
    }
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/20, rate);
      box.h = mut(box.h, 0, height/20, rate);
    }
  }
  
  
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 20), min, max);
  }
  
  