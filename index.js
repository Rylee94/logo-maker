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
        choices: ["Circle", "Rectangle", "Triangle"],
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

  const shapeElements = shape
    .map((selectedShape) => {
      switch (selectedShape) {
        case "Circle":
          return `<circle cx="50" cy="50" r="40" fill="${shapeFillColor}" />`;
        case "Rectangle":
          return `<rect x="10" y="10" width="80" height="80" fill="${shapeFillColor}" />`;
        case "Triangle":
          return `<polygon points="50,10 90,90 10,90" fill="${shapeFillColor}" />`;
        default:
          return "";
      }
    })
    .join("");

  const svgContent = `<svg width="100" height="100">
      ${shapeElements}
      <text x="50%" y="50%" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${title}</text>
    </svg>`;

  const fileName = "logo.svg";
  const filePath = path.join(process.cwd(), fileName);

  fs.writeFileSync(filePath, svgContent);
  console.log(`SVG file created at ${filePath}`);
}

// Start the program
promptUser();
