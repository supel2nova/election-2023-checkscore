import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { partyList } from "./assets/partylist";

interface ListItemProps {
  name: string;
  score: number;
}

const App = (): JSX.Element => {
  const [list, setList] = useState<Array<ListItemProps>>(() => {
    const savedList = Cookies.get("partyList");
    return savedList ? JSON.parse(savedList) : partyList.list;
  });

  useEffect(() => {
    Cookies.set("partyList", JSON.stringify(list));
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
    setList(updatedList);
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
  
  

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-3">
      {list.map((item: ListItemProps) => (
        <div className="flex gap-3" key={item.name}>
          <p>{item.name}</p>
          <p>{item.score}</p>
          <button onClick={() => handleIncrement(item.name, item.score)}>+</button>
          <button onClick={() => handleDecrement(item.name, item.score)}>-</button>
        </div>
      ))}
     <div>
      <p>Good Vote: {goodVote}</p>
      <p>Bad Vote: {badVote}</p>
      <p>Total Vote: {goodVote + badVote}</p>
    </div>
    </div>
  );
};

export default App;
