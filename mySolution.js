const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(() => console.error("Unable to connect..", err));

const courseSchema = mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("courses", courseSchema);

// EX-1
// async function getCourses() {
//   return await Course.find({ tags: "backend", isPublished: true })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
// }

// EX-2
// async function getCourses() {
//   return await Course.find({
//     // tags: { $in: ["backend", "frontend"] },
//     isPublished: true,
//   })
//     .or([{ tags: "frontend" }, { tags: "backend" }])
//     .sort({ price: -1 }) //descending
//     .select({ name: 1, author: 1 });
// }

//EX-3
async function getCourses() {
  return await Course.find({
    isPublished: true,
  }).or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
}

async function displayCourses() {
  const courses = await getCourses();
  console.log(courses);
}

displayCourses();
