import { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Carousel from "./Carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Cookies from "js-cookie";
import Create from "./Create";

const Page = () => {
  //////////////////////////////////////////// States //////////////////////////////////////////////
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  //////////////////////////////////////////// Variables ///////////////////////////////////////////
  const role = JSON.parse(Cookies.get("profile"))?.role;

  ////////////////////////////////////////// useEffect /////////////////////////////////////////////
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/documents", {
          headers: { authtoken: localStorage.getItem("token") },
        });

        const mappedDocs = data.documents.map((doc) => ({
          id: doc._id,
          title: doc.title,
          tags: doc.tags,
          url: doc.url,
          uploadedBy: doc.uploadedBy.name,
          createdAt: new Date(doc.createdAt).toLocaleString(),
        }));

        setRows(mappedDocs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Header />

      <div className="flex justify-start">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-10 ml-10 cursor-pointer rounded-lg"
          onClick={() => setOpen(true)}>
          Create Document
        </button>
      </div>

      <div className="pb-[8%] pt-10 px-[4%] flex gap-8 flex-wrap justify-start">
        {rows.length > 0 ? (
          rows?.map((doc) => (
            <Card sx={{ maxWidth: 345 }}>
              <Carousel data={doc.url} />
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div>{doc.title}</div>
                  {role === "admin" && <div className="text-gray-500">By: {doc.uploadedBy}</div>}
                </div>
                <div className="flex flex-row gap-4">
                  {doc.tags &&
                    doc.tags.map((tag, index) => (
                      <div className="text-white rounded-full bg-gray-500 px-4 text-center my-2">
                        {tag}
                      </div>
                    ))}
                </div>
                <div className="text-black flex justify-end">{doc.createdAt.toLocaleString()}</div>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <p>No documents available</p>
          </>
        )}
      </div>

      <Create open={open} setOpen={setOpen} />
    </div>
  );
};

export default Page;
