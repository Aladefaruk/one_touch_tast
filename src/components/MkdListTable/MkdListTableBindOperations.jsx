export const operations = {
  EQUAL: "eq",
  NOT_EQUAL: "neq",
  IS_NULL: "isn",
  IS_NOT_NULL: "isnn",
  CONTAINS: "cs",
  START_WITH: "sw",
  END_WITH: "ew",
  LESS_THAN: "lt",
  GREATER_THAN: "gt",
};

export const runOperation = (row, column, operator, value) => {
  switch (operator) {
    case operations.EQUAL:
    // TO DO
      return row[column] === value;
    case operations.NOT_EQUAL:
    // TO DO
      return row[column] !== value;
    case operations.IS_NULL:
    // TO DO
      return row[column] === null;
    case operations.IS_NOT_NULL:
    // TO DO
      return row[column] && row[column] !== null;
    case operations.CONTAINS:
    // TO DO
      return row[column].includes(value);
    case operations.START_WITH:
    // TO DO
      return row[column].startsWith(value);
    case operations.END_WITH:
    // TO DO
      return row[column].endsWith(value);
    case operations.GREATER_THAN:
    // TO DO
      return row[column] > value;
    case operations.LESS_THAN:
    // TO DO
      return row[column] > value;
  }
};
export const logicalOR = (action, row) => {
  if (
    !Array.isArray(action?.bind?.column) ||
    !Array.isArray(action?.bind?.ifValue)
  ) {
    return false;
  }
  if (action?.bind?.column?.length !== action?.bind?.ifValue?.length) {
    return false;
  }

  const result = action?.bind?.ifValue.map((value, index) =>
    runOperation(
      row,
      action?.bind?.column[index],
      action?.bind?.operator,
      value
    )
  );
  return result.some((res) => res === true);
};

export const logicalAND = (action, row) => {
  if (
    !Array.isArray(action?.bind?.column) ||
    !Array.isArray(action?.bind?.ifValue)
  ) {
    return false;
  }
  if (action?.bind?.column?.length !== action?.bind?.ifValue?.length) {
    return false;
  }

  const result = action?.bind?.ifValue.map((value, index) =>
    runOperation(
      row,
      action?.bind?.column[index],
      action?.bind?.operator,
      value
    )
  );
  return result.every((res) => res === true);
};

export const processBind = (action, row) => {
  if (action?.bind?.logic) {
    switch (action?.bind?.logic) {
      case "or":
        return logicalOR(action, row);
      case "and":
        return logicalAND(action, row);
    }
  } else {
    return runOperation(
      row,
      action?.bind?.column,
      action?.bind?.operator,
      action?.bind?.ifValue
    );
  }
}