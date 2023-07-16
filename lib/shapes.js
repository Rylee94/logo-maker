//defines a shape class that sets a color value
class Shape {
  constructor() {
    this.color = "";
  }
  setColor(color) {
    this.color = color;
  }
}

//Renders a Circle
class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="100" fill="${this.color}" />`;
  }
}
//Renders a Square
class Square extends Shape {
  render() {
    return `<rect x="100" y="100" fill="${this.color}"/>`;
  }
}
//Renders a Triangle
class Triangle extends Shape {
  render() {
    return `<polygon points= "100,0 0,100, 200,200" fill="${this.color}"/>`;
  }
}

module.exports = { Circle, Square, Triangle };
