interface PartyList {
    list: ListItem[];
  }
  
  interface ListItem {
    name: string;
    score: number;
  }
  
  export const partyList: PartyList = {
    list: [
      {
        name: "พรรคเพื่อไทย",
        score: 0,
      },
      {
        name: "พรรคก้าวไกล",
        score:0
      },
      {
        name: "บัตรเสีย",
        score:0
      },
      {
        name: "ไม่ประสงค์ลงคะแนน",
        score:0
      }
    ],
  };
  