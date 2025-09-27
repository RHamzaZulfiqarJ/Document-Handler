import Document from "../models/Document.js";

export const uploadFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    const { title, tags, uploadedBy } = req.body;
    if (!title || !uploadedBy)
      return res.status(400).json({ error: "Title and uploadedBy are required" });

    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

    const doc = new Document({
      title,
      tags: tags ? tags.split(",") : [],
      url: fileUrls,
      uploadedBy,
    });

    await doc.save();

    res.status(200).json({
      message: "Files uploaded successfully",
      document: doc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDocuments = async (req, res, next) => {
  try {
    const { _id, role } = req.user;

    const docs =
      role === "admin"
        ? await Document.find().populate("uploadedBy", "name email role")
        : await Document.find({ uploadedBy: _id }).populate("uploadedBy", "name email role");

    res.status(200).json({
      success: true,
      count: docs.length,
      documents: docs,
    });
  } catch (err) {
    next(err);
  }
};
