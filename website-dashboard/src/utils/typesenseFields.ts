const getOutput = (type: any) => {
  switch (type) {
    case "string":
      return "";
    case "int32":
      return 0;
    case "int64":
      return 0;
    case "float":
      return 0;
    case "bool":
      return false;
    case "string[]":
      return [];
    case "int32[]":
      return [];
    case "int64[]":
      return [];
    case "float[]":
      return [];
    case "bool[]":
      return [];
    default:
      return [];
  }
};

export default getOutput;
