import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Create = ({ open, setOpen }) => {
  /////////////////////////////////////// States ////////////////////////////////////////
  const [data, setData] = React.useState({
    title: "",
    tags: "",
    documents: null,
    uploadedBy: JSON.parse(Cookies.get("profile"))?._id || "",
  });

  const [errors, setErrors] = React.useState({
    title: "",
    tags: "",
    documents: "",
  });

  ///////////////////////////////// Handlers & Functions /////////////////////////////////
  const handleClose = () => {
    setOpen(false);
    setErrors({ title: "", tags: "", documents: "" });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documents") {
      setData((prev) => ({ ...prev, documents: files }));
      validateDocuments(files);
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
      if (name === "title") validateTitle(value);
      if (name === "tags") validateTags(value);
    }
  };

  const validateTitle = (title) => {
    if (!title.trim()) setErrors((prev) => ({ ...prev, title: "Title is required" }));
    else setErrors((prev) => ({ ...prev, title: "" }));
  };

  const validateTags = (tags) => {
    if (!tags.trim()) setErrors((prev) => ({ ...prev, tags: "At least one tag required" }));
    else setErrors((prev) => ({ ...prev, tags: "" }));
  };

  const validateDocuments = (files) => {
    if (!files || files.length === 0) {
      setErrors((prev) => ({ ...prev, documents: "Please select at least one file." }));
      return false;
    }

    let valid = true;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        setErrors((prev) => ({
          ...prev,
          documents: "Only JPG, PNG, GIF files are allowed",
        }));
        valid = false;
        break;
      }
      if (files[i].size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          documents: "Each file must be less than 5MB",
        }));
        valid = false;
        break;
      }
    }
    if (valid) setErrors((prev) => ({ ...prev, documents: "" }));
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateTitle(data.title);
    validateTags(data.tags);
    if (!validateDocuments(data.documents)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token found! Login first.");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("tags", data.tags);
      formData.append("uploadedBy", data.uploadedBy);

      for (let i = 0; i < data.documents.length; i++) {
        formData.append("documents", data.documents[i]);
      }

      await axios.post("http://localhost:3000/api/v1/documents/", formData, {
        headers: {
          authtoken: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>
        <div className="font-primary text-sky-500">Create a new Document</div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">Title</label>
            <input
              name="title"
              type="text"
              value={data.title}
              onChange={handleChange}
              className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter document title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">Tags</label>
            <input
              name="tags"
              type="text"
              value={data.tags}
              onChange={handleChange}
              className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter Tags (comma separated)"
            />
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
          </div>

          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">
              Upload Documents
            </label>
            <input
              name="documents"
              type="file"
              onChange={handleChange}
              multiple
              className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
              accept="image/*"
            />
            {errors.documents && <p className="text-red-500 text-sm mt-1">{errors.documents}</p>}
            <div className="text-sm text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF. Max size per file: 5MB.
            </div>
          </div>

          <DialogActions className="mr-4 mb-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary">
              Create
            </button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
