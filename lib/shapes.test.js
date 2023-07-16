const { Circle, Square, Triangle } = require("./shapes");

describe("Circle", () => {
  test("testing for a teal circle", () => {
    const circle = new Circle();
    const color = "#007C60";
    circle.setColor("teal");
    expect(circle.render()).toEqual(
      `<circle cx="150" cy="100" r="100" fill="teal" />`
    );
  });
});

// describe("Square", () => {
//   test("testing for a yellow square", () => {
//     const square = new Square();
//     const color = "#B2DA26";
//     square.setColor("yellow");
//     expect(square.render()).toEqual(`<rect x="100" y="100" fill="yellow" />`);
//   });
// });

describe("Triangle", () => {
  test("testing for a green triangle", () => {
    const triangle = new Triangle();
    const color = "#00FF00";
    triangle.setColor("green");
    expect(triangle.render()).toEqual(
      `<polygon points= "100,0 0,100, 200,200" fill="green"/>`
    );
  });
});
