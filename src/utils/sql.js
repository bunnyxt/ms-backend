/* eslint-disable no-unused-vars */
function buildSetSql(nameValueMapper) {
  const nameValueListFiltered = Object.entries(nameValueMapper).filter(
    ([name, value]) => value !== undefined,
  );
  const nameString = nameValueListFiltered.reduce((prev, [name, value]) => `${prev} \`${name}\` = ?,`, '');
  const valueList = nameValueListFiltered.map(([name, value]) => value);
  return {
    setNameString: nameString.substring(0, nameString.length - 1),
    setValueList: valueList,
  };
}

module.exports = {
  buildSetSql,
};
