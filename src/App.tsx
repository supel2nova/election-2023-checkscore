import { useState, useEffect } from "react";
import { partyList } from "./assets/partylist";
import { ListItem } from "./assets/partylist";
import Swal from "sweetalert2";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const App = (): JSX.Element => {
  const [list, setList] = useState<Array<ListItem>>(() => {
    const savedList = localStorage.getItem("partyList");
    return savedList ? JSON.parse(savedList) : partyList.list;
  });

  useEffect(() => {
    localStorage.setItem("partyList", JSON.stringify(list));
  }, [list]);

  const handleIncrement = (name: string, score: number) => {
    const updatedList = list.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          score: item.score === score ? item.score + 1 : item.score,
        };
      }
      return item;
    });
    setList(updatedList);
  };

  const handleDecrement = (name: string, score: number) => {
    const updatedList = list.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          score: item.score === score ? item.score - 1 : item.score,
        };
      }
      return item;
    });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be remove Vote!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setList(updatedList);
        Swal.fire("Deleted!", "Your Vote has been deleted.", "success");
      }
    });
  };

  const goodVote = list.reduce((accumulator, item) => {
    if (item.name === "บัตรเสีย") {
      return accumulator;
    }
    return accumulator + item.score;
  }, 0);

  const badVote = list.reduce((accumulator, item) => {
    if (item.name === "บัตรเสีย") {
      return accumulator + item.score;
    } else {
      return accumulator;
    }
  }, 0);

  const columns: ColumnsType<ListItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "พรรค",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "vote",
      dataIndex: "score",
      key: "score",
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },
    {
      title: "",
      dataIndex: " ",
      key: "score",
      render: (text, item) => (
        <div className="gap-2 flex flex-col md:flex-row md:justify-center">
          <span>{text}</span>
          <Button
            type="primary"
            style={{
              background: "#1677ff",
              padding: "1rem 2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleIncrement(item.name, item.score)}
          >
            <PlusCircleOutlined />
          </Button>
          <Button
            danger
            style={{
              padding: "1rem 2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleDecrement(item.name, item.score)}
          >
            <MinusCircleOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen w-screen py-10 overflow-hidden">
      <div className="flex gap-4 justify-center top-0 sticky mb-4">
        <p>Good Vote: {goodVote}</p>
        <p>Bad Vote: {badVote}</p>
        <p>Total Vote: {goodVote + badVote}</p>
      </div>
      <div className="flex flex-col text-center h-full w-screen md:px-8 ">
        <h1 className="top-0 text-base sticky bg-fuchsia-500 py-3">ส.ส. แบบแบ่งเขต</h1>
        <div className="overflow-y-auto">
          <Table
            pagination={false}
            columns={columns}
            dataSource={list}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
