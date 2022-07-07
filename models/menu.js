const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

class Menu {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  static async update(course) {
    const courses = await Menu.getAll();

    const idx = courses.findIndex((c) => c.id === course.id);
    courses[idx] = course;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "menu.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  //  async save() {
  //    const courses = await Menu.getAll();
  //    courses.push(this.toJSON());

  //    return new Promise((resolve, reject) => {
  //      fs.writeFile(
  //        path.join(__dirname, "..", "data", "courses.json"),
  //        JSON.stringify(courses),
  //        (err) => {
  //          if (err) {
  //            reject(err);
  //          } else {
  //            resolve();
  //          }
  //        }
  //      );
  //    });
  //  }

  static getAll(shopFilter = "") {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "menu.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            const filterContent = JSON.parse(content).filter(
              (product) => shopFilter === "" || product.shop === shopFilter
            );
            resolve(filterContent);
          }
        }
      );
    });
  }

  static async getById(id) {
    const courses = await Menu.getAll();
    return courses.find((c) => c.id === id);
  }
}

module.exports = Menu;
