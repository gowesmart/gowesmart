import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const getImageURL = async (imageName) => {
  return await getDownloadURL(ref(storage, `images/${imageName}`)).catch(
    (err) => {
      throw err;
    },
  );
};

export default getImageURL;
