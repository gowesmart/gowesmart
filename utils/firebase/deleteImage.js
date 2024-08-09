import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase";

const deleteImage = async (imageName) => {
  return await deleteObject(ref(storage, `images/${imageName}`)).catch(
    (err) => {
      throw err;
    },
  );
};

export default deleteImage;
