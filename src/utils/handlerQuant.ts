type Props = {
  type: "INCRE" | "DECRE";
  payload: number;
};
const init = 0;

const reducer = (state = init, action: Props) => {
  switch (action.type) {
    case "INCRE":
      return state + action.payload || 1;
    case "DECRE":
      return state - action.payload || 1;
    default:
      return state;
  }
};
