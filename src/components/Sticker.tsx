import { ToDoData } from "@/provider/context";

const Sticker = (stickerProps:ToDoData) => {
  console.log(stickerProps);
  // get the bg-color of sticker
    return (
    <div className="">
        <p>{stickerProps.title},{String(stickerProps.date)},{stickerProps.desc}</p>
    </div>
  )
}

export default Sticker