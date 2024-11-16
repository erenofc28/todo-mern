import TodoModel from "../models/todoModel.js";
//for adding value into database
export const add = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res
      .status(500)
      .json({ success: false, message: "please provide all informations" });
  }

  const newData = new TodoModel(data);

  try {
    await newData.save();
    console.log("successfully added into DB");
    return res.status(201).json({
      success: true,
      dat: newData,
      message: "successfully added into db",
    });
  } catch (error) {
    console.log("failed to add", error);
    return res.status(401).json({ success: false, message: "failed" });
  }
};

//for delete method
export const del = async (req, res) => {
  const id = req.params.id;
  try {
    await TodoModel.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ success: true, message: "successfully deleted" });
  } catch (error) {
    return res.status(401).json({ success: false, message: "failed" });
  }
};

//for update method
export const update = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let data = {};
  if (title != []) {
    data["title"] = title;
  }
  if (description != []) {
    data["description"] = description;
  }
  if (!data) {
    return res
      .status(401)
      .json({ success: false, message: "please fill all fileds" });
  }
  try {
    await TodoModel.findByIdAndUpdate(id, data)
      .then(() => {
        return res
          .status(201)
          .json({ success: true, dat: data, message: "successfuly updated" });
      })
      .catch(() => {
        return res.status(401).json({ success: false, message: "failed" });
      });
  } catch (error) {
    return res.status(401).json({ success: false, message: "failed" });
  }
};

//for getting data from database
export const get = async (req, res) => {
  const data = await TodoModel.find({});
  res.status(201).json({ success: true, data });
};
