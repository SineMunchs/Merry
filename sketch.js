let snowflakes = [];
let colorMode = 0; // Add this variable to track color mode

function setup() {
  createCanvas(600, 600);
  background(0);
  noSmooth();
  pixelDensity(1);
  
  // Initialize snow positions
  snowflakes = [];
  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: random(width),
      y: random(height),
      speed: random(1, 2)
    });
  }
}

function mousePressed() {
  // Change color mode when mouse is pressed
  colorMode = (colorMode + 1) % 2; // Cycle through 3 different color schemes
}

function draw() {
  background(0);
  
  // Pixel size for letters
  const pixelSize = 6;
  
  // Different color schemes
  const colorSchemes = [
    // Original Christmas colors
    [
      color(255, 0, 0),    // Red
      color(85, 140, 61),    // Green
      color(255, 255, 255) // White
    ],
    // Blue winter theme
    [
      color(44, 77, 155),   // Deep Sky Blue
     
    ]

  ];
  
  // Select current color scheme
  const colors = colorSchemes[colorMode];
  
  const letters = {
    'M': [
      [1,0,0,0,1],
      [1,1,0,1,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'E': [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,1,1,1]
    ],
    'R': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,0,1,0],
      [1,0,0,0,1]
    ],
    'Y': [
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ],
    'C': [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1]
    ],
    'H': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ],
    'I': [
      [1,1,1],
      [0,1,0],
      [0,1,0],
      [0,1,0],
      [1,1,1]
    ],
    'S': [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,1,1,1,1],
      [0,0,0,0,1],
      [1,1,1,1,1]
    ],
    'T': [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0]
    ],
    'A': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1]
    ]
  };

  // Center text
  const text = "MERRY CHRISTMAS";
  let totalWidth = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      totalWidth += pixelSize * 3;
    } else {
      totalWidth += (letters[text[i]][0].length + 1) * pixelSize;
    }
  }
  
  let x = (width - totalWidth) / 2;
  
  // Calculate bouncing y position
  let bounce = sin(frameCount * 0.05) * 20;
  let y = height/2 + bounce;
  
  // Draw letters
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      x += pixelSize * 3;
      continue;
    }
    const letter = letters[text[i]];
    const currentColor = colors[i % colors.length];
    fill(currentColor);
    noStroke();
    for (let row = 0; row < letter.length; row++) {
      for (let col = 0; col < letter[row].length; col++) {
        if (letter[row][col]) {
          rect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    x += (letter[0].length + 1) * pixelSize;
  }
  
  // Snow effect
  fill(255);
  noStroke();
  for (let snowflake of snowflakes) {
    snowflake.x += map(noise(frameCount * 0.001, snowflake.y), 0, 1, -0.5, 0.5);
    snowflake.y += snowflake.speed;
    
    if (snowflake.y > height) {
      snowflake.y = 0;
      snowflake.x = random(width);
    }
    
    if (snowflake.x > width) snowflake.x = 0;
    if (snowflake.x < 0) snowflake.x = width;
    
    rect(snowflake.x, snowflake.y, 2, 2);
  }
}
