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
    return `<circle cx="150" cy="100" r="100" fill="${this.color}"/>`;
  }
}
//Renders a Square
class Square extends Shape {
  render() {
    return `<rect x="50" y="50" width="200" height="200" fill="${this.color}"/>`;
  }
}

//Renders a Triangle
class Triangle extends Shape {
  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}"/>`;
  }
}

module.exports = { Circle, Square, Triangle };
