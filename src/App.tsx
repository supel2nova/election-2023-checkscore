import { useState, useEffect } from "react";
import { partyList } from "./assets/partylist";
import { ListItem } from "./assets/partylist";
import Swal from "sweetalert2";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

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
        <div>
          <span>{text}</span>
          <Button
            type="primary"
            style={{ background: "#1677ff", marginRight: "1rem" }}
            onClick={() => handleIncrement(item.name, item.score)}
          >
            +
          </Button>
          <Button danger onClick={() => handleDecrement(item.name, item.score)}>
            -
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-around h-screen py-10">
      <div className="flex flex-col overflow-auto text-center mb-4">
        <h1 className="mb-4">บัญชีรายชื่อ</h1>
        <div className="overflow-auto">
          <Table
            style={{ scrollbarWidth: "none" }}
            pagination={false}
            columns={columns}
            dataSource={list}
          />
        </div>
      </div>

      <div>
        <p>Good Vote: {goodVote}</p>
        <p>Bad Vote: {badVote}</p>
        <p>Total Vote: {goodVote + badVote}</p>
      </div>
    </div>
  );
};

export default App;
