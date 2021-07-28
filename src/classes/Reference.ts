export default class Reference {

  meteDataObjectId: string;
  dataBaseTableId: number;
  linkId: string;
  referenceId: string;

  constructor(
    meteDataObjectId: string,
    dataBaseTableId: number,
    linkId: string
  ) {
    this.meteDataObjectId = meteDataObjectId;
    this.dataBaseTableId = dataBaseTableId;
    this.linkId = linkId;
    this.referenceId = getReferenceId(linkId);
  }
}

function getReferenceId(linkId: string) {

  const part1 = linkId.slice(24);
	const part2 = linkId.slice(20, 24);
	const part3 = linkId.slice(16, 20);
	const part4 = linkId.slice(0, 4);
	const part5 = linkId.slice(4, 16);

  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}