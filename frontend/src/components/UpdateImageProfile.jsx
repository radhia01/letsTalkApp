import React from "react";

const UpdateImageProfile = () => {
  const iduse = localStorage.getItem("iduser");
  const update = async () => {
    await fetch("/editpicture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": localStorage.getItem("TK"),
      },
      body: JSON.stringify({
        iduse,
      }),
    });
  };
  return (
    <div onSubmit={{ update }} className="col-md-4 offset-md-3 bg-danger">
      <form encrypt="multipart/form-data">
        <input type="file" name="image" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UpdateImageProfile;
