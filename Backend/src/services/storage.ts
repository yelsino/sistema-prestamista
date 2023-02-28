import { IStorage } from "types-yola";
import StorageModel from "../models/storage";

const registerUpload = async ({ fileName, idUser, path }: IStorage) => {
  const responseItem = await StorageModel.create({ fileName, idUser, path });
  return responseItem;
};

export { registerUpload };
