const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

// Prompt user for input
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter logo text up to three characters",
        validate: function (input) {
          if (input.length > 3) {
            return "Title must be up to three characters long";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "textColor",
        message: "Enter hexadecimal number to choose text color",
      },
      {
        type: "checkbox",
        name: "shape",
        message: "Choose shape of logo",
        choices: ["Circle", "Square", "Triangle"],
      },
      {
        type: "input",
        name: "shapeFillColor",
        message: "Enter hexadecimal number to choose background color of shape",
      },
    ])
    .then((answers) => {
      generateSVG(answers);
    })
    .catch((error) => {
      console.error(error);
    });
}

function generateSVG(data) {
  const { title, textColor, shape, shapeFillColor } = data;

  let shapeElements = "";
  let shapeX = 0;
  let shapeY = 0;
  let svgWidth = 300;
  let svgHeight = 200;

  switch (shape[0]) {
    case "Circle":
      shapeElements = `<circle cx="${svgWidth / 2}" cy="${
        svgHeight / 2
      }" r="40" fill="${shapeFillColor}" />`;
      shapeX = svgWidth / 2;
      shapeY = svgHeight / 2;
      break;
    case "Square":
      const squareSize = Math.min(svgWidth, svgHeight) - 60;
      const squareX = (svgWidth - squareSize) / 2;
      const squareY = (svgHeight - squareSize) / 2;
      shapeElements = `<rect x="${squareX}" y="${squareY}" width="${squareSize}" height="${squareSize}" fill="${shapeFillColor}"/>`;
      shapeX = svgWidth / 2;
      shapeY = svgHeight / 2;
      break;
    case "Triangle":
      shapeElements = `<polygon points="${svgWidth / 2 - 40},${
        svgHeight / 2 + 30
      } ${svgWidth / 2 + 40},${svgHeight / 2 + 30} ${svgWidth / 2},${
        svgHeight / 2 - 40
      }" fill="${shapeFillColor}" />`;
      shapeX = svgWidth / 2;
      shapeY = svgHeight / 2 + 15; // Adjust the value to lower the title
      break;
    default:
      shapeElements = "";
      break;
  }

  const fontSize = Math.min(svgWidth, svgHeight) / (title.length > 2 ? 10 : 7); // Adjust the divisor for font scaling

  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}">
    ${shapeElements}
    <text x="${shapeX}" y="${shapeY}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" font-size="${fontSize}px">${title}</text>
  </svg>`;

  const fileName = "logo.svg";
  const filePath = path.join(process.cwd(), fileName);

  fs.writeFileSync(filePath, svgContent);
  console.log(`SVG file created at ${filePath}`);
}

// Start the program
promptUser();
