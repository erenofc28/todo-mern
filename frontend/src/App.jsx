import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [updateTrue, setUpdateTrue] = useState(false);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [validTitle, setValidTitle] = useState([]);
  const [arr, setArr] = useState([]);
  const [validDescription, setValidDescription] = useState([]);

  const [updateTitle, setUpdateTitle] = useState([]);
  const [updateDes, setUpdateDes] = useState([]);

  //for deleting data from database
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/${id}`)
      .then(() => {
        console.log("successfully deleted");
        setArr(
          arr.filter((dat) => {
            if (dat._id != id) {
              return dat;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //for adding new data into database
  const handleAdd = () => {
    if (!title) {
      return;
    }
    if (!description) {
      return;
    }
    const data = {
      title,
      description,
    };
    axios
      .post("http://localhost:5000", data)
      .then((r) => {
        setArr([...arr, r.data.dat]);
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (id) => {
    const data = {};
    if (updateTitle != "") {
      data["title"] = updateTitle;
    }
    if (updateDes != "") {
      data["description"] = updateDes;
    }
    setUpdateTitle("");
    setUpdateDes("");

    axios
      .put(`http://localhost:5000/${id}`, data)
      .then((r) => {
        console.log("successfully updated", r.data.dat);

        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // for getting data from mongo db database
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get("http://localhost:5000").then((res) => {
      setArr(res.data.data);
    });
  };
  return (
    <>
      <div className="bg-success text-light header">
        <h1 className="main-h1">ToDo With MERN Stack</h1>
      </div>
      <div className="add-items">
        <h2>Add Item</h2>
        <div className="inputs">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <button onClick={handleAdd} className="bg-dark text-light submit-btn">
            Submit
          </button>
        </div>
      </div>

      <div className="tasks">
        <h2>Tasks</h2>

        <div>
          {/* all tasks */}

          {arr.map((data) => {
            return (
              <>
                <div
                  className="single-task"
                  style={{
                    flexDirection:
                      window.innerWidth <= 500 && updateTrue === data._id
                        ? "column"
                        : "row",
                  }}
                >
                  <div className="single-title-des">
                    <h4 className={updateTrue === data._id ? "hide" : ""}>
                      {data.title}
                    </h4>
                    <div>
                      <p className={updateTrue === data._id ? "hide" : ""}>
                        {data.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      updateTrue === data._id
                        ? "update-inputs "
                        : "update-inpits hide"
                    }
                    style={{ width: updateTrue === data._id ? "100%" : "" }}
                  >
                    <input
                      defaultValue={data.title}
                      type="text"
                      placeholder="Title"
                      className="update-input"
                      onChange={(e) => {
                        setUpdateTitle(e.target.value);
                      }}
                    />
                    <input
                      defaultValue={data.description}
                      type="text"
                      placeholder="Description"
                      className="update-input"
                      onChange={(e) => {
                        setUpdateDes(e.target.value);
                      }}
                    />
                  </div>

                  <div className="single-btns">
                    <button
                      onClick={() => {
                        if (updateTrue != data._id) {
                          setUpdateTrue(data._id);
                        } else {
                          setUpdateTrue("");
                        }
                        handleUpdate(data._id);
                      }}
                      className="text-dark bg-warning"
                      style={{
                        flex: window.innerWidth <= 500 ? "1" : "",
                        height: window.innerWidth === 500 ? "38px" : "",
                      }}
                    >
                      {updateTrue === data._id ? "Update" : "Edit"}
                    </button>
                    <button
                      className="text-light bg-danger"
                      onClick={() => {
                        handleDelete(data._id);
                      }}
                      style={{
                        flex: window.innerWidth <= 500 ? "1" : "",
                        height: window.innerWidth === 500 ? "38px" : "",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {arr.length == 0 ? (
        <p style={{ textAlign: "center" }}>No Tasks Found</p>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
