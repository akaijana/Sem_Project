import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";


function AdminRoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  //room deletion function starts
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setLoading(true);
      try {
        await axios.delete(`/api/rooms/deleteroom/${roomId}`);
        // Successfully deleted the room
        // Fetch the updated list of rooms
        fetchMyData();
      } catch (error) {
        console.error("Error deleting room:", error);
        setError("Failed to delete room");
      }
      setLoading(false);
    }
  };

  //room deletion function ends



  const columns = [
    {
      title: "roomid",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    { title: "maxcount", dataIndex: "maxcount", key: "maxcount" },
    { title: "roomNumber", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "rentperday", dataIndex: "rentperday", key: "rentperday" },
    { title: "type", dataIndex: "type", key: "type" },

    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Space size="middle">
          <button className="btn btn-danger" onClick={() => handleDeleteRoom(record._id)}>Delete</button>
        </Space>
      ),
    },


  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/rooms/getallrooms")).data;
      setRooms(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loader></Loader>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <>
          <div className="col md-12">
            <button className="btn btn-success" onClick={fetchMyData}>
              Refresh
            </button>
          </div>
          <div className="col-md-12">
            <Table columns={columns} dataSource={rooms} />



    

          </div>
        </>
      )}
    </div>
  );
}

export default AdminRoomScreen;
